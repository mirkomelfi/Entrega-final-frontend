import React from "react";

import { useState, useEffect } from "react";
import {ItemList} from "../ItemList/ItemList"
import {useNavigate, useParams} from "react-router-dom";
import { getToken } from "../../utils/auth-utils";


export const ItemListContainer = ({greeting}) =>{
    const {category}= useParams();

    const [listaProd,setListaProd]= useState([]);
    const [loading,setLoading]= useState(true);
    const navigate= useNavigate()

    let url=`${process.env.REACT_APP_DOMINIO_BACK}/api/products/`

    useEffect(() => { 
      console.log(getToken())
     
    if (getToken()==null||getToken()==undefined){
      console.log(getToken())
      navigate("/login")
    }
  },[])

      useEffect(() => { 

        if (category){
          url=`${process.env.REACT_APP_DOMINIO_BACK}/api/products?category=${category}`
        }
        fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }

        })
          .then(response => response.json())
          .then(data => {
              const productos= data
              setListaProd(productos.docs)

          })
          .catch(error => console.error(error))
          .finally(()=>{
            setLoading(false)
          })
      },[category])

    return (
      <div>
        <h1 className="greeting">{greeting}</h1>
        <br></br>
        {category&&<h2 className="greeting">{category.toUpperCase()}</h2>}
        {loading ? <p>cargando...</p> : <div className="contenedorProductos"> <ItemList listaProd={listaProd}/></div>}
      </div>
   
    );
  }
  
