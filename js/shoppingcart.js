

function displayCart () {
  let productList = JSON.parse(localStorage.getItem("productList"))
  for (let i=0;i<productList.length;i++) {
    const parent= document.getElementById('parent2');
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
          console.log(search);
          qtyInput.value = search.qty; 
        productList = productList.filter((x)=>x.name!==name);
        productList.push(search);
        localStorage.setItem("productList", JSON.stringify(productList))
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

        })


    const td3 = document.createElement('td');
    td3.innerHTML = "$ 30.00"
    td3.className = "cart__price"
    tr.appendChild(td3);

    const td4 = document.createElement('td');
    td4.className = "cart__close"
    const span = document.createElement('span');
    span.className = "icon_close"

    // Remove item from cart
    span.addEventListener('click', (x) => {
      let selectedItem = x.srcElement.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.innerHTML
        console.log(x.srcElement.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.innerHTML)
        console.log(productList.filter((x)=>x.name !== selectedItem))
        productList = productList.filter((x)=>x.name !== selectedItem)
        localStorage.setItem("productList", JSON.stringify(productList));
        tr.remove();
    })

    td4.appendChild(span);
    tr.appendChild(td4);
    parent.appendChild(tr);
    
  }
}  
displayCart();

function update(){
  inputs=[document.getElementsByClassName("qtyinput")]
  inputs.map((x)=>{
    console.log(x.value)
  })
}
update();
