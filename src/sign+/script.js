function isAdult(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18;
}

document.getElementById('signUpForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const date = document.getElementById('date').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!isAdult(date)) {
        alert('You must be at least 18 years old to sign up.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, lastname, date, email, password })
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message); // Mensaje de éxito
            window.location.href = 'login.html'; // Redirigir a la página de éxito
        } else {
            const result = await response.json();
            alert(result.message); // Mensaje de error
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el servidor');
    }
});