import {createContext, useEffect, useState} from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }, [])

    function login() {
        const token = localStorage.getItem('token')
        if (token) {
            setIsAuthenticated(true)
        }
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login}}>
            {children}
        </AuthContext.Provider>
    )
}

