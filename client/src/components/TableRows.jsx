import { withRouter } from "react-router-dom"
import { format, parseISO } from 'date-fns'
//--------------------------------------------------------------------------------------
import { Link, TableCell, TableRow } from "@mui/material"
//--------------------------------------------------------------------------------------

const TableRows = (props) => {
    const { dataField, columns } = props

    return (
        <TableRow hover onClick={() => props.history.push(`${props.location.pathname}/${dataField._id}`)} >
            {
                columns.map((colField, i) => {
                    if (colField.type === 'url') {
                        return (
                            <TableCell key={i} sx={{ maxWidth: 100, wordWrap: 'break-word' }}>
                                <Link href={dataField[colField.value]} target='#'>
                                    {dataField[colField.value]}
                                </Link>
                            </TableCell>
                        )

                    } else if (colField.type === 'array') {
                        return (
                            <TableCell key={i}>
                                {dataField[colField.value].length}
                            </TableCell>
                        )

                    } else if (colField.type === 'date') {
                        return (
                            <TableCell key={i}>
                                {format(parseISO(dataField[colField.value]), "dd-MM-yyyy")}
                            </TableCell>
                        )
                    } else if (colField.value.includes('.')) {
                        const splitColFieldValue = colField.value.split('.')
                        return (
                            <TableCell key={i}>
                                {dataField[splitColFieldValue[0]][splitColFieldValue[1]]}
                            </TableCell>
                        )

                    } else {
                        return (
                            <TableCell key={i} sx={{ maxWidth: 200, wordWrap: 'break-word' }}>
                                {dataField[colField.value].toString()}
                            </TableCell>
                        )
                    }
                })
            }
        </TableRow >
    )
}

export default withRouter(TableRows)