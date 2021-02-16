import React, { useState, useEffect } from 'react'


import { Button, Dialog, DialogContent, Grid, Hidden, IconButton, InputAdornment, makeStyles, TextField } from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import AddIcon from '@material-ui/icons/Add';
import DataTable, { createTheme } from 'react-data-table-component'


import { getOneToMany, createItem, updateItem } from '../../services/api.services'


import CreateHotel from './CreateHotel'
import CreateTransfer from './CreateTransfer'
import CreateExcursion from './CreateExcursion'

import loadingGif from '../../assets/img/loading.gif'

//#region makeStyle
const useStyle = makeStyles((theme) => ({
    dialogRoot: {
        padding: '0 15px',
        '&:first-child': {
            padding: '0 15px'
        }
    },
    closeIcon: {
        backgroundColor: '#ff828266',
        color: 'red',
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 2,
        transition: 'all ease 0.5s',
        '&:hover': {
            color: 'white',
            backgroundColor: 'red'
        }
    },
    dialogWrapper: {
        padding: theme.spacing(2),
        backgroundImage: 'linear-gradient(315deg, #9ccdff 0%, #a9c6e6 74%)'
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        'whiteSpace': 'nowrap',
        fontSize: '2rem',
        height: '100%'
    },
    dataTableContainer: {
        borderRadius: '10px',
        padding: '5px',
        backgroundColor: 'white'
    }
}))

//#endregion makeStyle

