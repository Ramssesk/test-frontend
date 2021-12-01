import {useState, useEffect, useContext} from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import TestContext from "./TestContext";

const Datos = styled('div')(theme => ({
    width: 'auto',
    padding: '10px',
    backgroundColor: 'pink',
    borderRadius: '2px',
    '& > label': {
        display: 'block',
        margin: '2px',
    }
}));

const Form = styled('div')(theme => ({
    padding: '5px',
    backgroundColor: "#eee",
    borderRadius: '3px'
}));

const Text = styled(TextField)(theme => ({
    margin: '5px 0px',
}));

const FormNombre = ({state, errors, handleChange, register}) => {
    return (
        <>
        <Typography variant="h6">¿Cual es tu nombre?</Typography>
        <Text
            error={errors.nombre && true}
            helperText={errors?.nombre?.message}
            id="outlined-required"
            label="Nombre"
            name="nombre"
            {...register("nombre")}
            onChange={e =>handleChange(e)}
            />
        <Text
            error={errors.segundoNombre && true}
            helperText={errors?.segundoNombre?.message}
            id="outlined-required"
            label="Segundo Nombre"
            name="segundoNombre"
            {...register("segundoNombre")}
            onChange={e =>handleChange(e)}
            />
        <Text
            error={errors.apellidoPaterno && true}
            helperText={errors?.apellidoPaterno?.message}
            id="outlined-required"
            label="Apellido Paterno"
            name="apellidoPaterno"
            {...register("apellidoPaterno")}
            onChange={e =>handleChange(e)}
            />
        <Text
            error={errors.apellidoMaterno && true}
            helperText={errors?.apellidoMaterno?.message}
            id="outlined-required"
            label="Apellido Materno"
            name="apellidoMaterno"
            {...register("apellidoMaterno")}
            onChange={e =>handleChange(e)}
        />
        <Datos>Nombre: {`${state.nombre} ${state.segundoNombre} 
            ${state.apellidoPaterno} ${state.apellidoMaterno}`}</Datos>
        </>
    );
}

const FormDate = ({state, errors, handleChange, register}) => {
    return (
        <>
        <Typography variant="h6">¿Cual es tu Fecha de Nacimiento?</Typography>
        <Text
            error={errors.date && true}
            helperText={errors?.date?.message}
            id="outlined-required"
            type="date"
            name="date"
            {...register("date")}
            onChange={e =>handleChange(e)}
        />
        <Datos>Fecha: {`${state.date}`}</Datos>
        </>
    );
}

const FormContacto = ({state, errors, handleChange, register}) => {
    return (
        <>
        <Typography variant="h6">Datos de Contacto</Typography>
        <Text
            error={errors.email && true}
            helperText={errors?.email?.message}
            id="outlined-required"
            label="Correo electronico"
            name="email"
            type="email"
            {...register("email")}
            onChange={e =>handleChange(e)}
        />
        <Text
            error={errors.telefono && true}
            helperText={errors?.telefono?.message}
            id="outlined-required"
            label="Telefono o celular"
            name="telefono"
            {...register("telefono")}
            onChange={e =>handleChange(e)}
        />
        <Datos>
            <label>Correro Electronico: {state.email}</label>
            <label>Telefono celular: {state.telefono}</label>
        </Datos>
        </>
    );
}


const Test = () => {
    const {
        auth,
        nombre,
        segundoNombre,
        apellidoPaterno,
        apellidoMaterno,
        date,
        email,
        telefono,
        postData,
        handleAuthData,
        handleCloseSession,
    } = useContext(TestContext);

    const [showNext, setShowNext] = useState({nombre: false, date: false, contacto: false})
    const [state, setState] = useState({
        nombre: "",
        segundoNombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        date: "",
        email: "",
        telefono: "",
    });

    const schema = yup.object({
        nombre: yup.string().required("El campo es requerido"),
        segundoNombre: yup.string().required("El campo es requerido"),
        apellidoPaterno: yup.string().required("El campo es requerido"),
        apellidoMaterno: yup.string().required("El campo es requerido"),
        date: yup.string().required("El campo es requerido"),
        email: yup.string().required("El campo es requerido"),
        telefono: yup.string().required("El campo es requerido"),
    }).required();

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    }); 

    const onError = (e) => {
        return console.log(errors)
    }

    const onSubmit = (data, e) => {
        e.preventDefault()
        postData(data)
    };

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
        
        if(state.nombre.length >= 1 && state.segundoNombre.length >= 1 &&
            state.apellidoPaterno.length >= 1 && state.apellidoMaterno.length >= 1){
                setShowNext({...showNext, date: true})
        }
        if(state.date.length >= 1){
                setShowNext({...showNext, contacto: true})
        }
    }
    
    useEffect(() => {
        handleAuthData();
    }, [])

    return (
        <Box flexGrow={1}>
            <Grid container justifyContent="center" alignItems="center" direction="column">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <Grid item container 
                        sx={{width: 320, '& > *': {margin: '5px 0px'}}} 
                        justifyContent="center" alignItems="stretch" direction="column"
                    >
                        <FormNombre state={state} errors={errors} handleChange={handleChange} register={register} />

                        {showNext.nombre && (<FormDate state={state} errors={errors} handleChange={handleChange} register={register} />)}

                        {showNext.date && (<FormContacto state={state} errors={errors} handleChange={handleChange} register={register} />)}

                        <Button type="submit" variant="contained" color="error" endIcon={<SendIcon />}>
                            Iniciar
                        </Button>
                        {auth && (
                            <Datos>
                                <label>Fecha de Nacimineto: {date} </label>
                                <label>Correo Electronico: {email} </label>
                                <label>Telefono celular: {telefono} </label>
                                <label>Nombre: {`${nombre} ${segundoNombre} 
                                ${apellidoPaterno} ${apellidoMaterno}`}</label>
                            </Datos>
                        )}
                    </Grid>
                </form>
            </Grid>
        </Box>
    )
}

export default Test

