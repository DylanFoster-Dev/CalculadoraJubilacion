// Calculadora de Jubilación - Argentina
// Variables para almacenar los requisitos de edad por género
const EDAD_JUBILACION_MUJER = 60;
const EDAD_JUBILACION_HOMBRE = 65;

// Elementos del DOM
const formulario = document.getElementById('jubilacionForm');
const resultadoDiv = document.getElementById('resultado');

// Función principal que se ejecuta cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Calculadora de Jubilación cargada');
    
    // Agregar event listener al formulario
    formulario.addEventListener('submit', calcularJubilacion);
});

// Función para calcular la elegibilidad de jubilación
function calcularJubilacion(evento) {
    evento.preventDefault();
    
    // Obtener valores del formulario
    const edad = parseInt(document.getElementById('edad').value);
    const genero = document.querySelector('input[name="genero"]:checked').value;
    
    // Validar que los datos sean correctos
    if (!validarDatos(edad, genero)) {
        return;
    }
    
    // Determinar si puede jubilarse
    const puedeJubilarse = verificarElegibilidad(edad, genero);
    
    // Mostrar resultado
    mostrarResultado(puedeJubilarse, edad, genero);
}

// Función para validar los datos ingresados
function validarDatos(edad, genero) {
    // Validar edad
    if (isNaN(edad) || edad < 0 || edad > 120) {
        alert('Por favor, ingresa una edad válida (entre 0 y 120 años)');
        return false;
    }
    
    // Validar género
    if (!genero) {
        alert('Por favor, selecciona tu género');
        return false;
    }
    
    return true;
}

// Función para verificar elegibilidad según edad y género
function verificarElegibilidad(edad, genero) {
    let edadRequerida;
    
    // Usar condicionales para determinar la edad requerida según el género
    if (genero === 'mujer') {
        edadRequerida = EDAD_JUBILACION_MUJER;
    } else if (genero === 'hombre') {
        edadRequerida = EDAD_JUBILACION_HOMBRE;
    } else {
        // Caso por defecto (no debería ocurrir con la validación)
        return false;
    }
    
    // Verificar si cumple con la edad requerida
    return edad >= edadRequerida;
}

// Función para mostrar el resultado personalizado
function mostrarResultado(puedeJubilarse, edad, genero) {
    const edadRequerida = genero === 'mujer' ? EDAD_JUBILACION_MUJER : EDAD_JUBILACION_HOMBRE;
    const generoTexto = genero === 'mujer' ? 'Mujer' : 'Hombre';
    
    let mensaje = '';
    let claseCSS = '';
    
    if (puedeJubilarse) {
        // Mensaje de aprobación
        mensaje = `¡Felicitaciones! ${generoTexto} de ${edad} años.
        
        CUMPLIS con los requisitos para jubilarte.
        
        Edad requerida: ${edadRequerida} años
        Tu edad: ${edad} años
        
        Podes iniciar los trámites de jubilación.`;
        claseCSS = 'aprobado';
    } else {
        // Mensaje de rechazo 
        const añosFaltantes = edadRequerida - edad;
        mensaje = `${generoTexto} de ${edad} años.
        
        AÚN NO cumplís con los requisitos para jubilarte.
        
        Edad requerida: ${edadRequerida} años
        Tu edad: ${edad} años
        Te faltan: ${añosFaltantes} año${añosFaltantes !== 1 ? 's' : ''}`;
        claseCSS = 'rechazado';
    }
    
    // Mostrar resultado en el DOM
    resultadoDiv.innerHTML = mensaje.replace(/\n/g, '<br>');
    resultadoDiv.className = `resultado ${claseCSS}`;
    
    // Hacer scroll suave al resultado
    resultadoDiv.scrollIntoView({ behavior: 'smooth' });
}

// Función adicional para mostrar información de ayuda
function mostrarAyuda() {
    const info = `
        <h4>Información sobre Jubilación en Argentina:</h4>
        <ul>
            <li>Mujeres: 60 años de edad</li>
            <li>Hombres: 65 años de edad</li>
            <li>Se requieren años de aportes (varía según el régimen)</li>
            <li>Consulta con ANSES para más detalles</li>
        </ul>
    `;
    alert(info);
}

// Función para limpiar el formulario
function limpiarFormulario() {
    formulario.reset();
    resultadoDiv.style.display = 'none';
    resultadoDiv.innerHTML = '';
}

// Agregar funcionalidad adicional: limpiar formulario con Escape
document.addEventListener('keydown', function(evento) {
    if (evento.key === 'Escape') {
        limpiarFormulario();
    }
});

// Función para calcular años restantes hasta jubilación
function calcularAñosRestantes(edad, genero) {
    const edadRequerida = genero === 'mujer' ? EDAD_JUBILACION_MUJER : EDAD_JUBILACION_HOMBRE;
    return Math.max(0, edadRequerida - edad);
}

// Exportar funciones para uso en consola (desarrollo)
if (typeof window !== 'undefined') {
    window.calculadoraJubilacion = {
        calcularJubilacion,
        verificarElegibilidad,
        calcularAñosRestantes,
        mostrarAyuda,
        limpiarFormulario
    };
}