const CreatePackage = ({
    data, setData, clearform,
    formData, setFormData,
    openPopup, setOpenPopup,//Del PopUP
    cargaData, recolocaEditItem
}) => {

    const classes = useStyle()

    //#region STATE
    const [hotels, setHotels] = useState([])
    const [hotelsOpen, setHotelsOpen] = useState(false)

    const [transfers, setTransfers] = useState([])
    const [transfersOpen, setTransfersOpen] = useState(false)

    const [excursions, setExcursions] = useState([])
    const [excursionsOpen, setExcursionsOpen] = useState(false)

    const [loadingTable, setLoadingTable] = useState(false)

    //#endregion STATE


    //#region useEffect

    useEffect(() => {


        if (!!formData?.id) {

            setLoadingTable(true)

            getOneToMany(formData.id, 'Transfer')
                .then(respT => {
                    if (respT?.data && respT.status === 200)
                        setTransfers(respT.data)

                    getOneToMany(formData.id, 'Hotel')
                        .then(respH => {
                            if (respH?.data && respH.status === 200)
                                setHotels(respH.data)

                            getOneToMany(formData.id, 'Excursion')
                                .then(respE => {
                                    if (respE?.data && respE.status === 200)
                                        setExcursions(respE.data)

                                    setLoadingTable(false)
                                })
                        })
                })



        }


    }, [formData?.id])

    //#endregion




    //#region columnServices

    const columnServices = [
        {
            name: 'Quitar',
            grow: 0,
            cell: row => <IconButton style={{ margin: '0 5px', backgroundColor: 'white' }}
                size="small" title='Quitar Servicio' color="secondary"
                variant="contained"
                onClick={e => {
                    if (window.confirm("¿Seguro que desea Quitar este ítem?")) {
                        switch (row.serviceType) {
                            case 'EXCURSION':
                                setExcursions(excursions.filter(item => item.keyField !== row.keyField))
                                break;
                            case 'TRANSFER':
                                setTransfers(transfers.filter(item => item.keyField !== row.keyField))
                                break;
                            case 'HOTEL':
                                setHotels(hotels.filter(item => item.keyField !== row.keyField))
                                break;
                            default:
                                break;
                        }

                    }
                }}>
                <DeleteForeverIcon />
            </IconButton>

        },
        {
            minWidth: '100px',
            grow: 1,
            name: 'Nombre',
            selector: 'title',
            sortable: true
        },
        {
            minWidth: '100px',
            name: 'Inicio',
            selector: 'startTime',
            sortable: true
        },
        {
            minWidth: '100px',
            name: 'Fin',
            selector: 'endTime',
            sortable: true,
            hide: "md"
        },
        {
            minWidth: '100px',
            name: 'Precio',
            selector: 'price',
            sortable: true
        }

    ]




    //#endregion columnServices

    //#region CreateTheme
    createTheme('tableTheme', {
        text: {
            primary: '#268bd2',
            secondary: '#2aa198',
        },
        background: {
            default: 'transparent',
        },

        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        striped: {
            default: 'black',
            text: 'white',
        },
        highlightOnHover: {
            default: '#ebebeb',
            text: 'rgba(0, 0, 0, 0.87)',
        },
        divider: {
            default: '#073642',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    })

    //#endregion

    //#region SAVEDATA
    const saveData = () => {



        const dataOK = {
            title: formData.title,
            price: formData.price,
            excursions,
            hotels,
            transfers
        }

        if (data.length === 0) //If there is no Packages
            setData([dataOK])
        else//If we have packages
            setData(data.concat(dataOK))



        if (formData.id) {// Editing Package....

            updateItem(formData.id, { ...dataOK, id: formData.id }, 'package').then(() => { cargaData() })
        }
        else { //creating Package
            createItem(dataOK, 'package').then(() => { cargaData() })
        }
        setOpenPopup(false)
        setHotels([])
        setTransfers([])
        setExcursions([])
        clearform()


    }
    //#endregion SAVEDATA


    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={openPopup} maxWidth={'lg'} fullWidth
            classes={{ paper: classes.dialogWrapper }}>
            <IconButton classes={{ root: classes.closeIcon }} onClick={() => {
                formData.id && recolocaEditItem()
                setOpenPopup(false)
                setHotels([])
                setTransfers([])
                setExcursions([])
                clearform()

            }} >  <CloseIcon /> </IconButton>
            <DialogContent classes={{ root: classes.dialogRoot }}>
                {
                    //#region DialogTitle
                }
                <Grid container alignItems='center' spacing={2}>



                    <Grid item xs={12} md={3} >
                        <div className={classes.dialogTitle}>
                            {(formData.id) ? 'Editar Paquete' : 'Crear Paquete'}
                        </div>

                    </Grid>

                    <Grid item xs={12} md={5} >
                        <TextField label={'Nombre del Paquete'} variant="outlined" size="small"
                            value={formData.title || ''} fullWidth required
                            onChange={e => { setFormData({ ...formData, title: e.target.value }) }} />
                    </Grid>




                    <Grid item xs={6} md={2}>

                        <Button color="secondary" fullWidth
                            variant="contained"
                            disabled={formData?.title?.length === 0 || (transfers?.length === 0 && hotels?.length === 0 && excursions?.length === 0)}
                            onClick={() => { saveData() }} >
                            <Hidden xsDown >
                                Vender</Hidden>
                            <SaveAltIcon />
                        </Button>

                    </Grid>

                    <Grid item xs={6} md={2}>

                        <Button color="primary" fullWidth
                            variant="contained"
                            disabled={formData?.title?.length === 0 || (transfers?.length === 0 && hotels?.length === 0 && excursions?.length === 0)}
                            onClick={() => { saveData() }} >
                            <Hidden xsDown >
                                Guardar</Hidden>
                            <SaveAltIcon />
                        </Button>

                    </Grid>



                </Grid>
                {
                    //#endregion DialogTitle
                }
                <hr />
                {
                    //#region Campos Añadir
                }
                <Grid container spacing={3}>





                    <Grid item xs={12} sm={6} md={3}>
                        <Button color="primary" fullWidth
                            variant="contained"
                            onClick={() => { setHotelsOpen(true) }} >
                            <AddIcon />
                             Alojamiento

                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button color="primary" fullWidth
                            variant="contained"
                            onClick={() => { setTransfersOpen(true) }} >
                            <AddIcon />
                             Traslado

                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Button color="primary" fullWidth
                            variant="contained"
                            onClick={() => { setExcursionsOpen(true) }} >
                            <AddIcon />
                             Excursión
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} >
                        <TextField
                            label={'Precio Total'} variant="outlined" size="small"
                            value={formData.price} readOnly fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }} />
                    </Grid>






                </Grid>
                {
                    //#endregion Campos Principales
                }

                {
                    //#region DATATABLE
                }
                <div className={classes.dataTableContainer}>


                    <DataTable
                        columns={columnServices}
                        data={[...hotels, ...transfers, ...excursions]}
                        keyField={'keyField'}
                        defaultSortField={'startTime'}
                        defaultSortAsc={false}
                        pagination
                        highlightOnHover
                        dense
                        noHeader
                        // onRowClicked={useCallback(handleShowService, [handleShowService])}
                        responsive
                        noDataComponent={loadingTable?  <img src={loadingGif} width='20px' alt='' />:<div><hr /><h3>Sin Resultados que mostrar <sup>*</sup> </h3><hr /></div>}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Filas por Pagina:',
                            rangeSeparatorText: 'de'
                        }}
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 20]}
                        theme="tableTheme"
                    />
                </div>
                {
                    //#endregion DATATABLE
                }
                <CreateHotel
                    data={hotels}
                    setData={setHotels}
                    openPopup={hotelsOpen}
                    setOpenPopup={setHotelsOpen}
                />
                <CreateTransfer
                    data={transfers}
                    setData={setTransfers}
                    openPopup={transfersOpen}
                    setOpenPopup={setTransfersOpen}
                />
                <CreateExcursion
                    data={excursions}
                    setData={setExcursions}
                    openPopup={excursionsOpen}
                    setOpenPopup={setExcursionsOpen}
                />

            </DialogContent>
        </Dialog >

    )


}
export default CreatePackage