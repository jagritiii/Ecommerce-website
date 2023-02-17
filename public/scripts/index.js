var cardsContainer = document.getElementsByClassName('cardsContainer')[0];
var allCards = cardsContainer.children;

for (var i = 0; i < allCards.length; i++) {

    // getting the btn element
    var viewDetails = allCards[i].children[0].children[4];

    // getting add to cart btn 
    var addToCart = allCards[i].children[0].children[5].children[0]

    viewDetails.addEventListener('click', onDesClick)
    addToCart.addEventListener('click', function (event) {
        var product_id = event.target.getAttribute('id')
        addToCartClick(product_id)
    })

}

// show description of product------------------

function onDesClick(event) {
    var parent = event.target.parentNode;

    if (parent.children[3].style.display === 'none') {
        parent.children[3].style.display = 'block';
        event.target.innerHTML = "Show Less"
    }
    else {
        parent.children[3].style.display = 'none'
        event.target.innerHTML = "View Description"

    }
}

// add to cart option-------------------
function addToCartClick(id) {
    console.log(id);

    var request = new XMLHttpRequest();

    request.open("post", "/cart");
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify({ id: id }));

    request.addEventListener("load", function () {
        if (request.status === 401) {
            alert("please login");
            window.location.href = "/login";
        }
        else if (request.status === 200) {
            console.log("successfully added to cart")
        }
    })
}


//   load more option ---------------------------------

var loadMore = document.getElementById('loadMoreBtn')

loadMore.addEventListener('click', function () {
    var req = new XMLHttpRequest();

    req.open("GET", "/getProducts");
    req.send();
    req.addEventListener("load", function () {
        location.reload();
    })
    location.reload();

})

