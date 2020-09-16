const formatDate = (todoPoint) => {
    return todoPoint.date.toUTCString().slice(0, 22)
}
// Sort users by several categories
const sortTasks = (sortingOption) => {
    switch (sortingOption) {
        // Sort by name ascending 
        case "Name asc":
            return (task1, task2) => (task1.taskName.toLowerCase() > task2.taskName.toLowerCase()) ? 1 : -1
        // Sort by name descending 
        case "Name desc":
            return (task1, task2) => (task1.taskName.toLowerCase() < task2.taskName.toLowerCase()) ? 1 : -1
        // Sort by newer tasks
        case "Newer":
            return ((task1, task2) => (task2.date - task1.date))
        // Sort by older tasks
        case "Older":
            return (task1, task2) => (task1.date - task2.date)
        default:
            console.log("'Sort by' opt set or somthng went wrong")
    }
}
const sortingOptions = ["Sort by", "Newer", "Older", "Name asc", "Name desc"]
export { formatDate, sortTasks, sortingOptions };