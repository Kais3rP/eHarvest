import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  flexRowSpace,
  flexColSpace,
  flexColCenter,
  flexRowCenter,
} from "../styled-components/globalStyles"

export default function ({ options }) {
  const [productType, setProductType] = useState("Fruit")
  const optTypes = Object.keys(options)
  return (
    <>
      <FormElementWrapper>
        <OptionsMenu
          name="type"
          onChange={(ev) => {
            setProductType(ev.target.value)
          }}
          required
        >
          {optTypes.map((type, i) => (
            <Option key={i} value={type}>
              {type}
            </Option>
          ))}
        </OptionsMenu>
        <Label>Pick the type</Label>
      </FormElementWrapper>
      <FormElementWrapper>
        <OptionsMenu name="productName" required>
          <optgroup label={productType} />
          {options[productType].map((option, i) => (
            <Option key={i} value={option}>
              {option}
            </Option>
          ))}
        </OptionsMenu>
        <Label>Pick Your Product</Label>
      </FormElementWrapper>
    </>
  )
}

const OptionsMenu = styled.select`
  width: 50%;
`
const Option = styled.option``

const FormElementWrapper = styled.div`
  ${flexRowSpace};
  width: 100%;
`
const Label = styled.label`
  font-size: 14px;
  width: 50%;
`
