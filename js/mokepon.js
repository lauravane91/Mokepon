//variable global
let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3


function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
    sectionSeleccionarAtaque.style.display = "none"

    let botonMascotaJugador = document.getElementById("boton-mascota")
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra = document.getElementById("boton-tierra")
    botonTierra.addEventListener("click", ataqueTierra)

    let botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.addEventListener("click", reiniciarJuego)
    botonReiniciar.style.display = "none"

}

function seleccionarMascotaJugador() {
    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
    sectionSeleccionarMascota.style.display = "none"

    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
    sectionSeleccionarAtaque.style.display = "flex"

    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let spanMascotaJugador = document.getElementById("mascota-jugador")
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
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo")

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
    let spanVidasJugador = document.getElementById("vidas-jugador")

    let spanVidasEnemigo = document.getElementById("vidas-enemigo")

    let ataquesJugadorDiv = document.getElementById("ataques-del-jugador")

    let ataquesEnemigoDiv = document.getElementById("ataques-del-enemigo")

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

    let botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.addEventListener("click", reiniciarJuego)
    botonReiniciar.style.display = "block"
    
    let sectionMensajes = document.getElementById("mensajes")

    let parrafo = document.createElement("p")
    
    parrafo.innerHTML = resultadoFinal

    sectionMensajes.appendChild(parrafo)

    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.disabled = true
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.disabled = true
    let botonTierra = document.getElementById("boton-tierra")
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


