import {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../AuthContext'

export default function Login() {
    const navigate = useNavigate()
    const {login} = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: username, password: password})
            }
            const url = `http://localhost:8000/login/`
            const response = await fetch(url, requestOptions)
            const item = await response.json()
            if (item.access) {
                localStorage.setItem('token', item.access)
                login()
                console.log('Logged in successfully')
            }
        } catch (error) {
            console.error('Error:', error)
        }
        navigate('/tasks')
    }


    return (
        <div className='login-container'>
            <form onSubmit={handleLogin} className='login-form'>
                <label htmlFor='username'>Username</label>
                <input
                    id='username'
                    type='username'
                    onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                />
                <input type='submit' value='Login'/>
            </form>
        </div>
    )
}
