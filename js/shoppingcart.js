

function displayCart () {

  for (let i=1;i<=localStorage.getItem("itemCount");i++) {
    const parent= document.getElementById('parent2');
    const tr = document.createElement("tr");
    

    const td = document.createElement("td");
    td.className = "product__cart__item"
    tr.appendChild(td);

    const div1 = document.createElement('div');
    div1.className = "product__cart__item__pic"
    td.appendChild(div1);

    const img = document.createElement('img');
    img.src = "img/shop/cart/cart-1.jpg"
    img.src = localStorage
    .getItem("cartID" + i)
    .split(",")[2]
    .match(/(?:"[^"]*"|^[^"]*$)/)[0]
    .replace(/"/g, "");
    div1.appendChild(img);

    const div2 = document.createElement("div");
    div2.className = "product__cart__item__text"
    h6 = document.createElement('h6');
    h6.innerHTML = localStorage.getItem("cartID" + i).split(",")[0];
    div2.appendChild(h6);
    h5 = document.createElement('h5');
    h5.innerHTML = localStorage.getItem("cartID" + i).split(",")[1];
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
    const input = document.createElement('input');
    input.type = 'text'
    input.value = '1'
    input.id="qtyinput"
    div4.appendChild(input); 
    div3.appendChild(div4);

    const td3 = document.createElement('td');
    

    td3.innerHTML = "$ 30.00"
    td3.className = "cart__price"
    tr.appendChild(td3);

    const td4 = document.createElement('td');
    td4.className = "cart__close"
    const span = document.createElement('span');
    span.className = "icon_close"
    span.addEventListener('click', () => {
        tr.remove();
        localStorage.removeItem("cartID" + i);
    })
    td4.appendChild(span);
    tr.appendChild(td4);

    parent.appendChild(tr);



    input.addEventListener("", () => {
      td3.innerHTML = "$" + parseFloat(localStorage.getItem("cartID" + i).split(",")[1].slice(1)) * parseInt(document.getElementById("qtyinput").value) + ".00"
    })
    // td3.innerHTML = parseFloat(localStorage.getItem("cartID" + i).split(",")[1].slice(1)) * parseInt(document.getElementById("qtyinput").value)
    console.log(parseFloat(localStorage.getItem("cartID" + i).split(",")[1].slice(1)))
    

  }
        
    
}
    
displayCart();

