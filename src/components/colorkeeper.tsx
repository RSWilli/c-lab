import React, { useState } from 'react'
import { RGBColor, rgb, color } from 'd3-color'
import { ColorPicker, Preview } from './colorpicker'
import { CompareTable } from './colorcomparetable'
import { Gradient } from './gradientPreview'
import { piecewise, interpolateHsl } from 'd3-interpolate'

const baseColors = [
    rgb("#88f9d4"),
    rgb("#18c29c"),
    rgb("#0b877d"),
    rgb("#126872"),
    rgb("#003a43"),
]

export const ColorKeeper = () => {
    const [colors, setColors] = useState<RGBColor[]>([rgb("black"), rgb("white")])


    const [interpCount, setInterpCount] = useState(2)

    console.log(interpCount);

    const interpolate = piecewise(interpolateHsl, colors.map(c => c.hex()))

    const addColor = () => {
        setColors([...colors, rgb("cornflowerblue")])
    }

    const removeColor = () => {
        if (colors.length == 2) return

        colors.pop()

        setColors([...colors])
    }

    const changeColor = (newcolor: RGBColor, i: number) => {
        const start = colors.slice(0, i)
        const end = colors.slice(i + 1)

        setColors([...start, newcolor, ...end])
    }

    const interps = [...Array(interpCount).keys()].map((_, i) => color(interpolate(i / (interpCount - 1))) as RGBColor)

    return <div>
        <h1>Add Colors</h1>

        <button onClick={addColor}>+</button>
        <button onClick={removeColor}>-</button>

        {colors.map((c, i) => <ColorPicker color={c} key={i} onChange={(newc) => changeColor(newc, i)}></ColorPicker>)}

        <hr></hr>

        <h1>Preview Gradient</h1>

        <Gradient colors={colors}></Gradient>

        <hr></hr>

        <h1>Check contrast each</h1>

        <CompareTable color1={colors} color2={colors}></CompareTable>

        <hr></hr>

        <h1>check contrast vs basecolors</h1>

        <CompareTable color2={colors} color1={baseColors}></CompareTable>

        <hr></hr>

        <h1>create interpolated colors</h1>

        interpolate {interpCount} colors
        <button onClick={() => setInterpCount(interpCount + 1)}>+</button>
        <button onClick={() => interpCount != 2 && setInterpCount(interpCount - 1)}>-</button>

        {interps.map((c, i) => <Preview key={i} color={c.hex()}>{c.hex()}</Preview>)}

        <hr></hr>

        <h1>check interpolated contrasts</h1>

        <CompareTable color2={interps} color1={interps}></CompareTable>

        <h1>check interpolated colors vs basecolors</h1>
        <CompareTable color2={interps} color1={baseColors}></CompareTable>
    </div>
}
