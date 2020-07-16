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
                "do one thing",
                "another one",
                "last one to do"
            ],
            input: ""
        };
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.removeAllTasks = this.removeAllTasks.bind(this)
    }

    removeTask(text) {
        const { tasks } = this.state;
        const newState = {
            ...this.state,
            tasks: tasks.filter(elem => elem != text)
        }
        this.setState(newState);
    }

    addTask() {
        const { tasks } = this.state;
        this.setState({
            input: "",
            tasks: tasks.concat(this.state.input)
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
                <button onClick={this.addTask}>Add Task</button>
                <input type="text" value={this.state.input} onChange={this.onInputChange}></input>
                <button onClick={this.removeAllTasks}>Remove Tasks</button>
            </div>
            <ul style={todoStyle}>{
                this.state.tasks.map(text => <TodoPoint key={text} todoText={text} removeTask={this.removeTask} />)
            }</ul>
        </div>

    }
}


export default TodoListXP;