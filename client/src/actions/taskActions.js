import axios from "axios";
import { toast } from "react-toastify";
//---------------------------------------------------------------------------------------------
export const TASKS_ERRORS = "TASKS_ERRORS";
export const GET_TASKS = "GET_TASKS";
export const POST_TASK = "POST_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
//--------------------------------------------------------------------------------------------
const tasksServerErrors = (errors) => {
  return { type: TASKS_ERRORS, payload: errors };
};
//--------------------------------------------------------------------------------------------

// get data
const getTasks = (data) => {
  return { type: GET_TASKS, payload: data };
};

const postTask = (data) => {
  return { type: POST_TASK, payload: data };
};

const updateTask = (data) => {
  return { type: UPDATE_TASK, payload: data };
};
const deleteTask = (data) => {
  return { type: DELETE_TASK, payload: data };
};
//-----------------------------------------------------------------------------------------------

export const startGetTasks = () => {
  return (dispatch) => {
    axios
      .get("/api/tasks", {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.errors) {
          dispatch(tasksServerErrors(result));
        } else {
          dispatch(getTasks(result));
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
};

//helper
const serverErrorHelper = (errors) => {
  const fieldErrors = {};
  for (let key in errors) {
    fieldErrors[key] = errors[key].message;
  }
  return fieldErrors;
};

export const startPostTask = (formData, resetForm, setErrors) => {
  return (dispatch) => {
    axios
      .post("/api/tasks", formData, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.errors) {
          setErrors(serverErrorHelper(result.errors));
        } else {
          dispatch(postTask(result));
          resetForm();
        }
      });
  };
};

export const startUpdateTask = (
  _id,
  formData,
  resetForm,
  setErrors,
  toggleEdit
) => {
  return (dispatch) => {
    axios
      .put(`/api/tasks/${_id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.errors) {
          setErrors(serverErrorHelper(result.errors));
        } else {
          dispatch(updateTask(result));
          toast.success("Updated successfully!");
          if (toggleEdit) {
            toggleEdit();
          }
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
};

export const startDeleteTask = (_id) => {
  return (dispatch) => {
    axios
      .delete(`/api/tasks/${_id}`, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.errors) {
          toast.error(result.errors.message);
        } else {
          dispatch(deleteTask(result));
          toast.success("Deleted Successfully!");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
};
