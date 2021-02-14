import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { logout } from "../services/auth.services";
import { withRouter } from 'react-router-dom';
import { Modal } from '@material-ui/core';
import CreateUser from './CreateUser';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
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
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Buro de Turismo
          </Typography>
                    <div>
                        <span>{localStorage.getItem('userName')}</span>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
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
                            }}>Crear Usuario</MenuItem>
                            <MenuItem onClick={logoutHandler}>Cerrar Sesión</MenuItem>
                        </Menu>
                    </div>

                </Toolbar>
            </AppBar>
            <Modal
                open={openModal}
                onClose={()=>{setOpenModal(false)}}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            <div>
                  <CreateUser controlModal={setOpenModal}/>
            </div>
               
           
              
            </Modal>
        </div>
    );
}

export default withRouter(Navbar)