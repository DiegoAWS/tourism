import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, Button, Hidden } from '@material-ui/core'


import CloseIcon from '@material-ui/icons/Close'
import SaveAltIcon from '@material-ui/icons/SaveAlt'


const useStyle = makeStyles((theme) => ({

    dialogWrapper: {
        padding: theme.spacing(2),
        backgroundImage: 'linear-gradient(315deg, #9ccdff 0%, #a9c6e6 74%)',

    }
}))


const Popup = ({ title, children, maxWidth, openPopup, saveData,discardData }) => {




    const classes = useStyle()

    return (

        <Dialog
            disableBackdropClick
            disableEscapeKeyDown


            open={openPopup}

            maxWidth={maxWidth ? maxWidth : 'md'}
            fullWidth
            classes={{ paper: classes.dialogWrapper }}>


            <DialogTitle>
                <div style={{ display: 'flex' }}>

                    <Typography variant="h6" component="div" style={{ flexGrow: 1, textAlign: 'center' }}>{title}</Typography>


                    <Button
                        color="primary"
                        variant="contained"
                        style={{ margin: '10px' }}
                        onClick={() => { saveData() }} >
                        <Hidden xsDown >
                            Guardar</Hidden>
                        <SaveAltIcon />
                    </Button>

                    <Button
                        color="secondary"
                        style={{ margin: '10px' }}
                        onClick={() => {

discardData()
                           
                        }} >
                        <CloseIcon />

                    </Button>

                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )

}
export default Popup