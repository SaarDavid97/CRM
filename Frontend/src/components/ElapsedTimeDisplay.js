export default function ElapsedTimeDisplay({date}) {

    const now = new Date()
    const added = new Date(date)
    const days = Math.floor((now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24))

    return (
        <div className='elapsed-time'>
            <p>Added</p>
            <p>{days}</p>
            <p>days ago</p>
        </div>
    )
}