
async function fetchData(){
    // fetch('https://dummyjson.com/products')
    //     .then(response => {
    //         return response.json()
    //     })
    //     .then(data => {
    //         console.log(data)
    //     })
    //     .catch(error => console.log(error))
    //

    let response = await fetch('https://dummyjson.com/products')
    let payload = await response.json()

    const products = payload.products

    let categories = new Set(products.map(product => product.category).sort())

    console.log('Existing categories sorted alphabetically: ',categories)

    products.forEach(product => {
        product.averageRating = getAverageReviewsRating(product)
    })

    let productssortedByRating = products.sort((prod1, prod2) => prod1.averageRating-prod2.averageRating)

    let productsWithLowestAverageRating = productssortedByRating.slice(0,3)
    let productsWithHighestAverageRating = productssortedByRating.slice(productssortedByRating.length-3)

    console.log("Products with lowest average rating: ", productsWithLowestAverageRating)
    console.log("Products with highest average rating: ", productsWithHighestAverageRating)

    let summaryPerCategory = []
    categories.forEach(category => {
        let productsForCategory = products.filter(product => product.category === category)

        let sum = 0
        productsForCategory.forEach(product => {
            sum += product.stock*product.price
        })
        console.log(`Category ${category} has ${productsForCategory.length} and total inventory value of ${sum}`)
    })

    let productsSortedByStockDescending = products
        .filter(product => product.stock < 10)
        .sort((p1, p2) => p2.stock-p1.stock)

    console.log("Products sorted by stock descending: ", productsSortedByStockDescending)

    let productsSortedByDiscountPercentage = products
        .sort((p1, p2) => p2.discountPercentage-p1.discountPercentage)
        .slice(0,5)

    let availabilityReport = {}
    products.forEach(product => {
        if(!(product.availabilityStatus in availabilityReport)){
            availabilityReport[product.availabilityStatus] = 1
        }
        else{
            availabilityReport[product.availabilityStatus]++
        }
    })
    console.log('Availability report: ', availabilityReport)
}

function getAverageReviewsRating(product){
    if(product.reviews && product.reviews.length > 0){
        let sum = 0
        product.reviews.forEach(review => {
            sum += review.rating
        })
        return sum/product.reviews.length
    }
    return 0;
}

fetchData()