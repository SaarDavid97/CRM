import LogoDisplay from './LogoDisplay'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

export default function clientCard({client, setDeletedItem}) {
    return (
        <div className='client-card'>
            <LogoDisplay logo={client.logo}/>
            <h4>{client.name}</h4>
            <EditButton link={`/client/${client.id}`}/>
            <DeleteButton collection='clients' id={client.id} setDeletedItem={setDeletedItem}/>
        </div>
    )
}
