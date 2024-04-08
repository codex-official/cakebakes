
var basket = JSON.parse(localStorage.getItem("productList"))
var parent = document.getElementsByClassName("checkout__total__products")
var totalParent = document.getElementsByClassName("checkout__total__all")
var count = 0
var total = JSON.parse(localStorage.getItem("total"))
basket.map((x)=>{
    count += 1
    return parent[0].innerHTML+=`
    <li>
     <samp>${count}.</samp> ${x.name}
      <span>${"Rs " + x.price.substr(2) * x.qty}</span>
    </li>
    `
})

totalParent[0].innerHTML = `<li>Subtotal <span>Rs ${total}</span></li>
<li>Total <span>Rs ${total}</span></li>`


if(basket[0] == undefined) {
    totalParent[0].firstElementChild.firstElementChild.innerHTML = "Rs 0"
    totalParent[0].lastElementChild.firstElementChild.innerHTML = "Rs 0"
}
