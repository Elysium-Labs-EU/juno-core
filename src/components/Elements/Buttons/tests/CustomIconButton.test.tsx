/* eslint-disable no-console */
import renderer from 'react-test-renderer'
import { QiMeatballsH } from '../../../../images/svgIcons/quillIcons'
import toJson from '../../../../utils/toJSONforTest'
import CustomIconButton from '../CustomIconButton'

test('Button renders with icon if provided', () => {
  const component = renderer.create(
    <CustomIconButton icon={<QiMeatballsH />} onClick={() => {}} title="Test" />
  )
  const tree = toJson(component)
  expect(tree).toMatchSnapshot()
})

test('Button fires the onClick event when clicked', () => {
  const component = renderer.create(
    <CustomIconButton
      icon={<QiMeatballsH />}
      onClick={() => {
        console.log('testing')
      }}
      title="Test"
    />
  )
  let tree = toJson(component)
  expect(tree).toMatchSnapshot()

  // manually trigger the callback
  tree.props.onClick()

  // re-rendering
  tree = toJson(component)
  expect(tree).toMatchSnapshot()
})
