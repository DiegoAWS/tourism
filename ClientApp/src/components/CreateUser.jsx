import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { register } from '../services/auth.services'

import loadingGif from "../assets/img/loading.gif";

import bgImage from "../assets/img/beachPict.jpg"

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',

        display: 'flex',
        height: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        justifyContent: 'center',
        alignItems: 'center',

    },
    paper: {
        borderRadius: '15px',
        padding:'20px',
        backgroundColor: '#b8d8ff75',
        maxWidth: '450px',
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function CreateUser( history) {
    const classes = useStyles();

    const [role, setRole] = useState('USER')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const roles = [

        {
            value: 'USER',
            label: 'Vendedor',
        },
        {
            value: 'ADMIN',
            label: 'Administrador',
        },
    ]

    const registerHandler = () => {
        if (loading) return;

        setLoading(true)

        if (password.length < 1 || password !== confPassword) {
            setLoading(false)
            setError(true)

            setTimeout(() => {
                setPassword('')
                setConfPassword('')
                setError(false)
            }, 2000)

            return
        }
        const user = {
            role,
            username,
            password
        }
        register(user).then((res) => {

          
            if (res?.status === 200) {

               

                window.location.replace(window.location.origin);


            } else {
                setRole('USER')
                setUsername('')
                setPassword('')
                setConfPassword('')
                setLoading(false)
            }
        }).catch(() => {
            setLoading(false)
        })
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registrar Usuario
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Rol de Usuario"
                                value={role}
                                onChange={(e) => { setRole(e.target.value) }}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Please select your currency"
                                variant="outlined"
                            >
                                {roles.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Nombre de Usuario"
                                type="text"
                                autoComplete="current-password"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Contraseña"
                                type="password"
                                autoComplete="current-password"
                                error={error}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Repetir Contraseña"
                                type="password"
                                autoComplete="current-password"
                                error={error}
                                value={confPassword}
                                onChange={(e) => { setConfPassword(e.target.value) }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={registerHandler}
                        className={classes.submit}
                    >
                        {loading ? (
                            <img
                                style={{ width: "20px" }}
                                src={loadingGif}
                                alt="loading"
                            />
                        ) : (
                                <span> Registrar</span>

                            )}
                    </Button>
                </form>
            </div>

        </Container>
    );
}