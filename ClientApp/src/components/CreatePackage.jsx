import { Button, Dialog, DialogContent, Grid, Hidden, IconButton, InputAdornment, makeStyles, TextField, MenuItem } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import loadingGif from "../assets/img/loading.gif"
import { createPackage, updatePackage } from '../services/package.services'
import MyAutocomplete from './MyAutocomplete'
import axios from 'axios'


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
        backgroundImage: 'linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%)'
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

//#region getData



//#endregiongetData
const CreatePackage = ({
    data, setData,
    formData, SetFormData,
    openPopup, setOpenPopup,//Del PopUP
    recolocaEditItem,
    cargaData, showLoading = () => { }
}) => {

    const classes = useStyle()

    //#region STATE
    const [services, setServices] = useState([])
    const [loadingServices, setLoadingServices] = useState(false)

    const [serviceToAdd, setServiceToAdd] = useState('TRANSFER')

    //#endregion STATE


    //#region useEffect

    useEffect(() => {

        
        // switch (serviceToAdd) {
        //     case 'TRANSFER':
                
        //         break;
        
        //     default:
        //         break;
        // }
        axios
            .get('https://jsonplaceholder.typicode.com/comments')
            .then(value => {

                console.log(value)
            })
    }, [])

    //#endregion useEffect


    //#region columnServices

    const columnServices = [
        {
            name: 'Quitar',
            grow: 0,
            cell: row => <IconButton style={{ margin: '0 5px', backgroundColor: 'white' }}
                size="small" title='Quitar Servicio' color="secondary"
                variant="contained"
                onClick={e => {
                    if (window.confirm("¿Seguro que desea Borrar este ítem?"))
                        // handleDelete(data)
                        window.alert('BORRADO')
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
        setOpenPopup(false)
        showLoading()


        if (data.length === 0) //Si ningun Dato 
            setData([formData])
        else//Ya hay datos
            setData(data.concat(formData))



        if (formData.id) {// Editing Package....

            updatePackage(formData.id, formData).then(() => { cargaData() })
        }
        else { //creating Package
            createPackage(formData).then(() => { cargaData() })
        }



    }
    //#endregion SAVEDATA

    //#region handleShowService

    const handleShowService = (d) => {
        alert('VER ', d)
    }

    //#endregion handleShowService

    return (
        <Dialog disableBackdropClick disableEscapeKeyDown
            open={openPopup} maxWidth={'lg'} fullWidth
            classes={{ paper: classes.dialogWrapper }}>

            <IconButton classes={{ root: classes.closeIcon }}
                onClick={() => {
                    if (formData.id)
                        recolocaEditItem()
                    setOpenPopup(false)
                }} >
                <CloseIcon />
            </IconButton>

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
                            value={formData.name || ''} fullWidth
                            onChange={e => { SetFormData({ ...formData, name: e.target.value }) }} />
                    </Grid>




                    <Grid item xs={6} md={2}>

                        <Button color="secondary" fullWidth
                            variant="contained"

                            onClick={() => { saveData() }} >
                            <Hidden xsDown >
                                Vender</Hidden>
                            <SaveAltIcon />
                        </Button>

                    </Grid>

                    <Grid item xs={6} md={2}>

                        <Button color="primary" fullWidth
                            variant="contained"
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

                    <Grid item xs={12} sm={3}>
                        <TextField
                            select
                            size="small"
                            label="Seleccione"
                            variant="outlined"
                            value={serviceToAdd}
                            onChange={(e) => { setServiceToAdd(e.target.value) }}
                            helperText="Servicio a Agregar"
                        >

                            <MenuItem value='TRANSFER'>
                                Traslado
                                </MenuItem>
                            <MenuItem value='HOTEL'>
                                Alojamiento
                                </MenuItem>
                            <MenuItem value='EXCURSION'>
                                Excursión
                                </MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <MyAutocomplete />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <Button color="primary" fullWidth
                            variant="contained"

                            onClick={() => { saveData() }} >

                            Agregar
                            <SaveAltIcon />
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <TextField
                            label={'Precio Total'} variant="outlined" size="small"
                            value={0} readOnly fullWidth
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
                        columns={useMemo(() => columnServices, [columnServices])}
                        data={services}
                        keyField={'id'}
                        defaultSortField={'id'}
                        defaultSortAsc={false}
                        pagination
                        highlightOnHover
                        dense
                        noHeader
                        onRowClicked={useCallback(handleShowService, [handleShowService])}
                        responsive
                        noDataComponent={loadingServices ? <img src={loadingGif} width='20px' alt='' /> : <div><h3>Agregue algunos servicios por favor</h3></div>}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Filas por Pagina:',
                            rangeSeparatorText: 'de'
                        }}
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
                        theme="tableTheme"
                    />
                </div>
                {
                    //#endregion DATATABLE
                }

            </DialogContent>
        </Dialog>

    )


}
export default CreatePackage