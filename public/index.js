let MOCK_PRODUCTS = {
    products : [
        {
            id: "111111",
            productName: "apple",
            department: "produce"
        },
        {
            id: "222222",
            productName: "ground beef",
            department: "meat"
        },
        {
            id: "333333",
            productName: "granola",
            department: "dry goods"
        },
        {
            id: "444444",
            productName: "oranges",
            department: "produce"
        },
        {
            id: "555555",
            productName: "chicken",
            department: "meat"
        },
        {
            id: "666666",
            productName: "flour",
            department: "dry goods"
        },
        {
            id: "777777",
            productName: "saurkraut",
            department: "canned goods"
        },
        {
            id: "888888",
            productName: "butter",
            department: "dairy"
        },
        {
            id: "999999",
            productName: "milk",
            department: "dairy"
        }
    ]
};

function getProducts(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_PRODUCTS)}, 100);
}

function displayProducts(data) {
    for (index in data.products) {
        $('body').append(
            `<li>${data.products[index].productName}</li>`
        );
    }
}

function getAndDisplayProducts() {
    getProducts(displayProducts);
}

$(function() {
    getAndDisplayProducts();
})