import React, {useRef, useState} from 'react'
import PredictionCard from '../components/PredictionCard'
import {getPredictions} from '../dbFunctions'

export default function PredictedTasks() {
    const [predictions, setPredictions] = useState([])
    const periods = useRef(0)


    async function handleSubmit(e) {
        e.preventDefault()
        const items = await getPredictions(periods.current)
        setPredictions(items)
    }


    function handleChange(event) {
        periods.current = (parseInt(event.target.value, 10))
    }

    // calculate dates and return them and dd/mm format
    function getStartDate(periods) {
        let date = new Date()
        date.setDate(date.getDate() + 1 + periods * 14)
        date = new Intl.DateTimeFormat('en-GB', {day: '2-digit', month: '2-digit'}).format(date)

        return date
    }

    function getEndDate(periods) {
        let date = new Date()
        date.setDate(date.getDate() + (periods + 1) * 14)
        date = new Intl.DateTimeFormat('en-GB', {day: '2-digit', month: '2-digit'}).format(date)

        return date
    }

    return (
        <div className='predictions-page'>
            <div className='predictions-top'>
                <h1>Predicted PM tasks</h1>
                <form className='predictions-form'>
                    <label htmlFor='periods'>How many weeks ahead would you like to predict?</label>
                    <br/>
                    <select id='periods' onChange={handleChange}>
                        <option value='' disabled selected>Select your option</option>
                        <option value={1}>2 weeks</option>
                        <option value={2}>4 weeks</option>
                        <option value={3}>6 weeks</option>
                        <option value={4}>8 weeks</option>
                        <option value={5}>10 weeks</option>
                    </select>
                    <button className='predict-button' onClick={handleSubmit}>Predict</button>
                </form>
            </div>
            <div className='item-container'>
                {/*the len of the array is determined by 'periods', divide predictions to periods*/}
                {[...Array(periods.current)].map((_, i) => (
                    <div key={i}>
                        <h3>{getStartDate(i)} - {getEndDate(i)}</h3>
                        {predictions.map((prediction, _index) => (
                            <PredictionCard
                                prediction={prediction[i]}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
