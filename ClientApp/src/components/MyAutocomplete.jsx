import React, { useState,useRef} from 'react'

import {TextField, IconButton } from '@material-ui/core'
import Autocomplete, {
    createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import AddIcon from "@material-ui/icons/Add";


export default function MyAutocomplete() {
const [datalist, setDatalist] = useState([])
const [servicioSeleccionado, setservicioSeleccionado] = useState(null)
const [serviceSearchText, setServiceSearchText] = useState('')


const filterDatos = createFilterOptions({
    stringify: (option) => option.title ,
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
                size="small"
                autoComplete
                clearOnBlur
                fullWidth
                noOptionsText=""
                clearText="Limpiar Cliente"
                options={datalist}
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
                            // cargaDatosClienteSel(
                            //     filtered[0].id
                            // );
                            // setClienteSeleccionado(filtered[0]);
                        }, 500);
                    }
                    return filtered;
                }}
                value={servicioSeleccionado}
                onChange={(e, newValue) => {
                    setservicioSeleccionado(newValue);

                    // if (newValue && newValue.id) {
                    //     cargaDatosClienteSel(newValue.id);
                    // } else {
                    //     clearClienteSeleccionado();
                    // }
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
                        // className={classes.nombreProducto}
                        inputRef={inputRef}
                        {...params}
                        label="Seleccione Servicio"
                        variant="outlined"
                    />
                )}
            />

            <IconButton
                onClick={(e) => {
                    // setClienteSeleccionado(null);
                    // setFormDataAddCliente(initFormAddCliente);
                    // setOpenFormAddCliente(true);
                }}
                title="Añadir Cliente"
                color="secondary"
                size="medium"
                variant="contained"
            >
                <AddIcon />
            </IconButton>
        </div>
    )
}
