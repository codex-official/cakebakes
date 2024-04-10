import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, set, get, child} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const firebaseConfig = {
    apiKey: "AIzaSyBTMQCoptdmqXnPVIYQBThVbUEpgVIc1TA",
    databaseURL: "https://cakebakes-ef849-default-rtdb.firebaseio.com/",
    authDomain: "cakebakes-ef849.firebaseapp.com",
    projectId: "cakebakes-ef849",
    storageBucket: "cakebakes-ef849.appspot.com",
    messagingSenderId: "151347937117",
    appId: "1:151347937117:web:655ed4a6ee5f39d479b2b4",
    measurementId: "G-E078NQ13MR"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)



const users = ref(database,"users")
console.log(users);




const submit1 = document.getElementById("submit1");
submit1.addEventListener("click",test)

function test() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const req = document.getElementById("requirements").value;
    const mail = document.getElementById("mail").value;
    set(ref(database, 'users/' + name), {
        name: name,
        phone: phone,
        requirements: req,
        mail: mail
    });
    // push(users,name)
    console.log(phone);
}
