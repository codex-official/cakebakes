import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
    import {
      getDatabase,
      ref,
      push,
      onValue,
      set,
      get,
      child,
    } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

    import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

    const firebaseConfig = {
      apiKey: "AIzaSyBTMQCoptdmqXnPVIYQBThVbUEpgVIc1TA",
      databaseURL: "https://cakebakes-ef849-default-rtdb.firebaseio.com/",
      authDomain: "cakebakes-ef849.firebaseapp.com",
      projectId: "cakebakes-ef849",
      storageBucket: "cakebakes-ef849.appspot.com",
      messagingSenderId: "151347937117",
      appId: "1:151347937117:web:655ed4a6ee5f39d479b2b4",
      measurementId: "G-E078NQ13MR",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    const products = ref(database, "products");

    // let productList=[]
    // var productAttr;
    var shopList = []
    const parent= document.getElementById('parent');
    let cartCount = JSON.parse(localStorage.getItem("cartCount")) || 0;

    function display() {

      $("#searcher").val(JSON.parse(localStorage.getItem("searchQuery")) || "")
      
      onValue(products, function (snapshot) {
        let chatsArray = Object.values(snapshot.val());
        for (let i=0;i<chatsArray.length;i++) {
        var list = Object.values(chatsArray[i])
        var link = 'https://firebasestorage.googleapis.com/v0/b/cakebakes-ef849.appspot.com/o/1711620494204-product-1.jpg?alt=media&token=d25f44ab-f4ba-42c3-9cfa-c9c1ea121768'
            
        shopList.push(list[2])

        localStorage.setItem("shopList", JSON.stringify(shopList))

             
        const div1 = document.createElement("div");
        div1.appendChild(document.createTextNode(''));
        div1.className = "col-lg-3 col-md-6 col-sm-6"

        const div2 = document.createElement("div");
        div2.appendChild(document.createTextNode(''));
        div2.className = "product__item"
        div1.appendChild(div2);

        const div3 = document.createElement("div");
        div3.appendChild(document.createTextNode(''));
        div3.className = "product__item__pic set-bg"
        div3.style.backgroundImage = 'url('+list[0]+')';
        div2.appendChild(div3);

        const div4 = document.createElement("div");
        div4.appendChild(document.createTextNode(""));
        div4.className = "product__label"
        div3.appendChild(div4);

        const span= document.createElement("span");
        span.appendChild(document.createTextNode(list[1]));
        div4.appendChild(span);

        const div5 = document.createElement("div");
        div5.appendChild(document.createTextNode(""));
        div5.className = "product__item__text"
        div2.appendChild(div5);

        const h6 = document.createElement("h6");
        const a1 = document.createElement("a");
        a1.appendChild(document.createTextNode(list[2]))
        h6.appendChild(a1);
        div5.appendChild(h6);
        h6.style.color = "#111111";
        h6.style.fontWeight = "600";
        h6.style.textTransform = "uppercase";

        const div6 = document.createElement("div");
        div6.appendChild(document.createTextNode("Rs " + list[3]));
        div6.className = "product__item__price"
        div5.appendChild(div6);

        const div7 = document.createElement("div");
        div7.appendChild(document.createTextNode(""));
        div7.className = "cart_add"
        div5.appendChild(div7);

        const a = document.createElement("a");
        a.appendChild(document.createTextNode("Add to Cart"))
        a.id="product" + i;
        a.style.cursor = "pointer"
        a.addEventListener('click', (x)=>{
 
            let currentId = document.getElementById(x.srcElement.id);
            let itemName =
              currentId.parentElement.previousElementSibling.previousElementSibling
                .firstElementChild.innerHTML;
            let itemPrice = currentId.parentElement.previousElementSibling.innerHTML;
            let imgdiv =
              currentId.parentElement.parentElement.previousElementSibling.style
                .backgroundImage;
          
            let productCur = { name: itemName, price: itemPrice, img: imgdiv, qty:1 };
            let productList = JSON.parse(localStorage.getItem("productList")) || [];
            console.log((productList.find((x)=>x.name===productCur.name)))

            if((productList.find((x)=>x.name===productCur.name))!=undefined) {
              a.style.opacity = "0.3"
            }

            if((productList.find((x)=>x.name===productCur.name))==undefined) {
              productList.push(productCur);
              localStorage.setItem("productList", JSON.stringify(productList));
              console.log("uploaded")
          }


          
        a.style.transition = "0.3s"
        a.style.borderBottomColor = "#11111"
        a.style.opacity = "0.3"
        a.innerHTML = "Added to Cart"
        updateCartCount();
          
        });

        a.addEventListener("mouseover",(x)=>{
          let currentId = document.getElementById(x.srcElement.id);
              let itemName =
                currentId.parentElement.previousElementSibling.previousElementSibling
                  .firstElementChild.innerHTML;
              let itemPrice = currentId.parentElement.previousElementSibling.innerHTML;
              let imgdiv =
                currentId.parentElement.parentElement.previousElementSibling.style
                  .backgroundImage;
                  
                  let productCur = { name: itemName, price: itemPrice, img: imgdiv, qty:1 };
                  let productList = JSON.parse(localStorage.getItem("productList")) || [];
          if((productList.find((x)=>x.name===productCur.name))!=undefined) {
            a.style.transition = "0.3s"
            a.style.borderBottomColor = "#11111"
            a.style.opacity = "0.3"
            a.innerHTML = "Added to Cart"
          }
        })

        div7.appendChild(a);
        parent.appendChild(div1);


        updateCartCount();
            
        };
        
        function updateCartCount() {
          let productList = JSON.parse(localStorage.getItem("productList")) || [];
          cartCount = productList.map((x)=>x.qty).reduce((x,y)=>x+y,0)
          document.getElementsByClassName('header__top__right__cart')[0].firstElementChild.lastElementChild.innerHTML = cartCount
          document.getElementsByClassName('offcanvas__cart__item')[0].firstElementChild.lastElementChild.innerHTML = cartCount
          localStorage.setItem("cartCount", JSON.stringify(cartCount))
          var arr  = [].slice.call(document.getElementsByClassName("cart__price"))
          arr.map((x)=>{
          (x.firstElementChild.innerHTML) = "Rs " + JSON.parse(localStorage.getItem("total"));
        })
        }
          
          // return (parent.innerHTML += productList.map((x) => {`
          //   <div class="col-lg-3 col-md-6 col-sm-6">
          //   <div class="product__item">
          //     <div
          //       class="product__item__pic set-bg"
          //       data-setbg="img/shop/product-2.jpg"
          //       style="background-image: url(img/shop/product-2.jpg);"
          //     >
          //       <div class="product__label">
          //         <span>Cupcake</span>
          //       </div>
          //     </div>
          //     <div class="product__item__text">
          //       <h6><a href="#">${list[2]}</a></h6>
          //       <div class="product__item__price">${list[3]}</div>
          //       <div class="cart_add">
          //         <a href="#" id="two" onclick="addtoCart(this)">Add to cart</a>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          //   `
          //   })); 
            
            
              
                

                // const div1 = document.createElement("div");
                // div1.appendChild(document.createTextNode(''));
                // div1.className = "col-lg-3 col-md-6 col-sm-6"

                // const div2 = document.createElement("div");
                // div2.appendChild(document.createTextNode(''));
                // div2.className = "product__item"
                // div1.appendChild(div2);

                // const div3 = document.createElement("div");
                // div3.appendChild(document.createTextNode(''));
                // div3.className = "product__item__pic set-bg"
                // var image = list[0];
                // div3.style.backgroundImage = 'url('+image+')';
                // div2.appendChild(div3);

                // const div4 = document.createElement("div");
                // div4.appendChild(document.createTextNode(""));
                // div4.className = "product__label"
                // div3.appendChild(div4);

                // const span= document.createElement("span");
                // span.appendChild(document.createTextNode(list[1]));
                // div4.appendChild(span);

                // const div5 = document.createElement("div");
                // div5.appendChild(document.createTextNode(""));
                // div5.className = "product__item__text"
                // div2.appendChild(div5);

                // const h6 = document.createElement("h6");
                // const a1 = document.createElement('a');
                // a1.appendChild(document.createTextNode(list[2]));
                // h6.appendChild(a1);
                // div5.appendChild(h6);
                // h6.style.color = "#111111";
                // h6.style.fontWeight = "600";
                // h6.style.textTransform = "uppercase";

                // const div6 = document.createElement("div");
                // div6.appendChild(document.createTextNode(list[3]));
                // div6.className = "product__item__price"
                // div5.appendChild(div6);

                // const div7 = document.createElement("div");
                // div7.appendChild(document.createTextNode(""));
                // div7.className = "cart_add"
                // div5.appendChild(div7);

                // const a = document.createElement("a");
                // a.appendChild(document.createTextNode("Add to Cart"));
                // a.style.cursor="pointer";
                // a.addEventListener('click',() => {
                //   addtoCart(this)
                // })
                // div7.appendChild(a);
            


                // parent.appendChild(div1);
            
            
          
          
          
        });
      }
      display();

