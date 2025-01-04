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

    const orders = ref(database, "orders");

    const submit = document.getElementById("submit");
    submit.addEventListener("click", placeOrder)
    var basket = JSON.parse(localStorage.getItem("productList"))

        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        
       
        const postcode = document.getElementById("postcode");
        const phone = document.getElementById("phone");
        const email = document.getElementById("email");
        const orderNotes = document.getElementById("orderNotes");


        const uniqueId = () => {
            const dateString = Date.now().toString().slice(-8,-1);
            const randomness = Math.random().toString(36).substr(2);
            return dateString;
          };

    function placeOrder() {
        const address1 = document.getElementById("address1");
        const address2 = document.getElementById("address2");
        const town = document.getElementById("town");
        const state = document.getElementById("state");

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        
        
        let localID = localStorage.setItem("orderID", uniqueId())
        if ((firstName.value=="")||(lastName.value=="")||(address1.value=="")||(lastName.value=="")||(town.value=="")||(state.value=="")||(postcode.value=="")||(phone.value=="")||(email.value=="")) {
            alert("Invalid Credentials! Please fill all the necessary details")
            console.log(basket.length==0)
        }
        else if (basket.length==0) {
            console.log("not working")
            alert("No products selected. Please add products to the cart.")
        }
        else {
            set(ref(database, 'orders/' + uniqueId()), {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address1.value + ", " + address2.value + ", " + town.value + ", " + state.value,
                postcode: postcode.value,
                phone: phone.value,
                email: email.value,
                orderNotes:orderNotes.value,
                order:basket,
                orderID: uniqueId(),
                date: currentDate,
                subtotal: subtotal,
                discount: discount,
                total: total
            });
            window.location.href = "./success.html";
        }
        
    }

    


var parent = document.getElementsByClassName("checkout__total__products")
var totalParent = document.getElementsByClassName("checkout__total__all")
var count = 0
var subtotal = JSON.parse(localStorage.getItem("grossAmt"))
var discount = JSON.parse(localStorage.getItem("discount"))
var discName = localStorage.getItem("discName")
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

totalParent[0].innerHTML = `
<li>Subtotal <span>Rs ${subtotal}</span></li>
<li>
(-)Discount <span>Rs ${discount} </span>
<p>${discName}</p>
    </li>
<li>Total <span>Rs ${total}</span></li>
`


if(basket[0] == undefined) {
    totalParent[0].firstElementChild.firstElementChild.innerHTML = "Rs 0"
    totalParent[0].lastElementChild.firstElementChild.innerHTML = "Rs 0"
}


function displayOrders() {
    onValue(orders, function (snapshot) {
        let orderList = Object.values(snapshot.val());
        for (let i=0;i<orderList.length;i++) {
            orderList[i].order.map((x)=>{
                // console.log(x)
            })
        }
        
    })
    
}

displayOrders();
