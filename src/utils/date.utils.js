export const subtractYears = (date, years) => {
  const dateCopy = new Date(date)
  dateCopy.setFullYear(date.getFullYear() - years)
  return dateCopy
}
export const convertDate = date => {
  const dateCopy = new Date(date)
  return `${dateCopy.toDateString()}`
}