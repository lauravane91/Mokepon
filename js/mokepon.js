//variable global

const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonFuego = document.getElementById("boton-fuego")
const botonAgua = document.getElementById("boton-agua")
const botonTierra = document.getElementById("boton-tierra")
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const inputHipodoge = document.getElementById("hipodoge")
const inputCapipepo = document.getElementById("capipepo")
const inputRatigueya = document.getElementById("ratigueya")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")
const ataquesJugadorDiv = document.getElementById("ataques-del-jugador")
const ataquesEnemigoDiv = document.getElementById("ataques-del-enemigo")
const sectionMensajes = document.getElementById("mensajes")

let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3


function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = "none"
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
    botonReiniciar.addEventListener("click", reiniciarJuego)
    botonReiniciar.style.display = "none"

}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = "none"
    sectionSeleccionarAtaque.style.display = "flex"
 
// después del punto se despliegan las propiedades
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Hipodoge"
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo"
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya"
    } else  {
        alert("Debes seleccionar una mascota")
    }

    seleccionarMascotaEnemigo()
}
//las variables no pueden incluir -, solo permite _
//Es recomendable dejar las variables sin guiones y dejar la segunda palabra que inicie en mayúscula

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1,3)
    
    if (mascotaAleatoria == 1){
            spanMascotaEnemigo.innerHTML="Hipodoge"
    } else if (mascotaAleatoria == 2) {
            spanMascotaEnemigo.innerHTML="Capipepo"
    } else  {
            spanMascotaEnemigo.innerHTML="Ratigueya"
    }

}

function ataqueFuego(){
    ataqueJugador = "Fuego"
    ataqueAleatorioEnemigo()
}
function ataqueAgua(){
    ataqueJugador = "Agua"
    ataqueAleatorioEnemigo()
}
function ataqueTierra(){
    ataqueJugador = "Tierra"
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio (1,3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "Fuego"
    } else if (ataqueAleatorio == 2){
        ataqueEnemigo = "Agua"
    } else {
        ataqueEnemigo = "Tierra"
    }

    combate()

}

function combate () {
    
       // Mostrar ataques seleccionados
    ataquesJugadorDiv.innerHTML += `<p>${ataqueJugador} ${obtenerEmoji(ataqueJugador)}</p>`
    ataquesEnemigoDiv.innerHTML += `<p>${ataqueEnemigo} ${obtenerEmoji(ataqueEnemigo)}</p>`


     if (ataqueEnemigo == ataqueJugador) {
        
    } else if (
        (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra") ||
        (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego") ||
        (ataqueJugador == "Tierra" && ataqueEnemigo == "Agua")
    ) {
        // GANASTE pero sin mostrar mensaje
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        // PERDISTE pero sin mostrar mensaje
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    // Revisar si alguien se quedó sin vidas
    revisarVidas()
}

function obtenerEmoji(ataque) {
    if (ataque === "Fuego") {
        return "🔥"
    } else if (ataque === "Agua") {
        return "💧"
    } else if (ataque === "Tierra") {
        return "🌱"
    } else {
        return ""
    }
}


function revisarVidas (){
    if (vidasEnemigo == 0)  {
        crearMensajeFinal("Felicidades GANASTE 🥳")
    } else if (vidasJugador == 0){
        crearMensajeFinal("Lo siento, PERDISTE 😔")
    } 
}

// metodos de manipulacion del DOM - innerHTML, createElement, appendChild, location.reload

function crearMensaje (resultado) {
    // dentro del parentesis va el parámetro de la función
    // el argumento es el valor que se asigna al parametro establecido en la función
    let sectionMensajes = document.getElementById("mensajes")

    let parrafo = document.createElement("p")
    // p es la etiqueta que quiero crear en el documento, en este caso p de párrafo
    parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + ", la mascota del enemigo atacó con " + ataqueEnemigo + " - " + resultado

    sectionMensajes.appendChild(parrafo)
    // appendChild es un método que permite agregar un nodo hijo dentro de otro nodo padre en el DOM (Document Object Model).
    // este codigo permite meter parrafo en la seccion mensajes de HTML
}

function crearMensajeFinal (resultadoFinal) {
    
    botonReiniciar.addEventListener("click", reiniciarJuego)
    botonReiniciar.style.display = "block"
    let parrafo = document.createElement("p")
    parrafo.innerHTML = resultadoFinal
    sectionMensajes.appendChild(parrafo)
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    //disable desabilita el botón cuando el mensaje final surge
}

function reiniciarJuego () {
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}


//window contiene todas las secciones del documento de HTML
//window es un objeto global
// load es el evento que se dispara cuando la página y todos sus recursos (como imágenes, scripts, estilos, etc.) han sido completamente cargados.
window.addEventListener("load",iniciarJuego)

//tablas de verdad: operadores
// && and
// || or
// ! not - convierte en negativo


