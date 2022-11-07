import * as SelectPrimitive from '@radix-ui/react-select'
import { Label } from '@radix-ui/react-label'
import {
  QiCheckmark,
  QiChevronDown,
  QiChevronUp,
} from '../../../images/svgIcons/quillIcons'
import * as S from './StyledSelectStyles'

interface ISelectOption {
  value: string
  isDisabled?: boolean
}

interface ISelectOptions {
  id: string
  label: string
  options: Array<ISelectOption>
}

const Content = ({ children }: { children: Array<JSX.Element> }) => (
  <SelectPrimitive.Portal>
    <S.StyledContent>{children}</S.StyledContent>
  </SelectPrimitive.Portal>
)

// Exports
export const Select = SelectPrimitive.Root
export const SelectTrigger = S.StyledTrigger
export const SelectValue = SelectPrimitive.Value
export const SelectIcon = S.StyledIcon
export const SelectContent = Content
export const SelectViewport = S.StyledViewport
export const SelectGroup = SelectPrimitive.Group
export const SelectItem = S.StyledItem
export const SelectItemText = SelectPrimitive.ItemText
export const SelectItemIndicator = S.StyledItemIndicator
export const SelectLabel = S.StyledLabel
export const SelectSeparator = S.StyledSeparator
export const SelectScrollUpButton = S.StyledScrollUpButton
export const SelectScrollDownButton = S.StyledScrollDownButton

const SelectItemComponent = ({ isDisabled = false, value }: ISelectOption) => (
  <SelectItem value={value.toLocaleLowerCase()} disabled={isDisabled}>
    <SelectItemText>{value}</SelectItemText>
    <SelectItemIndicator>
      <QiCheckmark />
    </SelectItemIndicator>
  </SelectItem>
)

const SelectGroupComponent = ({
  selectOption,
}: {
  selectOption: ISelectOptions
}) => {
  const { label, options } = selectOption
  return (
    <SelectGroup>
      {label && <SelectLabel>{label}</SelectLabel>}
      {options.map(({ isDisabled, value }) => (
        <SelectItemComponent
          key={value}
          value={value}
          isDisabled={isDisabled}
        />
      ))}
    </SelectGroup>
  )
}

const SelectComponent = ({
  ariaLabelTrigger,
  label = undefined,
  onValueChange,
  placeholder = undefined,
  selectOptions,
  value,
}: {
  ariaLabelTrigger: string
  label?: string
  onValueChange: (value: string) => void
  placeholder?: string
  selectOptions: ISelectOptions | ISelectOptions[]
  value: string
}) => (
  <>
    {label && (
      <Label htmlFor={label.replace(/\s+/g, '-').toLowerCase()}>{label}</Label>
    )}
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger aria-label={ariaLabelTrigger}>
        <SelectValue placeholder={placeholder} />
        <SelectIcon>
          <QiChevronDown />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent>
        <SelectScrollUpButton>
          <QiChevronUp />
        </SelectScrollUpButton>
        <SelectViewport>
          {Array.isArray(selectOptions) ? (
            selectOptions.map((selectOption, index, array) => {
              if (index === array.length - 1) {
                return (
                  <SelectGroupComponent
                    key={selectOption.id}
                    selectOption={selectOption}
                  />
                )
              }
              return (
                <div key={selectOption.id}>
                  <SelectGroupComponent selectOption={selectOption} />
                  <SelectSeparator />
                </div>
              )
            })
          ) : (
            <SelectGroupComponent selectOption={selectOptions} />
          )}
        </SelectViewport>
        <SelectScrollDownButton>
          <QiChevronDown />
        </SelectScrollDownButton>
      </SelectContent>
    </Select>
  </>
)

export default SelectComponent
