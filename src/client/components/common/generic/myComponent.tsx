import React from 'react'
import { createNumberInput } from '../../../../component'
import { NumberInputOptions, NumberInput } from '../../../../component/types'
import Com from './base'

/**
 * Thin wrapper around the NumberInput component
 */
export const render = (props: { options: NumberInputOptions, setComponent?: (component: NumberInput) => void }) => (
  <Com
    componentOptions={props.options}
    createComponent={createNumberInput}
    setComponent={props.setComponent}
    name="component"
  />
)

export default render
