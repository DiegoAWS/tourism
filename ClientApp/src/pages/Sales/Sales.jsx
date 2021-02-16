import React, { useState, useEffect} from 'react'
import { getAll, deleteItem } from '../../services/api.services'

import Datatable from '../../components/Datatable'
import Navbar from '../../components/Navbar'

const Sales = () => {



    //#region  CONST's ----------------------------------

    const [sinDatos, SetSinDatos] = useState(false)
    const [data, setData] = useState([]) //Data de la tabla




    //#region  campos  Paquete----------------------------------

    const camposPaquete = [

        ['title', 'Nombre del Paquete'],
        ['client','Nombre del Cliente'],
        ['price', 'Precio Total']
    ]

    if (localStorage.role === "ADMIN")
        camposPaquete.concat(['nameSalesMan', 'Creado por'])
    //#endregion campos Paquete


  
    //#endregion CONST's

    // eslint-disable-next-line
    useEffect(() => { cargaData() }, [])



    //#region  CRUD API ----------------------------------

    const cargaData = () => {

       

        getAll('Sale')
            .then(response => {
                if (response && response.data && response.data[0] && response.data[0].id) {



                    setData(response.data)
                }
                if (response && response.status === 200 && response.data && response.data.length === 0)
                    SetSinDatos(true)

            })
    }


    const deleteData = (itemDelete) => {


        setData(data.filter(it => it.id !== itemDelete.id))


        deleteItem(itemDelete.id, 'Sale')
            .then(() => {
                cargaData()

            })
    }



    //#endregion CRUD API



    


    //#region  Return ----------------------------------




    return (
        <>
        <Navbar/>
            
<h2>Historial de Ventas</h2>
            <Datatable data={data}

                sinDatos={sinDatos}
                SetSinDatos={SetSinDatos}
                campos={camposPaquete}
                responsive
                handleDelete={deleteData}
                handleEdit={()=>{}} />

        
        </>
    )

    //#endregion Return

}
export default Sales