import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const QuioscoContext = createContext()
const QuioscoProvider = ({children})=>{

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])

    const obtenerCategorias = async() =>{
        const {data} = await axios('/api/categorias')
        setCategorias(data);
    }

    useEffect(()=>{
        obtenerCategorias()
    },[])

    useEffect(()=>{
        setCategoriaActual(categorias[0])
    },[categorias])

    const handleClickCategoria= id =>{
        const categoria = categorias.filter(c => c.id === id)
        setCategoriaActual(categoria[0]);
    }

    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    const handleChangeModal = () =>{
        setModal(!modal)
    }
    const handleAgregarpedido = ({ categoriaId,imagen, ...producto}) =>{
        if (pedido.some(productoState => productoState.id === producto.id)) {
            const pedidoActualzado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualzado)

            toast.success('Actualizado Correctamente')
        }else{
            setPedido([...pedido,producto])
            toast.success('Agregado al pedido')
        }
        setModal(false)
    }

    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarpedido,
                pedido
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export{
    QuioscoProvider
}

export default QuioscoContext