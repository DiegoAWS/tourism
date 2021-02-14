import React, { useState, useEffect, useRef } from 'react'
import { getAllPackage, deletePackage } from '../services/package.services'
import CreateTransfer from './CreateTransfer'



import { Button } from '@material-ui/core'

import ContactMailIcon from '@material-ui/icons/ContactMail'
import AddIcon from '@material-ui/icons/Add'
import Datatable from './Datatable'


const Transfers = props => {



    //#region  CONST's ----------------------------------


    const [openPopup, setOpenPopup] = useState(false)

    const [sinDatos, SetSinDatos] = useState(false)
    const [data, setData] = useState([]) //Data de la tabla




    //#region  campos  Transfer----------------------------------

    const camposTransfer = [

        ['title', 'Nombre del Transfer'],
        ['carType', 'Tipo de Transporte'],
        ['startTime', 'Fecha y Hora de Salida'],
        ['endTime', 'Fecha y Hora de Llegada'],
        ['startPlace', 'Lugar de Origen'],
        ['endPlace', 'Lugar de Destino'],
        ['stops', 'Paradas'],
        ['price', 'Precio'],
    ]
    //#endregion campos Transfer



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

                        camposTransfer.forEach(item => {
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
                        onClick={() => { clearform(); setOpenPopup(true) }} > Añadir Transfer </Button>

                </div>
            </div>

            <Datatable data={data}

                sinDatos={sinDatos}
                SetSinDatos={SetSinDatos}
                campos={camposTransfer}
                responsive
                handleDelete={deleteData}
                handleEdit={editData} />

            <CreateTransfer
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
export default Transfers