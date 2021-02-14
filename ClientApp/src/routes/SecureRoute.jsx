import React from 'react'
import { withRouter, Route } from 'react-router-dom'



import { getProfile, logout } from '../services/auth.services'

const SecureRoute = ({ path,roles, component: Component, history }) => {


    if (!localStorage.usertoken||!localStorage.userName||!localStorage.userRole) { 

        localStorage.removeItem('userName')
        localStorage.removeItem('userRole')
        history.push('/')
        return null
    }
    else{

    //Redireccion Inmediata si no existe algun Token

    getProfile().then((response) => {

        if (response && response.data && response.data.name === localStorage.userName
            && response.data.email === localStorage.userRole && 
            roles[0]==="ADMIN"// TODO verificar roles vs Nivel de Acceso Real
        ) {

            // All OK
            console.log('Ruta ', path, ' Acceso Garanted a ', response.data.name)


        }
        else {

            logout()
        }

    })
        .catch((err) => {
            logout()
        })

    }

    return <Route exact path={path} render={(props) => (<Component  {...props} />)} />


}
export default withRouter(SecureRoute)