var scrollSlider = document.getElementById("scroll-range");
var panel = document.getElementById("page-content");

var total = panel.scrollHeight - panel.offsetHeight;
var percentage = total * (this.value / 100);
var percentageHeight = total / 10; //10% for each +/- click

scrollSlider.oninput = function () {

  panel = document.getElementById("page-content");
  total = panel.scrollHeight - panel.offsetHeight;
  percentage = total * (this.value / 100);
  panel.scrollTop = percentage;

}

const slider = document.getElementById("page-content");
let isDown = false;
let startY;
let scrollTop;

panel.addEventListener('scroll', (e) => {
  total = panel.scrollHeight - panel.offsetHeight;
  percentage = panel.scrollTop / total
  scrollSlider.value = percentage * 100

})


function openOverlay(element) {
  document.getElementById(element).style.height = "100%";
}

function closeOverlay(element) {
  document.getElementById(element).style.height = "0%";
}


const lightbox = document.createElement('div')
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)

const images = document.querySelectorAll('img')
images.forEach(image => {
  image.addEventListener('click', e => {
    lightbox.classList.add('active')
    const img = document.createElement('img')
    img.src = image.src
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild)
    }
    lightbox.appendChild(img)
  })
})

lightbox.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return
  lightbox.classList.remove('active')
})




