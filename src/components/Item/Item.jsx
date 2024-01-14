

import {Link} from "react-router-dom";

const Item =({producto})=>{

    return(
        <>
            <div className="tarjetaProducto">
                <h2 className="detail-title">{producto.title}</h2>
                <h2>{producto.description}</h2>
                <h3>${producto.price}</h3>
                <Link to={`producto/${producto._id}`}>Ver más</Link> 
            </div>
        </>
    )
}

export {Item}