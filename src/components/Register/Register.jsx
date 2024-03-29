import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { Link } from "react-router-dom"
import { setToken } from "../../utils/auth-utils"

export const Register = () => {

    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        if (!cliente.email||!cliente.password){

            setMensaje("faltan datos")
        }
       
        else{

            const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/session/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente),
                credentials: "include"
            })

            const data = await response.json()

                if(response.status == 200) {
                    setMensaje("Cuenta creada. Loggearse para continuar")
        
                } else {

                    if (response.status==401){
                        setMensaje(data.message)
                    }

                }
                
                
            e.target.reset() //Reset form
        }
    }
    return (
        <div>
            {!mensaje?(
        <>
        <div className="container divForm" >
            <h3>Formulario de registro</h3>
            <form onSubmit={consultarForm} ref={datForm}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="first_name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Apellido</label>
                    <input type="text" className="form-control" name="last_name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Edad</label>
                    <input type="number" className="form-control" name="age" required  />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="password" required />
                </div>

                <button type="submit" className="button btnPrimary">Registrar</button>
                </form>

            </div>
        </>):<><Mensaje msj={mensaje} /><button className="button btnPrimary" onClick={()=>navigateTo(`/login`)}> Ir a comprar</button></>
        }
        </div>
    )
}