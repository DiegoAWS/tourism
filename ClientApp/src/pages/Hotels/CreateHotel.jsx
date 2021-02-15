import React from 'react'
import { TextField, Grid, InputAdornment } from '@material-ui/core'
import es from 'date-fns/locale/es'


import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { createHotel, updateHotel } from '../services/hotel.services'
import { dateToString, stringToDate } from '../../helpers/timeConverter'

import Popup from '../../components/Popup'

registerLocale('es', es)
setDefaultLocale('es')


const CreateHotel = ({

    data, setData,
    formData, SetFormData,

    openPopup, setOpenPopup,//Del PopUP
    recolocaEditItem,
    cargaData, showLoading = () => { }
}) => {





    const saveData = () => {
        setOpenPopup(false)
        showLoading()


        if (data.length === 0) //Si ningun Dato 
            setData([formData])
        else//Ya hay datos
            setData(data.concat(formData))



        if (formData.id) {// Editing Hotel....

            updateHotel(formData.id, formData).then(() => { cargaData() })
        }
        else { //creating Hotel
            createHotel(formData).then(() => { cargaData() })
        }



    }

    //#region return
    const CustomDateInputStart = React.forwardRef(({ value, onClick }, ref) => (<TextField ref={ref} label='Fecha y Hora Llegada' variant="outlined" margin='normal' size="small" value={value} fullWidth onClick={onClick} />))

    const CustomDateInputEnd = React.forwardRef(({ value, onClick }, ref) => (<TextField ref={ref} label='Fecha y Hora de Salida ' variant="outlined" margin='normal' size="small" value={value} fullWidth onClick={onClick} />))


    return (

        <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}


            title={(formData.id) ? 'Editar Hotel' : 'Crear Hotel'}

            recolocaEditItem={recolocaEditItem}
            saveData={saveData}>

            <Grid container spacing={3}>
                {
                    //#region Campos Principales
                }

                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Nombre del Hotel'} variant="outlined" margin='normal' size="small"
                        value={formData.title || ''} fullWidth
                        onChange={e => { SetFormData({ ...formData, title: e.target.value }) }} />

                </Grid>

                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Ubicación'} variant="outlined" margin='normal' size="small"
                        value={formData.placement || ''} fullWidth
                        onChange={e => { SetFormData({ ...formData, placement: e.target.value }) }} />

                </Grid>

                <Grid item xs={12} sm={12} lg={4}>

                    <TextField label={'Información de Contacto'} variant="outlined" margin='normal' size="small"
                        value={formData.contact || ''} fullWidth
                        onChange={e => { SetFormData({ ...formData, contact: e.target.value }) }} />

                </Grid>


                <Grid item xs={12} sm={12} lg={4}>

                    <DatePicker
                        selected={stringToDate(formData.startTime)}
                        onChange={date => { SetFormData({ ...formData, startTime: dateToString(date) }) }}
                        showTimeInput
                        timeInputLabel="Hora:"
                        withPortal

                        showMonthDropdown
                        showYearDropdown
                        dateFormat="dd/MM/yyyy hh:mm"
                        todayButton="Hoy"
                        customInput={<CustomDateInputStart />}
                    />

                </Grid>


                <Grid item xs={12} sm={12} lg={4}>

                    <DatePicker
                        selected={stringToDate(formData.endTime)}
                        onChange={date => { SetFormData({ ...formData, endTime: dateToString(date) }) }}
                        showTimeInput
                        timeInputLabel="Hora:"
                        withPortal

                        showMonthDropdown
                        showYearDropdown
                        dateFormat="dd/MM/yyyy hh:mm"
                        todayButton="Hoy"
                        customInput={<CustomDateInputEnd />}
                    />

                </Grid>

                <Grid item xs={12} >

                    <TextField label={'Precio'} variant="outlined" margin='normal' size="small"
                        value={formData.price || ''} fullWidth tipe="number"
                        onChange={e => { SetFormData({ ...formData, price: e.target.value }) }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />

                </Grid>

            </Grid>



        </Popup>


    )
    //#endregion

}
export default CreateHotel