import React, { useState } from 'react'
import { TextField, Grid, InputAdornment } from '@material-ui/core'
import es from 'date-fns/locale/es'
import isBefore from 'date-fns/isBefore'

import { nanoid } from 'nanoid'

import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


import { dateToString, stringToDate } from '../../helpers/timeConverter'

import Popup from '../../components/Popup'

registerLocale('es', es)
setDefaultLocale('es')


const CreateExcursion = ({


    data, setData,

    openPopup, setOpenPopup


}) => {
    const initForm = {
        title: '',
        destination: '',
        infoDestination: '',
        offers:'',

        startTime: dateToString(new Date()),
        endTime: dateToString(new Date()),

        price: 0
    }

    const [formData, setFormData] = useState(initForm)
    const [error, setError] = useState(false)
    const [timeError, setTimeError] = useState(false)


    const saveData = () => {

        if (!formData.title || !formData.price) {

            setError(true)

            setTimeout(() => {
                setError(false)
            }, 2000)
            return
        }
    

        if (isBefore(stringToDate(formData.endTime), stringToDate(formData.startTime))) {

            setTimeError(true)
            setTimeout(() => {
                setTimeError(false)
                setFormData({
                    ...formData,
                    startTime: dateToString(new Date()),
                    endTime: dateToString(new Date())
                })

            }, 2000)
            return
        }



        setOpenPopup(false)

        setData([...data, { ...formData, keyField: nanoid(), serviceType: 'EXCURSION' }])
        setFormData(initForm)

    }

    const discardData = () => {
        setFormData(initForm)
        setOpenPopup(false)
    }

    //#region return
    const CustomDateInputStart = React.forwardRef(({ value, onClick }, ref) => (<TextField ref={ref} label='Fecha y Hora Llegada' error={timeError} variant="outlined" margin='normal' size="small" value={value} fullWidth onClick={onClick} />))

    const CustomDateInputEnd = React.forwardRef(({ value, onClick }, ref) => (<TextField ref={ref} label='Fecha y Hora de Salida ' error={timeError} variant="outlined" margin='normal' size="small" value={value} fullWidth onClick={onClick} />))


    return (

        <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}


            title={'Crear Excursión'}
            discardData={discardData}

            saveData={saveData}>

            <Grid container spacing={3}>
                {
                    //#region Campos Principales
                }

                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Nombre de la Excursión'} variant="outlined" margin='normal' size="small"
                        value={formData.title || ''} fullWidth required error={error}
                        onChange={e => { setFormData({ ...formData, title: e.target.value }) }} />

                </Grid>

                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Destinación'} variant="outlined" margin='normal' size="small"
                        value={formData.destination || ''} fullWidth
                        onChange={e => { setFormData({ ...formData, destination: e.target.value }) }} />

                </Grid>
                <Grid item xs={12} >

                    <TextField label={'Información del Destino'} variant="outlined" margin='normal' size="small"
                        value={formData.infoDestination || ''} fullWidth
                        onChange={e => { setFormData({ ...formData, infoDestination: e.target.value }) }} />

                </Grid>

                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Información de Contacto'} variant="outlined" margin='normal' size="small"
                        value={formData.offers || ''} fullWidth
                        onChange={e => { setFormData({ ...formData, offers: e.target.value }) }} />

                </Grid>


                <Grid item xs={12} sm={6} lg={4}>

                    <DatePicker
                        selected={stringToDate(formData.startTime)}
                        onChange={date => { setFormData({ ...formData, startTime: dateToString(date) }) }}
                        showTimeInput
                        timeInputLabel="Hora:"
                        withPortal
                        minDate={new Date()}
                        showMonthDropdown
                        showYearDropdown
                        dateFormat="dd/MM/yyyy HH:mm"
                        todayButton="Hoy"
                        customInput={<CustomDateInputStart />}
                    />

                </Grid>


                <Grid item xs={12} sm={6} lg={4}>

                    <DatePicker
                        selected={stringToDate(formData.endTime)}
                        onChange={date => { setFormData({ ...formData, endTime: dateToString(date) }) }}
                        showTimeInput
                        timeInputLabel="Hora:"
                        withPortal
                        minDate={stringToDate(formData.startTime)}

                        showMonthDropdown
                        showYearDropdown
                        dateFormat="dd/MM/yyyy HH:mm"
                        todayButton="Hoy"
                        customInput={<CustomDateInputEnd />}
                    />

                </Grid>

                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Precio'} variant="outlined" margin='normal' size="small"
                        value={formData.price || ''} fullWidth tipe="number" required error={error}
                        onChange={e => { setFormData({ ...formData, price: e.target.value }) }} type="number"
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
export default CreateExcursion