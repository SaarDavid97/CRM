import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import {useState, useEffect, createContext, useContext} from 'react'


import Navbar from './components/Navbar'
import Clients from './pages/Clients'
import Tasks from './pages/Tasks'
import ClientPage from './pages/ClientPage'
import TaskPage from './pages/TaskPage'
import Login from './components/Login'
import PredictedTasks from './pages/PredictedTasks'
import {AuthContext} from './AuthContext'


export const UserContext = createContext()

export default function App() {

    const { isAuthenticated } = useContext(AuthContext)
    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        document.title = 'CRM - Saar David';
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        setToken(token)
    }, [isAuthenticated])

    function ProtectedRoutes() {
        return (
            <Routes>
                <Route index element={<Tasks/>}/>
                <Route path='clients' element={<Clients/>}/>
                <Route path='tasks' element={<Tasks/>}/>
                <Route path='client' element={<ClientPage/>}/>
                <Route path='task' element={<TaskPage/>}/>
                <Route path='client/:id' element={<ClientPage/>}/>
                <Route path='task/:id' element={<TaskPage/>}/>
                <Route path='tasks/predicted' element={<PredictedTasks/>}/>
            </Routes>
        )
    }

    return (
        <div className='App'>
            <UserContext.Provider value={token}>
                <Router>
                    <Navbar/>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/*' element={token ? <ProtectedRoutes /> : <Navigate to='/login' />} />
                    </Routes>
                </Router>
            </UserContext.Provider>
        </div>
    )
}


