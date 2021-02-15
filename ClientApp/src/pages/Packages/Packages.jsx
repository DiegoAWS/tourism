import React, { useState, useEffect, useRef } from 'react'
import { getAll, deleteItem } from '../../services/api.services'
import CreatePackage from './CreatePackage'



import { Button } from '@material-ui/core'

import ContactMailIcon from '@material-ui/icons/ContactMail'
import AddIcon from '@material-ui/icons/Add'
import Datatable from '../../components/Datatable'
import Navbar from '../../components/Navbar'

const Packages = props => {



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
        camposPaquete.concat(['userId', 'Creado por'])
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

        getAll('Package')
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

        deleteItem(itemDelete.id, 'package')
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                <div>
                    <Button style={{ margin: '10px' }} variant="contained" color="primary"
                        startIcon={<AddIcon />}
                        endIcon={<ContactMailIcon />}
                        onClick={() => { clearform(); setOpenPopup(true) }} > Añadir Paquete </Button>

                </div>
            </div>

            <Datatable data={data}

                sinDatos={sinDatos}
                SetSinDatos={SetSinDatos}
                campos={camposPaquete}
                responsive
                handleDelete={deleteData}
                handleEdit={editData} />

            <CreatePackage
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                clearform={clearform}
                formData={formData}
                setFormData={setFormData}

                data={data}
                setData={setData}

                recolocaEditItem={recolocaEditItem}
                cargaData={cargaData}
            />

        </>
    )

    //#endregion Return

}
export default Packages