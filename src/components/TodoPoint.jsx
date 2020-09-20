import React from 'react';

const todoPointStyle = {
    display: "flex",
    marginBottom: "5px"
}
const todoDateStyle = {
    fontSize: "15px",
    marginBlockStart: "0em",
    marginBlockEnd: "0em",
    paddingLeft: "1rem",
    paddingTop: "0.15rem"
}


class TodoPoint extends React.Component {
    constructor(props) {
        super(props);
        this.toggleImportant = this.toggleImportant.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
        this.updateEditedTaskText = this.updateEditedTaskText.bind(this);
    }
    // Set new text after editing task 
    updateEditedTaskText(event) {
        const newText = event.target.value
        if (event.key === 'Enter') {
            this.props.setNewTaskText(newText)
        }
    }
    // Set text color depending on id of task marked as important
    toggleImportant() {
        const { todoId, setTaskColor } = this.props
        // Set new task color after task marked as important or not important
        setTaskColor(todoId)
    }
    // Set text style depending on id of task marked as done
    toggleDone() {
        const { todoId, setTaskTextDec } = this.props
        // Set new task text decoration style if task marked as done or not done
        setTaskTextDec(todoId)
    }

    // Decide whether render input or li element for task text
    getTaskTextElem(todoText) {
        const { todoId, bIsEdited, setTaskInEditId, color, textDec } = this.props
        const TaskInEditElem = <input
            onKeyDown={
                this.updateEditedTaskText
            }
            type="text"
            defaultValue={todoText}
        />
        const DefaultElem = <li
            style={{
                width: "150px",
                textDecoration: textDec,
                color: color,
            }}
            onClick={() =>
                setTaskInEditId(todoId)
            }>
            {todoText}
        </li >
        if (bIsEdited)
            return TaskInEditElem
        else
            return DefaultElem
    }
    render() {
        const { removeTask, todoText, todoDate, todoId } = this.props;
        return <div style={todoPointStyle}>
            {this.getTaskTextElem(todoText)}
            <button onClick={() => removeTask(todoId)} >X</button>
            <button onClick={this.toggleImportant} >!</button>
            <button onClick={this.toggleDone}>✓</button>
            <p style={todoDateStyle}>{todoDate}</p>
        </div>
    }
}

export default TodoPoint;