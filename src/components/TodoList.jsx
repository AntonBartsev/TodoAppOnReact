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
            // Array of todo elements as objects { name of task, 
            // date when task added, id of task, color of task, 
            // text decoration style of task }
            tasks: [
                {
                    taskName: "do one thing", date: new Date(),
                    id: 0, color: "", textDecoration: ""
                },
                {
                    taskName: "another one", date: new Date(),
                    id: 1, color: "", textDecoration: ""
                },
                {
                    taskName: "last one to do", date: new Date(),
                    id: 2, color: "", textDecoration: ""
                }
            ],
            // Main input field text value
            input: "",
            // Current soring option to sort tasks 
            sortingOption: "Sort by",
            // Id of task in edit mode
            taskInEditId: -1,
            // Id of last created task
            lastCreatedId: 2
        };
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.removeAllTasks = this.removeAllTasks.bind(this);
        this.sortTasks = this.sortTasks.bind(this);
        this.setTaskInEditId = this.setTaskInEditId.bind(this);
        this.setNewTaskText = this.setNewTaskText.bind(this);
        this.setTaskColor = this.setTaskColor.bind(this);
        this.setTaskTextDecoration = this.setTaskTextDecoration.bind(this)
    }
    // Set color of task
    setTaskColor(taskId, bIsImportant) {
        const { tasks } = this.state
        for (const task of tasks) {
            if (task.id === taskId)
                bIsImportant ? task.color = "red"
                    : task.color = "black"
        }
        this.setState({
            ...this.state
        })
    }
    // Set text deoration style of task
    setTaskTextDecoration(taskId, bIsDone) {
        const { tasks } = this.state
        for (const task of tasks) {
            if (task.id === taskId)
                bIsDone ? task.textDecoration = "line-through"
                    : task.textDecoration = ""
        }
        this.setState({
            ...this.state
        })
    }

    // Set text of task in edit mode 
    setTaskInEditId(todoId) {
        this.setState({
            ...this.state,
            taskInEditId: todoId
        })
    }
    // Change name of task
    setNewTaskText(newText) {
        const { tasks, taskInEditId } = this.state
        tasks[taskInEditId].taskName = newText
        this.setState({
            ...this.state,
            tasks,
            taskInEditId: -1
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
    // Remove task
    removeTask(taskId) {
        const { tasks } = this.state;
        for (const task of tasks) {
            if (task.id === taskId)
                // Remove task by id in array of tasks but not id from the property "id"
                tasks.splice(tasks.indexOf(task), 1)
        }
        const newState = {
            ...this.state
        };
        this.setState(newState);
    }
    // Add task
    addTask() {
        const { tasks, sortingOption, lastCreatedId } = this.state;
        // Set properties of the new task
        const newTask = {
            taskName: this.state.input,
            date: new Date(),
            id: lastCreatedId + 1,
            color: "",
            textDecoration: ""
        }
        // Sort task as it added
        const newTasks = tasks.concat(newTask).sort(filterTasks(sortingOption));
        this.setState({
            input: "",
            tasks: newTasks,
            lastCreatedId: lastCreatedId + 1
        });
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
        return <>
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
                        todoId={todoPoint.id}
                        bIsEdited={todoPoint.id === this.state.taskInEditId}
                        removeTask={this.removeTask}
                        todoDate={formatDate(todoPoint)}
                        taskInEditText={this.state.taskInEditText}
                        setTaskInEditId={this.setTaskInEditId}
                        taskInEditId={this.state.taskInEditId}
                        setNewTaskText={this.setNewTaskText}
                        setTaskColor={this.setTaskColor}
                        setTaskTextDec={this.setTaskTextDecoration}
                        color={todoPoint.color}
                        textDec={todoPoint.textDecoration}
                    />)}</ul>
        </>
    }
}


export default TodoListXP;