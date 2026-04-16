let totalAcumulado = 0;
let cantidadItems = 0;
// Elementos del DOM
const botonesAgregar = document.querySelectorAll('.btn-agregar'); //querySelectorAll para seleccionar todos los botones de agregar
const listadeCarrito = document.querySelector('#listaCarrito');
const totalCarrito = document.querySelector('#total');
const badge = document.querySelector('#badge');
const btnVaciar = document.querySelector('#btn-vaciar');
const mensajeVacio = document.querySelector('#mensaje-vacio');


//Funciones para actualizar badge y total acumulado
function updateBadge() {
    badge.textContent = cantidadItems;
}
function updateTotal() {
    totalCarrito.textContent = totalAcumulado.toLocaleString('es-CO');
}
// Como tengo 4 botones, con forEach hago un EventListener a cada uno, traigo nombre y precio de los atributos data 
botonesAgregar.forEach(function (boton) {
    boton.addEventListener('click', function () {
        const nombre = boton.dataset.nombre;
        const precio = parseInt(boton.dataset.precio);
        agregarAlCarrito(nombre, precio);
    })
})
//Creo la función agregar al carritoo
function agregarAlCarrito(nombre, precio) {
    mensajeVacio.style.display = 'none';
    //Creo el elemento de la lista (li) con el nombre y precio, se agrega clase item-carrito y el boton eliminar
    const li = document.createElement('li');
    li.classList.add('item-carrito');
    li.innerHTML = `
   <strong>${nombre}</strong> $${Number(precio).toLocaleString('es-CO')}
   <button class="btn btn-sm btn-outline-danger btn-eliminar">✕</button>
   `;
    //Lo agrego al carrito (ul)
    listadeCarrito.appendChild(li)
     //Agrego animacion de rebote para el badge cada que se agregue un producto
badge.classList.remove('animar-rebote'); 
    void badge.offsetWidth;               
    badge.classList.add('animar-rebote');
  
    cantidadItems++;
    totalAcumulado += Number(precio);

    //Llamo las funciones para actualizar badge y total acumulado
    updateBadge();
    updateTotal();
    //Agrego EventListener al boton eliminar y llama a la funcion eliminarItem(li, precio)
    const btnEliminar = li.querySelector('.btn-eliminar')
    btnEliminar.addEventListener('click', function () {
        eliminarItem(li, precio)
    }
    )
}
function eliminarItem(li, precio){
    //Remuevo el elemnto li
    li.remove();
    // Actualizo las variables haciendo el respectivo decremento
    cantidadItems--;
    totalAcumulado -= Number(precio);
    //Llamo las funciones para actualizar badge y total acumulado
    updateBadge();
    updateTotal();
    //Hago un condicional para que cuando cantidadItems este en 0 de nuevo, me muestre el mensaje de vacio
    if(cantidadItems === 0){
        mensajeVacio.style.display = 'block';
    }
}
btnVaciar.addEventListener('click', function(){
    const confirmarVaciar = confirm("¿Estás seguro de que deseas vaciar todo el carrito?");
    if(confirmarVaciar){

    //Elimino todos los li
    listadeCarrito.querySelectorAll('li:not(#mensaje-vacio)').forEach(li => li.remove())
    //Reinicio badge y total acumulado
    cantidadItems = 0;
    totalAcumulado = 0;
 //Llamo las funciones para actualizar badge y total acumulado
     updateBadge();
    updateTotal();
    // Muestro el mensaje de vacio
    mensajeVacio.style.display = 'block';
 
    }
})