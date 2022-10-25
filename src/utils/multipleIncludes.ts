const multipleIncludes = <T, T2>(first: T[], second: T2[]) => {
  const indexArray = first.map((el: any) => second.indexOf(el))
  return indexArray.indexOf(-1) === -1
}

export default multipleIncludes
