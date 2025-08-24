// Elementos da página
const loader = document.getElementById('loader');
const itemImage = document.getElementById('itemImage');
const itemName = document.getElementById('itemName');
const itemDescription = document.getElementById('itemDescription');
const itemObservations = document.getElementById('itemObservations');
const userImage = document.getElementById('userImage');
const userName = document.getElementById('userName');
const userState = document.getElementById('userState');
const userCity = document.getElementById('userCity');
const userNeighborhood = document.getElementById('userNeighborhood');
const userStreet = document.getElementById('userStreet');
const userNumber = document.getElementById('userNumber');
const userComplement = document.getElementById('userComplement');
const btnContact = document.querySelector('.btn-contact');

// Função para voltar à página anterior
function voltarPagina() {
    window.history.back();
}

// Função para solicitar empréstimo
async function solicitarEmprestimo(itemId) {
    try {
        const clientId = document.cookie
            .split('; ')
            .find(c => c.startsWith('clientId='))
            ?.split('=')[1];
        const token = document.cookie
            .split('; ')
            .find(c => c.startsWith('token='))
            ?.split('=')[1];

        if (!clientId || !token) {
            alert('Sessão expirada. Redirecionando para login...');
            window.location.href = '../index.html';
            return;
        }

        // Desabilitar botão durante o processo
        btnContact.disabled = true;
        btnContact.textContent = 'Solicitando...';

        const response = await fetch(`${baseUrl}/client/${clientId}/loan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                itemId: itemId
            })
        });

        if (response.ok) {
            alert('Empréstimo solicitado com sucesso!');
            // Opcionalmente, redirecionar para página de empréstimos
            // window.location.href = 'emprestimos.html';
        } else {
            const errorData = await response.json();
            alert(`Erro ao solicitar empréstimo: ${errorData.message || 'Erro desconhecido'}`);
        }

    } catch (error) {
        console.error('Erro ao solicitar empréstimo:', error);
        alert('Erro de conexão. Tente novamente.');
    } finally {
        // Reabilitar botão
        btnContact.disabled = false;
        btnContact.textContent = 'Solicitar Empréstimo';
    }
}

// Função para obter parâmetros da URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Carregar dados do item
async function carregarDetalhesItem() {
    try {
        loader.classList.remove('d-none');
        
        const itemId = getUrlParameter('id');
        if (!itemId) {
            alert('ID do item não encontrado na URL');
            voltarPagina();
            return;
        }

        const clientId = document.cookie
            .split('; ')
            .find(c => c.startsWith('clientId='))
            ?.split('=')[1];
        const token = document.cookie
            .split('; ')
            .find(c => c.startsWith('token='))
            ?.split('=')[1];

        if (!clientId || !token) {
            alert('Sessão expirada. Redirecionando para login...');
            window.location.href = '../index.html';
            return;
        }

        const defaultParams = 'latitude=11111111&longitude=11111111'

        // Buscar dados do item
        const response = await fetch(`${baseUrl}/client/${clientId}/item/${itemId}?${defaultParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar dados do item');
        }

        const item = await response.json()

        // Preencher dados do item
        itemImage.src = item.imgUrl || 'https://via.placeholder.com/400';
        itemName.textContent = item.name || 'Nome não informado';
        itemDescription.textContent = item.description || 'Descrição não informada';
        itemObservations.textContent = item.observation || 'Nenhuma observação';

        // Preencher dados do usuário
        if (item.client) {
            userImage.src = item.client.imgUrl || 'https://via.placeholder.com/80';
            userName.textContent = item.client.name || 'Nome não informado';
            
            // Endereço
            userState.textContent = item.client.address.state || '-';
            userCity.textContent = item.client.address.city || '-';
            userNeighborhood.textContent = item.client.address.neighborhood || '-';
            userStreet.textContent = item.client.address.street || '-';
            userNumber.textContent = item.client.address.number || '-';
            userComplement.textContent = item.client.address.complement || '-';
        }

        // Adicionar evento de clique no botão de solicitar empréstimo
        btnContact.onclick = () => solicitarEmprestimo(itemId);

    } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
        alert('Erro ao carregar detalhes do item. Tente novamente.');
        voltarPagina();
    } finally {
        loader.classList.add('d-none');
    }
}

// Carregar dados quando a página carregar
document.addEventListener('DOMContentLoaded', carregarDetalhesItem);