import React from 'react'
import { RGBColor } from 'd3-color'
import { Preview } from './colorpicker'
import styled from 'styled-components'
import { contrast } from '../lib/contrast'

interface Props {
    color1: RGBColor[]
    color2: RGBColor[]
}

const VisualiszeContrast = styled.div<{ color1: string, color2: string, contrast: number }>`
    background: ${props => props.color1};
    color: ${props => props.color2};
    width: 100px;
    height: 100px;
    border: 3px solid;
    border-color: ${props => props.contrast >= 4.5 ? "green" : "red"};
`

export const CompareTable: React.FC<Props> = ({ color1, color2 }) =>
    <table>
        <tbody>
            <tr>
                <td></td>
                {color2.map((c, i) => <td key={i}><Preview color={c.hex()}>{c.hex()}</Preview></td>)}
            </tr>
            {
                color1.map((c1, i) => <tr key={i}>
                    <td><Preview color={c1.hex()}></Preview></td>
                    {
                        color2.map((c2, j) => {
                            const contrastratio = contrast([c1.r, c1.g, c1.b], [c2.r, c2.g, c2.b])
                            return <td key={j}>
                                <VisualiszeContrast color1={c1.hex()} color2={c2.hex()} contrast={contrastratio}>
                                    {contrastratio.toLocaleString("de-DE", { maximumFractionDigits: 2 })}
                                </VisualiszeContrast>
                            </td>
                        })
                    }
                </tr>)
            }
        </tbody>
    </table>
