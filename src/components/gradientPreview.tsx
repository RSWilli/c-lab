import React from 'react'
import styled from 'styled-components'
import { RGBColor } from 'd3-color'

export const Gradient = styled.div<{ colors: RGBColor[] }>`
    background: linear-gradient(90deg, ${props => props.colors.map((c: RGBColor, i: number) => `${c} ${i / (props.colors.length - 1) * 100}%`).join(",")});
    width: 100%;
    height: 100px;
    border: 1px solid lightgray;
`