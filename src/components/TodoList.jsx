import React from 'react';
import TodoPoint from './TodoPoint';

const todoStyle = {
    display: "inline-block"
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
            input: ""
        };
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.removeAllTasks = this.removeAllTasks.bind(this)
        this.sortTasks = this.sortTasks.bind(this)
    }


    sortTasks(event) {
        const { tasks } = this.state
        const option = event.target.value
        let newState
        if (option === "Name asc") {
            newState = {
                ...this.state,
                tasks: tasks.sort((task1, task2) => (task1.taskName.toLowerCase() > task2.taskName.toLowerCase()) ? 1 : -1)
            }
        }
        if (option === "Name desc") {
            newState = {
                ...this.state,
                tasks: (tasks.sort((task1, task2) => (task1.taskName.toLowerCase() > task2.taskName.toLowerCase()) ? 1 : -1)).reverse()
            }
        }
        if (option === "Newer") {
            newState = {
                ...this.state,
                tasks: (tasks.sort((task1, task2) => (task1.date - task2.date))).reverse()
            }
        }
        if (option === "Older") {
            newState = {
                ...this.state,
                tasks: tasks.sort((task1, task2) => (task1.date - task2.date))
            }
        }

        this.setState(newState)
    }


    taskTexts = () => {
        const taskNames = []
        for (const task of this.state.tasks) {
            taskNames.push(task.taskName)
        }
        return taskNames
    }


    changeText = (text, newText) => {
        const { tasks } = this.state
        const id = this.taskTexts().indexOf(text)
        tasks[id].taskName = newText
        this.setState({
            ...this.state,
            tasks: tasks
        })
    }


    removeTask(text) {
        const { tasks } = this.state
        tasks.splice(this.taskTexts().indexOf(text), 1)
        const newState = {
            ...this.state
        }
        this.setState(newState);
    }

    addTask() {
        const { tasks } = this.state;
        this.setState({
            input: "",
            tasks: tasks.concat({ taskName: this.state.input, date: new Date() })
        });
    }



    onInputChange(event) {
        const text = event.target.value;
        this.setState({ ...this.state, input: text })
    }

    removeAllTasks() {
        this.setState(
            {
                tasks: []
            }
        )
    }

    render() {
        return <div>
            <div>
                <select onChange={this.sortTasks}>
                    <option>Sort by</option>
                    <option>Newer</option>
                    <option>Older</option>
                    <option>Name asc</option>
                    <option>Name desc</option>
                </select>
                <button onClick={this.addTask}>Add Task</button>
                <input type="text" value={this.state.input} onChange={this.onInputChange}></input>
                <button onClick={this.removeAllTasks}>Remove Tasks</button>
            </div>
            <ul id="todoPoints" style={todoStyle} >{
                this.state.tasks.map(text => <TodoPoint key={this.state.tasks.indexOf(text)} todoText={text.taskName} removeTask={this.removeTask} todoDate={text.date.toUTCString().slice(0, 22)} changeText={this.changeText} oneInEdit={this.state.bIsOneTaskInEdit} />)
            }</ul>
        </div>

    }
}


export default TodoListXP;