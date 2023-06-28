import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {getItem, saveItem, updateItem} from '../dbFunctions'

export default function TaskPage() {

    const {id} = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        status: 'Pending',
    })

    // load task's details so we can display them if we're editing
    useEffect(() => {
        async function getTask() {
            // if id is null then we are adding a task, we're editing one if it's not
            if (id) {
                const task = await getItem(id, 'tasks')
                setFormData(task)
            }
        }
        getTask()
    }, [])


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            id ? await updateItem(id, formData, 'tasks') : await saveItem(formData, 'tasks')
            navigate('/tasks')
        } catch (error) {
            if(window.confirm('This client is not in the DB and the task will not be saved.')){
                navigate('/tasks')
            }
            else {
                return
            }
        }
        navigate('/tasks')
    }


    function handleChange(e) {
        console.log('Changing...')
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className='add-task'>
            <h1>{id ? 'Edit task' : 'Add task'}</h1>
            <form onSubmit={handleSubmit} className='task-form'>
                <label htmlFor='title'>Title</label>
                <input
                    id='title'
                    name='title'
                    type='text'
                    onChange={handleChange}
                    required={true}
                    value={formData.title}
                />
                <label htmlFor='client'>Client</label>
                <input
                    id='client'
                    name='client'
                    type='text'
                    onChange={handleChange}
                    required={true}
                    value={formData.client}
                />
                <label htmlFor='category'>Category</label>
                <select
                    id='category'
                    name='category'
                    onChange={handleChange}
                    required={true}
                    value={formData.category}
                >
                    <option value='' disabled selected>--Choose category--</option>
                    <option selected={formData.status === 'PM'} value='PM'>PM</option>
                    <option selected={formData.status === 'Repair'} value='Repair'>Repair</option>
                    <option selected={formData.status === 'Installation'} value='Installation'>Installation</option>
                </select>
                <label htmlFor='status'>Status</label>
                <select
                    id='status'
                    name='status'
                    onChange={handleChange}
                    value={formData.status}
                >
                    <option selected={formData.status === 'Pending'} value='Pending'>Pending</option>
                    <option selected={formData.status === 'In Progress'} value='In Progress'>In Progress</option>
                    <option selected={formData.status === 'Done'} value='Done'>Done</option>
                </select>

                <input type='submit'/>
            </form>
        </div>
    )
}
