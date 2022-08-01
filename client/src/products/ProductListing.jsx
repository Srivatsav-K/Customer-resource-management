import ProductItem from './ProductItem';
//--------------------------------------------------------------------------------------

import { Grid } from '@mui/material';

//--------------------------------------------------------------------------------------

const ProductListing = ({ products }) => {

    return (
        <Grid item container spacing={2} justifyContent={{ xs: 'center', lg: 'initial' }} >
            {products.map((product) => {
                return (
                    <ProductItem {...product} key={product._id} />
                )
            })}

        </Grid>
    )
}

export default ProductListing