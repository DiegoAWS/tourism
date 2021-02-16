import React, { useState, useEffect, useRef } from 'react'
import { getAll, deleteItem } from '../../services/api.services'

import Datatable from '../../components/Datatable'
import Navbar from '../../components/Navbar'

const Sales = props => {



    //#region  CONST's ----------------------------------


    const [openPopup, setOpenPopup] = useState(false)

    const [sinDatos, SetSinDatos] = useState(false)
    const [data, setData] = useState([]) //Data de la tabla




    //#region  campos  Paquete----------------------------------

    const camposPaquete = [

        ['title', 'Nombre del Paquete'],
        ['price', 'Precio Total'],
    ]

    if (localStorage.role === "ADMIN")
        camposPaquete.concat(['nameSalesMan', 'Creado por'])
    //#endregion campos Paquete



    //#region  Inicializing the Form ----------------------------------




    var formInit = {
        id: null,
        title: '',
        transfers: [],
        hotels: [],
        excursions: [],
        price: 0
    }



    //#endregion Inicializing the Form
    const [formData, setFormData] = useState(formInit)



    const editingValue = useRef({})



    //#endregion CONST's

    // eslint-disable-next-line
    useEffect(() => { cargaData() }, [])



    //#region  CRUD API ----------------------------------

    const cargaData = () => {

        clearform()

        getAll('Sale')
            .then(response => {
                if (response && response.data && response.data[0] && response.data[0].id) {



                    setData(response.data)
                }
                if (response && response.status === 200 && response.data && response.data.length === 0)
                    SetSinDatos(true)

            })
    }

    const editData = (item) => {

        editingValue.current = item

        var temp = data.filter(it => it.id !== item.id)


        setData(temp)

        setFormData(item)
        setOpenPopup(true)



    }

    const deleteData = (itemDelete) => {


        setData(data.filter(it => it.id !== itemDelete.id))

        clearform()

        deleteItem(itemDelete.id, 'Sale')
            .then(() => {
                cargaData()

            })
    }



    //#endregion CRUD API



    //#region  Others Functions ----------------------------------

    const clearform = () => {

        editingValue.current = {}
        setFormData(formInit)

    }
    const recolocaEditItem = () => {
        setData(data.concat(editingValue.current))
    }
    //#endregion Others Functions




    //#region  Return ----------------------------------




    return (
        <>
        <Navbar/>
            

            <Datatable data={data}

                sinDatos={sinDatos}
                SetSinDatos={SetSinDatos}
                campos={camposPaquete}
                responsive
                handleDelete={deleteData}
                handleEdit={editData} />

        
        </>
    )

    //#endregion Return

}
export default Sales