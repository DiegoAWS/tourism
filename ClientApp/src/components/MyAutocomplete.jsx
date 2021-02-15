import React, { useState, useRef } from 'react'

import { TextField, IconButton } from '@material-ui/core'
import Autocomplete, {
    createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import AddIcon from "@material-ui/icons/Add";

import loadingGif from '../assets/img/loading.gif';


export default function MyAutocomplete({
    options, servicioSeleccionado,
    loading,
    setservicioSeleccionado, AddService, serviceTitle

}) {


    const [serviceSearchText, setServiceSearchText] = useState('')


    const filterDatos = createFilterOptions({
        stringify: (option) => option.title,
    });


    //#region useBlur :)
    const useBlur = () => {
        const htmlElRef = useRef(null);
        const setBlur = () => {
            htmlElRef.current && htmlElRef.current.blur();
        };

        return [htmlElRef, setBlur];
    };


    const [inputRef, setInputRef] = useBlur();

    //#endregion


    return (
        <div style={{ display: "flex" }}>
            <Autocomplete
                disabled={loading}
                size="small"
                autoComplete
                clearOnBlur
                fullWidth
                noOptionsText=""
                clearText="Limpiar Cliente"
                options={options}
                filterOptions={(options, params) => {
                    let filtered = filterDatos(
                        options,
                        params
                    );

                    if (
                        filtered.length === 1 &&
                        filtered[0] &&
                        filtered[0].id
                    ) {
                        setTimeout(() => {
                            setInputRef();

                            setservicioSeleccionado(filtered[0]);
                        }, 500);
                    }
                    return filtered;
                }}
                value={servicioSeleccionado}
                onChange={(e, newValue) => {
                    setservicioSeleccionado(newValue);
                }}
                getOptionSelected={(option, value) => {
                    return option.title === value.title;
                }}
                inputValue={serviceSearchText}
                onInputChange={(event, newInputValue) => {
                    setServiceSearchText(newInputValue);
                }}
                getOptionLabel={(option) =>
                    option && option.title ? option.title : ""
                }
                renderOption={(option) => (
                    <h4> {option.title}</h4>
                )}
                renderInput={(params) => (
                    <TextField
                        inputRef={inputRef}
                        {...params}
                        label="Seleccione Servicio"
                        variant="outlined"
                    />
                )}
            />

            <IconButton
                onClick={(e) => {
                    AddService()
                }}
                disabled={!servicioSeleccionado}
                title={'Crear ' + serviceTitle}
                color="secondary"
                size="small"
                variant="contained"
            >
                {!loading ? <AddIcon />
                    : <img src={loadingGif} width='20px' alt='' />}
            </IconButton>
        </div>
    )
}
