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


const CreateTransfer = ({


    data, setData,

    openPopup, setOpenPopup


}) => {
    const initForm = {
        title: '',
        carType: 'BUS',

        startTime: dateToString(new Date()),
        endTime: dateToString(new Date()),

        price: 0
    }

    const [formData, setFormData] = useState(initForm)
    const [error, setError] = useState(false)
    const [timeError, setTimeError] = useState(false)

    const carTypes = [
        {
            value: 'AUTO',
            label: 'Auto',
        },
        {
            value: 'TAXI',
            label: 'Taxi',
        },
        {
            value: 'BUS',
            label: 'Bus',
        },
        {
            value: 'MINI',
            label: 'Mini',
        },
    ]


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

        setData([...data, { ...formData, keyField: nanoid(), serviceType: 'HOTEL' }])
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


            title={'Crear Reserva de Traslado'}
            discardData={discardData}

            saveData={saveData}>

            <Grid container spacing={3}>
                {
                    //#region Campos Principales
                }

                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Nombre del Transporte'} variant="outlined" margin='normal' size="small"
                        value={formData.title || ''} fullWidth required error={error}
                        onChange={e => { setFormData({ ...formData, title: e.target.value }) }} />

                </Grid>



                <TextField
                    label={'Tipo de Transporte'} variant="outlined" margin='normal' size="small"
                    value={formData.carType || ''} fullWidth name="totalPrice" type="number"
                    onChange={e => { setFormData({ ...formData, carType: e.target.value }) }}
                    select
                >
                    {carTypes.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>


                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Lugar de Salida'} variant="outlined" margin='normal' size="small"
                        value={formData.startPlace || ''} fullWidth required error={error}
                        onChange={e => { setFormData({ ...formData, startPlace: e.target.value }) }} />

                </Grid>

                <Grid item xs={12} sm={12} lg={4}>

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

                    <TextField label={'Lugar de Llegada'} variant="outlined" margin='normal' size="small"
                        value={formData.endlace || ''} fullWidth required error={error}
                        onChange={e => { setFormData({ ...formData, endPlace: e.target.value }) }} />

                </Grid>

                <Grid item xs={12} sm={12} lg={4}>

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

                <Grid item xs={12} >

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
export default CreateTransfer