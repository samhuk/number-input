import React from 'react'
import { NumberInputOptions, NumberInput } from '../../../component/types'
import NumberInputWithReact from '../common/generic/myComponent'
import ItemBase from './itemBase'

const COMPONENT_OPTIONS: NumberInputOptions = {
  label: 'Number of Countries',
  initialValue: 5,
  min: 0,
  max: 10,
  step: 1,
}

const Operations = (props: { component: NumberInput }) => (
  <>
    <button
      type="button"
      className="button--white"
      onClick={() => props.component.setValue(2)}
    >
      Update the text of the component
    </button>
  </>
)

export const render = () => (
  <ItemBase component={NumberInputWithReact} componentOptions={COMPONENT_OPTIONS} operationsComponent={Operations} />
)

export default render
