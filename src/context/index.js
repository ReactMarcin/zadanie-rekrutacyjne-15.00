import React, { createContext, useReducer, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const reducer = (state,action) => {
    console.log(state, ' state')
    if(action.type === toString(state.id)){
        return action.payload
    }
    else if(action.type === 'NOT-FOUND'){
        return action.payload
    }else{
        return state
    }
}

const saveStateToLocalStorage = state => {
    try{
        localStorage.setItem('current-value', JSON.stringify(state))
    }catch(err){
        console.log(err)
    }
}

export const CurrentCompanyContenxt = createContext()

const CurrentValueContext = ({ children }) => {

    const [ company, dispatch ] = useReducer(reducer, null, () => {
        const value = localStorage.getItem('current-value')
        return value ? JSON.parse(value) : null
    })

    useEffect(() => {
        saveStateToLocalStorage(company)
    },[company])

    return(
        <React.Fragment>
            <CurrentCompanyContenxt.Provider value={{ company, dispatch }}>
                {children}
            </CurrentCompanyContenxt.Provider>
        </React.Fragment>
    );
}
export default CurrentValueContext