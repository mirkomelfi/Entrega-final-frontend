import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";



import { CartWidget } from "../CartWidget/CartWidget";

const Navbar = () =>{

    return (
        <header>
            
            
            <Link className="button-navbar" to="/login"><h3>Login</h3></Link>
            <Link to="/"><h1>Adiestramiento Canino Jirok</h1></Link>
            
            <nav>
                <Link className="button-navbar" to="/category/cursos"><h3>Cursos</h3></Link>
                <Link className="button-navbar" to="/category/seminarios"><h3>Seminarios</h3></Link>
                <Link className="button-navbar" to="/category/accesorios"><h3>Accesorios</h3></Link> 
                <CartWidget/>
                
                
            </nav>
        </header>
    );
  }
  
  export default Navbar;
  