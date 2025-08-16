async function buscarItens() {
    const search = document.getElementById('searchInput').value.trim();
    if (search === '') return

    itemList.innerHTML = '';

    const clientId = document.cookie.split('; ').find(row => row.startsWith('clientId=')).split('=')[1];
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    const showMyItems = pageName === 'meus-itens' ? 'true' : 'false';
    const defaultParams = 'latitude=11111111&longitude=11111111&distance=10000000'

    const data = await fetch(`${baseUrl}/client/${clientId}/item?search=${search}&showMyItems=${showMyItems}&${defaultParams}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const items = (await data.json()).data

    for (let i = 0; i < items.length; i++) {
        const itemHTML = `
            <div class="item-card">
                <img src="${items[i].imgUrl}" alt="Item" />
                <div class="item-info">
                <h5>${items[i].name}</h5>
                <p>${items[i].description}</p>
                </div>
            </div>
        `;
        itemList.insertAdjacentHTML('beforeend', itemHTML);
    }
}