import React from 'react';


class TodoPoint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bIsImportant: false,
            bIsDone: false,
            date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + '; ' + new Date().getHours() + ":" + new Date().getMinutes()
        };
        this.toggleImportant = this.toggleImportant.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
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

    render() {
        const { removeTask, todoText } = this.props;
        return <div style={{ display: "flex", marginBottom: "5px" }}>
            <li style={{ textDecoration: this.getDoneStyle(), width: "150px", color: this.getTextColor() }}>{todoText}</li>
            <button onClick={() => removeTask(todoText)} >X</button>
            <button onClick={this.toggleImportant} >!</button>
            <button onClick={this.toggleDone}>✓</button>
            <ul style={{ fontSize: "15px" }}>{this.state.date}</ul>
        </div>
    }
}

export default TodoPoint;