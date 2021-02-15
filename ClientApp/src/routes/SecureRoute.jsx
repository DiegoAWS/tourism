import React from 'react'
import { withRouter, Route } from 'react-router-dom'



import { getProfile, logout } from '../services/auth.services'

const SecureRoute = ({ path, roles, component: Component, history }) => {


    if (!localStorage.token || !localStorage.username || !localStorage.role) {

        history.push('/')
        logout()
        return null
    }
    else {

        //Redireccion Inmediata si no existe algun Token

        getProfile().then((response) => {



            if (
                response 
                && response.data
                && response.data.username === localStorage.username
                && response.data.role === localStorage.role
                && roles.includes(response.data.role)
            ) {

                // All OK
                // console.log('Ruta ', path, ' Acceso Garanted a ', response.data.username)


            }
            else {

                history.push('/')
            }

        })
            .catch((err) => {
                logout()
            })


    }

    return <Route exact path={path} render={(props) => (<Component  {...props} />)} />


}
export default withRouter(SecureRoute)