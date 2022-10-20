import {color} from "../constants/themeConstants"

export default function changeSignatureColor() {
  const elements = document.querySelectorAll("div[class*=' signature]")
  if (elements.length > 0) {
    elements.forEach((element) => {
      element.classList.add(`${color.gray[300]}`)
    })
  }
}