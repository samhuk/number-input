import { NumberInputOptions, NumberInput, LabelPosition } from './types'

const updateDirtiness = (numberInput: NumberInput, newValue: boolean) => {
  numberInput.isDirty = newValue
  if (newValue)
    numberInput.rendered.element.classList.add('dirty')
  else
    numberInput.rendered.element.classList.remove('dirty')
}

const isValidKey = (key: string, onlyInteger: boolean) => (
  key === '1'
  || key === '2'
  || key === '3'
  || key === '4'
  || key === '5'
  || key === '6'
  || key === '7'
  || key === '8'
  || key === '9'
  || key === '0'
  || key === 'Backspace'
  || (!onlyInteger && key === '.')
)

export const createNumberInput = (options: NumberInputOptions): NumberInput => {
  let numberInput: NumberInput
  let indicator: HTMLElement
  const onlyInteger = options.onlyInteger ?? true

  const element = document.createElement('div')
  element.classList.add('com-number-input')

  const input = document.createElement('input')
  input.type = 'number'
  if (options.step != null)
    input.step = options.step.toString()
  if (options.min != null)
    input.min = options.min.toString()
  if (options.max != null)
    input.max = options.max.toString()

  const labelWrapper = document.createElement('div')
  labelWrapper.classList.add('com-number-input__label-wrapper')

  let label: HTMLElement
  if (options.label != null) {
    label = document.createElement('label')
    label.textContent = options.label
  }

  if (label != null) {
    labelWrapper.appendChild(label)
    element.appendChild(labelWrapper)
  }

  if (options.showDirtinessIndicator) {
    indicator = document.createElement('div')
    indicator.textContent = '⬤'
    indicator.classList.add('com-number-input__dirty-indicator')
    labelWrapper.appendChild(indicator)
  }

  element.appendChild(input)

  if (options.labelPosition === LabelPosition.LEFT)
    element.classList.add('left-label-position')

  input.addEventListener('keypress', e => {
    if (isValidKey(e.key, onlyInteger))
      return

    e.preventDefault()
  })

  input.addEventListener('input', () => {
    updateDirtiness(numberInput, true)
    numberInput.value = parseFloat(input.value)
    options.events?.onInput?.(numberInput.value)
  })

  if (options.events?.onChange != null) {
    input.addEventListener('change', () => {
      options.events?.onChange?.(numberInput.value)
    })
  }

  if (options.initialValue != null)
    input.value = options.initialValue.toString()

  numberInput = {
    rendered: { element, input },
    value: options.initialValue,
    isDirty: false,
    resetDirtiness: () => {
      updateDirtiness(numberInput, false)
    },
    setValue: newValue => {
      numberInput.value = newValue
      input.value = newValue.toString()
      updateDirtiness(numberInput, true)
    },
    updateMin: newMin => input.min = newMin.toString(),
    updateMax: newMax => input.max = newMax.toString(),
  }

  updateDirtiness(numberInput, false)

  return numberInput
}
