import { INITIATING_TODO_DATA_REQUEST,FETCH_TODO_DATA_SUCCESS,FETCH_TODO_DATA_FAILURE } from './types';
import axios from 'axios';
import { notifyError, notifySuccess, notifyInfo, notifyWarn } from "./../common/toast";

const devUrl = 'http://localhost:4000/todos'

export const fetchTodoDataRequest = () => {
    return {
        type: INITIATING_TODO_DATA_REQUEST
    }
}

export const fetchTodoDataRequestSuccess = (data) => {
    return {
        type: FETCH_TODO_DATA_SUCCESS,
        payload: data
    }
}

export const fetchTodoDataRequestFailure = (error) => {
    return {
        type: FETCH_TODO_DATA_FAILURE,
        payload: error
    }
}



export const fetchRequest = (title = 'title', order = true) => {
    return (dispatch) => {
        dispatch(fetchTodoDataRequest())
        axios.get(`${devUrl}/${title}/${order}`).then(res => {
            dispatch(fetchTodoDataRequestSuccess(res.data))
        }).catch(error => {
            dispatch(fetchTodoDataRequestFailure(error.message))
        })
    }
}

export const UpdateTodo = (id,data) => {
  return (dispatch) => {
      dispatch(fetchTodoDataRequest())
      return axios
      .post(`${devUrl}/update/${id}`,data).then((res) => {
        notifyInfo(res.data);
        dispatch(fetchRequest());
      })
      .catch((error) => {
        notifyError(error.data);
      });
  }
}

export const CreateTodo = (data) => {
  return (dispatch) => {
      dispatch(fetchTodoDataRequest())
      axios.post(`${devUrl}/add`,data).then(res =>{
        notifySuccess(res.data.todo);
        dispatch(fetchRequest());
      }).catch(error => notifyError(error.data));
  }
}

export const DeleteTodo = (id) => {
  return (dispatch) => {
      dispatch(fetchTodoDataRequest())
      axios.delete(`${devUrl}/delete/${id}`).then((res) => {
      notifyWarn(res.data.todo);
      dispatch(fetchRequest());
    })
    .catch((error) => {
      notifyError(error.data);
    });
  }
}

export const SearchTodo = (field,data) => {
  return (dispatch) => {
      dispatch(fetchTodoDataRequest())
      axios.post(`${devUrl}/search`,{field,data}).then((res) => {
        dispatch(fetchTodoDataRequestSuccess(res.data))
      })
  }
}

export const FetchUserData = (id) => axios.get(`${devUrl}/${id}`)