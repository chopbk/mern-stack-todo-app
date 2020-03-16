import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false,
            msg: ''
        }
        // make sure to bind those methods to this 
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleAlternate = this.handleAlternate.bind(this);
    }
    //On change form
    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }
        axios.post('/todos/add', newTodo)
            .then(res => {
                console.log(res.data)
                this.setState({ msg: 'todo added successfully' });
            })
            .catch(error => {
                console.log(error);
                this.setState({ msg: 'todo add failed.' });
            })
        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false,
        })
        //this.props.history.push('/');

    }
    handleAlternate(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }
        axios.post('/todos/add', newTodo)
            .then(res => {
                console.log(res.data)
                this.setState({ msg: 'todo added successfully' });
            })
            .catch(error => {
                console.log(error);
                this.setState({ msg: 'todo add failed.' });
            })
        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false,
        })
    }
    render() {
        const { msg } = this.state;
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Tạo công việc mới</h3>
                <form onSubmit={this.onSubmit}>
                    {msg !== '' &&
                        <div className="alert alert-warning alert-dismissible" role="alert">
                            {msg}
                        </div>
                    }
                    <div className="form-group">
                        <label>Mô tả: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_description}
                            onChange={this.onChangeTodoDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Nguời chịu trách nhiệm: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.todo_responsible}
                            onChange={this.onChangeTodoResponsible}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="prioritylow"
                                value="low"
                                checked={this.state.todo_priority === 'low'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="prioritymedium"
                                value="medium"
                                checked={this.state.todo_priority === 'medium'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityhigh"
                                value="high"
                                checked={this.state.todo_priority === 'high'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">high</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Tạo công việc" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}