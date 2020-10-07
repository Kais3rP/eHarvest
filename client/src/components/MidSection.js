import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter } from '../styled-components/globalStyles';
import Offers from './Offers';
import MostSold from './MostSold.js';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

export default function () {
    const offersItems = useSelector(state => state.shop.offersItems);
    const mostSold = useSelector(state => state.shop.mostSoldItems)
    return offersItems && mostSold ? 
        (<MidSectionWrapper>
         <Offers offersItems={offersItems} />
            <MostSold mostSold={mostSold} />
        </MidSectionWrapper>) :
            <Loader
            type="TailSpin"
            color="black"
            height={50}
            width={50}
            timeout={6000} //6 secs
          />  
        }



const MidSectionWrapper = styled.div`
${flexRowCenter};
width:100%;
text-align:center;
margin-top:230px;
@media (max-width:768px){
    ${flexColCenter};
    justify-content:flex-start;
    margin-top:20px;
}
@media (max-height:500px){
    ${flexColCenter};
    justify-content:flex-start;
    margin-top:20px;
}
`

