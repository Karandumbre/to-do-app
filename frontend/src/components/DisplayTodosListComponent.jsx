import React, { PureComponent } from "react";
import { connect } from "react-redux";
import TodoList from "./TodoList";
import style from "./../styles/style.module.css";
import Modal from "react-modal";
import CreateEditTodoComponent from "./CreateEditTodoComponent";
import SearchComponent from "./SearchComponent";
import { fetchRequest } from "../redux/action";

class DisplayTodosListComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      pending: [],
      completed: [],
      SummaryOrder: false,
      DescriptionOrder: false,
      PriorityOrder: false,
      CreatedAtOrder: false,
      DueDateOrder: false,
    };
  }

  static getDerivedStateFromProps({ currentState }, state) {
    let pendingData = [];
    let completedData = [];
    currentState &&
      currentState.forEach((element) => {
        element.isCompleted
          ? completedData.push(element)
          : pendingData.push(element);
      });
    state.pending = pendingData;
    state.completed = completedData;
    return true;
  }

  openCloseModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  todoList = (data) =>
    data && data.map((todo) => <TodoList todo={todo} key={todo._id} />);

  prepareTable = () => {
    return (
      <table className="table table-bordered table-hover border mt-3">
        {this.prepareTableColumns()}
        <tbody>{this.todoList(this.props.currentState)}</tbody>
      </table>
    );
  };

  prepareTablePendingData = () => {
    return (
      <table className="table table-bordered table-hover border mt-3">
        {this.prepareTableColumns()}
        <tbody>{this.todoList(this.state.pending)}</tbody>
      </table>
    );
  };

  prepareTableCompletedData = () => {
    return (
      <table className="table table-bordered table-hover border mt-3">
        {this.prepareTableColumns()}
        <tbody>{this.todoList(this.state.completed)}</tbody>
      </table>
    );
  };

  prepareTableColumns = () => {
    return (
      <thead>
        <tr>
          <th onClick={() => this.sortBy("title", "SummaryOrder")}>
            <p className="sort-by">Summary</p>
          </th>
          <th onClick={() => this.sortBy("description", "DescriptionOrder")}>
            <p className="sort-by">Description</p>
          </th>
          <th onClick={() => this.sortBy("priority", "PriorityOrder")}>
            <p className="sort-by">Priority</p>
          </th>
          <th onClick={() => this.sortBy("createdAt", "CreatedAtOrder")}>
            <p className="sort-by">Created At</p>
          </th>
          <th onClick={() => this.sortBy("dueDate", "DueDateOrder")}>
            <p className="sort-by">Due Date</p>
          </th>
          <th>
            <p>Actions</p>
          </th>
        </tr>
      </thead>
    );
  };

  sortBy = (fieldName, fieldOrder) => {
    this.setState(
      {
        [fieldOrder]: !this.state[fieldOrder],
      },
      () => {
        this.props.fetchInitialRequest(fieldName, this.state[fieldOrder]);
      }
    );
  };

  render() {
    return (
      <div className="container">
        <div className={style.header}>
          <h3>Todos List</h3>
          <button
            className={`btn btn-primary ${style.PlusButton}`}
            onClick={this.openCloseModal}
          >
            +
          </button>
        </div>
        <SearchComponent />

        <ul className="nav nav-tabs mt-4">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#home">
              All
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#menu1">
              Pending
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#menu2">
              Completed
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane container active p-0" id="home">
            {this.prepareTable()}
          </div>
          <div className="tab-pane container fade p-0" id="menu1">
            {this.prepareTablePendingData()}
          </div>
          <div className="tab-pane container fade p-0" id="menu2">
            {this.prepareTableCompletedData()}
          </div>
        </div>

        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.openCloseModal}
        >
          <CreateEditTodoComponent
            openCloseModal={this.openCloseModal}
            id={null}
          ></CreateEditTodoComponent>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentState: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialRequest: (title, order) => dispatch(fetchRequest(title, order)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayTodosListComponent);
