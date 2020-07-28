import React from 'react';
import TodoPoint from './TodoPoint';
import { formatDate, filterTasks, sortingOptions } from './utils';

const todoStyle = {
    display: "inline-block"
}

class TodoListXP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Array of todo elements as objects
            tasks: [
                { taskName: "do one thing", date: new Date() },
                { taskName: "another one", date: new Date() },
                { taskName: "last one to do", date: new Date() }
            ],
            // Main input field text value
            input: "",
            // Current soring option to sort tasks 
            sortingOption: "Sort by",
            // Initial text of task that user is editing 
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
    setTaskInEditText(taskText) {
        this.setState({
            ...this.state,
            taskInEditText: taskText
        })
    }
    // Change name of task
    setNewTaskText(text, newText) {
        const { tasks } = this.state
        const id = this.getTaskNames().indexOf(text)
        tasks[id].taskName = newText
        this.setState({
            ...this.state,
            tasks
        })
    }
    // Update state with sorted tasks
    sortTasks(event) {
        const { tasks } = this.state;
        const option = event.target.value
        this.setState({
            ...this.state,
            tasks: tasks.sort(filterTasks(option)),
            sortingOption: option
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
        const { tasks, sortingOption: sortingOpt } = this.state;
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
        return <div>
            <div>
                <select
                    onChange={this.sortTasks}>
                    {
                        sortingOptions.map(option =>
                            <option
                                key={sortingOptions.indexOf(option)}>
                                {option}
                            </option>)
                    }
                </select>
                <button onClick={this.addTask}>Add Task</button>
                <input
                    type="text"
                    value={this.state.input}
                    onChange={this.onInputChange}
                />
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