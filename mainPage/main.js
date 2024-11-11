let overlay = document.querySelector('.overlay');
let addButton = document.querySelector('.add-button');
let popup = document.querySelector('.popup');
let inputText = document.querySelector('.input-text');
let inputDate = document.querySelector('.input-date');

addButton.addEventListener('click', () => {
    overlay.style.display = 'block';
    popup.style.display = 'block';
})

document.querySelector('.cancel-button').addEventListener('click', () => {
    overlay.style.display = 'none';
    popup.style.display = 'none';
    inputText.value = "";
    inputDate.value = "";
})
