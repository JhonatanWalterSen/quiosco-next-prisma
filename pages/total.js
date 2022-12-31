import { use, useEffect, useCallback } from "react";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";


export default function Total() {
    const { pedido, nombre, setNombre, colocarOrden, total }=useQuiosco()

    const comprobarPedido = useCallback(() =>{
        return pedido.length === 0 || nombre === '' || nombre.length < 3
    },[pedido, nombre])

    useEffect(() => {
        comprobarPedido()
    }, [pedido, comprobarPedido])


    

    return(
        <Layout pagina="Total y Confirmar pedido">
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

            <form
                onSubmit={colocarOrden}
            >
                <div>
                    <label htmlFor="nombre" className="block uppercase text-slate-800 text-xl font-bold">Nombre</label>
                </div>
                <input id="nombre" type='text'
                    onChange={e=> setNombre(e.target.value)}
                    className="bg-gray-200 w-full mt-3 lg:w-1/3 p-2 rounded"></input>

                <div className="mt-10 text-2xl">
                    <p>Total a pagar: <span className="font-bold">{formatearDinero(total)}</span> </p>
                </div>

                <div className="mt-5">
                    <input disabled={comprobarPedido()} type="submit" className={`${comprobarPedido()?'bg-indigo-100': 'bg-indigo-700'} w-full text-center lg:w-auto text-white  uppercase px-6 py-2 rounded font-bold`} value="Confirmar Pedido"></input>
                </div>
            </form>
        </Layout>
    )
}