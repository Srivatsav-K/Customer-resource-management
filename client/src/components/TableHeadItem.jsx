import { TableCell } from "@mui/material"

const TableHeadItem = (props) => {
    const { heading } = props
    return (
        <TableCell sx={{ color: 'white' }}>
            {heading}
        </TableCell>
    )
}

export default TableHeadItem

