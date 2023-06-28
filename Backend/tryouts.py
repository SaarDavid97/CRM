import os
from datetime import datetime, timedelta
import django
from django.db import connection
import pandas as pd
from prophet import Prophet
from prophet.plot import plot_plotly
from prophet.diagnostics import cross_validation, performance_metrics
import matplotlib.pyplot as plt

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "CRM_backend.settings")
django.setup()


# from tasks.models import History
# from clients.models import Client


def get_client_history(client):
    history = """
    SELECT CAST(julianday(date(date)) / 14 as INTEGER) - 175592       as ds,
           SUM(case when category = 'PM' then 1 else 0 end)           as pm,
           SUM(case when category = 'Repair' then 1 else 0 end)       as repair,
           SUM(case when category = 'Installation' then 1 else 0 end) as installation
    FROM tasks_history
    WHERE client_id = %s
    GROUP BY ds
    ORDER BY ds ASC

    """

    with connection.cursor() as cursor:
        cursor.execute(history, [client])
        rows = cursor.fetchall()

    # create a dataframe out of the returned table from the query and convert the dates back to a date format
    df = pd.DataFrame(rows, columns=['ds', 'y', 'repair', 'installation'])
    df['ds'] = pd.to_datetime("2018-06-28") + pd.to_timedelta(df['ds'] * 14, unit='D')

    return df


def get_prediction(df, periods):
    m = Prophet()

    # assuming that the number of PM tasks is influenced by the number of installation and repair tasks
    m.add_regressor('repair')
    m.add_regressor('installation')

    try:
        m.fit(df)

        # Create future dataframe for 6 months with frequency of 2 weeks
        future = m.make_future_dataframe(periods=periods, freq='14D')

        # Assume repair and installation tasks stay the same as the last available data point
        future['repair'] = df['repair'].iloc[-1]
        future['installation'] = df['installation'].iloc[-1]

        # Predict
        forecast = m.predict(future)
        prediction = forecast['yhat'].tail(periods)
        prediction = list(prediction.apply(lambda x: max(0, round(x))))

        return prediction

    except ValueError:
        return [0] * periods

def predict_tasks(client, periods):
    get_logo = """
    SELECT logo
    FROM clients_client
    WHERE name = %s
    """

    # get the client's logo from the clients table
    with connection.cursor() as cursor:
        cursor.execute(get_logo, [client])
        logo = cursor.fetchall()[0][0]

    # get the predicted number of tasks for each two weeks period
    df = get_client_history(client)
    prediction = get_prediction(df, periods)

    # prepare the cards in the format the frontend is expecting
    prediction = [{'logo': logo, 'client': client, 'num_of_tasks': x} for x in prediction]
    return prediction


def collect_predictions(periods):
    get_names = """
        SELECT DISTINCT client_id
        FROM tasks_history
        """

    # get the names of all the clients
    with connection.cursor() as cursor:
        cursor.execute(get_names)
        names = cursor.fetchall()

    clients = [x[0] for x in names]

    # construct a list of all the predictions for all of the clients
    predictions = []
    for client in clients:
        predictions.append(predict_tasks(client, periods))

    return predictions



