import React from 'react'
// import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import MainTabs from './MainTabs'

export default function Dashboard() {
    return (

        <div>
        <Navbar />
           
            <hr />
        
            <MainTabs/>
        </div>
    )
}
