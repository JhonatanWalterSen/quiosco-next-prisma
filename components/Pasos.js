import { useRouter } from 'next/router'
import useQuiosco from '../hooks/useQuiosco'

const pasos = [
    {paso:1, nombre:'Menú', url:'/'},
    {paso:2, nombre:'Resumen', url:'/resumen'},
    {paso:3, nombre:'Datos y Total', url:'/total'},
]

const Pasos = () => {
    const {handleChangePaso,paso} =useQuiosco()
    const router = useRouter()

    const calcularProgreso= () =>{
        const porcentaje = (paso /3)*100
        return porcentaje
    }

    return (
        <>
            <div className='flex justify-between mb-5'>
                {pasos.map(paso =>(
                    <button
                        onClick={()=>{
                            router.push(paso.url)
                            handleChangePaso(paso.paso)
                        }}
                        key={paso.paso}
                        className="text-2xl font-bold"
                    >
                        {paso.nombre}
                    </button>
                ))}
            </div>

            <div className='bg-gray-100 mb-10'>
                <div style={{width: `${calcularProgreso()}%`}} className='rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white w-10'>

                </div>
            </div>
        </>
    )
}

export default Pasos