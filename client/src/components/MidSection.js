import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter } from '../styled-components/globalStyles';
import Offers from './Offers';
import MostSold from './MostSold.js';
import { useSelector } from 'react-redux';

export default function () {
    
    return (
        <MidSectionWrapper>
            <Offers />
            <MostSold />
        </MidSectionWrapper>
)
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

