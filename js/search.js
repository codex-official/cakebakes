

let input = document.getElementById('searcher');
let shopList = JSON.parse(localStorage.getItem('shopList'))
var li, txtValue, a, i;
const parent= document.getElementById('parent');
var li = parent.getElementsByClassName('product__item__text');

input.addEventListener("input", search)

function search() {
    let filter = input.value.toUpperCase()

    
    for (i = 0; i < shopList.length; i++) {
        a = shopList[i];
        txtValue = a;

        console.log(li)
        a = li[i].getElementsByTagName("h6")[0].firstElementChild;
        txtValue = a.textContent || a.innerText;
        

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            
            li[i].parentElement.parentElement.style.display = "";
        } else {
            li[i].parentElement.parentElement.style.display = "none";
        }
    }
    localStorage.removeItem("searchQuery");
}

$("#search-icon").on("click", function () {
    search();
})















