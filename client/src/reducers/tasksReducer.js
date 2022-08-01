import { GET_TASKS, POST_TASK, UPDATE_TASK, DELETE_TASK } from "../actions/taskActions"

const tasksInitialValue = {
    data: [],
    serverErrors: {},
    loading: false

}

const tasksReducer = (state = tasksInitialValue, action) => {
    switch (action.type) {
        case (GET_TASKS): {
            return { ...state, data: [...action.payload].reverse() }
        }
        case (POST_TASK): {
            return { ...state, data: [{ ...action.payload }, ...state.data] }
        }
        case (UPDATE_TASK): {
            return ({
                ...state,
                data: state.data.map((ele) => {
                    if (ele._id === action.payload._id) {
                        return { ...ele, ...action.payload }
                    } else {
                        return { ...ele }
                    }
                })
            })
        }
        case (DELETE_TASK): {
            return ({
                ...state,
                data: state.data.filter((ele) => {
                    return ele._id !== action.payload._id
                })
            })
        }
        default: {
            return { ...state }
        }
    }
}

export default tasksReducer