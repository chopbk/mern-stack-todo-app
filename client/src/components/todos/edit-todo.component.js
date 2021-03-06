import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    componentDidMount() {
        axios.get('/todos/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

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

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };
        console.log(obj);
        axios.put('/todos/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/todos');
    }
    onClick(e) {
        e.preventDefault();
        axios.delete('/todos/' + this.props.match.params.id + + this.props.match.params.id)
            .then(res => console.log(res.data));

        this.props.history.push('/todos');
    }
    render() {
        return (
            <div>
                <h3 align="center">Thay đổi thông tin</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Mô tả: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_description}
                            onChange={this.onChangeTodoDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Chịu trách nhiệm: </label>
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
                            <label className="form-check-label">Thấp</label>
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
                            <label className="form-check-label">Trung Bình</label>
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
                            <label className="form-check-label">Cao</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"
                            id="completedCheckbox"
                            type="checkbox"
                            name="completedCheckbox"
                            onChange={this.onChangeTodoCompleted}
                            checked={this.state.todo_completed}
                            value={this.state.todo_completed}
                        />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Hoàn thành
                        </label>
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Thay đổi" className="btn btn-primary" />
                    </div>
                    <div>
                        <button onClick={this.onClick} type="button" className="btn btn-primary"> Xóa </button>
                    </div>
                </form>
            </div>
        )
    }
}