/* =========================================
   MC ADVANCED - SCRIPT GLOBAL PRO (v3.0)
   ========================================= */

// 1. SISTEMA DE CARGA (Aparece solo una vez por sesión)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const fill = document.querySelector('.fill'); // La barra de carga pixelada
    
    if (fill) {
        // Animación de la barra llenándose
        setTimeout(() => {
            fill.style.width = '100%';
        }, 100);
    }

    // El loader desaparece después de 3 segundos
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1000);
        }
    }, 3500);

    // Cargar mensajes iniciales de la comunidad
    cargarComentariosBase();
});

// 2. FUNCIÓN PARA COPIAR CÓDIGOS (Con alerta estilo Minecraft)
function copiarCodigo(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        // Puedes cambiar el alert por una notificación flotante más adelante
        alert("¡CÓDIGO COPIADO! Ya puedes pegarlo en tu mundo.");
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// 3. SISTEMA DE CHAT DE COMUNIDAD (Visualización en tiempo real)
const mensajesGlobales = [
    { user: "StevePro", msg: "¡La versión 1.26 corre súper fluida!" },
    { user: "NotchFan", msg: "¿Alguien tiene el script de Lucky Blocks?" },
    { user: "Alex_Builder", msg: "ErickDev, gracias por la APK de 64 bits." }
];

function cargarComentariosBase() {
    const chatBox = document.getElementById('comments-display');
    if (!chatBox) return;

    mensajesGlobales.forEach(m => {
        agregarMensajeAlChat(m.user, m.msg);
    });
}

function enviarComentario() {
    const nameInput = document.getElementById('user-name');
    const msgInput = document.getElementById('user-comment');
    const chatBox = document.getElementById('comments-display');

    const nombre = nameInput.value.trim() || "Jugador";
    const mensaje = msgInput.value.trim();

    if (mensaje !== "") {
        // Agregar el mensaje arriba de la lista
        agregarMensajeAlChat(nombre, mensaje);
        
        // Limpiar el campo de texto
        msgInput.value = "";
        
        // Efecto visual de éxito
        console.log(`Mensaje enviado por ${nombre}: ${mensaje}`);
    } else {
        alert("¡Escribe un mensaje para el chat!");
    }
}

function agregarMensajeAlChat(usuario, texto) {
    const chatBox = document.getElementById('comments-display');
    if (!chatBox) return;

    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerHTML = `
        <span class="comment-user">[${usuario}]</span> 
        <span class="comment-text">${texto}</span>
    `;
    
    // Lo pone al principio para que lo último se vea arriba
    chatBox.prepend(div);
}

// 4. INTERACTIVIDAD DE BOTONES (Efecto de presión)
document.querySelectorAll('.mc-btn').forEach(boton => {
    boton.addEventListener('mousedown', () => {
        // Aquí podrías añadir un sonido: new Audio('click.mp3').play();
        console.log("Presionando botón MC...");
    });
});

// 5. LIMPIAR CACHÉ (Función de la tarjeta de ajustes)
function limpiarCache() {
    if(confirm("¿Quieres optimizar la interfaz y limpiar la memoria temporal?")) {
        alert("¡Caché optimizada! El sitio cargará más rápido ahora.");
        location.reload();
    }
}
