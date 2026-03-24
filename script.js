// Función para copiar códigos al portapapeles
function copiarCodigo(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        // Esto crea una pequeña alerta visual
        alert("¡Código copiado con éxito! Ya puedes pegarlo en tu proyecto.");
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// Función por si quieres que los botones de navegación tengan efectos de sonido o algo más
document.querySelectorAll('.btn').forEach(boton => {
    boton.addEventListener('click', () => {
        console.log("Botón presionado: " + boton.innerText);
    });
});
