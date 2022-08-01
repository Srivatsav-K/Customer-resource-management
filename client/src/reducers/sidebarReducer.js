import { CLOSE_SIDEBAR, TOGGLE_SIDEBAR } from "../actions/sidebarActions"

const sidebarInitialValue = false

const sidebarReducer = (state = sidebarInitialValue, action) => {
    switch (action.type) {
        case (TOGGLE_SIDEBAR): {
            return !state
        }
        case (CLOSE_SIDEBAR): {
            return false
        }
        default: {
            return false
        }
    }
}

export default sidebarReducer