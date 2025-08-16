const itemList = document.getElementById('itemList');
const loader = document.getElementById('loader');
let page = 1;
const perPage = 9;
let loading = false;

async function carregarMaisItens() {
    if (loading) return;
    loading = true;
    loader.classList.remove('d-none');

    const clientId = document.cookie.split('; ').find(row => row.startsWith('clientId=')).split('=')[1];
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    const showMyItems = pageName === 'meus-itens' ? 'true' : 'false';
    const defaultParams = 'latitude=11111111&longitude=11111111&distance=10000000'

    const data = await fetch(`${baseUrl}/client/${clientId}/item?page=${page}&perPage=${perPage}&showMyItems=${showMyItems}&${defaultParams}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const items = (await data.json()).data

    setTimeout(() => {
        for (let i = 0; i < items.length; i++) {
            const itemHTML = `
                <div class="item-card" onclick="abrirDetalhesItem('${items[i].id}')" style="cursor: pointer;">
                <img src="${items[i].imgUrl}" alt="Item" />
                <div class="item-info">
                    <h5>${items[i].name}</h5>
                    <p>${items[i].description}</p>
                </div>
                </div>
            `;
            itemList.insertAdjacentHTML('beforeend', itemHTML);
        }

        loader.classList.add('d-none');
        page++;
        loading = false;
    }, 700);
}

// Scroll infinito
window.addEventListener('scroll', () => {
    const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (scrollBottom) carregarMaisItens().then(() => console.log('itens carregados'));
});
