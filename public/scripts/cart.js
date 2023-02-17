var cardsContainer = document.getElementsByClassName('cardsContainer')[0];
var allCards = cardsContainer.children;
var removeItemNodes = document.querySelectorAll('.removeItem');
var viewDescriptionNodes = document.querySelectorAll('.descriptionBtn')

// var quantityNode=document.getElementsByClassName('quantity');

for (var i = 0; i < allCards.length; i++) {

    // getting the view details btn element
    var viewDetails = allCards[i].children[5].children[1];

    // getting dlt btn
    var dltBtn = allCards[i].children[5].children[0];

    //  getting quantity increase
    var increaseQuantity = allCards[i].children[4].children[0];

    //  getting quantity decrease
    var decreaseQuantity = allCards[i].children[4].children[2];

    dltBtn.addEventListener('click', function (event) {
        var id = event.target.getAttribute('id')
        onDltBtnClick(id);
        removeItemFromCartPage(event);
    })

    viewDetails.addEventListener('click', onDesClick)
    increaseQuantity.addEventListener('click', function (event) {
        onIncQuantity(event);
    })

    decreaseQuantity.addEventListener('click', function (event) {
        onDecQuantity(event);
    })
}

function onDesClick(event) {
    var parent = event.target.parentNode.parentNode;

    if (parent.children[3].style.display === 'none') {
        parent.children[3].style.display = 'block'
    }
    else {
        parent.children[3].style.display = 'none'
    }
}

function onDltBtnClick(id) {
    var request = new XMLHttpRequest();
    request.open('post', '/cart/deleteItem')
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify({ id: id }));

    request.addEventListener('load', function () {
        if (request.status === 401) {
            alert("error inremoving item");

        }
        else if (request.status === 200) {
            console.log("successfully removed from cart")

        }
    })
}

function removeItemFromCartPage(event) {
    event.target.parentNode.parentNode.remove();
}

function onIncQuantity(event) {
    var id = event.target.parentNode.parentNode.children[5].children[0].getAttribute('id');
    var quantity = event.target.parentNode.children[1];
    var initialQuantity = parseInt(quantity.innerHTML);

    console.log(id);
    var request = new XMLHttpRequest();
    request.open('post', '/cart/increament')
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify({ id: id, quantity: initialQuantity + 1 }));

    request.addEventListener('load', function () {
        if (request.status === 401) {
            alert("error");

        }
        else if (request.status === 200) {
            console.log("success")
        }
    })

    quantity.innerHTML = initialQuantity + 1;
}

function onDecQuantity(event) {
    var id = event.target.parentNode.parentNode.children[5].children[0].getAttribute('id');
    var quantity = event.target.parentNode.children[1];
    var initialQuantity = parseInt(quantity.innerHTML);

    if (initialQuantity > 1) {
        var request = new XMLHttpRequest();
        request.open('post', '/cart/decreament')
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify({ id: id, quantity: initialQuantity - 1 }));

        request.addEventListener('load', function () {
            if (request.status === 401) {
                alert("error");

            }
            else if (request.status === 200) {
                console.log("success")
            }
        })

        quantity.innerHTML = initialQuantity - 1;
    }
}
