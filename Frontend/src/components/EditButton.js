import {Link} from 'react-router-dom'

export default function EditButton({ link }) {
    return (
        <div className='edit-button-container'>
            <Link to={link} id='link' className='edit-button'>
                <h4>✎</h4>
            </Link>
        </div>
    )
}

