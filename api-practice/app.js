// 1. Función para obtener posts con manejo de errores en el DOM
async function fetchPosts() {
	try {
    	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    	
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    	
    	const posts = await response.json();
    	displayPosts(posts.slice(0, 5));
	} catch (error) {
        console.error('Error:', error);
        displayError('No se pudieron cargar los posts. Inténtalo más tarde.');
	}
}
 
// 2. Función para mostrar posts en el DOM
function displayPosts(posts) {
	const container = document.getElementById('posts');
	container.innerHTML = posts
    	.map(post => `<div><h3>${post.title}</h3><p>${post.body}</p></div>`)
    	.join('');
}

// 3. Función para mostrar un mensaje de error en el DOM
function displayError(message) {
    const container = document.getElementById('posts');
    container.innerHTML = `<p style="color: red;">${message}</p>`;
}
 
// 4. Ejecutar al cargar la página
fetchPosts();

// 5. Función de login con validación de email y password
async function loginUser(email, password) {
    const loginMessage = document.getElementById('loginMessage');

    // Validar que el email y password no estén vacíos
    if (!email || !password) {
        loginMessage.textContent = 'El email y la contraseña no pueden estar vacíos.';
        loginMessage.style.color = 'red';
        return;
    }

	try {
    	const response = await fetch('https://reqres.in/api/login', {
        	method: 'POST',
        	headers: { 'Content-Type': 'application/json' },
        	body: JSON.stringify({ email, password }),
    	});
    	
    	if (!response.ok) throw new Error(`Error: ${response.status}`);
    	
    	const data = await response.json();
    	
        loginMessage.textContent = 'Inicio de sesión exitoso';
        loginMessage.style.color = 'green';

    	console.log('Token JWT:', data.token);
    	return data.token; // Retorna el token JWT
	} catch (error) {
        console.error('Login fallido:', error);
        loginMessage.textContent = 'Error en el inicio de sesión. Verifica tus credenciales.';
        loginMessage.style.color = 'red';
	}
}
 
// 6. Función para obtener datos protegidos con JWT
async function fetchProtectedData(token) {
	try {
    	const response = await fetch('https://jsonplaceholder.typicode.com/users/1', {
        	headers: { 'Authorization': `Bearer ${token}` },
    	});
    	
    	if (!response.ok) throw new Error(`Error: ${response.status}`);
    	
    	const user = await response.json();
    	console.log('Usuario protegido:', user);
	} catch (error) {
        console.error('Error al obtener datos protegidos:', error);
	}
}
 
// 7. Manejador del formulario de login
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const token = await loginUser(email, password);

    if (token) {
        await fetchProtectedData(token);
    }
});
