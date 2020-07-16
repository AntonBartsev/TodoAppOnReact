import React from 'react';

class TodoPoint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bIsImportant: false
        };
        this.toggleImportant = this.toggleImportant.bind(this);
    }

    toggleImportant() {
        this.setState({
            ...this.state,
            bIsImportant: !this.state.bIsImportant
        });
    }

    getTextColor() {
        return this.state.bIsImportant ? "red" : "black";
    }

    render() {
        const { removeTask, todoText } = this.props;

        return <div style={{ display: "flex", marginBottom: "5px" }}>
            <li style={{ width: "150px", color: this.getTextColor() }}>{todoText}</li>
            <button onClick={() => removeTask(todoText)} >X</button>
            <button onClick={this.toggleImportant} >!</button>
        </div>
    }
}

export default TodoPoint;