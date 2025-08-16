document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const fileInput = form.querySelector('input[type="file"]');
    const profileImg = form.querySelector(".profile-img");

    // 🔹 Preview da imagem escolhida
    fileInput.addEventListener("change", () => {
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImg.src = e.target.result; // atualiza o <img> com a imagem escolhida
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    // 🔹 Submissão do formulário
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.querySelector('input[placeholder="Seu nome"]').value);
        formData.append("email", form.querySelector('input[placeholder="seu@email.com"]').value);
        formData.append("password", form.querySelector('input[placeholder="Nova senha"]').value);
        formData.append("cep", form.querySelector('input[placeholder="00000-000"]').value);
        formData.append("state", form.querySelector('input[placeholder="Ex: SP"]').value);
        formData.append("city", form.querySelector('input[placeholder="Sua cidade"]').value);
        formData.append("neighborhood", form.querySelector('input[placeholder="Seu bairro"]').value);
        formData.append("street", form.querySelector('input[placeholder="Nome da rua"]').value);
        formData.append("number", form.querySelector('input[placeholder="Nº"]').value);
        formData.append("complement", form.querySelector('input[placeholder="Apto, bloco, etc."]').value);

        if (fileInput.files.length > 0) {
            formData.append("img", fileInput.files[0]);
        }

        try {
            const clientId = document.cookie.split('; ').find(row => row.startsWith('clientId=')).split('=')[1];
            const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

            const response = await fetch(`${baseUrl}/client/${clientId}`, {
                method: "PUT",
                body: formData,
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log('response', response)

            if (response.ok) {
                alert("Perfil atualizado com sucesso!");
            } else {
                const error = await response.json();
                alert("Erro ao salvar: " + (error.message || "Erro desconhecido"));
            }
        } catch (err) {
            console.error("Erro na requisição:", err);
            alert("Erro de conexão com o servidor.");
        }
    });
});
