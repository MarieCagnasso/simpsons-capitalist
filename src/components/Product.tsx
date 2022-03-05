import {Services} from "../Services";
import {Product} from "../world";

type ProductProps = {
    prod: Product
    services: Services
}
function ProductComponent({ prod, services } : ProductProps) {
    return (
        <div> {prod.name} </div>
    )
}
export default ProductComponent;

