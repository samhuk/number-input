export type Rendered = {
  element: HTMLElement
}

export enum LabelPosition {
  ABOVE = 'above',
  LEFT = 'left'
}

export type NumberInputOptions = {
  initialValue: number
  label?: string
  labelPosition?: LabelPosition
  onlyInteger?: boolean
  min?: number
  max?: number
  step?: number
  showDirtinessIndicator?: boolean
  events?: {
    onInput?: (newValue: number) => void
    onChange?: (value: number) => void
  }
}

export type NumberInput = {
  rendered: Rendered & { input: HTMLInputElement }
  value: number
  isDirty: boolean
  resetDirtiness: () => void
  setValue: (newValue: number) => void
  updateMin: (newMin: number) => void
  updateMax: (newMax: number) => void
}
