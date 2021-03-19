const inputDateConverter = (input) => {
  // input date format is YYYY-MM-DD
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep", "Oct","Nov","Dec"]
  const date = input.slice(-2)
  const monthNumber = input.slice(5, 7) - 1
  const month = months[monthNumber]

  return date + ' ' + month
}