// Função global para abrir detalhes do item
function abrirDetalhesItem(itemId) {
    if (!itemId) {
        console.error('ID do item não fornecido');
        return;
    }
    
    window.location.href = `detalhes-item.html?id=${itemId}`;
}