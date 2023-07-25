import {Item} from "../Item/Item"
import "../Item/Item.css";

const ItemList = ({listaProd})=>{
    
    return (
        <div className="contenedorProductos">
            {listaProd.map(producto => <Item key={producto.id} producto={producto}/>)}
        </div>
    )
}
export  {ItemList}