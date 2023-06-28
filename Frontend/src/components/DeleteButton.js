import {deleteItem, saveItem} from '../dbFunctions'


export default function DeleteButton({collection, id, setDeletedItem, client, category, date}) {

    async function deleteClient(id) {
        if (window.confirm('If you delete this client, ' +
            'all the related tasks will also be deleted.\nDo you want to continue?')) {
            await deleteItem(id, collection)
            // change the state so the clients page will rerender and won't display the deleted client
            setDeletedItem(id)
        }
    }

    // if the item is a task, save it in history (only relevant fields) and then delete it from tasks
    async function deleteTask(id) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            const historyTask = {
                client: client,
                category: category,
                date: date
            }
            await saveItem(historyTask, 'tasks/history')
            await deleteItem(id, collection)
            // change the state so the tasks page will rerender and won't display the deleted task
            setDeletedItem(id)
        }
    }

    return (
        <div className='delete-button-container'>
            <div onClick={() => {
                collection === 'clients' ? deleteClient(id) : deleteTask(id)
            }} className='delete-button'>
                🗑
            </div>
        </div>
    )
}
