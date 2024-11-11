let overlay = document.querySelector('.overlay');
let addButton = document.querySelector('.add-button');

let popup = document.querySelector('.popup');
let inputText = document.querySelector('.input-text');
let inputDate = document.querySelector('.input-date');
let confirmButton = document.querySelector('.confirm-button');
let dateSelect = document.querySelector('.date-select');

let contentTodo = document.querySelector('.content-todo');

let allImageCheck = document.querySelectorAll('.image-check');

let firstTime = true;

function Event(event_name){
    this.name = event_name;
    this.status = 0;
    // return saveData(Event);
}

function dateSelected(){   // ฟังก์ชั่นใช้ show วันที่ใน tag select
    let arrayDate = [];
    let dateSelect = document.querySelector('.date-select');
    for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        arrayDate.push(key);
    }
    arrayDate.sort();
    
    for (let i = 0; i < arrayDate.length; i++){
            const option = document.createElement('option');
            option.id = arrayDate[i];
            option.innerHTML = arrayDate[i];
            option.id = arrayDate[i];
            dateSelect.append(option);
    }
}


function showData(){
    let dateSelect = document.querySelector('.date-select');
    let jsonEvent = localStorage.getItem(dateSelect.value);
    let arrayEvent = JSON.parse(jsonEvent);
    // console.log(arrayEvent.length);
    for (let i = 0; i < arrayEvent.length; i++){
        let imgSrc = ""
        if (arrayEvent[i].status === 0){ // ยังไม่ได้ทำ
            imgSrc = '/image/uncheck.png'
        } else { // ทำเเล้ว checkbox เขียว
            imgSrc = '/image/checkbox.png'
        }
        
        // todo item
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        // item left
        const itemLeft = document.createElement('div');
        itemLeft.classList.add('item-left')

        const imageLeft = document.createElement('img');
        imageLeft.src = imgSrc;
        imageLeft.classList.add('image-check');

        const p = document.createElement('p');
        p.classList.add('todo-text');
        p.innerHTML = arrayEvent[i].name;

        itemLeft.append(imageLeft, p);

        // item right
        const imageRight = document.createElement('div');
        imageRight.classList.add('item-right');

        const imageDelete = document.createElement('img');
        imageDelete.src = '/image/delete.png';

        // append phase
        
        imageRight.append(imageDelete);
        todoItem.append(itemLeft, imageRight);
        contentTodo.append(todoItem);
    }
    
}

function saveData(){ // บันทึกข้อมูลลงใน localstorage
    let found = false;
    let event = new Event(inputText.value);

    if (event.name != "" && inputDate.value != ""){   // ทั้งวันที่เเละ event ต้องไม่ว่าง
        for (let i = 0; i < localStorage.length; i++){
            let key = localStorage.key(i); // ดึง key ของ item ที่ i
            if (key === inputDate.value){
                found = true;
             }
        }
        if (found){
            let dataStorage  = JSON.parse(localStorage.getItem(inputDate.value));
            dataStorage.push(event);
            localStorage.setItem(inputDate.value, JSON.stringify(dataStorage));
            
            
        } else {
            let dataArray = [];
            dataArray.push(event);
            localStorage.setItem(inputDate.value, JSON.stringify(dataArray));
        }
    } else { // ว่างช่องใดช่องหนึ่ง
        console.log('not success');
    }
    closePopup();
    location.reload();
}

function changeStatus(ev) {
    let image = ev.target;  // ได้ image ที่ถูกคลิก
    if (image.src.includes('/image/uncheck.png')) {
        image.src = '/image/checkbox.png';  // เปลี่ยนรูปภาพเมื่อคลิก
    } else {
        image.src = '/image/uncheck.png';  // ถ้ากดซ้ำกลับมาเป็น uncheck
    }
}


function clearChild(){
    contentTodo.innerHTML = "";
    showData();
}

function clearData(){
    localStorage.clear();
}
// clearData();

function closePopup(){
    overlay.style.display = 'none';
    popup.style.display = 'none';
}




dateSelect.addEventListener('change', clearChild); // เรียกข้อมูลมาแสดง
confirmButton.addEventListener('click', saveData);

addButton.addEventListener('click', () => {
    overlay.style.display = 'block';
    popup.style.display = 'block';
})

document.querySelector('.cancel-button').addEventListener('click', () => {
    closePopup();
    inputText.value = "";
    inputDate.value = "";
})

// เปลี่ยนการตั้งเหตุการณ์จาก allImageCheck.forEach มาเป็นการผูกเหตุการณ์ที่ contentTodo
contentTodo.addEventListener('click', function(ev) {
    if (ev.target.classList.contains('image-check')) {
        changeStatus(ev);
    }
});




dateSelected();
if (firstTime){
    showData();
}
