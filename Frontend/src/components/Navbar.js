import logo from '../images/logo.jpeg'
import {useNavigate} from 'react-router-dom'


export default function Navbar() {

    const navigate = useNavigate()

    function handleSignout() {
        localStorage.removeItem('token')
        console.log('Signed Out')
        navigate('/login')
    }


    return (
        <nav>
            <div className='logo-container'>
                <img src={logo} alt='logo'/>
            </div>
            <div className='controls-container'>
                <button onClick={() => navigate('/tasks')}>Tasks</button>
                <button onClick={() => navigate('/clients')}>Clients</button>
                <button className='signout-button' onClick={handleSignout}>Sign Out</button>
            </div>
        </nav>
    )
}
