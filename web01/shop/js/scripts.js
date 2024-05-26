function getAllProducts() {
    axios.get('https://localhost:44347/api/Product')
        .then((response) => {
            const products = response.data;
            console.log(products);
            const productList = document.querySelector("#all-products-slick");
            productList.innerHTML = ''; // Limpa qualquer conteúdo existente

            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.className = "product";
                productElement.innerHTML = `
                    <div class="product-img">
                        <img src="./img/${product.productImage}" alt="">
                    </div>
                    <div class="product-body">
                        <p class="product-category">Category</p>
                        <h3 class="product-name"><a href="#">${product.productName}</a></h3>
                        <h4 class="product-price">R$${product.productPrice} <del class="product-old-price">R$${product.productPrice}</del></h4>
                        <div class="product-rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <div class="product-btns">
                            <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                            <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                            <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                        </div>
                    </div>
                    <div class="add-to-cart">
                        <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                    </div>`;
                productList.appendChild(productElement);
            });

            // Re-inicializa Slick Slider
            $('.products-slick').slick('unslick'); // Destroy any slick slider before initializing it again
            $('.products-slick').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                infinite: true,
                speed: 300,
                dots: false,
                arrows: true,
                appendArrows: $(productList).attr('data-nav'),
                responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }]
            });
        })
        .catch((error) => console.error('Error loading products:', error));
}


document.addEventListener('DOMContentLoaded', function() {
    getAllProducts();
});
