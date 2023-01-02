export interface ISelectOption {
  value: string
  isDisabled?: boolean
}

export interface ISelectOptions {
  id: string
  label: string
  options: Array<ISelectOption>
}

export interface ISelectComponent {
  ariaLabelTrigger: string
  label?: string
  onValueChange: (value: string) => void
  placeholder?: string
  selectOptions: ISelectOptions | Array<ISelectOptions>
  value: string
}
