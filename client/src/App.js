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
import {setWindowSize, toggleHeaderMobile, toggleCart } from './slices/uiSlice';
import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { IconContext } from "react-icons";


 

export default function () {

    const isCartOpen = useSelector(state => state.ui.isCartOpen);
    const isHeaderModalOpen = useSelector(state => state.ui.isHeaderModalOpen);
    const isHeaderMobileOpen = useSelector ( state => state.ui.isHeaderMobileOpen);
    const windowSize = useSelector( state => state.ui.windowSize);
    const dispatch = useDispatch();

    useEffect(() => {
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
            <AppWrapper>
                { (windowSize.width>768 && windowSize.height>500) ? <Header /> 
                     : 
                     <IconContext.Provider value={{ style: { display: 'inline', color: 'grey', zIndex:5, position: 'fixed', left:0 } }}  >
                     <FaBars size={50} onClick={()=>{
                         if (isCartOpen) dispatch(toggleCart());
                         dispatch(toggleHeaderMobile())}}/>
                     </IconContext.Provider>}
                {isHeaderMobileOpen ? (windowSize.width<768 || windowSize.height<500) ? <HeaderMobile position={0}/> : <HeaderMobile position={'-500px'}/> : <HeaderMobile position={'-500px'}/>}
                {isHeaderModalOpen ? <HeaderModal position={'100px'} /> : <HeaderModal position={'-220px'} />}
                {isCartOpen ? <Cart position={0} /> : <Cart position={'-500px'} />}
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
            </AppWrapper>
        
    )
}

const AppWrapper = styled.div`
${flexColSpace};
width:100vw;
min-height:100vh;
margin:0;
overflow:hidden;
`