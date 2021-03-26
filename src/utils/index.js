export const decode64toImg = (data) => {
    let img = "data:image/png;base64" + { data }
    // let source = img.replace(/^data:image\/\w+;base64,/, "")
    let buf = new Buffer(img, 'base64')
    return buf
}