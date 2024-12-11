const states = ["AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
const zones = [4, 3, 4, 3, 3, 5, 5, 6, 6, 2, 1, 4, 1, 1, 4, 4, 5, 5, 5, 4, 1, 4, 1, 2, 1, 3, 5, 5, 3, 5, 5, 1, 4, 4, 2, 5, 5, 6, 1, 4, 4, 3, 5, 5, 2, 5, 1, 1]
const taxRate = .15;
const catalog = ["chair", "recliner", "table", "umbrella"];
const prices = [25.50, 37.75, 49.95, 24.89]

//instantiating a currency object so all currency displayed in html will have correct formatting
let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// hiding the invoice div until needed
document.getElementById("invoice").style.display = "none";

function makePurchase() {
    let keepShopping;
    let shoppingCart = [];
    let quantities = []
    let itemTotal = 0;

    //do while loop that lets shopper continue to add items and their quantities until they no longer want to
    do {
        let chosenItem = prompt("What item would you like to buy today: Chair, Recliner, Table, or Umbrella?");
        shoppingCart.push(chosenItem.toLowerCase());
        let purchaseQuantity = prompt(`How many ${chosenItem}s would you like to buy?`)
        quantities.push(parseInt(purchaseQuantity))
        keepShopping = prompt("Continue shopping? y/n")
    } while (keepShopping.toUpperCase() === "Y")

    //getting state from user and ensuring it is in the states array
    let state = prompt("Please enter the two letter state abbreviation")
    state = state.toUpperCase();
    while (!states.includes(state)) {
        state = prompt(`We don't ship to ${state}. Please enter a valid state`)
    }

    //uses the indices of the parallel arrays to find the shipping zone for the state
    let index = states.indexOf(state);
    let shippingZone = zones[index];

    //using helper function to find cost of shipping while passing in the zone
    let shipping = calculateShipping(shippingZone);

    //hiding the make purchase button and showing the invoice div
    document.getElementById("make-purchase").style.display = "none"
    document.getElementById("invoice").style.display = "block"

    //match item in shopping chart to catalog, then use that index to find price, display quantity, and total cost for that item * quantity
    let i = 0;
    while (i < shoppingCart.length) {
        document.getElementById("items").innerHTML += shoppingCart[i] + "</br>";
        document.getElementById("quantity").innerHTML += quantities[i] + "</br>";
        let unitPrice = catalog.indexOf(shoppingCart[i])
        unitPrice = prices[unitPrice]
        document.getElementById("unit-price").innerHTML += unitPrice.toFixed(2) + "</br>"
        let costIndex = catalog.indexOf(shoppingCart[i])
        let totalPrice = prices[costIndex];
        totalPrice = totalPrice * quantities[i];
        document.getElementById("total-price").innerHTML += totalPrice.toFixed(2) + "</br>";
        itemTotal += totalPrice;
        i++;
    }

    //if total purchase is over $100, shipping is free
    itemTotal > 100 ? shipping = 0 : shipping = shipping;

    // display bottom portion of invoice
    document.getElementById("transaction-info").innerHTML =
        `
        <p><b>Item Total:</b> <span style="float:right;">${USDollar.format(itemTotal)}</span>
        <p><b>Shipping to ${state}:</b> <span style="float:right;">${USDollar.format(shipping)}</span>
        <p><b>Subtotal:</b> <span style="float:right;">${USDollar.format(itemTotal + shipping)}</span>
        <p><b>Tax:</b> <span style="float:right;">${USDollar.format(taxRate * itemTotal)}</span>
        <p><b>Invoice Total:</b> <span style="float:right;">${USDollar.format((taxRate * itemTotal) + itemTotal + shipping)}</span>
`
}

//helper function used to find cost of shipping based on zone
function calculateShipping(zone) {
    let shippingCost;
    switch (zone) {
        case 1:
            shippingCost = 0.00
            return shippingCost
        case 2:
            shippingCost = 20.00
            return shippingCost
        case 3:
            shippingCost = 30.00
            return shippingCost
        case 4:
            shippingCost = 35.00
            return shippingCost
        case 5:
            shippingCost = 45.00
            return shippingCost
        case 6:
            shippingCost = 50.00
            return shippingCost
        default:
            break;
    }
}