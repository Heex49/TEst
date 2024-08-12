import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import axios from 'axios';

const RickyCard = () => {
    const [data, setdata] = useState([])
    const [ldata, setlastdata] = useState([])
    function CardData() {
        axios.get("https://rickandmortyapi.com/api/character")
            .then((res) => {
                // console.log(res.data.results)
                setdata(res.data.results)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    function lastdata() {
        axios.get("https://rickandmortyapi.com/api/episode")
            .then((ldata) => {
                console.log(ldata.data.results)
                setlastdata(ldata.data.results)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    CardData()
    lastdata()
    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Container sx={{ backgroundColor: 'rgb(32, 35, 41)', width: '100%' }} maxWidth='xxl'>
                    {
                        data.map((el, i) => (
                            <Box sx={{ paddingTop: '100px', display: 'flex' }}>
                                <Box className='card'>
                                    <Box>
                                        <img src={el.image} alt="" style={{ height: '240px' }} />
                                    </Box>
                                    <Box className='card-content' sx={{ justifyContent: 'flex-start' }}>
                                        <Box className='header'>
                                            <h2 style={{ fontSize: '1.5rem', color: 'white', paddingLeft: '2%', marginBottom: '0' }}>{el.name}</h2>
                                        </Box>
                                        <Box className='status'>
                                            <span><FiberManualRecordIcon style={{ color: 'rgb(185 178 178)', fontSize: '14px', marginLeft: '10%', marginTop: '50%' }} /></span>
                                            <span style={{ color: 'white', fontSize: '18px', marginLeft: '1%' }}>{el.status}-{el.species}</span>
                                        </Box>
                                        <Box className='section' sx={{ marginTop: '20px' }}>
                                            <span style={{ color: 'rgb(158, 158, 158)', marginTop: '15px', marginLeft: '3%' }}>Last Known Location:</span><br />
                                            <a href="" style={{ color: 'white', textDecoration: 'none', marginLeft: '3%', fontSize: '18px' }}>{el.origin.name}</a>
                                        </Box>
                                        {
                                            ldata.map((ld, index) => (
                                                <Box className='section' sx={{ marginTop: '20px' }}>
                                                    <span style={{ color: 'rgb(158, 158, 158)', marginTop: '15px', marginLeft: '3%' }}>Frist seen in:</span><br />
                                                    <a href="" style={{ color: 'white', textDecoration: 'none', marginLeft: '3%', fontSize: '18px' }}>{ld.name}</a>
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        ))
                    }
                </Container>
            </React.Fragment>
        </>
    )
}

export default RickyCard
