import {Item} from "../Item/Item"



const ItemList = ({listaProd})=>{
    
    return (
        <div className="contenedorProductos">
            {listaProd.map(producto => <Item key={producto.id} producto={producto}/>)}
        </div>
    )
}
export  {ItemList}