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



function displayTestimonial() {
    let parent = document.getElementById("testparent");    
    let testCat = ref(database, "testimonials");
    onValue(testCat, function (snapshot) {
        let chatsArray = Object.values(snapshot.val());
        for (let i=0;i<chatsArray.length;i++) {
            var list = Object.values(chatsArray[i])
            console.log(list[1])
            parent.innerHTML+=
            `
            <div class="col-lg-6">
              <div class="testimonial__item">
                <div class="testimonial__author">
                  <div class="testimonial__author__pic">
                    <img src="img/usericon.jpg" alt="" />
                  </div>
                  <div class="testimonial__author__text">
                    <h5>${list[2]}</h5>
                    <span>${list[0]}</span>
                  </div>
                </div>
                <div class="rating">
                  <span class="icon_star"></span>
                  <span class="icon_star"></span>
                  <span class="icon_star"></span>
                  <span class="icon_star"></span>
                  <span class="icon_star-half_alt"></span>
                </div>
                <p>
                  ${list[1]}
                </p>
              </div>
            </div>
            `              
        }
            $(".testimonial__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 2,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });
    })
}
displayTestimonial();
