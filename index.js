//Отримуємо блок в якому буде розміщено скрінсейвер
const screenSaverBg = document.querySelector(".screenSaver");

//Отримуємо параметри екрана користувача
const screenWidth = screen.width;
const screenHeight = screen.height;
const fadeTime = 10;

//Оголошуємо змінні
const links = [
  "https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=9060",
  "https://images.pexels.com/photos/1451074/pexels-photo-1451074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=560",
  "https://images.pexels.com/photos/1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200",
  "https://images.pexels.com/photos/1437629/pexels-photo-1437629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500",
  "https://images.pexels.com/photos/87284/ocean-seacoast-rocks-water-87284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=426&w=400",
  "https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=1260",
  "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];
let showScreenSaver = false;
let mouseDelay;

// fade ефект
function fadeIn(el) {
  let opacity = 0.01;
  el.style.display = "block";
  let timer = setInterval(function () {
    if (opacity >= 1) {
      clearInterval(timer);
    }
    el.style.opacity = opacity;
    opacity += opacity * 0.1;
  }, fadeTime);
}

function fadeOut(el) {
  let opacity = 1;
  let timer = setInterval(function () {
    if (opacity <= 0.1) {
      clearInterval(timer);
      el.style.display = "none";
    }
    el.style.opacity = opacity;
    opacity -= opacity * 0.1;
  }, fadeTime);
}

//Слуаємо подію mousemove
document.addEventListener("mousemove", function () {
  clearTimeout(mouseDelay);
  if (showScreenSaver) {
    removeScreenSaver();
  } else {
    mouseDelay = setTimeout(function () {
      startScreenSaver();
    }, 10000);
  }
});

//Створимо функції, котрі відповідатимуть за запуск "скрінсейвера" та за його зупинку

function removeScreenSaver() {
  fadeOut(screenSaverBg);
  showScreenSaver = false;
}

function startScreenSaver() {
  fadeIn(screenSaverBg); 
  showScreenSaver = true;
  renderScreenSaver();
}

//Створимо функцію відповідальну за відображення самого "скрінсейвера"

function renderScreenSaver() {
  screenSaverBg.style.backgroundColor = "#000";
  rerenderImg();
}

//отримуємо рандомнке значення в межах певного діапазону

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//Створимо функцію відповідальну за відтворення зображення

function renderImages() {
  screenSaverBg.innerHTML = "";
  let index = getRandom(0, links.length);
  let image = document.createElement("img");
  screenSaverBg.insertAdjacentElement("afterbegin", image);
  image.classList.add("screensaverImg");
  fadeIn(document.querySelector('.screensaverImg'));
  image.setAttribute("src", `${links[index]}`);
  image.style.position = "absolute";
  image.style.top = `${getRandom(0, screenHeight - image.height)}px`;
  image.style.left = `${getRandom(0, screenWidth - image.width)}px`;
}

function rerenderImg() {  
  let interval = setInterval(() => {
    renderImages();
  }, 5000);  

  if(!showScreenSaver) {
    clearInterval(interval);
  }
}
