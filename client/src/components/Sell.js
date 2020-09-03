import React,  { useEffect }  from 'react';
import { Input, ButtonAlt, ValidHeader, InvalidHeader, flexColCenter, flexRowCenter, TextArea } from '../styled-components/globalStyles';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {  } from '../slices/shopSlice';




export default function () {
   
    const dispatch = useDispatch();
 
    return (<FormWrapper>
    <Form action='/api/add-product' method='post'>
    <OptionsMenu name='productName'>
    <optgroup label='Fruit'></optgroup>
        <Option value='Oranges'>Oranges</Option>
        <Option value='Apples'>Apples</Option>
        <Option value='Bananas'>Bananas</Option>
        <Option value='Kiwis'>Kiwis</Option>
        <Option value='Lemons'>Lemons</Option>
        <Option value='Peaches'>Peaches</Option>
        <Option value='Pomegranates'>Pomegranates</Option>
        <Option value='Strawberries'>Strawberries</Option>
        <Option value='Watermelons'Watermelons></Option>
        <optgroup label='Vegetables'></optgroup>
        <Option value='Broccoli'>Broccoli</Option>
        <Option value='Cabbages'>Cabbages</Option>
        <Option value='Carrots'>Carrots</Option>
        <Option value='Cauliflowers'>Cauliflowers</Option>
        <Option value='Corn'>Corn</Option>
        <Option value='Cucumbers'>Cucumbers</Option>
        <Option value='Eggplant'>Eggplant</Option>
        <Option value='Potatoes'>Potatoes</Option>
        <Option value='Pumpkins'>Pumpkins</Option>
        <Option value='Red Chili Peppers'>Red Chili Peppers</Option>
        <Option value='Red Peppers'>Red Peppers</Option>
        <Option value='Salad'>Salad</Option>
        <Option value='Tomatoes'>Tomatoes</Option>
    </OptionsMenu>
    <Input placeholder='Name of Seller' name='sellerName'></Input>
    <Input placeholder='Price in € per Kg' name='price'></Input>
    <Input placeholder='Amount of Kg available for selling' name='quantityAvailable'></Input>
    <TextAreaForm placeholder={'Insert the description of your product here'} rows={4} onChange={handleAutoResize}></TextAreaForm>
    <ButtonAlt type="submit">Register the product!</ButtonAlt>
    </Form>
   </FormWrapper>);
        
}

function handleAutoResize (ev) {
    if (ev.target.scrollHeight > ev.target.clientHeight) {
       ev.target.rows += 1;
}
}
const FormWrapper = styled.div`
${flexColCenter};
width:100%;
margin-top:300px;
`

const Form = styled.form`
${flexColCenter};
justify-content:flex-start;
width:20%;
background:white;

`
const OptionsMenu = styled.select`
padding:10px;
font-family: -apple-system, BlinkMacSystemFont,'Poiret One', cursive;
font-weight:bold;
border-radius: 5px;
`
const Option = styled.option`

`
const TextAreaForm = styled(TextArea)`
width:100%;
`