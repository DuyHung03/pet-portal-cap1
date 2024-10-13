import { Group } from '@mantine/core';
import { useLocation } from 'react-router-dom';

function ProductDetails() {
    const location = useLocation();
    const { product } = location.state;
    console.log(product);

    return <Group>{product.id}</Group>;
}

export default ProductDetails;
