// Validação de formulário e simulação de login
const form = document.getElementById('loginForm');
const errorAlert = document.getElementById('errorAlert');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    // Simulação de login: email/senha fixos
    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;
    const manterConectado = document.getElementById('manterConectado').checked;

    fetch('http://ec2-18-217-46-87.us-east-2.compute.amazonaws.com:8080/auth/signIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                document.cookie = `token=${data.token}; path=/; max-age=86400; Secure; SameSite=Strict`;
                document.cookie = `clientId=${data.id}; path=/; max-age=86400; Secure; SameSite=Strict`;
                alert('Login bem-sucedido!');

                window.location.href = 'pages/hub.html';
            } else {
                errorAlert.classList.remove('d-none');
            }
        });
});