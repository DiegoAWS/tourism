import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import MenuIcon from '@material-ui/icons/Menu';
import ShopIcon from '@material-ui/icons/Shop';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { logout } from "../services/auth.services";
import { withRouter } from 'react-router-dom';
import { Button, Hidden, Modal } from '@material-ui/core';
import CreateUser from './CreateUser';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },

    nameUser: {
        textAlign: 'right',

    },
    buttonsPlaceholder: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    menuBackground: {
        backgroundColor: '#116fcc'
    }
}));

const theme = createMuiTheme({
    palette: {

        secondary: {
            main: '#116fcc',
        }
    },
});

const Navbar = ({ history,location }) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const [openModal, setOpenModal] = useState(false)

    const open = Boolean(anchorEl);



    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const logoutHandler = (e) => {

        logout()

    };

    return (
        <div className={classes.root} >
            <ThemeProvider theme={theme}>
                <AppBar position="static" color='secondary'>
                    <Toolbar>
                        <Hidden xsDown>
                            <Typography variant="h6" >
                                Buro de Turismo
                        </Typography>
                        </Hidden>

                        <div className={classes.buttonsPlaceholder}>
                            <Hidden xsDown>
                                <Button variant="contained" disabled={location.pathname==='/dashboard'} color="primary" onClick={() => { history.push('/dashboard') }}><BookmarksIcon /> Principal </Button>
                            </Hidden>
                            <Hidden xsDown>
                                <Button variant="contained" disabled={location.pathname==='/sales'} color="primary" onClick={() => { history.push('/sales') }}><ShopIcon /> Historial Ventas </Button>
                            </Hidden>
                         
                        </div>

                        <span className={classes.nameUser}>{localStorage.getItem('username')}</span>
                        <IconButton
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            classes={{ paper: classes.menuBackground }}
                            onClose={handleClose}
                        >

                            <div style={{ color: 'white' }}>



                                <Hidden smUp>
                                    <MenuItem onClick={() => { history.push('/dashboard') }}
                                    disabled={location.pathname==='/dashboard'} 
                                    ><BookmarksIcon /> Principal </MenuItem>
                                </Hidden>

                                <Hidden smUp>
                                    <MenuItem onClick={() => { history.push('/sales') }}
                                    disabled={location.pathname==='/sales'} 
                                    ><ShopIcon /> Historial Ventas </MenuItem>
                                </Hidden>
                                <hr style={{width:'85%'}} />

                                {localStorage.role === "ADMIN" &&
                                    <MenuItem onClick={() => {
                                        handleClose()
                                        history.push('/register')
                                    }}>
                                        <AccountCircle /> Crear Usuario
                                    </MenuItem>
                                }

                                <MenuItem onClick={logoutHandler}><MeetingRoomIcon /> Cerrar Sesión</MenuItem>
                            </div>
                        </Menu>


                    </Toolbar >
                </AppBar >
                <Modal
                    open={openModal}
                    onClose={() => { setOpenModal(false) }}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div>
                        <CreateUser controlModal={setOpenModal} />
                    </div>



                </Modal>
            </ThemeProvider>
        </div >
    );
}

export default withRouter(Navbar)