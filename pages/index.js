import Head from 'next/head'
import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
import Layout from '../layout/Layout'


export default function Home() {
  const {categoriaActual} = useQuiosco()
  return (
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className='text-4xl fontblack'>Inicio</h1>
      <p>Elige y personaliza tu pedido a c</p>
    </Layout>
  )
}