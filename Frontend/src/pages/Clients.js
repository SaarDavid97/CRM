import ClientCard from '../components/ClientCard'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {getCollection} from '../dbFunctions'

export default function Client() {

    const navigate = useNavigate()
    // clients is a state so the page will be updated when the clients fetched
    const [clients, setClients] = useState([])
    // set a state to keep track of when clients are deleted
    const [dataChanged, setDeletedItem] = useState(false)


    useEffect(() => {
        async function getClients() {
            const items = await getCollection('clients')
            if(!Array.isArray(items)) {
                navigate('/login')
            }
            setClients(items)
        }
        getClients()
    }, [dataChanged])


    return (
        <div className='clients-page'>
            <div className='clients-list'>
                <h1>Clients</h1>
                <button className='add-item' onClick={() => navigate('/client')}>Add a new client</button>
            </div>
                <div className='item-container'>
                    {clients.map((client) => (
                        <ClientCard
                            key={client.id}
                            client={client}
                            setDeletedItem={setDeletedItem}
                        />
                    ))}
                </div>
        </div>
    )
}
