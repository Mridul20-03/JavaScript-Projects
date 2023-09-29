//Select items
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









//*** Event Listeners */
//submit form
form.addEventListener('submit', addItem);

//clear items
clearBtn.addEventListener('click', clearItems);

/*
// edit items
const deleteBtn = document.querySelector('.delete-btn');
//this will print null because we add items dynamically
//console.log(deleteBtn);
*/


//Add items from localstorage once we reloaad
//load items
window.addEventListener('DOMContentLoaded',setUpItems);




//** Functions *****/
function createListItems(id,value)
{
     //creating new HTML element of type article
     const element = document.createElement('article');
     //now i have to add grocery-item class to my element - since, all my item has this.
     element.classList.add('grocery-item');
     //now i have to id - i will assign it dynamically

     //This type of attribute is often used to store custom data associated with an HTML element.
     const attr = document.createAttribute('data-id');
     attr.value = id;
     // Finally, this line attaches the 'data-id' attribute, along with its value, to the <article> element. This means that the <article> element will now have a data-id attribute with the value set to the value of the id variable.
     element.setAttributeNode(attr);

     //nowwe have set up the element
     element.innerHTML = `<p class="tiltle">${value}</p>
     <div class="btn-container">
         <button type="button" class="edit-btn">
             <i class="fas fa-edit"></i>
         </button>
         <button type="button" class="delete-btn">
             <i class="fas fa-trash"></i>
         </button>
     </div>`;

     //here we can acess edit or delete buttons
     
     //get delete btn
     const deleteBtn = element.querySelector('.delete-btn');
     const editBtn = element.querySelector('.edit-btn');
     deleteBtn.addEventListener('click',deleteItem);
     editBtn.addEventListener('click',editItem);

     //console.log(element);

     //append child to list
     list.appendChild(element);

    
}

function addItem(item) {
    item.preventDefault();
    //console.log(grocery.value);
    const value = grocery.value;
    //get current time in milliseconds and in string form
    const id = new Date().getTime().toString();
    //console.log(id);

    //if value is not empty and user is not editing
    if (value !== '' && editFlag === false) {
        //console.log('not editing');


        createListItems(id,value);


        //display alert
        displayAlert("New item added to list", "success");

        //now we will show container 
        container.classList.add('show-container');


        //Now we will add this items to localstorage
        addToLocalStorage(id, value);

        //set back to default 
        setBackTodefault();

    }
    //if value is not empty but user is editing
    else if (value !== '' && editFlag === true) {
        //console.log('editing');
        editElement.innerHTML = value;
        displayAlert('value changed','success');
        editToLocalStorage(editId,value);
        setBackTodefault();
    }
    else {
        displayAlert("Add Some item", "danger");
    }
}

//display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //remove alert
    //timeout requires 2 things - the function which will be called after the timeout time and the amount of time the alert will be shown
    setTimeout(function () {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);

    }, 1000);
}

// set back to default
function setBackTodefault() {
    grocery.value = '';
    editFlag = false;
    editId = '';
    submitBtn.textContent = 'submit';
    // console.log("set back to defaut");
}

function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    displayAlert("Empty List", "success");
    setBackTodefault();
    localStorage.removeItem('list');
    //console.log(items);
}



//edit function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;

    //set edit item
    //i am looking for the titlein p tag
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //console.log(editElement);
    
    //set form value - this value will be there inthe input box
    grocery.value= editElement.innerHTML;

    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = 'edit';
    
}
//delete function
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
    //console.log('item deleted');
}

///* **** LOCAL STORAGE *********/

//The browser has locaL storage API
//saves method as key-value pair
//localstorage API

//methods of local storage
//setItem
//getItem
//removeItem
//seve as strings
function addToLocalStorage(id, value) 
{
    //this tells that id->id and value->value
    //with es6 we can also write {id,value}
    const groceryItems = {id:id,value:value}
    //console.log(groceryItems);

    let items = getLocalStorage();
    console.log(items);
    items.push(groceryItems);
    localStorage.setItem('list',JSON.stringify(items)); 
}

function getLocalStorage() 
{
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

//to setItem in a local storage we use the syntax

/*
localStorage.setItem('apple',JSON.stringify(['item1','item2']));
let apples = JSON.parse(localStorage.getItem('apple'));
localStorage.removeItem('apple');
*/

//if only key value pair
//localStorage.setItem("Mridul","JAIN");
//console.log(apples);

/********** SETUP ITEMS   *****/
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
