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
        console.log(product._id)
        // console.log(deleteProduct(product._id))
     
        displayProducts.innerHTML += 
        `<div class="card m-3 justify-content-center" id="${product._id}">
            <img id="cardImg" class="card-img-top m-4" src="${product.imageUrl}" alt=""></img>
            <div class="card-body">
                <a href="/details.html?id=${product._id}"><h5 class="card-title">${product.name}</h5></a>
                <p class="card-text">Brand: ${product.brand}</p>
                <p class="card-text">Description: ${product.description}</p>
                <p class="card-text">Price: ${product.price} €</p>
                <a href="backoffice.html?id=${product._id}" class="btn btn-warning" id="editButton">Edit</a>
                <button type="button" class="btn btn-danger" id="deleteButton" onclick="deleteProduct('${product._id}')">Delete</button>
            </div>
        </div>`
        
})
}

const deleteProduct = async function(id) {
    console.log(id)
    const url = "https://striveschool-api.herokuapp.com/api/product/" + id
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGNkODJkNTI2MjAwMTViNmRkMTEiLCJpYXQiOjE2MjkzNzY4MTQsImV4cCI6MTYzMDU4NjQxNH0.p_v_v7utMuljc6yzUrCSDzJcKRZo0AJojKtFAuA9528",
          "Content-Type": "application/json",
        }
      })
      if (response.ok) {
        const deletedObj = await response.json()
        let product = document.getElementById(id)
        product.remove()
        // showAlert("success", "Event with id: " + deletedObj._id + " deleted successfully") // shows the custom alert
        // setTimeout(() => { window.location.assign("/") }, 3500) // pushes the user to the homepage after 3,5 seconds
      }
      // const deletedProduct = await response.json()
    } catch (err) {
        console.error(err)
    }

}




