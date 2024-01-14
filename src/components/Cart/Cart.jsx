import React from "react";
import { Navigate, useNavigate} from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";



const Cart = () =>{ 

    const [finalizada, setFinalizada] = useState(false);
    const [cart, setCart] = useState([]);
    const navigate= useNavigate()

   
    const [preferenceId, setPreferenceId] = useState(null);
    const [ticket, setTicket] = useState(null);

    const fetchCart = async () => {
        try {
            let url = `${process.env.REACT_APP_DOMINIO_BACK}/api/carts/`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const data = await response.json();

            if (data.status == 200) {

                setCart(data.cart.products);
            } else {
                console.log(data)

            }
        } catch (error) {

            console.error('Error fetching products:', error);
        }
    }


    useEffect(() => { 
        
        if (getToken()==null||getToken()==undefined){    
        navigate("/login")
        }else{
            fetchCart()
        }
    },[])

    const renderCheckoutButton = (preferenceId) => {
        if (!preferenceId) return null;
    }
    
    const removeItem=async(id)=>{
        let status=0
        await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/carts/product/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:"include"
            })
            .then(response => {
                status= response.status
                if (status == 200) {
                    fetchCart()
                } else {
                    console.error("error");
                }
            })
            .catch(error => console.error(error))

        return status
    }

    const finalizarCompra = async()=>{
        if (cart){
            await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/carts/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:"",
            credentials:"include"
            })
            .then(response => response.json())
            .then(data => {
            
            setTicket(data.ticket_generado)
            setFinalizada(true)
            })
            .catch(error => console.error(error))
        }
    }

    const pagoMP = async()=>{
        if (cart){
            await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/create_preference`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(cart),
            credentials:"include"
        })
        .then((response) => {
          console.log("create_preference")
          return response.json();
        })
        .then((preference) => {
          setPreferenceId(preference.id);
          setFinalizada(true)
          console.log("set-create_preference")
        })
        .catch((error) => {
          console.error(error);
        })
        }
    }
    
    return (
        
        <div className="cartContainer">
            {!finalizada?<h1 className="detail-title cart-title">Carrito actual</h1>:<h1 className="detail-title">Carrito comprado</h1>}
            <div className="cartCard">
            {cart.length!=0?(!finalizada?(cart.map(producto=>
            
                <div key= {producto.productId._id} className="tarjetaProducto">
                    <h1>{producto.productId.title}</h1>
                    <h2>Cantidad: {producto.quantity}</h2>
                    <h3>Precio unitario: ${producto.productId.price}</h3>
                    <button className="button btnPrimary" onClick={()=>removeItem(producto.productId._id)}>Quitar del carrito</button>
                </div>
                
                )
                )
                :
                 
                 
                <div className="ticket">
                    <h1>Codigo de ticket: {ticket.code}</h1>
                    <h2>Total: ${ticket.amount}</h2>
                    <h3>Email automático enviado. Revise su casilla para ver el ticket.</h3>
                    <button className="button btnPrimary" onClick={()=>navigate("/")}>Menu Principal</button>
                </div>

                ):
                <div className="cart-empty">
                <Mensaje msj={"No hay productos en el carrito"} />
                <button className="button btnPrimary" onClick={()=>navigate("/")}>Menu Principal</button>
                </div>}
            <>
           
            </>
            
        </div>
        {(!finalizada&&cart.length!=0)&&<button className="button btnPrimary" onClick={()=>finalizarCompra()}>Finalizar Compra</button>}
            {
            
            //!finalizada&&<button onClick={()=>pagoMP()}>pagar MP </button>
            }
        </div>
    );
  } 
  
export default Cart;