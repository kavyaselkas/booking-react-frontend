import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Alert, Grid, InputAdornment, MenuItem, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom"
import axios from "axios";
import '../index.css';

const Booking = (): any => {
    const navigate = useNavigate();
    const handleSave = (data) => {
        data.booking.createdby = "user"
        axios.post(process.env.REACT_APP_API_URL+'/api/booking', data)
            .then(function (response) {
                console.log("nter the response", response)
                if (Object.keys(response).length !== 0) {
                    navigate('/dashboard');
                }
            })
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            country: "",
            numberoftravellers: "",
            amount: ""
        },
        validationSchema: yup.object().shape({
            name: yup.string().required("Please enter name"),
            email: yup.string()
                .email("Invalid email address")
                .required("Please enter email"),
            country: yup.string()
                .required("Please enter country"),
            numberoftravellers: yup.string()
                .required("Please enter Number of Traveller")
        }),
        onSubmit: (values) => {
            let data = {
                'booking': values
            }
            console.log(data)
            handleSave(data)
        },
    });
    useEffect(() => {
        var val = 0;
        console.log()
        if (formik.values.country == 'India') {
            val = formik.values.numberoftravellers * 100;
        }
        else if (formik.values.country == 'Africa') {
            val = formik.values.numberoftravellers * 200;
        }
        else {
            val = formik.values.numberoftravellers * 300;
        }
        formik.setFieldValue("amount", val);
    }, [formik.values.numberoftravellers]);
    return (
        <>
        <div className="fh-color fh-size-center"> Booking Travelopia </div>
        <div className="h-center">
            <Grid
                container
                direction="row"
                justifyItems="flex-center"
                className="h-center"
                alignItems="center"
            >
                <Grid  xs={6}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <form onSubmit={formik.handleSubmit}>
                                <Stack m={2} spacing={3}>
                                    <TextField label="Name"
                                        data-testid="name"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name} />
                                    <TextField label="Email Address"
                                        name="email"
                                        data-testid="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email} />
                                    <TextField select label="Country"
                                    data-testid="country"
                                        name="country"
                                        value={formik.values.country}
                                        onChange={formik.handleChange}
                                        error={formik.touched.country && Boolean(formik.errors.country)}
                                        helperText={formik.touched.country && formik.errors.country}>
                                        <MenuItem value="India">India</MenuItem>
                                        <MenuItem value="Africa">Africa</MenuItem>
                                        <MenuItem value="Europe">Europe</MenuItem>
                                    </TextField>
                                    <TextField
                                        label="No. of travellers"
                                        data-testid="no.of travellers"
                                        type="number"
                                        name="numberoftravellers"
                                        value={formik.values.numberoftravellers}
                                        onChange={formik.handleChange}
                                        error={formik.touched.numberoftravellers && Boolean(formik.errors.numberoftravellers)}
                                        helperText={formik.touched.numberoftravellers && formik.errors.numberoftravellers}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        label="Amount"
                                        name="amount"
                                        data-testid="amount"
                                        value={formik.values.amount}
                                        onChange={formik.handleChange}
                                        disabled
                                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                                        helperText={formik.touched.amount && formik.errors.amount}
                                        id="outlined-start-adornment"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                    />
                                    <Button variant="contained" type="submit" data-testid="booking-save">
                                        submit
                                    </Button>
                                </Stack>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
        </>
    )
}
export default Booking;
