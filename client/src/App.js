import React from 'react';
import { flexColSpace } from './styled-components/globalStyles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AuthRoute from './components/AuthRoute';
import styled from 'styled-components';
import Header from './components/Header';
import HeaderMobile from './components/HeaderMobile';
import MidSection from './components/MidSection';
import Footer from './components/Footer';
import Cart from './components/Cart';
import FullShop from './components/FullShop';
import RegLog from './components/RegLog';
import HeaderModal from './components/HeaderModal';
import HowItWorks from './components/HowItWorks';
import Feedbacks from './components/Feedbacks';
import SellForm from './components/SellForm';
import Faq from './components/Faq';
import PrivateArea from './components/PrivateArea';
import Temp404Component from './components/Temp404Component';
import Product from './components/Product';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems } from './slices/shopSlice';
import { isLoggedChecker } from './slices/userSlice';
import {setWindowSize, toggleHeaderMobile, toggleCart } from './slices/uiSlice';
import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { IconContext } from "react-icons";
import MobileIconToggler from "./components/MobileIconToggler";

 

export default function () {

    const isCartOpen = useSelector(state => state.ui.isCartOpen);
    const isHeaderModalOpen = useSelector(state => state.ui.isHeaderModalOpen);
    const isHeaderMobileOpen = useSelector ( state => state.ui.isHeaderMobileOpen);
    const windowSize = useSelector( state => state.ui.windowSize);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(isLoggedChecker());
        dispatch(fetchItems());
        updateWidthAndHeight();
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    }, []);

    const updateWidthAndHeight = () => {
        dispatch(setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        }))
      };

    return (
            <AppWrapperDiv>
                {windowSize.width>768 && windowSize.height>500 ? 
                <Header /> :
                <MobileIconToggler />}              
                <HeaderMobile position={
                    isHeaderMobileOpen ? 
                    windowSize.width<768 || windowSize.height<500 ? 
                    0 : '-500px' : '-500px'}/>                 
                <HeaderModal position={
                    isHeaderModalOpen ? 
                    windowSize.width>768 && windowSize.height>500 ?
                    '100px' : '-220px' : '-220px'} />                                              
                <Cart position={isCartOpen ? 0 : '-500px'} />
                <Switch>
                    <AuthRoute exact path="/fullshop" >
                        <FullShop />
                    </AuthRoute>
                    <AuthRoute exact path="/login" type="guest">
                        <RegLog />
                    </AuthRoute>
                    <AuthRoute exact path="/howitworks" >
                        <HowItWorks />
                    </AuthRoute>
                    <AuthRoute exact path="/feedbacks" >
                        <Feedbacks />
                    </AuthRoute>
                    <AuthRoute exact path="/sell" type="private">
                        <SellForm />
                    </AuthRoute>
                    <AuthRoute exact path="/faq" >
                        <Faq />
                    </AuthRoute>
                    <AuthRoute exact path="/private-area" type="private" >
                        <PrivateArea />
                    </AuthRoute>
                    <AuthRoute exact path="/product/*">
                        <Product />
                    </AuthRoute>
                    <AuthRoute exact path="/" >
                        <MidSection />
                    </AuthRoute>
                    <AuthRoute>
                        <Temp404Component />
                    </AuthRoute>
                </Switch>
                <Footer />
            </AppWrapperDiv>
        
    )
}

const AppWrapperDiv = styled.div`
${flexColSpace};
width:100%;
height:100%;
margin:0;
overflow:hidden;
`