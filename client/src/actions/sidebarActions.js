export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR'
//--------------------------------------------------------------------------------------
export const toggleSideBar = () => {
    return { type: TOGGLE_SIDEBAR }
}

export const closeSideBar = () => {
    return { type: CLOSE_SIDEBAR }
}
//--------------------------------------------------------------------------------------