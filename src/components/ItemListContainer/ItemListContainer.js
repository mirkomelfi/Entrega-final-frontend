import React from "react";
import "./ItemListContainer.css";
import { useState, useEffect } from "react";
import {ItemList} from "../ItemList/ItemList"
//import {useParams} from "react-router-dom";


export const ItemListContainer = ({greeting}) =>{
    //const {category}= useParams();
    //console.log("category",category)
    const [listaProd,setListaProd]= useState([]);
    const [loading,setLoading]= useState(true);

      useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/products/`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }

        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
              //const productos= data.docs
              const productos= data
              setListaProd(productos)
              console.log("productos",productos)
          })
          .catch(error => console.error(error))
          .finally(()=>{
            setLoading(false)
          })
      },[])

    return (
      <div>
        <h1 className="greeting">{greeting}</h1>
        {loading ? <p>cargando...</p> : <ItemList listaProd={listaProd}/>}
      </div>
   
    );
  }
  
