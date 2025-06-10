export const eightCharMin = (pass: string = ''): boolean => {
  return pass.length >= 8
}

export const oneLowerCase = (pass: string = ''): boolean => {
  return /[a-z]/.test(pass)
}

export const oneUpperCase = (pass: string = ''): boolean => {
  return /[A-Z]/.test(pass)
}

export const oneSpecialChar = (pass: string = ''): boolean => {
  return /\W/.test(pass)
}

export const oneNumberChar = (pass: string = ''): boolean => {
  return /[0-9]/.test(pass)
}

export const allPasswordValid = (pass: string = ''): boolean => {
  return (
    eightCharMin(pass) &&
    oneLowerCase(pass) &&
    oneUpperCase(pass) &&
    oneSpecialChar(pass) &&
    oneNumberChar(pass)
  )
}
