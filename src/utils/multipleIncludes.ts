const multipleIncludes = (first: any, second: any) => {
  const indexArray = first.map((el: any) => second.indexOf(el))
  return indexArray.indexOf(-1) === -1
}

export default multipleIncludes
