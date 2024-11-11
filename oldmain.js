let overlay = document.querySelector('.overlay');
let addButton = document.querySelector('.add-button');

let popup = document.querySelector('.popup');
let cancelButton = document.querySelector('.cancel');
let confirmButton = document.querySelector('.confirm');
let inputEvent = document.querySelector('.input-event');
let inputDate = document.querySelector('.input-date');

function Event(event_name){
    this.name = event_name;
    this.status = 0;
    // return saveData(Event);
}


function saveData(){
    let found = false;
    let event = new Event(inputEvent.value);

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
}

function clearData(){
    localStorage.clear();
}


confirmButton.addEventListener('click', saveData);
addButton.addEventListener('click', () => {
    overlay.style.display = 'block';
    popup.style.display = 'block';
})

cancelButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    popup.style.display = 'none';
})

// clearData();