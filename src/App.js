import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import styled from 'styled-components';
import Header from './components/Header';
import MidSection from './components/MidSection';
import Footer from './components/Footer';
import Cart from './components/Cart';



export default function () {
    return (
        <Router>
            <AppWrapper>
                <Header />
                <Switch>
                    <Route path="/cart" >
                        <Cart />
                    </Route>
                    <Route path="/" >
                        <MidSection />
                    </Route>
                </Switch>
                <Footer />
            </AppWrapper>
        </Router>
    )
}

const AppWrapper = styled.div`
display:flex;
flex-direction:column;
justify-content: space-between;
align-items: center;
align-items: center;
width:100vw;
min-height:100vh;
background:pink;
margin:0;
overflow:hidden;
`