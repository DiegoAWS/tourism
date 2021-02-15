import React, { useState } from 'react'
import { TextField, Grid, InputAdornment } from '@material-ui/core'

import 'react-datepicker/dist/react-datepicker.css'


import { dateToString } from '../../helpers/timeConverter'

import Popup from '../../components/Popup'



const CreateSales = ({


    data, setData,

    openPopup, setOpenPopup,

    packageItem

}) => {
    const initForm = {
        "id": 0,
        "title": packageItem.title,
        "startTime": dateToString(new Date()),
        "dateSale": dateToString(new Date()),
        "agency": "",
        "client": "",
        "country": "",
        "descCoupon": "",
        "descPercent": 10,
        "amountPeopol": 0,
        "totalPrice": packageItem.price,
        "finalPrive": 0

    }

    const [formData, setFormData] = useState(initForm)
    const [error, setError] = useState(false)



    const saveData = () => {

        if (!formData.title || !formData.price) {

            setError(true)

            setTimeout(() => {
                setError(false)
            }, 2000)
            return
        }






        setOpenPopup(false)


        setFormData(initForm)

    }

    const discardData = () => {
        setFormData(initForm)
        setOpenPopup(false)
    }

    //#region return


    return (

        <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}


            title={'Venta'}
            discardData={discardData}

            saveData={saveData}>

            <Grid container spacing={3}>
                {
                    //#region Campos Principales
                }

                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Nombre de la Excursión'} variant="outlined" margin='normal' size="small"
                        value={formData.title} fullWidth required only
                    />

                </Grid>


        "finalPrive": 0

                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Agencia'} variant="outlined" margin='normal' size="small"
                        value={formData.agency || ''} fullWidth required error={error}
                        onChange={e => { setFormData({ ...formData, agency: e.target.value }) }} />

                </Grid>


                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Nombre del Cliente'} variant="outlined" margin='normal' size="small"
                        value={formData.client || ''} fullWidth required error={error}
                        onChange={e => { setFormData({ ...formData, client: e.target.value }) }} />

                </Grid>


                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Pais'} variant="outlined" margin='normal' size="small"
                        value={formData.country || ''} fullWidth required error={error}
                        onChange={e => { setFormData({ ...formData, country: e.target.value }) }} />

                </Grid>

                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Cantidad de Personas'} variant="outlined" margin='normal' size="small"
                        value={formData.amountPeopol || ''} fullWidth
                        onChange={e => { setFormData({ ...formData, amountPeopol: e.target.value }) }} />

                </Grid>



                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Cupon de Descuento'} variant="outlined" margin='normal' size="small"
                        value={formData.country || ''} fullWidth
                        onChange={e => { setFormData({ ...formData, country: e.target.value }) }} />

                </Grid>




                <Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Información de Contacto'} variant="outlined" margin='normal' size="small"
                        value={formData.offers || ''} fullWidth
                        onChange={e => { setFormData({ ...formData, offers: e.target.value }) }} />

                </Grid>



                < Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Precio'} variant="outlined" margin='normal' size="small"
                        value={formData.price || ''} fullWidth tipe="number"
                        onChange={e => { setFormData({ ...formData, price: e.target.value }) }} type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />

                </Grid>
                < Grid item xs={12} sm={6} lg={4}>

                    <TextField label={'Total Final'} variant="outlined" margin='normal' size="small"
                        value={formData.totalPrice + formData.totalPrice / 10} fullWidth tipe="number"
                        type="number"
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
export default CreateSales