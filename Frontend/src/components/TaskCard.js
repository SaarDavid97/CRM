import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import ElapsedTimeDisplay from './ElapsedTimeDisplay'

// assign colors by status
function getColor(status) {
    let color
    switch (status) {
        case 'Done':
            color = 'rgb(133, 222, 119)'
            break
        case 'In Progress':
            color = 'rgb(255, 255, 150)'
            break
        case 'Pending':
            color = 'rgb(254, 128, 140)'
            break
    }
    return color
}

export default function TaskCard({task, setDeletedItem}) {
    return (
        <div className='task-card'>
            <div className='card-color' style={{backgroundColor: getColor(task.status), width: '1px'}}></div>
            <p>{task.title}</p>
            <p>{task.client}</p>
            <p style={{width: '450px'}}>{task.category}</p>
            <p style={{width: '580px'}}>{task.status}</p>
            <ElapsedTimeDisplay date={task.date}/>
            <EditButton link={`/task/${task.id}`}/>
            <DeleteButton collection='tasks' id={task.id} setDeletedItem={setDeletedItem}
                          client={task.client} category={task.category} date={task.date}/>
        </div>
    )
}