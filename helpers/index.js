export const formatearDinero = cantidad =>{
    return cantidad.toLocaleString('en-PE',{
        style: 'currency',
        currency: 'PEN'
    })
}
