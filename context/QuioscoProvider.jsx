import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()
const QuioscoProvider = ({children})=>{

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [paso, setPaso] = useState(1)
    const [nombre,setNombre] = useState('')
    const [total, setTotal] = useState()

    const router = useRouter()

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

    useEffect(()=>{
        const nuevoTotal = pedido.reduce((total, producto) =>(producto.precio * producto.cantidad)+total,0)
        setTotal(nuevoTotal)
    },[pedido])

    const handleClickCategoria= id =>{
        const categoria = categorias.filter(c => c.id === id)
        setCategoriaActual(categoria[0]);
        router.push('/')
    }

    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    const handleChangeModal = () =>{
        setModal(!modal)
    }
    const handleAgregarpedido = ({ categoriaId, ...producto}) =>{
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

    const handelEditarCantidades= (id)=>{
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }
    const handleEliminarProducto = (id)=>{
        const pedidoActualizado = pedido.filter( pedido => producto.id !== id)
        setProducto(pedidoActualizado)
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async (e) =>{
        e.preventDefault();
        
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
                pedido,
                handelEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
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