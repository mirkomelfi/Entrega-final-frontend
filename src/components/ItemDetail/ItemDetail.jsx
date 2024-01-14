

import ItemCount from "../ItemCount/ItemCount";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

import { Navigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";



const ItemDetail = ({pid,listaProd})=>{

    const [agregado,setAgregado]=useState(false)
    const [error,setError]=useState(false)
    const [mensaje,setMensaje]=useState(null)
    
    const navigate= useNavigate()
    
    const onAdd = async (contador) => {
        try {

            const cantidadUpdated={quantity:contador}
                
            const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/carts/product/${pid}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify(cantidadUpdated),
                    credentials:"include"
                })

            const data = await response.json()

            if(response.status == 200) {
                setAgregado(true);
                setError(false)
     
            } else {

                if (response.status==401){
                    setError(true)
                    setMensaje(data.message)
                }

            }


        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="productoContainer"> 
    <div className="tarjetaProducto">
        { (!error)
            ? 
        <div className="infoProd">
            
            <h1 className="atributo title-h1">{listaProd.title}</h1>
            <h2 className="atributo">{listaProd.description}</h2>
            <h3 className="atributo">${listaProd.price}</h3>

            {(!agregado ? <ItemCount stock={listaProd.stock} onAdd={onAdd}/> :  
            
            <>
                
            <button  onClick={()=>navigate(`/cart`)} className="button btnPrimary"> Ver Carrito</button><button onClick={()=>navigate(`/`)}  className="button btnPrimary">Seguir comprando</button>
                
            </>)}
        </div>
        : 
            <Mensaje msj={mensaje} />

            }
            
        </div>
        </div>
    )
}
export  {ItemDetail}