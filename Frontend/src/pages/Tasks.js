import React, {useEffect, useState} from 'react'
import TaskCard from '../components/TaskCard'
import {useNavigate} from 'react-router-dom'
import {getCollection} from '../dbFunctions'

export default function Tasks() {

    const navigate = useNavigate()
    // tasks is a state so the page will be updated when the tasks fetched
    const [tasks, setTasks] = useState([])
    // set a state to keep track of when tasks are deleted
    const [deletedItem, setDeletedItem] = useState(false)

    useEffect(() => {
        async function getTasks() {
            const items = await getCollection('tasks')
            if(!Array.isArray(items)) {
                navigate('/login')
            }
            setTasks(items)
        }
        getTasks()
    }, [])


    useEffect(() => {
        setTasks(
            tasks.filter(task => task.id !== deletedItem)
        )
    }, [deletedItem])



    // when the user changes his selections the page will rerender and display only relevant tasks
    const [statuses, setStatuses] = useState({
        'Pending': true,
        'In Progress': true,
        'Done': true
    })

    function handleChange(event) {
        setStatuses({
            ...statuses,
            [event.target.value]: event.target.checked,
        })
    }

    return (
        <div className='tasks-page'>
            <div className='tasks-top'>
                <h1>Tasks</h1>
                <div className='tasks-options'>
                    <fieldset>
                        <legend>Filter Statuses</legend>
                        {/*create a field for each status*/}
                        {['Pending', 'In Progress', 'Done'].map(status =>  (
                            <>
                                <input
                                    type='checkbox'
                                    id={status}
                                    value={status}
                                    checked={statuses[status]}
                                    onChange={handleChange}
                                />
                                <label htmlFor={status}>{status}</label>
                                <br/>
                            </>
                        ))}
                    </fieldset>
                    <button className='add-item' onClick={() => navigate('/task')}>Add a new task</button>
                    <button onClick={() => navigate('/tasks/predicted')}>Predicted Tasks</button>
                </div>
            </div>
            <div className='item-container'>
                {/*divide the tasks by status*/}
                {tasks && (
                    (() => {
                        // Create a Set of unique existing statuses
                        const existingStatuses = new Set(tasks.map(task => task.status))

                        // Filter statuses to include only those that exist in existingStatuses
                        return Object.keys(statuses)
                            .filter(status => statuses[status] && existingStatuses.has(status))
                            .map((status, statusIndex) => (
                                <div key={statusIndex}>
                                    <h3>{status}</h3>
                                    {tasks
                                        .filter((task) => task.status === status)
                                        .map((filteredTask, _index) => (
                                            <TaskCard
                                                key={filteredTask.id}
                                                task={filteredTask}
                                                setDeletedItem={setDeletedItem}
                                            />
                                        ))}
                                </div>
                            ))
                    })()
                )}
            </div>
        </div>
    )
}
