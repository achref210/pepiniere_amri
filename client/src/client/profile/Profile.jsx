import { Container, Divider, Grid } from '@mui/material'
import React from 'react'
import About from './About'
import PurchasesHistory from './PurchasesHistory'
import RequestsList from './RequestsList'
import TypeAnimation from 'react-type-animation';

const Profile = () => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12} lg={3}>
                    <About />
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={8} lg={8}>
                    <div style={{ height: 80 }} />
                    <div style={{ padding: 20 }}>
                        <div style={{ paddingLeft: 140, paddingBottom: 20 }}><Divider >Requests History</Divider></div>
                        <TypeAnimation
                            cursor={false}
                            sequence={['your request is refused ?', 2000, 'you can change on it and we will replay on it.', 1000, 'just a double click in the spicification that you want to change.', 1000]}
                            wrapper="h7"
                        />
                        <RequestsList /></div>
                    <div style={{ padding: 10 }}>
                        <div style={{ paddingLeft: 140, paddingBottom: 20 }}><Divider >Purchases History</Divider></div>
                        <PurchasesHistory /></div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Profile