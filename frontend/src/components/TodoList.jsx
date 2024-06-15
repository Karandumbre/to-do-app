import React, { Component } from "react";
import { connect } from "react-redux";
import { DeleteTodo, UpdateTodo } from "../redux/action";
import Modal from "react-modal";
import CreateEditTodoComponent from "./CreateEditTodoComponent";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import style from "./../styles/style.module.css";

Modal.setAppElement("#root");
export class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
    };
    this.deleteTodo = this.deleteTodo.bind(this);
    this.openCloseModal = this.openCloseModal.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  deleteTodo() {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      this.props.DeleteTodoRequest(this.props.todo._id);
    }
  }

  openCloseModal() {
    this.setState({
      openModal: !this.state.openModal,
    });
  }

  updateTodo() {
    const obj = {
      ...this.props.todo,
      isCompleted: !this.props.todo.isCompleted,
    };
    this.props.UpdateTodoRequest(obj._id, obj);
  }

  render() {
    return (
      <React.Fragment>
        <tr>
          <td className={this.props.todo.isCompleted ? "completed" : ""}>
            {this.props.todo.title}
          </td>
          <td className={this.props.todo.isCompleted ? "completed" : ""}>
            {this.props.todo.description}
          </td>
          <td className={this.props.todo.isCompleted ? "completed" : ""}>
            {this.props.todo.priority}
          </td>
          <td className={this.props.todo.isCompleted ? "completed" : ""}>
            {this.props.todo.createdAt}
          </td>
          <td className={this.props.todo.isCompleted ? "completed" : ""}>
            {this.props.todo.dueDate}
          </td>
          <td className={style.actionsTd}>
            <button
              className="btn btn-primary mr-3 fa fa-edit"
              onClick={this.openCloseModal}
            >
              <FaEdit cursor="pointer" className="mr-2" color="text-white" />
            </button>

            <span>
              <button
                className={`btn btn-sm p-1 mr-3 ${
                  !this.props.todo.isCompleted ? "btn-success" : "btn-info"
                }`}
                onClick={this.updateTodo}
              >
                {this.props.todo.isCompleted ? "Re-Open" : "Done"}
              </button>
            </span>
            <button
              className="btn btn-danger fa fa-trash"
              onClick={this.deleteTodo}
            >
              <FaRegTrashAlt color="text-white" cursor="pointer" />
            </button>
          </td>
        </tr>
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.openCloseModal}
        >
          <CreateEditTodoComponent
            openCloseModal={this.openCloseModal}
            id={this.props.todo._id}
          ></CreateEditTodoComponent>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateTodoRequest: (id, data) => dispatch(UpdateTodo(id, data)),
    DeleteTodoRequest: (id) => dispatch(DeleteTodo(id)),
  };
};

export default connect(null, mapDispatchToProps)(TodoList);
