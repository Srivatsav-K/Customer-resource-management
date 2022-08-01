import { useDispatch, useSelector } from "react-redux"
//--------------------------------------------------------------------------------------
import { closeSideBar } from "../actions/sidebarActions"
import SideBarItems from "./SideBarItems"
//--------------------------------------------------------------------------------------
import { Drawer } from "@mui/material"
//--------------------------------------------------------------------------------------

const SideBar = () => {
    const sidebar = useSelector((state) => state.sidebar)

    const dispatch = useDispatch()

    return (
        <>
            {/* not mobile */}
            <Drawer
                variant='permanent'
                sx={{
                    display: {
                        xs: 'none',
                        md: 'block'
                    },
                    [`& .MuiDrawer-paper`]: { width: '15%' }
                }}
            >

                <SideBarItems />
            </Drawer>

            {/* mobile */}
            <Drawer
                open={sidebar}
                onClose={() => dispatch(closeSideBar())}
                sx={{
                    display: {
                        xs: 'block',
                        md: 'none'
                    },
                    [`& .MuiDrawer-paper`]: { width: '40%' }
                }}
            >
                <SideBarItems mobile />
            </Drawer>
        </>


    )
}

export default SideBar