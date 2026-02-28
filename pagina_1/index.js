
//El js debe incluir dos funciones, una que cambie un texto y otra que incluya una sentencia de control cuya función sea coherente con su pagina.

function cambiarTexto() {
    document.getElementById("texto").innerHTML = "¡El texto ha sido cambiado!";
}

function verificarEdad() {
    var edad = prompt("Por favor, ingresa tu edad:");
    
    if (edad >= 18) {
        alert("¡Eres mayor de edad!");
    } else {
        alert("Lo siento, eres menor de edad.");
    }
}