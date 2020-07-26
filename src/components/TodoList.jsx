import React from 'react';
import TodoPoint from './TodoPoint';
import formatDate from './utils';

const todoStyle = {
    display: "inline-block"
}
// Sort users by several categories
const filterTasks = (sortingOpt) => {
    {
        switch (sortingOpt) {
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
                console.log("'Sort by' opt set or somthg went wrong")
        }
    }
}

class TodoListXP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                { taskName: "do one thing", date: new Date() },
                { taskName: "another one", date: new Date() },
                { taskName: "last one to do", date: new Date() }
            ],
            input: "",
            sortingOpt: "Sort by",
            taskInEditText: ""
        };
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.removeAllTasks = this.removeAllTasks.bind(this)
        this.sortTasks = this.sortTasks.bind(this)
        this.setTaskInEditText = this.setTaskInEditText.bind(this)
        this.setNewTaskText = this.setNewTaskText.bind(this)
    }
    // Set text of task in edit mode 
    setTaskInEditText(taskInEditText) {
        this.setState({
            ...this.state,
            taskInEditText: taskInEditText
        })
    }
    // Change name of task
    setNewTaskText(text, newText) {
        const { tasks } = this.state
        const id = this.getTaskNames().indexOf(text)
        tasks[id].taskName = newText
        this.setState({
            ...this.state,
            tasks: tasks
        })
    }
    // Update state with sorted tasks
    sortTasks(event) {
        const { tasks } = this.state;
        const option = event.target.value
        this.setState({
            ...this.state,
            tasks: tasks.sort(filterTasks(option)),
            sortingOpt: option
        });
    }

    // Array of names of tasks
    getTaskNames() {
        const taskNames = [];
        for (const task of this.state.tasks) {
            taskNames.push(task.taskName)
        }
        return taskNames
    }

    removeTask(todoPointName) {
        const { tasks } = this.state;
        tasks.splice(this.getTaskNames().indexOf(todoPointName), 1)
        const newState = {
            ...this.state
        };
        this.setState(newState);
    }

    addTask() {
        const { tasks, sortingOpt } = this.state;
        const newTask = {
            taskName: this.state.input,
            date: new Date()
        };
        // Sort task as it added
        const newTasks = tasks.concat(newTask).sort(filterTasks(sortingOpt));
        const newState = {
            input: "",
            tasks: newTasks
        }
        this.setState(newState);
    }

    onInputChange(event) {
        const text = event.target.value;
        this.setState({ ...this.state, input: text })
    }

    removeAllTasks() {
        this.setState(
            {
                ...this.state,
                tasks: []
            }
        )
    }

    mapTasks(mapArgument) {
        return this.state.tasks.map(mapArgument)
    }
    // Key of task html element 
    getKeyForTodoElem(todoPoint) {
        return this.state.tasks.indexOf(todoPoint)
    }

    render() {
        const sortingOpts = ["Sort by", "Newer", "Older", "Name asc", "Name desc"]
        return <div>
            <div>
                <select onChange={this.sortTasks}>
                    {sortingOpts.map(option => <option key={sortingOpts.indexOf(option)}>{option}</option>)}
                </select>
                <button onClick={this.addTask}>Add Task</button>
                <input type="text" value={this.state.input} onChange={this.onInputChange}></input>
                <button onClick={this.removeAllTasks}>Remove Tasks</button>
            </div>
            <ul id="todoPoints"
                style={todoStyle} >{
                    this.mapTasks(todoPoint => <TodoPoint
                        key={this.getKeyForTodoElem(todoPoint)}
                        todoText={todoPoint.taskName}
                        removeTask={this.removeTask}
                        todoDate={formatDate(todoPoint)}
                        taskInEditText={this.state.taskInEditText}
                        setTaskInEditText={this.setTaskInEditText}
                        setNewTaskText={this.setNewTaskText}
                    />)}</ul>
        </div>

    }
}


export default TodoListXP;