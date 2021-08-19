const params = new URLSearchParams(location.search)
const productId = params.get("id") // the product ID

let results = []

const getProduct = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGNkODJkNTI2MjAwMTViNmRkMTEiLCJpYXQiOjE2MjkzNzY4MTQsImV4cCI6MTYzMDU4NjQxNH0.p_v_v7utMuljc6yzUrCSDzJcKRZo0AJojKtFAuA9528",
            }
        })

        const allProducts = await response.json()
        return allProducts

    } catch(error){
        console.log(error)
    }
}

const handleSubmit = async function(event) {
    event.preventDefault()

    const url = productId ? "https://striveschool-api.herokuapp.com/api/product/" + productId : "https://striveschool-api.herokuapp.com/api/product/"

    const newProduct = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        brand: document.getElementById("brand").value,
        price: document.getElementById("price").value,
        imageUrl: document.getElementById("image").value,
    }

    console.log(newProduct)

    const method = productId ? "PUT" : "POST"

    try {
        const response = await fetch(url, {
            method,
            body: JSON.stringify(newProduct),
            headers:{
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGNkODJkNTI2MjAwMTViNmRkMTEiLCJpYXQiOjE2MjkzNzY4MTQsImV4cCI6MTYzMDU4NjQxNH0.p_v_v7utMuljc6yzUrCSDzJcKRZo0AJojKtFAuA9528",
                "Content-Type": "application/json",
            }
        })

        if(response.ok){
            const productResponse = await response.json()
            return productResponse
        }

    } catch (error){
        console.log(error)
    }finally{
        console.log("Product submitted")
    }
}

window.onload = async () => {
    const submitButton = document.getElementById("submitButton")

    let editPage = document.getElementById("editPage")
    let span = submitButton.querySelector("span")

    if (productId) {
        editPage.innerText = "Edit Product"
        span.innerText = "Save"
    }

    let endpointString = "https://striveschool-api.herokuapp.com/api/product/"
    if (productId) {
        endpointString += productId
    }

    const response = await fetch(endpointString, {
        method: "GET",
        headers:{
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGNkODJkNTI2MjAwMTViNmRkMTEiLCJpYXQiOjE2MjkzNzY4MTQsImV4cCI6MTYzMDU4NjQxNH0.p_v_v7utMuljc6yzUrCSDzJcKRZo0AJojKtFAuA9528"
        }
    })

    const productDetails = await response.json()
    console.log(productDetails)
    
    if (productId) {
        document.getElementById("name").value = productDetails.name
        document.getElementById("description").value = productDetails.description
        document.getElementById("brand").value = productDetails.brand
        document.getElementById("price").value = productDetails.price
        document.getElementById("image").value = productDetails.imageUrl
    }
}