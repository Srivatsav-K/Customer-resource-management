import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

//--------------------------------------------------------------------------------------

import { startDeleteProduct } from '../actions/productActions';

//--------------------------------------------------------------------------------------

import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//--------------------------------------------------------------------------------------

const ProductItem = (props) => {
    const { _id, title, description, basePrice } = props

    const user = useSelector((state) => state.user.data)

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(startDeleteProduct(_id))
    }

    return (
        <Grid item width={200} height={350}>

            <Card>
                <CardActionArea onClick={() => props.history.push(`/user/products/${_id}`)}>
                    <CardMedia
                        component='img'
                        height='140'
                        image='https://source.unsplash.com/random'
                        alt='unsplash image'
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h5" noWrap >
                            {title}
                        </Typography>
                        <Typography gutterBottom component='div' variant="body2" color="text.secondary" noWrap >
                            {description}
                        </Typography>
                        <Typography gutterBottom component='div' variant="body2" color="text.secondary" noWrap >
                            ₹ {basePrice}
                        </Typography>
                    </CardContent>

                </CardActionArea>

                {user.role === 'admin' && (
                    <CardActions>
                        <IconButton color="primary" onClick={() => props.history.push(`/user/products/${_id}`)} >
                            <EditIcon />
                        </IconButton>

                        <IconButton color="error" onClick={handleDelete} >
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                )}
            </Card>
        </Grid>
    )
}

export default withRouter(ProductItem)