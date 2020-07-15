import React from 'react'
import * as d3 from "d3-color";
import styled from "styled-components";

interface Props {
    onChange: (c: d3.RGBColor) => void
    color: d3.RGBColor
}

export const Preview = styled.div<{ color: string }>`
    width: 100px;
    height: 100px;

    display: inline-block;
    border: 1px solid lightgray;

    background: ${props => props.color};
`

const Colors = styled.div`
    display: flex;
    flex-direction: column;
`

const Wrapper = styled.div`
    display: flex;
`

export const ColorPicker: React.FC<Props> = ({ onChange, color }) => <Wrapper>
    <input type="color" value={color.hex()} onChange={e => onChange(d3.color(e.target.value) as d3.RGBColor)} />
    <Preview color={color.hex()}>
        {color.hex()}
    </Preview>
</Wrapper>
