import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import axios from "axios";
import '../index.css';
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom"
import { Box, CardHeader, Grid, Typography } from "@mui/material";

const Dashboard = (): any => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchData = () => {
        axios.get(process.env.REACT_APP_API_URL+"/api/booking")
            .then(function (response) {
                setUsers(response.data)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
    const OnClickHandler = () => {
        navigate('/');
    }
    return (
        <div style={{ padding: 30 }}>
            <div className="fh-color fh-size-center"> Dashboard </div>
            <div className="mb">
                <Box
                    m={1}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Button variant="contained" data-testId="add-buuton" color="primary" sx={{ height: 40 }} onClick={OnClickHandler}>
                        ADD
                    </Button>
                </Box>
            </div>
            {users.length == 0 && 
             <div className="fh-color fh-size-center"> No Record Found </div>
            }
            {users.length > 0 &&
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        users.map(item => (

                            <Grid item xs={2} sm={4} md={4} key={item.id} direction="row" justifyContent="flex-start"
                                alignItems="center">

                                <Card sx={{ minWidth: 275 }} key={item.id}>
                                    <CardHeader
                                        style={{ backgroundColor: "rgb(0 97 255 / 7%)" }}
                                        title="Booking Details"
                                        className="fh1-color"
                                        subheader={dateFormat(item.createdate)}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" >
                                            <span className="fh-color">Name :</span> <span className="fs">{item.name}</span>
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <span className="fh-color">Email :</span> <span className="fs">{item.email}</span>
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <span className="fh-color">Country : </span><span className="fs">{item.country}</span>
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <span className="fh-color">No. of Travellers : </span> <span className="fs">{item.numberoftravellers}</span>
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <span className="fh-color">Amount : </span> <span className="fs">$ {item.amount}</span>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>


                        ))
                    }
                </Grid>
            }


        </div >
    )
}
export default Dashboard;
