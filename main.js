document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const menuSections = mainContent.querySelectorAll('.menu-items');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartIcon = document.getElementById('cart-icon');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const backButtons = mainContent.querySelectorAll('.back-button');
    const allInternalLinks = document.querySelectorAll('a[href^="#"]'); // تم تعديل هذا السطر
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalSpan = document.getElementById('cart-total');
    const cartCountSpan = document.getElementById('cart-count');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    let cart = [];

    const products = [
        { id: 1, name: 'برغر لحم', price: 15000 },
        { id: 2, name: 'بطاطا مقلية', price: 15000 },
        { id: 3, name: 'سجق مشوي', price: 15000 },
        { id: 4, name: 'بيبسي', price: 5000 },
        { id: 5, name: 'سفن اب', price: 5000 },
        { id: 6, name: 'ميرندا برتقال', price: 5000 },
        { id: 7, name: 'ميرندا تفاح', price: 5000 },
        { id: 8, name: 'سندويش لبنة', price: 8000 },
        { id: 9, name: 'سندويش جبنة', price: 8000 },
        { id: 10, name: 'سندويش زعتر', price: 8000 },
    ];

    const showSection = (sectionId) => {
        // إخفاء جميع الأقسام ما عدا الأقسام الخاصة بالمعلومات
        const sectionsToHide = document.querySelectorAll('.menu-items, .info-section');
        sectionsToHide.forEach(section => {
            section.classList.add('hidden-section');
        });
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden-section');
        }
    };

    const updateCart = () => {
        cartItemsList.innerHTML = '';
        let total = 0;
        let itemCount = 0;
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product) {
                total += product.price * item.quantity;
                itemCount += item.quantity;
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${product.name}</h4>
                        <p>${item.quantity} × ${product.price} ل.س</p>
                    </div>
                    <button class="remove-item-btn" data-id="${product.id}">&times;</button>
                `;
                cartItemsList.appendChild(cartItem);
            }
        });
        
        cartTotalSpan.textContent = total.toString();
        cartCountSpan.textContent = itemCount;
    };

    const addToCart = (productId) => {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        updateCart();
    };

    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    };

    mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('order-button')) {
            const productId = parseInt(e.target.dataset.productId);
            addToCart(productId);
            cartSidebar.classList.add('active');
        } else if (e.target.classList.contains('card-link')) {
            const target = e.target.dataset.target;
            showSection(target);
        }
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            showSection('main-menu-section');
        });
    });

    // تم تعديل هذه الحلقة لتشمل جميع الروابط الداخلية
    allInternalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSectionId = e.target.getAttribute('href').substring(1);
            showSection(targetSectionId);
            mainNav.classList.remove('active');
        });
    });

    cartItemsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
        }
    });

    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.toggle('active');
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

});