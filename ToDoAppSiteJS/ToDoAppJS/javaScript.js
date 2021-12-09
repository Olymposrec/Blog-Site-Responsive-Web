// ***** VARS
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;
// LOAD ITEMS
loadItems();
//CALL EVENT LISTENER
eventListeners();
// **** EVENT LISTENER
function eventListeners(){

    // SUBMIT EVENT
    form.addEventListener('submit',addNewItem);

    // DELETE AN ITEM
    taskList.addEventListener('click',deleteItem);

    // DELETE ALL ITEM
    btnDeleteAll.addEventListener('click',deleteAllItems);
}
function loadItems(){
    items = getItemsFromLS();
    items.forEach(function(item){
        createItem(item);
    });
}
// **** GET ITEMS FROM LOCAL STORAGE
function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items=[];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }

    return items;
}
// **** SET ITEMS TO LOCAL STORAGE
function setItemToLS(text){
    items= getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}
// **** DELETE ITEM FROM LS
function deleteItemFromLS(text){
    items= getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}
// **** CREATE ITEM
function createItem(text){
      // Create 'li'
      const li = document.createElement('li');
      li.className ="list-group-item added-list-group-item liFont";
      li.appendChild(document.createTextNode(text));

      // Create 'a'
      const a = document.createElement('a');
      a.classList='delete-item icon-color float-right';
      a.setAttribute('href','#');
      a.innerHTML='<i class="fas fa-times icon-color"></i>';

      // add a to li
      li.appendChild(a);

      // add li to ul
      taskList.appendChild(li);
}
// **** ADD NEW ITEM 
function addNewItem(e){
    // ADD ITEM
    createItem(input.value);
    
    // SET TO LOCAL STORAGE
    setItemToLS(input.value);

    // CLEAR VAL
    input.value='';

    e.preventDefault();
}
// **** DELETE TASK
function deleteItem(e){
    if(e.target.className=='fas fa-times icon-color'){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            //DELETE ITEM FROM LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}
// **** DELETE ALL TASKS
function deleteAllItems(e){
    if(confirm('Are you sure ?')){
        //taskList.innerHTML='';
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
     localStorage.clear();
    }
    e.preventDefault();
}