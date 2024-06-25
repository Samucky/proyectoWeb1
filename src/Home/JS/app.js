document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'sk_test_575455ab0ec53162e74107638d95109373ae21b8f5f69';
    const url = 'https://api.chec.io/v1/products';

    const options = {
        method: 'GET',
        headers: {
            'X-Authorization': apiKey
        }
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del producto');
            }
            return response.json();
        })
        .then(data => {
            const products = data.data;
            let productHTML = '';

            products.forEach(product => {
                productHTML += `
                    <div class="product bg-black rounded-lg shadow-white p-4 text-white relative group" data-id="${product.id}" data-name="${product.name}" data-price="${product.price.raw}" data-image="${product.image.url}">
                        <img id="image-${product.id}" src="${product.image.url}" alt="${product.name}" class="transition duration-500 ease-in-out blur-lg cursor-pointer h-3/4" onclick="toggleBlur('image-${product.id}')">
                        <h2 class="text-xl font-bold text-gray-200 mt-6">${product.name}</h2>
                        <p class="text-gray-200 mb-4">${product.description}</p>
                        <p class="text-gray-400 mb-4">${product.price.formatted_with_symbol}</p>
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-400 vera" data-id="${product.id}">Ver</button>
                        <button class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-800 active:bg-orange-400 add-to-cart">Agregar al carrito</button>
                    </div>
                `;
            });

            const productContainer = document.getElementById('most-sold');
            productContainer.innerHTML = productHTML;

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const product = this.closest('.product');
                    const id = product.getAttribute('data-id');
                    const name = product.getAttribute('data-name');
                    const price = parseFloat(product.getAttribute('data-price'));
                    const image = product.getAttribute('data-image');

                    cart.push({ id, name, price, image });
                    saveCart();
                    alert(`${name} ha sido agregado al carrito.`);
                });
            });

            document.querySelectorAll('.vera').forEach(button => {
                button.addEventListener('click', function() {
                    const product = this.closest('.product');
                    const id = product.getAttribute('data-id');
                    window.location.href = `../html/product.html?id=${id}`;
                });
            });

        })
        .catch(error => {
            console.error('Error:', error);
            const productContainer = document.getElementById('most-sold');
            productContainer.innerHTML = `<p>Error al cargar los productos.</p>`;
        });
});

const cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function toggleBlur(imageId) {
    const image = document.getElementById(imageId);
    image.classList.toggle('blur-none');
}
