let input = document.getElementById('searcher');
let shopList = JSON.parse(localStorage.getItem('shopList'))


input.addEventListener("input", () => {
    console.log(shopList[0]);
    var li, txtValue, a, i;
    let filter = input.value.toUpperCase()
    const parent= document.getElementById('parent');
    var li = parent.getElementsByClassName('product__item__text');
    // console.log(li);
    
    for (i = 0; i < shopList.length; i++) {
        a = shopList[i];
        txtValue = a;
        console.log(li)

        a = li[i].getElementsByTagName("h6")[0].firstElementChild;
        txtValue = a.textContent || a.innerText;
        

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            // console.log(li[i].parentElement.parentElement)
            li[i].parentElement.parentElement.style.display = "";
        } else {
            li[i].parentElement.parentElement.style.display = "none";
        }
    }
})









