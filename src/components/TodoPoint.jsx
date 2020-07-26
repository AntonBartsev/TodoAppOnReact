import React from 'react';

const todoPointStyle = {
    display: "flex",
    marginBottom: "5px"
}
const todoDateStyle = {
    fontSize: "15px"
}

class TodoPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bIsImportant: false,
            bIsDone: false
        };
        this.toggleImportant = this.toggleImportant.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
        this.updateEditedTaskText = this.updateEditedTaskText.bind(this)
    }
    // Set new text after editing task 
    updateEditedTaskText(event) {
        const newText = event.target.value;
        const oldText = event.target.defaultValue
        if (event.key === 'Enter') {
            this.props.setNewTaskText(oldText, newText)
        }
    }

    toggleImportant() {
        this.setState({
            ...this.state,
            bIsImportant: !this.state.bIsImportant
        });

    }

    toggleDone() {
        this.setState(
            {
                ...this.state,
                bIsDone: !this.state.bIsDone
            }
        )
    }
    getDoneStyle() {
        return this.state.bIsDone ? "line-through" : ""
    }

    getTextColor() {
        return this.state.bIsImportant ? "red" : "black";
    }

    // Decide whether render input or li element for task text
    getTaskTextElem(todoText) {
        const TaskInEditElem = <input onKeyDown={this.updateEditedTaskText} type="text" defaultValue={todoText} ></input>
        const DefaultElem = <li style={{ textDecoration: this.getDoneStyle(), width: "150px", color: this.getTextColor() }} onClick={() => this.props.setTaskInEditText(todoText)}>
            {todoText}</li >
        let CurrentElem = DefaultElem
        // Render input element for task text 
        if (todoText === this.props.taskInEditText)
            CurrentElem = TaskInEditElem
        return CurrentElem
    }

    render() {
        const { removeTask, todoText, todoDate } = this.props;
        return <div style={todoPointStyle}>
            {this.getTaskTextElem(todoText)}
            <button onClick={() => removeTask(todoText)} >X</button>
            <button onClick={this.toggleImportant} >!</button>
            <button onClick={this.toggleDone}>✓</button>
            <ul style={todoDateStyle}>{todoDate}</ul>
        </div>
    }
}

export default TodoPoint;