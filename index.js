const getAllProducts = async () => {
    const url = "https://striveschool-api.herokuapp.com/api/product/"
    try {
        const response = await fetch (url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGNkODJkNTI2MjAwMTViNmRkMTEiLCJpYXQiOjE2MjkzNzY4MTQsImV4cCI6MTYzMDU4NjQxNH0.p_v_v7utMuljc6yzUrCSDzJcKRZo0AJojKtFAuA9528",
            }
        })

        const allProducts = await response.json()
        console.log(allProducts)

        return allProducts
    } catch (error) {
        console.log(error)
    } finally {
        console.log("Products uploaded successfully")
    }
}

window.onload = async () => {
    const allProducts = await getAllProducts()
    console.log("loading")
    displayProduct(allProducts)
}

const displayProduct = (products) => {
    let displayProducts = document.querySelector(".row")
    console.log("displayProducts: ", displayProducts)
    
    products.forEach(product => {
     
        displayProducts.innerHTML += 
        `<div class="card m-3 justify-content-center">
        <img id="cardImg" class="card-img-top m-4" src="${product.imageUrl}" alt=""></img>
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Brand: ${product.brand}</p>
          <p class="card-text">Description: ${product.description}</p>
          <p class="card-text">Price: ${product.price} €</p>
          <a href="backoffice.html?id=${product._id}" class="btn btn-warning" id="editButton">Edit</a>
          <button type="button" class="btn btn-danger" id="deleteButton">Delete</button>
        </div>
        </div>`
        
})
}



