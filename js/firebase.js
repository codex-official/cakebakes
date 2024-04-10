
let productList = JSON.parse(localStorage.getItem("productList"))
const parent= document.getElementById('parent2');
function displayCart () {
  
  for (let i=0;i<productList.length;i++) {
    
    const tr = document.createElement("tr");
    
    const td = document.createElement("td");
    td.className = "product__cart__item"
    tr.appendChild(td);

    const div1 = document.createElement('div');
    div1.className = "product__cart__item__pic"
    td.appendChild(div1);
    

    const img = document.createElement('img');
    // console.log(productList[])
    img.src = JSON.parse(productList[i].img.match(/(?:"[^"]*"|^[^"]*$)/)[0])
    div1.appendChild(img);
    

    const div2 = document.createElement("div");
    div2.className = "product__cart__item__text"
    h6 = document.createElement('h6');
    h6.innerHTML = productList[i].name;
    div2.appendChild(h6);
    h5 = document.createElement('h5');
    h5.innerHTML = productList[i].price
    div2.appendChild(h5);
    td.appendChild(div2);

    const td2 = document.createElement('td');
    td2.className = "quantity__item"
    tr.appendChild(td2);

    const div3 = document.createElement('div');
    div3.className = "quantity"
    td2.appendChild(div3);

    const div4 = document.createElement('div');
    div4.className = "pro-qty"
    spanDec = document.createElement("span")
    spanDec.innerHTML = "-"
    spanDec.className = "dec qtybtn"
    div4.appendChild(spanDec);
    const input = document.createElement('input');
    input.type = 'text'
    input.value = '1'
    input.className="qtyinput"
    div4.appendChild(input);
    spanInc = document.createElement("span")
    spanInc.innerHTML = "+"
    spanInc.className = "inc qtybtn"
    div4.appendChild(spanInc); 
    div3.appendChild(div4);
    
    //Decrement to LocalStorage

    spanDec.addEventListener('click',(x)=>{
      let qtyInput = (x.srcElement.nextSibling);
      let count = parseInt(qtyInput.value);
      if(count != 0) {
        count -= 1;
      qtyInput.value = count;

      let name = x.srcElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.innerHTML
      let search = productList.find((x)=>x.name===name);

        if(search.qty!=0){
          search.qty -=1 
          qtyInput.value = search.qty; 
          productList = productList.filter((x)=>x.name!==name);
          productList.push(search);
          localStorage.setItem("productList", JSON.stringify(productList))
          update();
          updateCartCount();
          TotalAmount();
          updateSubAmts(x);
          emptyCart();
        }

        else if(search.qty==0) {
          removeItem(x);
        }
      }})

      // Increment to LocalStorage

      spanInc.addEventListener('click',(x)=>{
        let qtyInput = (x.srcElement.previousSibling);
        let count = parseInt(qtyInput.value);
        count += 1;
        qtyInput.value = count;

        let name = x.srcElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.innerHTML
        let search = productList.find((x)=>x.name===name);
        search.qty +=1
        qtyInput.value = search.qty; 
        productList = productList.filter((x)=>x.name!==name);
        productList.push(search);
        localStorage.setItem("productList", JSON.stringify(productList))
        update();
        updateCartCount();
        TotalAmount();
        updateSubAmts(x)

        })


    const td3 = document.createElement('td');
    td3.innerHTML = "Rs " + parseInt(productList[i].price.substr(2)) * parseInt(productList[i].qty)
    td3.className = "cart__price"
    tr.appendChild(td3);

    const td4 = document.createElement('td');
    td4.className = "cart__close"
    const span = document.createElement('span');
    span.className = "icon_close"

    // Remove item from cart
    span.addEventListener('click', (x)=>{
      removeItem(x);
    })

    function removeItem(x) {
      let selectedItem = x.srcElement.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.innerHTML
        // console.log(x.srcElement.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.innerHTML)
        // console.log(productList.filter((x)=>x.name !== selectedItem))
        productList = productList.filter((x)=>x.name !== selectedItem)
        localStorage.setItem("productList", JSON.stringify(productList));
        tr.remove();
        update();
        updateCartCount();
        TotalAmount();
        emptyCart();
    }

    td4.appendChild(span);
    tr.appendChild(td4);
    parent.appendChild(tr);
    
  }
}  
displayCart();


//Updates the count of product on page
function update(){
  
  inputs=document.getElementsByClassName("qtyinput")
  var arr = [].slice.call(inputs)
  arr.map((x)=>{
    let name = x.parentElement.parentElement.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.innerHTML
    x.value = productList.filter((x)=>x.name===name)[0].qty
  })
  
}
update();

let cartCount = 0;
function updateCartCount() {
  cartCount = productList.map((x)=>x.qty).reduce((x,y)=>x+y,0)
  document.getElementsByClassName('header__top__right__cart')[0].firstElementChild.lastElementChild.innerHTML = cartCount
  localStorage.setItem("cartCount", JSON.stringify(cartCount))
}
updateCartCount();


//Update Totals
function TotalAmount() {
  let amountList = []
  let total = document.getElementsByClassName('cart__total')[0].lastElementChild.previousElementSibling.lastElementChild.firstElementChild;
  let subtotal = document.getElementsByClassName('cart__total')[0].lastElementChild.previousElementSibling.firstElementChild.firstElementChild;
  productList.map((x)=>{
    let amount = parseInt(x.qty) * parseInt(x.price.substr(2));
    amountList.push(amount)
    let totalAmt = amountList.reduce((x,y)=>x+y,0)
    total.innerHTML = "Rs " + totalAmt
    
    subtotal.innerHTML = "Rs " + totalAmt
    localStorage.setItem("total", totalAmt)
    
  })
  if (amountList[0]==undefined){
    console.log(amountList)
    total.innerHTML = "Rs 0" 
    subtotal.innerHTML = "Rs 0" 
  }

  
}

TotalAmount();

function updateSubAmts(x) {
  let subAmt = (x.srcElement.parentElement.parentElement.parentElement.nextElementSibling)
  let qty = (x.srcElement.parentElement.querySelector(".qtyinput").value)
  let price = (x.srcElement.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild.innerHTML);
  subAmt.innerHTML = "Rs " + parseInt(qty) * parseInt(price.substr(2))
  console.log(x.srcElement.parentElement.querySelector(".qtyinput").value)
}

function emptyCart() {
  if (productList[0]==undefined) {
    parent.innerHTML = `<div class="breadcrumb__text">
    <h3>Your cart is empty</h3>
  </div>`
    console.log("empty")
  }
}
emptyCart();
