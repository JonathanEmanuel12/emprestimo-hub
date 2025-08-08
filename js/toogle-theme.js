// Troca de tema com persistência no localStorage
const toggleButton = document.getElementById('toggleTheme');
const body = document.body;

function setTheme(theme) {
    body.classList.remove('dark-mode', 'light-mode');
    body.classList.add(theme);
    localStorage.setItem('theme', theme);
}

toggleButton.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    setTheme(currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode');
});

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme') || 'dark-mode';
setTheme(savedTheme);
