const formatDate = (todoPoint) => {
    return todoPoint.date.toUTCString().slice(0, 22)
}
export default formatDate;