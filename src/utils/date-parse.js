export default dateString => {
  const date = new Date(dateString)
  return date.getHours() + ':' + date.getMinutes()
}
