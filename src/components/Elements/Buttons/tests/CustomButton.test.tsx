// import renderer from 'react-test-renderer'

// import toJson from '../../../../utils/toJSONforTest'
// import CustomButton from '../CustomButton'

// test('Button renders with text if label is provided', () => {
//   const component = renderer.create(
//     <CustomButton label="Test button" title="test" />
//   )
//   const tree = toJson(component)
//   expect(tree).toMatchSnapshot()
// })

// test('Button fires the onClick event when clicked', () => {
//   const testFunction = <TValue,>(value: TValue) => value
//   const component = renderer.create(
//     <CustomButton
//       label="Test button"
//       onClick={() => {
//         testFunction('testing')
//       }}
//       title="test"
//     />
//   )
//   let tree = toJson(component)
//   expect(tree).toMatchSnapshot()

//   // manually trigger the callback
//   tree.props.onClick()

//   // re-rendering
//   tree = toJson(component)
//   expect(tree).toMatchSnapshot()
// })

export {}
