// /* eslint-disable no-console */
// import renderer from 'react-test-renderer'

// import toJson from '../../../../utils/toJSONforTest'
// import CustomAttentionButton from '../CustomAttentionButton'

// test('Button renders with text if label is provided', () => {
//   const component = renderer.create(
//     <CustomAttentionButton label="Test button" title="Test" />
//   )
//   const tree = toJson(component)
//   expect(tree).toMatchSnapshot()
// })

// test('Button fires the onClick event when clicked', () => {
//   const component = renderer.create(
//     <CustomAttentionButton
//       label="Test button"
//       onClick={() => {
//         console.log('testing')
//       }}
//       title="Test"
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
