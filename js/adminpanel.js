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



    function display() {
        onValue(products, function (snapshot) {
          let chatsArray = Object.values(snapshot.val());
          for (let i=0;i<chatsArray.length;i++) {
            var list = Object.values(chatsArray[i])
            var link = 'https://firebasestorage.googleapis.com/v0/b/cakebakes-ef849.appspot.com/o/1711620494204-product-1.jpg?alt=media&token=d25f44ab-f4ba-42c3-9cfa-c9c1ea121768'
            console.log(list[0])
            
              
                const parent= document.getElementById('parent');

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
                var image = list[0];
                div3.style.backgroundImage = 'url('+image+')';
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
                h6.appendChild(document.createTextNode(list[2]));
                div5.appendChild(h6);
                h6.style.color = "#111111";
                h6.style.fontWeight = "600";
                h6.style.textTransform = "uppercase";

                const div6 = document.createElement("div");
                div6.appendChild(document.createTextNode(list[3]));
                div6.className = "product__item__price"
                div5.appendChild(div6);

                const div7 = document.createElement("div");
                div7.appendChild(document.createTextNode(""));
                div7.className = "cart_add"
                div5.appendChild(div7);

                const a = document.createElement("a");
                a.appendChild(document.createTextNode("Add to Cart"));
                div7.appendChild(a);


                parent.appendChild(div1);

            
            
            
            
          }
          
        });
      }
      display();

// const parent= document.getElementById('parent');

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
// div3.style.backgroundImage = "url(img/shop/product-1.jpg)";
// div2.appendChild(div3);

// const div4 = document.createElement("div");
// div4.appendChild(document.createTextNode(""));
// div4.className = "product__label"
// div3.appendChild(div4);

// const span= document.createElement("span");
// span.appendChild(document.createTextNode("Cupcake"));
// div4.appendChild(span);

// const div5 = document.createElement("div");
// div5.appendChild(document.createTextNode(""));
// div5.className = "product__item__text"
// div2.appendChild(div5);

// const h6 = document.createElement("h6");
// h6.appendChild(document.createTextNode("test"));
// div5.appendChild(h6);
// h6.style.color = "#111111";
// h6.style.fontWeight = "600";
// h6.style.textTransform = "uppercase";

// const div6 = document.createElement("div");
// div6.appendChild(document.createTextNode("$32.00"));
// div6.className = "product__item__price"
// div5.appendChild(div6);

// const div7 = document.createElement("div");
// div7.appendChild(document.createTextNode(""));
// div7.className = "cart_add"
// div5.appendChild(div7);

// const a = document.createElement("a");
// a.appendChild(document.createTextNode("Add to Cart"));
// div7.appendChild(a);


// console.log(div1);
// parent.appendChild(div1);


