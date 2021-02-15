import React, { useState, useEffect, useRef } from 'react'
import { getAllPackage, deletePackage } from '../services/package.services'
import CreateHotel from './CreateHotel'



import { Button } from '@material-ui/core'

import ContactMailIcon from '@material-ui/icons/ContactMail'
import AddIcon from '@material-ui/icons/Add'
import Datatable from '../../components/Datatable'


const Hotels = props => {



    //#region  CONST's ----------------------------------


    const [openPopup, setOpenPopup] = useState(false)

    const [sinDatos, SetSinDatos] = useState(false)
    const [data, setData] = useState([]) //Data de la tabla




    //#region  campos  Hotel----------------------------------

    const camposHotel = [

        ['title', 'Nombre del Hotel'],
        ['placement', 'Ubicación'],
        ['startTime', 'Fecha y Hora de Entrada'],
        ['endTime', 'Fecha y Hora de Salida'],
        
        ['contact', 'Información de Contacto'],
        ['stops', 'Paradas'],
        ['price', 'Precio'],
    ]
    //#endregion campos Hotel



    //#region  Inicializing the Form ----------------------------------




    var formInit = {}



    //#endregion Inicializing the Form
    const [formData, SetFormData] = useState(formInit)



    const editingValue = useRef({})



    //#endregion CONST's

    // eslint-disable-next-line
    useEffect(() => { cargaData() }, [])



    //#region  CRUD API ----------------------------------

    const cargaData = () => {

        clearform()

        getAllPackage()
            .then(request => {

                if (request && request.data && request.data[0] && request.data[0].id) {

                    var newData = request.data.map(dataRequested => {

                        let instantData = {}

                        camposHotel.forEach(item => {
                            instantData[item[0]] = (!dataRequested[item[0]]) ? "" : dataRequested[item[0]]
                        })

                        return { ...instantData, id: dataRequested.id }

                    })


                    setData(newData)
                }
                if (request && request.statusText === 'OK' && request.data && request.data.length === 0)
                    SetSinDatos(true)

            })
    }

    const editData = (item) => {

        editingValue.current = item

        var temp = data.filter(it => it.id !== item.id)


        setData(temp)

        SetFormData(item)
        setOpenPopup(true)



    }

    const deleteData = (itemDelete) => {


        setData(data.filter(it => it.id !== itemDelete.id))

        clearform()

        deletePackage( itemDelete.id)
            .then(() => {
                cargaData()

            })
    }



    //#endregion CRUD API



    //#region  Others Functions ----------------------------------

    const clearform = () => {

        editingValue.current = {}
        SetFormData(formInit)

    }
    const recolocaEditItem = () => {
        setData(data.concat(editingValue.current))
    }
    //#endregion Others Functions




    //#region  Return ----------------------------------




    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                <div>
                    <Button style={{ margin: '10px' }} variant="contained" color="primary"
                        startIcon={<AddIcon />}
                        endIcon={<ContactMailIcon />}
                        onClick={() => { clearform(); setOpenPopup(true) }} > Añadir Hotel </Button>

                </div>
            </div>

            <Datatable data={data}

                sinDatos={sinDatos}
                SetSinDatos={SetSinDatos}
                campos={camposHotel}
                responsive
                handleDelete={deleteData}
                handleEdit={editData} />

            <CreateHotel
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}

                formData={formData}
                SetFormData={SetFormData}

                data={data}
                setData={setData}

                recolocaEditItem={recolocaEditItem}
                cargaData={cargaData}
            />

        </>
    )

    //#endregion Return

}
export default Hotels