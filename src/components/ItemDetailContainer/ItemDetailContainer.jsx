import React from "react";
import { useState, useEffect } from "react";
import {ItemDetail} from "../ItemDetail/ItemDetail"
import {useNavigate, useParams} from "react-router-dom";


const ItemDetailContainer = () =>{

    const {category,_id}= useParams();

    const [listaProd,setListaProd]= useState([]);
    const [loading,setLoading]= useState(true);
    const navigate= useNavigate()
    
    const navigateTo=(url)=>{
      navigate(url)
    }

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/products/${_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
      })
        .then(response => response.json())
        .then(data => {
            const producto= data
            setListaProd(producto)

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])

    return (
        <div className="itemDetail">
          {loading ? <p>Cargando...</p> : <ItemDetail pid={_id} listaProd={listaProd}/>}
          {category?
            <button class="button btnPrimary" onClick={()=>navigateTo(`/category/${category}`)}><span class="btnText">Volver</span></button>
            :
            <button class="button btnPrimary" onClick={()=>navigateTo(`/`)}><span class="btnText">Volver</span></button>
          }
        </div>
    );
  } 
  
export default ItemDetailContainer;