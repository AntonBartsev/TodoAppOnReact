import React from 'react';


class TodoPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bIsImportant: false,
            bIsDone: false,
            bIsInEdit: false
        };
        this.toggleImportant = this.toggleImportant.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
    }

    editTask = () => {
        const newState = {
            ...this.state,
            bIsInEdit: true
        }
        this.setState(newState)
    }

    updateValue = (event) => {
        const newText = event.target.value;
        const oldText = event.target.defaultValue
        if (event.key === 'Enter') {
            const newState = {
                ...this.state,
                bIsInEdit: !this.state.bIsInEdit
            }
            this.props.changeText(oldText, newText)
            this.setState(newState)
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

    wichElement = (content) => {
        const EditElem = <input onKeyDown={this.updateValue} type="text" defaultValue={content}></input>
        const DefaultElem = <li style={{ textDecoration: this.getDoneStyle(), width: "150px", color: this.getTextColor() }} onClick={this.editTask}>
            {content}</li>
        return (this.state.bIsInEdit) ?
            EditElem
            :
            DefaultElem
    }



    render() {
        const { removeTask, todoText, todoDate } = this.props;
        return <div style={{ display: "flex", marginBottom: "5px" }}>
            {this.wichElement(todoText)}
            <button onClick={() => removeTask(todoText)} >X</button>
            <button onClick={this.toggleImportant} >!</button>
            <button onClick={this.toggleDone}>✓</button>
            <ul style={{ fontSize: "15px" }}>{todoDate}</ul>
        </div>
    }
}

export default TodoPoint;