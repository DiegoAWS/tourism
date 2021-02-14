import React, { useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import CubaPict from '../assets/img/cubatodo.jpg'
import { login } from "../services/auth.services";
import loadingGif from "../assets/img/loading.gif";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${CubaPict})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'left',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Landing({ history }) {
    const classes = useStyles();

    const init = {
        username: "",
        password: "",
        showLoading: false,
        inputError: false,
        accediendo: false,
    };

    const [state, setState] = useState(init)


    const loginHandler = () => {
        if (state.accediendo) return;

        setState({ ...state, accediendo: true });

        if (state.username.length === 0 || state.password.length < 1) {
            errorHandler();
            return;
        }

        const user = {
            username: state.username,
            password: state.password,
        };



        login(user).then((res) => {

            if (res && res.status && res.status === 200) {

                history.push("/dashboard");

            } else {
                errorHandler();
            }
        }).catch(()=>{
            errorHandler();
        })
    }

    const errorHandler = () => {
        setState({ ...state, inputError: true });

        setTimeout(() => {
            setState(init);
        }, 2000);
    };

    const keyHandler = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            loginHandler(e);
        }
    };


    if (localStorage.getItem('usertoken')) {
        history.push('/dashboard')
        return null
    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Buro de Turismo
          </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Usuario"
                            autoFocus
                            autoComplete="user"
                            error={state.inputError}
                            value={state.username}
                            onChange={(e) => { setState({ ...state, username: e.target.value }) }}
                            onKeyDown={keyHandler}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Contraseña"
                            type="password"
                            autoComplete="current-password"
                            error={state.inputError}
                            value={state.password}
                            onChange={(e) => { setState({ ...state, password: e.target.value }) }}
                            onKeyDown={keyHandler}
                        />
                        <Button
                            onClick={() => { loginHandler() }}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {state.accediendo ? (
                                <img
                                    style={{ width: "20px" }}
                                    src={loadingGif}
                                    alt="loading"
                                />
                            ) : (
                                    <span> Entrar</span>

                                )}

                        </Button>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.linkedin.com/in/diego-escobar-755638202/">
                Diego Escobar
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
