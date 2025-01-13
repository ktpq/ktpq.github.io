let lastScrollTop = 0;
let navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () =>{
    const currentScroll = window.pageYOffset;

      if (currentScroll > lastScrollTop) {
        // เลื่อนลง
        navbar.classList.add('hidden');
      } else {
        // เลื่อนขึ้น
        navbar.classList.remove('hidden');;
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
})

$(document).ready(function () {
    $('#3box-cake').owlCarousel({
        loop: true,
        margin: 40,
        nav: false,
        dots: true,
        autoplay: false,
        responsive: {
            320: {
                items: 1
            },
            700: {
                items: 2
            },
            1300: {
                items: 3
            }
        }
    });
});

$(document).ready(function () {
    $('#4box-croissant').owlCarousel({
        loop: true,
        margin: 40,
        nav: false,
        dots: true,
        autoplay: false,
        responsive: {
            320: {
                items: 1
            },
            700: {
                items: 2
            },
            1000: {
                items: 2
            },
            1300: {
                items: 4
            }
        }
    });
});

$(document).ready(function () {
    $('#3box-pudding').owlCarousel({
        loop: true,
        margin: 40,
        nav: false,
        dots: true,
        autoplay: false,
        responsive: {
            320: {
                items: 1
            },
            700: {
                items: 2
            },
            1300: {
                items: 3
            }
        }
    });
});

let allMenu = document.querySelectorAll('.menu-item');
allMenu.forEach((menu) =>{
    menu.addEventListener('mouseover', ()=>{
        let price = menu.querySelector('.menu-price');
        let ingredient = menu.querySelector('.menu-ingredient');
        price.style.display = 'block';
        ingredient.style.display = 'block'
    })
    menu.addEventListener('mouseout', () =>{
        let price = menu.querySelector('.menu-price');
        let ingredient = menu.querySelector('.menu-ingredient');
        price.style.display = 'none';
        ingredient.style.display = 'none'
    })
})












