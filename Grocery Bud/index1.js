const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');


//edit options
let editElement;
//tells we are edititng or not
let editFlag = false;
//to get specific item in list
let editId = "";

form.addEventListener('submit',addItem);
clearBtn.addEventListener('click',clearItems);
window.addEventListener('DOMContentLoaded',setUpItems);

function createListItems(id,value){
    const element = document.createElement('article');
    element.classList.add('grocery-item');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);

    element.innerHTML = `<p class="tiltle">${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
        </button>
    </div>`;

    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click',deleteItem);
    editBtn.addEventListener('click',editItem);

    list.appendChild(element);

}
function addItem(item){
    item.preventDefault();  
    const value = grocery.value;
    const id = new Date().getTime().toString();
    

    if(value !== '' && editFlag === false)
    {
        createListItems(id,value);
        displayAlert("item added","success");
        container.classList.add('show-container');
        addToLocalStorage(id,value);
        setBackTodefault();

    }
    else if (value !== '' && editFlag === true) {
        //console.log('editing');
        editElement.innerHTML = value;
        displayAlert('value change','success');
        editToLocalStorage(editId,value);
        setBackTodefault();
    }
    else {
        displayAlert("Add Some item", "danger");
    }
}

function setBackTodefault()
{
    grocery.value = '';
    editFlag = false;
    editId = '';
    submitBtn.textContent = 'submit';
    
}
function displayAlert(msg,action)
{
    alert.textContent = msg;
    alert.classList.add(`alert-${action}`);

    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    },1000);
}
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0)
    {
        items.forEach(function(item)
        {
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    displayAlert("Empty List", "success");
    setBackTodefault();
    localStorage.removeItem('list');
}

function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = 'edit';
   
}
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    //console.log(e.currentTarget.parentElement);
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0)
    {
        container.classList.remove('show-container');
    }
    displayAlert('item removed','success');
    setBackTodefault();
    //remove from local storage
    removeFromLocalStorage(id);
}


//local storage
function addToLocalStorage(id, value) 
{
    const groceryItems = {id:id,value:value}
    let items = getLocalStorage();
    console.log(items);
    items.push(groceryItems);
    localStorage.setItem('list',JSON.stringify(items));
}
function getLocalStorage(){
    return items = localStorage.getItem("list")?JSON.parse(localStorage.getItem('list')):[];
}
function removeFromLocalStorage(id)
{
    let items = getLocalStorage();
    
    items = items.filter(function(item){
        if(item.id !== id){
            return item;
        }
    });
    localStorage.setItem("list",JSON.stringify(items));
}
function editToLocalStorage(id,value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id === id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list",JSON.stringify(items));
}

function setUpItems(){
    let items = getLocalStorage();
    if(items.length>0)
    {
        items.forEach(function(item){
            createListItems(item.id,item.value);
        })
        container.classList.add('show-container');
    }
}