import React from 'react';

const todoPointStyle = {
    display: "flex",
    marginBottom: "5px"
}
const todoDateStyle = {
    fontSize: "15px",
    marginBlockStart: "0em",
    marginBlockEnd: "0em"
}


class TodoPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // If task marked as important
            bIsImportant: false,
            // If task marked as done
            bIsDone: false
        };
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
    // Set property "bIsImportant"
    toggleImportant() {
        const {todoId} = this.props
        const {bIsImportant} = this.state
        this.setState({
            ...this.state,
            bIsImportant: !bIsImportant
        });
        // Set new task color after task marked as important or not important
        this.props.setTaskColor(todoId, !bIsImportant)
    }
    // Set property "bIsDone"
    toggleDone() {
        const {todoId} = this.props
        const {bIsDone} = this.state
        this.setState(
            {
                ...this.state,
                bIsDone: !bIsDone
            }
        )
        // Set new task text decoration style if task marked as done or not done
        this.props.setTaskTextDec(todoId, !bIsDone)
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

        let CurrentElem
        bIsEdited ? CurrentElem = TaskInEditElem : CurrentElem = DefaultElem
        return CurrentElem
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