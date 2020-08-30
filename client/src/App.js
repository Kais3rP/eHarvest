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
import { useSelector, useDispatch } from 'react-redux';
import { fetchOfferItems } from './slices/shopSlice';
import { useEffect } from 'react';




export default function () {
    const isCartOpen = useSelector( state => state.shop.isCartOpen);
    const dispatch = useDispatch();
    useEffect( ()=>{
    dispatch(fetchOfferItems());
    })
    return (
        <Router>
            <AppWrapper>
            
                <Header />
                { isCartOpen ? <Cart position={0}/> : <Cart position={'-500px'}/> }
                <Switch>
                    <Route path="/gallery" >
                        
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