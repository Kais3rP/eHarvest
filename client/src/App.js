import React from 'react';
import { flexColSpace } from './styled-components/globalStyles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
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
    }, [dispatch]);

    const updateWidthAndHeight = () => {
        dispatch(setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        }))
      };

    return (
        <Router>
            <AppWrapper>
                {windowSize.width>768 ? <Header /> 
                     : 
                     <IconContext.Provider value={{ style: { display: 'inline', color: 'grey', zIndex:5, alignSelf:'flex-start' } }}  >
                     <FaBars size={50} onClick={()=>{
                         if (isCartOpen) dispatch(toggleCart());
                         dispatch(toggleHeaderMobile())}}/>
                     </IconContext.Provider>}
                {isHeaderMobileOpen ? windowSize.width<768 ? <HeaderMobile position={0}/> : <HeaderMobile position={'-500px'}/> : <HeaderMobile position={'-500px'}/>}
                {isHeaderModalOpen ? <HeaderModal position={'100px'} /> : <HeaderModal position={'-220px'} />}
                {isCartOpen ? <Cart position={0} /> : <Cart position={'-500px'} />}
                <Switch>
                    <Route path="/fullshop" >
                        <FullShop />
                    </Route>
                    <Route path="/login" >
                        <RegLog />
                    </Route>
                    <Route path="/howitworks" >
                        <HowItWorks />
                    </Route>
                    <Route path="/feedbacks" >
                        <Feedbacks />
                    </Route>
                    <Route path="/sell" >
                        <SellForm />
                    </Route>
                    <Route path="/faq" >
                        <Faq />
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
${flexColSpace};
width:100vw;
min-height:100vh;
margin:0;
overflow:hidden;
`