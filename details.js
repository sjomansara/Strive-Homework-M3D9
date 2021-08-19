const params = new URLSearchParams(location.search)
const productId = params.get("id") // the product ID

const getProduct = async () => {
    const url = "https://striveschool-api.herokuapp.com/api/product/" + productId

    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGNkODJkNTI2MjAwMTViNmRkMTEiLCJpYXQiOjE2MjkzNzY4MTQsImV4cCI6MTYzMDU4NjQxNH0.p_v_v7utMuljc6yzUrCSDzJcKRZo0AJojKtFAuA9528",
            }
        })

        const product = await response.json()
        return product

    } catch(error){
        console.log(error)
    }
}

window.onload = async () => {
    const product = await getProduct()
    let displayProduct = document.querySelector(".row")
    console.log("displayProducts: ", displayProduct)
     
    displayProduct.innerHTML += 
    `<div id="detailCard" class="card mb-3">
    <div class="row no-gutters">
        <div class="col-md-4">
            <img id="detailImg" class="card-img-top m-4" src="${product.imageUrl}" alt=""></img>
        </div>
        <div class="col-md-8">
        <div class="card-body ml-4 mt-4">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Brand: ${product.brand}</p>
                <p class="card-text">Description: ${product.description}</p>
                <p class="card-text">Price: ${product.price} €</p>
        </div>
        </div>
    </div>
    </div>`
        
}