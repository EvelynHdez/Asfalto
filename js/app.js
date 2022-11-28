const carrito = document.getElementById("carrito");
const productos = document.getElementById("lista-productos");
const listaProductos = document.querySelector("#lista-carrito tbopdy");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
    productos.addEventListener("click", comprarProducto);
    carrito.addEventListener("click", eliminarProducto);
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
    document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarProducto(e)
{
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')){
    const producto = e.target.parentElement.parentElement;
    leerDatosProducto(producto);
  }
}

function leerDatosProducto(producto){
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContet,
        precio: producto.querySelector('.precio span').textContet,
        id: producto.querySelector('a').getAttribute('data-id')
    }
insertarCarrito(infoProducto);
}

function insertarCarrito(producto){
    const row = document.createElement('tr');
    row.innerHTML =
    <><td>
            <img src="${producto.imagen}" width="100"></img>
            </td>
            <td>${producto.titulo}</td><td>${producto.precio}</td><td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
            </td></>
            ;
            listaProductos.appendChild(row);
            guardarProductoLocalStorage(producto);
}

function eliminarProducto(e)
{
    e.preventDefault();

    let producto,
    productoId;

    if(e.target.classList.contains('borrar-producto')){
        e.target.parentElement.parentElement.remove();
        platillo=e.target.parentElement.parentElement;
        productoId=producto.querySelector('a').getAttribute('data-i');
    }
    eliminarProductoLocalStorage(productoId)
}

function vaciarCarrito()
{
    while(listaProductos.firstChild){
        listaProductos.removeChild(listaProductos.firstChild);
    }

    vaciarLocalStorage();

    return false;
}

function guardarProductoLocalStorage(producto)
{
    let productos;

    productos = obtenerProductosLocalStorage();
    productos.push(producto);

    localStorage.setItem('prodcutos', JSON.stringify(productos))
}

function guardarProductoLocalStorage(){
    let productoLS;
    if(localStorage.getItem('productos') === null){
        productoLS=[];
    } else{
        productoLS = JSON.parse(localStorage.getItem('prodcutos'));
    }
    return productoLS;
}

function leerLocalStorage()
{
    let productoLS;

    productoLS = obtenerProductosLocalStorage();
    
    productoLS.forEach(function(producto){
    const row= document.createElement('tr');
    row.innerHTML = 
    <><td>
            <img src="${producto.imagen}" width="100"></img>
        </td><td>${producto.titulo}</td><td>${producto.precio}</td><td> <a href="#" class="borrar-porducto" data-id="${producto.id}">X</a>
            </td></>
        
        ;
        listaProductos.appendChild(row);
    });
}

function eliminarProductoLocalStorage(productos)
{
    let productoLS;
    productoLS = obtenerProductosLocalStorage();

    productoLS.forEach(function(productosLS, index){
        if(productosLS === producto)
        {
            productosLS.splice(index, 1);
        }
    });
 localStorage.setItem('porductos', JSON.stringify(productosLS));
}

function vaciarLocalStorage()
{
    localStorage.clear();
}






