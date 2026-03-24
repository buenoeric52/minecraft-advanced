/* =========================================
   MC ADVANCED - SISTEMA OPERATIVO (v5.0)
   ========================================= */

// 1. GESTIÓN DE CARGA Y ESTADO INICIAL
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const fill = document.querySelector('.fill');
    
    if (fill) fill.style.width = '100%';

    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 800);
        }
    }, 2500);

    // Cargar historial de la comunidad
    cargarMensajesGuardados();
});

// 2. SISTEMA DE AJUSTES (MENÚ DE TRES PUNTOS)
function toggleSettings() {
    const menu = document.getElementById('settings-dropdown');
    menu.classList.toggle('show');
}

// Cerrar menú si se toca fuera
window.onclick = function(event) {
    if (!event.target.matches('.dots-btn') && !event.target.matches('.dots-btn span')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains('show')) {
                dropdowns[i].classList.remove('show');
            }
        }
    }
}

function limpiarCache() {
    if(confirm("¿Deseas optimizar la terminal y borrar el historial de chat local?")) {
        localStorage.removeItem('mc_chat');
        location.reload(); 
    }
}

function cambiarFondo() {
    mostrarNotificacion("CAMBIANDO TEMA...");
    document.body.classList.toggle('alt-theme');
}

// 3. FUNCIÓN DE COPIADO PRO
function copiarCodigo(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        mostrarNotificacion("¡CÓDIGO COPIADO!");
    }).catch(err => {
        console.error('Error:', err);
    });
}

// 4. NOTIFICACIONES ESTILO LOGRO MC
function mostrarNotificacion(mensaje) {
    const toast = document.createElement('div');
    toast.className = 'mc-toast';
    toast.innerHTML = `<span class="mc-font" style="font-size:9px; color:#000;">${mensaje}</span>`;
    
    document.body.appendChild(toast);

    // Animación fluida de entrada y salida
    setTimeout(() => {
        toast.style.transform = 'translateY(-100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// 5. CHAT COMUNITARIO CON FILTRO DE USUARIO
function enviarComentario() {
    const nameInput = document.getElementById('user-name');
    const msgInput = document.getElementById('user-comment');

    const usuario = nameInput.value.trim() || "Jugador";
    const mensaje = msgInput.value.trim();

    if (mensaje !== "") {
        const nuevoMensaje = { usuario, mensaje, fecha: new Date().toLocaleTimeString() };
        
        agregarMensajeAlChat(usuario, mensaje);
        guardarEnLocal(nuevoMensaje);

        msgInput.value = "";
        mostrarNotificacion("¡MENSAJE PUBLICADO!");
        
        // Scroll automático al último mensaje
        const chatBox = document.getElementById('comments-display');
        chatBox.scrollTop = 0;
    }
}

function agregarMensajeAlChat(usuario, texto) {
    const chatBox = document.getElementById('comments-display');
    if (!chatBox) return;

    const div = document.createElement('div');
    div.className = 'comment-item';
    
    // Resaltar si eres tú (ErickDev)
    const esAdmin = usuario.toLowerCase().includes("erick");
    const colorUser = esAdmin ? "#39FF14" : "#00a2ff";
    const badge = esAdmin ? " <span style='color:#FFD700'>[DEV]</span>" : "";

    div.innerHTML = `
        <div class="msg-header">
            <span class="comment-user" style="color:${colorUser}">${usuario.toUpperCase()}${badge}</span>
        </div>
        <span class="comment-text">${texto}</span>
    `;
    chatBox.prepend(div);
}

function guardarEnLocal(obj) {
    let historial = JSON.parse(localStorage.getItem('mc_chat')) || [];
    historial.push(obj);
    // Solo guardamos los últimos 50 mensajes para no saturar el móvil
    if(historial.length > 50) historial.shift();
    localStorage.setItem('mc_chat', JSON.stringify(historial));
}

function cargarMensajesGuardados() {
    let historial = JSON.parse(localStorage.getItem('mc_chat')) || [];
    historial.forEach(m => agregarMensajeAlChat(m.usuario, m.mensaje));
}
