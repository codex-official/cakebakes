import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

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
const storage = getStorage(app);

// Function to fetch images from Firebase and update UI
 async function fetchAndUpdateImages(path) {
    const newImageUrls = []; // Array to store Firebase image URLs
  
    try {
      const storageRef = ref(storage, path);
      const result = await listAll(storageRef);
  
      // Retrieve URLs for all images and store them in the array
      for (const item of result.items) {
        const url = await getDownloadURL(item);
        newImageUrls.push(url);
      }
  
      console.log("Retrieved image URLs:", newImageUrls);

      const heroSlider = $(".hero__slider");
        // Iterate over the new image URLs
      newImageUrls.forEach((url) => {
        // Create a new .hero__item element
        const newHeroItem = $(`
            <div class="hero__item set-bg" data-setbg="${url}">
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-8">
                            <!-- Additional content can go here -->
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        // Add the new background image using CSS
        newHeroItem.css("background-image", `url(${url})`);

        // Append the new item to the slider
        heroSlider.append(newHeroItem);
      });
      $(".hero__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<i class='fa fa-angle-left'><i/>", "<i class='fa fa-angle-right'><i/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });
  
    } catch (error) {
      console.error("Error fetching images from Firebase:", error);
    }
  }
  
  // Call the function and provide the storage path
  fetchAndUpdateImages("hero-images/");  // Replace "images/" with your Firebase storage folder path

  
