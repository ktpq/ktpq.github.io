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
            option.value = arrayDate[i];
            dateSelect.append(option);
    }
}


function showData(date){
    // let dateSelect = document.querySelector('.date-select');
    let jsonEvent = localStorage.getItem(date);
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
        p.id = arrayEvent[i].name;
        itemLeft.append(imageLeft, p);

        // item right
        const itemRight = document.createElement('div');
        itemRight.classList.add('item-right');

        const imageDelete = document.createElement('img');
        imageDelete.src = '/image/delete.png';
        imageDelete.classList.add('image-delete');
        // append phase
        
        itemRight.append(imageDelete);
        todoItem.append(itemLeft, itemRight);
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
        closePopup();
        location.reload();
    } else { // ว่างช่องใดช่องหนึ่ง
        // ตรงนี้ทำหน้าต่าง popup สำหรับ ไม่สำเร็จ
    }
    
}

function changeStatus(ev) {
    let image = ev.target;  // ได้ image ที่ถูกคลิก

    const parent = (ev.target).parentElement;
    const eventName = parent.querySelector('.todo-text').innerHTML;

    const arrayEvent = JSON.parse(localStorage.getItem(dateSelect.value));
    for (let i = 0; i < arrayEvent.length; i++){
        if (arrayEvent[i].name === eventName){
            if (image.src.includes('/image/uncheck.png')) {
                image.src = '/image/checkbox.png';
                arrayEvent[i].status = 1;
                localStorage.setItem(dateSelect.value, JSON.stringify(arrayEvent));
                break;
            } else {
                image.src = '/image/uncheck.png';  // ถ้ากดซ้ำกลับมาเป็น uncheck
                arrayEvent[i].status = 0;
                localStorage.setItem(dateSelect.value, JSON.stringify(arrayEvent));
                break;
            }
        }
    }
}

function clearList(ev){
    let deleteButton = ev.target;
    let itemRightElement = deleteButton.parentElement;
    let todoEvent = itemRightElement.parentElement;
    removeEvent(todoEvent);
    todoEvent.remove();
}

function removeEvent(parentTag){
    const eventName = parentTag.querySelector('.todo-text').innerHTML;
    const date = dateSelect.value;
    const allEvent = JSON.parse(localStorage.getItem(date));
    for (let i = 0; i < allEvent.length; i++){
        if (allEvent[i].name === eventName){
            allEvent.splice(i, 1);
            break;
        }
    }
    
    localStorage.setItem(date, JSON.stringify(allEvent));
}

function clearSpace() {

    for (let i = localStorage.length - 1; i >= 0; i--) { // วนลูปจากหลังมาหน้า
        const key = localStorage.key(i);
        const valueObj = localStorage.getItem(key);
        const valueArray = JSON.parse(valueObj);

        if (valueArray && valueArray.length === 0) { // ลบเฉพาะคีย์ที่ว่าง
            localStorage.removeItem(key);
        }
    }
}


function clearData(){
    localStorage.clear();
}
// clearData();

function openPopup(){
    inputDate.value = dateSelect.value;
    overlay.style.display = 'block';
    popup.style.display = 'block';
}

function closePopup(){
    overlay.style.display = 'none';
    popup.style.display = 'none';
}

function toShowData(){
    contentTodo.innerHTML = "";
    showData(dateSelect.value);
}


dateSelect.addEventListener('change', toShowData); // เรียกข้อมูลมาแสดง
confirmButton.addEventListener('click', saveData);

addButton.addEventListener('click', openPopup);

document.querySelector('.cancel-button').addEventListener('click', () => {
    closePopup();
    inputText.value = "";
    inputDate.value = "";
})

// เปลี่ยนการตั้งเหตุการณ์จาก allImageCheck.forEach มาเป็นการผูกเหตุการณ์ที่ contentTodo
contentTodo.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('image-check')) {
        changeStatus(ev);
    } else if (ev.target.classList.contains('image-delete')){
        clearList(ev);
    }
});



clearSpace();
dateSelected();
showData(dateSelect.value);
