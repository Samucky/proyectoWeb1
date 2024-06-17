document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message); // Mensaje de éxito
            window.location.href = 'home.html'; // Redirigir a la página de éxito
        } else {
            const result = await response.json();
            alert(result.message); // Mensaje de error
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el servidor');
    }
});


