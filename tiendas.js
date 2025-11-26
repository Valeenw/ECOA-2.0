
let productosPorEstado = {};
let estadosDisponibles = [];
let carrito = [];


async function cargarDatosDeTienda() {
try {

const response = await fetch('animales.json');

if (!response.ok) {

throw new Error(`Error al cargar animales.json: ${response.status} ${response.statusText}`);
 }
 
productosPorEstado = await response.json();
estadosDisponibles = Object.keys(productosPorEstado).sort();
inicializarSelectorEstados();
} catch (error) {
console.error("FATAL ERROR: No se pudo cargar la base de datos de productos. Verifica el archivo animales.json.", error);
const selector = document.getElementById('select-estado');
        const contenedor = document.getElementById('productos-por-estado');

        if(selector) {
            selector.innerHTML = '<option value="">ERROR AL CARGAR DATOS</option>';
        }
if (contenedor) {
 contenedor.innerHTML = `<p class="error-carga">❌ Error de carga: ${error.message}. Asegúrate de que **animales.json** esté en la carpeta correcta y sin errores de sintaxis.</p>`;
}
}
}

function inicializarSelectorEstados() {
if (estadosDisponibles.length === 0) return;

const selector = document.getElementById('select-estado');
if (selector) {
selector.innerHTML = '<option value="">Selecciona un estado</option>';

estadosDisponibles.forEach(estado => {
const option = document.createElement('option');
option.value = estado;
option.textContent = estado;
selector.appendChild(option);
});
mostrarProductosPorEstado(''); 
}
}

function mostrarProductosPorEstado(estadoSeleccionado) {
const contenedor = document.getElementById('productos-por-estado');
 if (!contenedor) return;

if (!estadoSeleccionado || !productosPorEstado[estadoSeleccionado]) {
contenedor.innerHTML = '<p class="mensaje-espera">Selecciona un estado para comenzar a explorar los androides guardianes.</p>';
return;
}
const productos = productosPorEstado[estadoSeleccionado];
let htmlProductos = '';

productos.forEach(producto => {
htmlProductos += `
<div class="producto">
<img src="${producto.img}" alt="${producto.nombre}" class="img-producto">
<h3>${producto.nombre}</h3>
<p>${producto.descripcion}</p>
<span class="precio">$${producto.precio.toLocaleString('es-MX')} MXN</span>
<button class="btn-comprar" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">
Agregar al carrito
</button>
</div>
`;
 });

contenedor.innerHTML = htmlProductos;
}

function actualizarCarrito() {
const listaCarrito = document.getElementById('lista-carrito');
const totalSpan = document.getElementById('total');

if (!listaCarrito || !totalSpan) return;

listaCarrito.innerHTML = '';
let total = 0;

carrito.forEach((item, index) => {
const li = document.createElement('li');
    
li.innerHTML = `
            ${item.nombre} - $${item.precio.toLocaleString('es-MX')} MXN 
            <button class="btn-deshacer" onclick="eliminarDelCarrito(${index})">❌</button>
        `;
        
listaCarrito.appendChild(li);
total += item.precio;
});

totalSpan.textContent = `Total: $${total.toLocaleString('es-MX')} MXN`;
    localStorage.setItem('carritoECOA', JSON.stringify(carrito));
    localStorage.setItem('totalECOA', total.toString());
}

function agregarAlCarrito(nombre, precio) {
carrito.push({ nombre, precio });
actualizarCarrito();
alert(`Se agregó ${nombre} al carrito.`);
}

function eliminarDelCarrito(index) {

    const nombreEliminado = carrito[index].nombre;
    carrito.splice(index, 1);
    actualizarCarrito();
    alert(`Se eliminó ${nombreEliminado} del carrito.`);
}

function finalizarCompra() {
if (carrito.length === 0) {
alert("El carrito está vacío. Agrega un androide para finalizar la compra.");
return;
}
   
window.location.href = 'formulario_envio.html';
}
document.addEventListener('DOMContentLoaded', function() {
   
    if (document.getElementById('select-estado')) {
        cargarDatosDeTienda();
    }
});