document.addEventListener("DOMContentLoaded", function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        const cartContainer = document.getElementById('cart-container');
        let cartHTML = '';

        if (cart.length > 0) {
            cart.forEach(item => {
                cartHTML += `
                    <div class="cart-item bg-black rounded-lg shadow-white p-4 text-white relative group flex items-center justify-between" data-id="${item.id}">
                        <div class="flex-grow">
                            <h2 class="text-xl font-bold text-gray-200">${item.name}</h2>
                            <p class="text-gray-400 mt-1 mb-2">$${item.price.toFixed(2)}</p>
        <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 active:bg-red-400 transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none remove-from-cart">Eliminar</button>
                        </div>
                        <img src="${item.image}" alt="${item.name}" class="h-32 w-32 rounded-md shadow-md ml-auto">
                    </div>
                `;
            });
        } else {
            cartHTML = '<p class="text-white">Tu carrito está vacío.</p>';
        }

        cartContainer.innerHTML = cartHTML;

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const id = cartItem.getAttribute('data-id');

                const itemIndex = cart.findIndex(item => item.id === id);
                if (itemIndex !== -1) {
                    cart.splice(itemIndex, 1);
                    saveCart();
                    renderCart();
                }
            });
        });
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    renderCart();
});
