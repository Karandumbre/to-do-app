import React, { Component } from "react";
import { connect } from "react-redux";
import { UpdateTodo, CreateTodo, FetchUserData } from "../redux/action";
import style from "./../styles/style.module.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import ValidationSchema from "./../common/ValidationSchema";
import { today } from "./../common/today";

class CreateEditTodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      priority: "Low",
      isCompleted: false,
      dueDate: today(),
      page: "Create Todo",
    };
  }

  componentDidMount() {
    if (this.props.id) {
      this.setState({
        page: "Update Todo",
      });

      FetchUserData(this.props.id)
        .then((res) => {
          this.setState({
            title: res.data.title,
            description: res.data.description,
            priority: res.data.priority,
            isCompleted: res.data.isCompleted,
            dueDate: res.data.dueDate,
          });
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        page: "Create Todo",
      });
    }
  }

  onSubmit(fields) {
    const obj = {
      ...fields,
    };
    delete obj.page;
    if (this.props.id) {
      this.props.UpdateTodoRequest(this.props.id, obj);
    } else {
      this.props.CreateTodoRequest(obj);
      this.setState({
        title: "",
        description: "",
        priority: "",
        isCompleted: false,
        dueDate: today(),
      });
    }
    this.props.openCloseModal();
  }

  render() {
    return (
      <div className="container mt-3">
        <h3>{this.state.page}</h3>
        <hr />
        <Formik
          enableReinitialize={true}
          initialValues={this.state}
          validationSchema={ValidationSchema}
          onSubmit={(fields) => this.onSubmit(fields)}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="title">Summary</label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Summary"
                  className={
                    "form-control" +
                    (errors.title && touched.title ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  name="description"
                  as="textarea"
                  rows="4"
                  placeholder="Description"
                  className={
                    "form-control" +
                    (errors.description && touched.description
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-row">
                <div className="form-group col-6">
                  <label>Priority</label>
                  <Field
                    name="priority"
                    as="select"
                    className={
                      "form-control" +
                      (errors.priority && touched.priority ? " is-invalid" : "")
                    }
                  >
                    <option value="None">None</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Field>
                  <ErrorMessage
                    name="priority"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group col-6">
                  <label>Due Date</label>
                  <Field
                    name="dueDate"
                    as="input"
                    type="date"
                    className={
                      "form-control" +
                      (errors.dueDate && touched.dueDate ? " is-invalid" : "")
                    }
                  ></Field>
                  <ErrorMessage
                    name="dueDate"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <hr />
              <div className={`form-group + ${style.flexButtonDiv}`}>
                <button type="submit" className="btn btn-primary mr-2">
                  {this.state.page}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => this.props.openCloseModal()}
                >
                  Close
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateTodoRequest: (id, data) => dispatch(UpdateTodo(id, data)),
    CreateTodoRequest: (data) => dispatch(CreateTodo(data)),
  };
};

export default connect(null, mapDispatchToProps)(CreateEditTodoComponent);
