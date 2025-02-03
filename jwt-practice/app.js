// 1. Token JWT generado manualmente (simulación)
// Este es un token simulado que usaremos para las pruebas, pero en una aplicación real,
// se generaría en el backend y se pasaría al frontend después de un login exitoso.
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXN1YXJpb19wcnVlYmEiLCJleHAiOjE3Mzg4ODY0MDB9.-lc3xZBWSg_gpZihznxx7I6hZF5raMF7CEe8XlJIh-M';

// 2. Función para validar el token (simulación)
// Ahora esta función recupera el token desde localStorage en lugar de usar la variable global.
function validateToken() {
    // Obtener el token almacenado en localStorage
    const token = localStorage.getItem('JWT_TOKEN');
    
    // Si no se encuentra el token, lo consideramos como inválido.
    if (!token) {
        console.error("Token no encontrado");
        return false;
    }

    try {
        // Decodificar el token (sin verificar firma), solo decodificamos el payload
        const payload = JSON.parse(atob(token.split('.')[1]));

        // Verificamos si el token ha expirado comparando la fecha de expiración con la actual
        if (payload.exp < Date.now() / 1000) {
            throw new Error("Token expirado");
        }

        return true;  // Token válido
    } catch (error) {
        console.error("Token inválido:", error);
        return false;  // Token inválido
    }
}

// 3. Función GET con JWT
// Esta función hace una petición GET usando el token almacenado en localStorage
async function fetchDataWithJWT() {
    // Primero validamos el token antes de hacer la solicitud
    if (!validateToken()) {
        alert("Token inválido o expirado");
        return;
    }

    try {
        // Recuperar el token desde localStorage y usarlo en la cabecera de la solicitud
        const token = localStorage.getItem('JWT_TOKEN');
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        // Procesamos la respuesta en formato JSON
        const data = await response.json();

        // Mostramos la respuesta en el documento (en un div con id 'response')
        document.getElementById('response').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        // Si ocurre un error, lo mostramos en consola
        console.error("Error GET:", error);
    }
}

// 4. Función POST con JWT
// Esta función maneja el formulario para hacer una solicitud POST con el token en localStorage
document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Primero validamos el token antes de hacer la solicitud
    if (!validateToken()) {
        alert("Token inválido o expirado");
        return;
    }

    // Datos a enviar en el cuerpo de la solicitud POST
    const postData = {
        title: document.getElementById('data').value,  // Usamos el valor del input 'data'
        body: 'Contenido de prueba',  // Un texto de prueba en el cuerpo
        userId: 1  // ID del usuario (simulado)
    };

    try {
        // Recuperar el token desde localStorage y usarlo en la cabecera de la solicitud
        const token = localStorage.getItem('JWT_TOKEN');
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,  // Usamos el token para la autorización
                'Content-Type': 'application/json'  // Indicamos que el cuerpo será JSON
            },
            body: JSON.stringify(postData)  // Convertimos los datos del post a formato JSON
        });

        // Procesamos la respuesta en formato JSON
        const data = await response.json();

        // Mostramos la respuesta en el documento (en un div con id 'response')
        document.getElementById('response').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        // Si ocurre un error, lo mostramos en consola
        console.error("Error POST:", error);
    }
});

// 5. Función para almacenar el token en localStorage (simulado)
// Esta función simula el proceso de recibir un token después de un login exitoso y lo almacena
function storeToken(token) {
    localStorage.setItem('JWT_TOKEN', token);  // Almacenamos el token en localStorage
}

// 6. Simulación de almacenamiento del token
// Este paso simula el hecho de que el token ha sido recibido después de un login exitoso
storeToken(JWT_TOKEN);  // Almacenamos el token de ejemplo en localStorage
