let lastScrollTop = 0;
let navbar = document.querySelector('.navbar');
console.log(navbar)
window.addEventListener('scroll', () =>{
    const currentScroll = window.scrollY;

      if (currentScroll > lastScrollTop) {
        // เลื่อนลง
        navbar.classList.add('hidden');
      } else {
        // เลื่อนขึ้น
        navbar.classList.remove('hidden');;
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
})












