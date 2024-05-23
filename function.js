document.addEventListener('DOMContentLoaded', () => {
   const cart = [];
   const cartItemsContainer = document.getElementById('cart-items');
   const totalElement = document.getElementById('total');
   const changeElement = document.getElementById('change');
   
   function addToCart(product, price) {
       cart.push({ product, price });
       updateCart();
   }

   function updateCart() {
       cartItemsContainer.innerHTML = '';
       let total = 0;
       cart.forEach(item => {
           const li = document.createElement('li');
           li.textContent = `${item.product}: ₱${item.price}`;
           cartItemsContainer.appendChild(li);
           total += item.price;
       });
       totalElement.textContent = total;
   }

   document.querySelectorAll('.add-to-cart').forEach(button => {
       button.addEventListener('click', event => {
           event.preventDefault();
           const product = event.target.closest('.card').querySelector('.card-title').textContent;
           const price = parseFloat(event.target.closest('.card').querySelector('.card-text').textContent.replace('₱', ''));
           addToCart(product, price);
       });
   });

   document.getElementById('calculate-change').addEventListener('click', () => {
       const amountPaid = parseFloat(document.getElementById('amount-paid').value);
       const total = parseFloat(totalElement.textContent);
       if (!isNaN(amountPaid) && amountPaid >= total) {
           const change = amountPaid - total;
           changeElement.textContent = `Change: ₱${change.toFixed(2)}`;
       } else {
           changeElement.textContent = 'Insufficient amount paid.';
       }
   });
});
document.addEventListener('DOMContentLoaded', () => {
   const cart = JSON.parse(localStorage.getItem('cart')) || [];

   function addToCart(product, price) {
       cart.push({ product, price });
       localStorage.setItem('cart', JSON.stringify(cart));
       alert('Item added to cart');
   }

   document.querySelectorAll('.add-to-cart').forEach(button => {
       button.addEventListener('click', event => {
           event.preventDefault();
           const product = event.target.closest('.card').querySelector('.card-title').textContent;
           const price = parseFloat(event.target.closest('.card').querySelector('.card-text').textContent.replace('₱', ''));
           addToCart(product, price);
       });
   });
});