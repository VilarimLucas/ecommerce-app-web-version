const apiBaseUrl = "https://localhost:44345/api/Product";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Lógica para carregar produtos ou detalhes do produto dependendo da página
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('editProduct.html')) {
        // Estamos na página de edição
        loadProductDetails();
    } else if (window.location.pathname.includes('index.html')) {
        // Estamos na página principal
        loadProducts();
    }
});

// Função para carregar os produtos na página principal
async function loadProducts() {
    try {
        const response = await axios.get(apiBaseUrl);
        const products = response.data;
        const tbody = document.getElementById("productTableBody");
        tbody.innerHTML = "";

        products.forEach(product => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${product.productName}</td>
                <td>${product.productDescription}</td>
                <td>${product.productPrice}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${product.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
    }
}

// Função para redirecionar para a página de edição
function editProduct(id) {
    window.location.href = `editProduct.html?id=${id}`;
}

// Função para deletar um produto
async function deleteProduct(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        try {
            await axios.delete(`${apiBaseUrl}/${id}`);
            loadProducts();
        } catch (error) {
            console.error("Erro ao excluir o produto:", error);
        }
    }
}

// Função para cadastrar um novo produto
document.getElementById("btnCadastrar")?.addEventListener("click", async () => {
    const productName = document.getElementById("productName").value;
    const productDescription = document.getElementById("productDescription").value;
    const productSize = parseFloat(document.getElementById("productSize").value);
    const productColor = document.getElementById("productColor").value;
    const productDetails = document.getElementById("productDetails").value;
    const productPrice = parseFloat(document.getElementById("productPrice").value);
    const productImage = document.getElementById("productImage").value;
    const productCategory = document.getElementById("productCategory").value;
    const productManufacturer = document.getElementById("productManufacturer").value;

    if (!productName || !productDescription || isNaN(productPrice) || !productColor || !productCategory || !productManufacturer) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    try {
        await axios.post(apiBaseUrl, {
            productName,
            productDescription,
            productSize,
            productColor,
            productDetails,
            productPrice,
            productImage,
            productCategory,
            productManufacturer
        });
        loadProducts();
    } catch (error) {
        alert("Erro ao cadastrar o produto.");
        console.error(error);
    }
});

// Função para carregar detalhes do produto na página de edição
async function loadProductDetails() {
    try {
        const response = await axios.get(`${apiBaseUrl}/${productId}`);
        const product = response.data;

        document.getElementById("productName").value = product.productName;
        document.getElementById("productDescription").value = product.productDescription;
        document.getElementById("productSize").value = product.productSize;
        document.getElementById("productColor").value = product.productColor;
        document.getElementById("productDetails").value = product.productDetails;
        document.getElementById("productPrice").value = product.productPrice;
        document.getElementById("productImage").value = product.productImage;
        document.getElementById("productCategory").value = product.productCategory;
        document.getElementById("productManufacturer").value = product.productManufacturer;
    } catch (error) {
        console.error("Erro ao carregar os detalhes do produto:", error);
    }
}

// Função para salvar as alterações na página de edição
document.getElementById("btnSalvar")?.addEventListener("click", async () => {
    const productName = document.getElementById("productName").value;
    const productDescription = document.getElementById("productDescription").value;
    const productSize = parseFloat(document.getElementById("productSize").value);
    const productColor = document.getElementById("productColor").value;
    const productDetails = document.getElementById("productDetails").value;
    const productPrice = parseFloat(document.getElementById("productPrice").value);
    const productImage = document.getElementById("productImage").value;
    const productCategory = document.getElementById("productCategory").value;
    const productManufacturer = document.getElementById("productManufacturer").value;

    if (!productName || !productDescription || isNaN(productPrice) || !productColor || !productCategory || !productManufacturer) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    try {
        await axios.put(`${apiBaseUrl}/${productId}`, {
            productName,
            productDescription,
            productSize,
            productColor,
            productDetails,
            productPrice,
            productImage,
            productCategory,
            productManufacturer
        });
        alert("Produto atualizado com sucesso!");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Erro ao atualizar o produto:", error);
        alert("Erro ao atualizar o produto.");
    }
});

// Função para pesquisar na página principal
document.getElementById("searchInput")?.addEventListener("input", () => {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#productTableBody tr");

    rows.forEach(row => {
        const productName = row.querySelector("td").innerText.toLowerCase();
        row.style.display = productName.includes(searchValue) ? "" : "none";
    });
});
