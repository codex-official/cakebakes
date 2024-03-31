let input = document.getElementById('searcher');

input.addEventListener("input", ()=> {
var  li, txtValue, a, i;

    let filter = input.value.toUpperCase()
    var li = document.getElementsByClassName('product__item__text');
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("h6")[0].firstElementChild;
            txtValue = a.textContent || a.innerText;
            console.log(filter);
            
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            console.log(li[i].parentElement.parentElement)
            li[i].parentElement.parentElement.style.display = "";
            } else {
                li[i].parentElement.parentElement.style.display = "none";
            }
        }
})









