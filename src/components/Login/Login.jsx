import { useRef } from "react"
import { useState,useEffect } from "react"
import { Navigate } from "react-router-dom"
import { Mensaje } from "../Mensaje/Mensaje"
import { Link } from "react-router-dom"
export const Login = () => {
    
    const[ loggeado,setLoggeado]=useState(false)
    const[ error,setError]=useState(false)
    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef()

    const consultarLoggeo=async()=>{
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/session/current`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:"include"
        })
        const data = await response.json()
        if (response.status==200)setLoggeado(true)
        if (response.status==401)setLoggeado(false)
        

    }

    useEffect(() => { 
        consultarLoggeo()
    },[])


    const desloggear=async()=>{
        const response= await  fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/session/logout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:"include"
        })
        const data = await response.json()
        if (response.status==200){setLoggeado(false)}
        setMensaje(data.message)

    }


    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()
        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
       
        if (!cliente.email||!cliente.password){
            setError(true)
            setMensaje("faltan datos")
        }
       
        else{

            const response =  await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/session/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente),
                credentials: "include"
            })
            const data = await response.json()

            if(response.status == 200) {
                setError(false)
                setLoggeado(true)
     
            } else {

                if (response.status==401){
                    setError(true)
                    setMensaje(data.message)
                }

            }

            e.target.reset() //Reset form
        }
    }
    
    return (

        <div>
            {!error?(
        <>
            <div className="container divForm" >
                <h3>Formulario de Inicio de Sesion</h3>
                <form onSubmit={consultarForm} ref={datForm}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" name="password" />
                    </div>

                    <button type="submit" className="btn btn-primary">Iniciar Sesion</button>
                </form>
                {loggeado&&<button onClick={()=>desloggear()} className="btn btn-primary">Cerrar Sesion</button>}
                {loggeado&&<Link to="/"><button>Ir a comprar</button></Link>}
                {!loggeado&&<Link to="/password"><button>Olvide Mi contraseña</button></Link>}
            </div>
        </>):<Mensaje msj={mensaje} />
        }
        </div>
    )
}