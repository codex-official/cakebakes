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

    //Calculating discount
    let discQuery = document.getElementById("query")
    let discCat = ref(database, "discountCategory");
    let discVal = 0
    let max = 0
    let button = document.getElementById("submitDisc")
    let discount = document.getElementsByClassName('cart__total')[0].lastElementChild.previousElementSibling.firstElementChild.nextElementSibling.firstElementChild;
    let grossAmt = localStorage.getItem("grossAmt");
    discount.innerHTML = "Rs " + (localStorage.getItem("discount")||"0")
    button.addEventListener("click", calcDiscount);

    function calcDiscount() {
        let grossAmt = localStorage.getItem("grossAmt"); 
        let discArray = []
        onValue(discCat, function(snapshot){
            let chatsArray = Object.values(snapshot.val());
            for (let i=0;i<chatsArray.length;i++) {
                var list = Object.values(chatsArray) 
                discArray.push(list[i].name);
                console.log(grossAmt>=parseInt(list[i].minval))
                if ((list[i].name==discQuery.value)&&(grossAmt>=(parseInt(list[i].minval)||0))) { 
                    console.log(discQuery.value, list[i].minval)
                    discVal = list[i].value;
                    max = list[i].max;
                    localStorage.setItem("discName",list[i].name)
                    setDiscounts(discVal, max);  
                    document.getElementById("errormess").innerHTML = ""              
                }

                if ((!(discArray.includes(discQuery.value)))||(grossAmt<<(parseInt(list[i].minval)||0))) {
                    document.getElementById("errormess").innerHTML = "The coupon code maybe invalid, expired or may not be fulfilling the minimum order quantity."
                }
            }  
            
            
        })

    }

    function setDiscounts(discVal, max){
        grossAmt = localStorage.getItem("grossAmt");
        let discountAmt = Math.min(grossAmt*(parseInt(discVal)/100), parseInt(max));
        
        // let total = document.getElementsByClassName('cart__total')[0].lastElementChild.previousElementSibling.lastElementChild.firstElementChild;
        discount.innerHTML = "Rs " + discountAmt
        localStorage.setItem("discount", discountAmt)
        
        localStorage.setItem("total", grossAmt - discountAmt);
        TotalAmount();

        //Modifying CSS
        if (localStorage.setItem("discount", discountAmt)!=0) {
            
            // document.getElementById("query").value = ""
        }
        
    }

    
    
    
