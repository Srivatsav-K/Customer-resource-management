import TableHeadItem from "./TableHeadItem"
import TableRows from "./TableRows"
//--------------------------------------------------------------------------------------
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
//--------------------------------------------------------------------------------------

const TableComponent = (props) => {
    const { data, columns } = props

    return (
        (data.length > 0) ? (
            <TableContainer sx={{ maxHeight: '70vh' }} component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'primary.light' }}>
                            {columns.map((colField, i) => <TableHeadItem heading={colField.heading} key={i} />)}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((dataField) => <TableRows dataField={dataField} columns={columns} key={dataField._id} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        ) : (
            <Typography color='error' >
                No results found
            </Typography>
        )
    )
}
export default TableComponent