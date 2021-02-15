import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import ShopIcon from '@material-ui/icons/Shop';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import HotelIcon from '@material-ui/icons/Hotel';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

import { logout } from "../services/auth.services";
import { withRouter } from 'react-router-dom';
import { Hidden, Modal, Button } from '@material-ui/core';
import CreateUser from './CreateUser';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },

    nameUser: {
        textAlign: 'right',
        flex: 1
    }
}));

const Navbar = ({ history }) => {

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

        logout().then(() => {

            history.push("/");

        });

    };

    return (
        <div className={classes.root} >
            <AppBar position="static" color='secondary'>
                <Toolbar>
                    <Hidden xsDown>
                        <Typography variant="h6" >
                            Buro de Turismo
                        </Typography>
                    </Hidden>





                    <span className={classes.nameUser}>{localStorage.getItem('username')}</span>
                    <IconButton
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
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
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => {
                            handleClose()
                            setOpenModal(true)
                        }}>Crear Usuario
                        </MenuItem>



                        <MenuItem onClick={() => { history.push('/dashboard') }}><BookmarksIcon /> Principal </MenuItem>

                        <MenuItem onClick={() => { history.push('/sales') }}><ShopIcon /> Historial Ventas </MenuItem>

                        <MenuItem onClick={() => { history.push('/transfers') }}><AirportShuttleIcon /> Transportes </MenuItem>

                        <MenuItem onClick={() => { history.push('/excursions') }}><FilterHdrIcon /> Excursiones</MenuItem>

                        <MenuItem onClick={() => { history.push('/hotels') }}><HotelIcon />  Hoteles</MenuItem>

                        <MenuItem onClick={logoutHandler}>Cerrar Sesión</MenuItem>
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
        </div >
    );
}

export default withRouter(Navbar)