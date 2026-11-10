function updateProductDetails(product) {
    // Update the title and product details
    document.querySelector('.Products_title').textContent = product.p_name;
    document.getElementById('pd_rating').textContent = product.p_rate;

    // Update the left image and information

    document.getElementById('pd_name').textContent = product.p_name;
    document.getElementById('pd_inches').textContent = product.p_inches;
    document.getElementById('pd_memory').textContent = product.p_memory;
    document.getElementById('pd_color').textContent = product.p_color;
    document.getElementById('pd_internet').textContent = product.p_internet;

    // Update the price
    document.getElementById('pd_price').dataset.price = product.p_price;
    document.getElementById('pd_price').textContent = '฿' + product.p_price;


}

// Get productId from URL
function getProductIdFromUrl() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    const productId = filename.split('.')[0];
    return productId;
}
const productId = getProductIdFromUrl();
fetchProductDetails(productId);


async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`http://localhost:5000/api/productdetail/${productId}`);

        if (response.status === 404) {
            console.error('Product not found');
            return;
        }
        const product = await response.json();
        updateProductDetails(product.data);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}
