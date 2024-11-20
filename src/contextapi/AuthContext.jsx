import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

export const logContext = createContext()

function AuthContext({ children }) {

    useEffect(() => {
        checklogstatus()
    }, [])

    const checklogstatus = () => {
        if (sessionStorage.getItem('token')) {
            setlogstatus(true)
        }
        else {
            setlogstatus(false)
        }
    }

    const [logstatus, setlogstatus] = useState(false)

    return (
        <>
            <logContext.Provider value={{ logstatus, setlogstatus }}>
                {children}
            </logContext.Provider>
        </>
    )
}

export default AuthContext