import React, { useEffect, useState } from 'react';
import { Input, ButtonAlt, ValidHeader, InvalidHeader, flexColCenter, flexRowCenter, flexRowSpace, TextArea, Select, Header3 } from '../styled-components/globalStyles';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, fetchRegisterProduct, setProductRegistrationResponse } from '../slices/shopSlice';
import handleAutoResize from '../helpers/autoResizeTextArea'
import validateTextArea from '../helpers/validateTextArea'




export default function () {

    const dispatch = useDispatch();
    const productRegistrationResponse = useSelector( state => state.shop.productRegistrationResponse);
    const isLoggedIn = useSelector( state => state.user.isLoggedIn);
    const [productType, setProductType] = useState('Fruit');
    const [lengthOfText, setLengthOfText] = useState(0);
    const [hasRegistered, setHasRegistered] = useState(false);
    return (<FormWrapper>
        <Form onSubmit={  (ev) => { 
             ev.preventDefault();
             dispatch(fetchRegisterProduct(ev));
             setHasRegistered(true);
             setTimeout(()=>{setHasRegistered(false)},3000);
           
        }} >
            <FormElementWrapper>
                <OptionsMenu name='type' onChange={(ev) => { setProductType(ev.target.value) }} required>
                    <Option value='Fruit'>Fruit</Option>
                    <Option value='Vegetables' >Vegetables</Option>
                </OptionsMenu>
                <Label>Pick the type</Label>
            </FormElementWrapper>
            <FormElementWrapper>
                <OptionsMenu name='productName' required>
                    {productType === 'Fruit' ? (
                        <>
                            <optgroup label='Fruit'></optgroup>
                            <Option value='Oranges'>Oranges</Option>
                            <Option value='Apples'>Apples</Option>
                            <Option value='Bananas'>Bananas</Option>
                            <Option value='Kiwis'>Kiwis</Option>
                            <Option value='Lemons'>Lemons</Option>
                            <Option value='Peaches'>Peaches</Option>
                            <Option value='Pomegranates'>Pomegranates</Option>
                            <Option value='Strawberries'>Strawberries</Option>
                            <Option value='Watermelons' Watermelons></Option>
                        </>) : null}
                    {productType === 'Vegetables' ?
                        (<>
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
                        </>) : null}
                </OptionsMenu>
                <Label>Pick Your Product</Label>
            </FormElementWrapper>
            <FormElementWrapper>
                <FormInput type='text' pattern='\d+.\d\d' placeholder='Price in € per Kg' name='price' required></FormInput>
                <Label>Type the price of your product eg. 1.50</Label>
            </FormElementWrapper>
            <FormElementWrapper>
                <FormInput type='text' pattern='\d{1,3}' placeholder='Amount of Kg available for selling' name='quantityAvailable' required></FormInput>
                <Label>Type the amount of Kg of the product you have now readily available to sell</Label>
            </FormElementWrapper>
            <FormElementWrapper>
                <TextAreaForm
                    type='text'
                    placeholder={'Insert the description of your product here'}
                    name='description' rows={4}
                    onChange={(ev) => {
                        validateTextArea(ev);
                        handleAutoResize(ev);
                        setLengthOfText(ev.target.value.length);
                    }}
                    required></TextAreaForm>
                <Label>{`Actual: ${lengthOfText}. `}Type here the description of your product min. 100, max. 500 characters</Label>
               
            </FormElementWrapper>


            <ButtonAlt type="submit">Register the product!</ButtonAlt>
            <Header3>{hasRegistered ? productRegistrationResponse : null}</Header3>
        </Form>
    </FormWrapper>);

}





const FormWrapper = styled.div`
${flexColCenter};
width:100%;
margin-top:300px;
@media (max-width:768px){
    justify-content:flex-start;
    margin-top:10px;
}
`

const Form = styled.form`
${flexColCenter};
justify-content:flex-start;
width:60%;
background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  5px 5px 13px #6b6b6b, 
             -5px -5px 13px #ffffff;
             padding:20px;
             @media (max-width:768px){
  
    width:100%;




}
`
const FormElementWrapper = styled.div`
${flexRowSpace};
width:100%;
`
const OptionsMenu = styled(Select)`
width:50%;

`
const Option = styled.option`

`
const FormInput = styled(Input)`
width:50%;
`
const TextAreaForm = styled(TextArea)`
width:50%;

`

const Label = styled.label`
font-size:14px;
width:50%;
`