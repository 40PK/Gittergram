export default dateString => {
  const date = new Date(dateString)
  return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)
}
