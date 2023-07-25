import React from "react";
import "./ItemListContainer.css";
import { useState, useEffect } from "react";
import {ItemList} from "../ItemList/ItemList"
import {useParams} from "react-router-dom";


export const ItemListContainer = ({greeting}) =>{
    const {category}= useParams();

    const [listaProd,setListaProd]= useState([]);
    const [loading,setLoading]= useState(true);
    let url=`${process.env.REACT_APP_DOMINIO_BACK}/api/products/`

    if (category){
      url=`${process.env.REACT_APP_DOMINIO_BACK}/api/products?category=${category}`
    }

      useEffect(() => { 

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
        {loading ? <p>cargando...</p> : <ItemList listaProd={listaProd}/>}
      </div>
   
    );
  }
  
