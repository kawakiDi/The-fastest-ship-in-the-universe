const star = document.querySelector('.star')
var lightYearsInput = document.querySelector('.light-years')
var timeOutput = document.querySelector('.time')
var ships = document.querySelector('.ship__image')
var time = 0
var focus = false
var lightYears = '2537000'
const secInYear = 31557600
const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const actionKeys = ['Backspace', 'Enter', 'Delete']
const shipSpeed = ['0.000000000001', '0.00002', '0.000033', '0.015', '0.34', '0.55', '1.12', '3', '3.8', '3.94', '4.2', '7.5', '8', '9', '9.4', '11', '30', '50', '100', '100', '4100', '1900000000']



// html academy - простой слайдер /////////////////////////////////////////////////////////////////////////////////////////////////////////

// Получаем элементы слайдера
const slider = document.querySelector('.wrapper__image');
const prevButton = document.querySelector('.button-left');
const nextButton = document.querySelector('.button-right');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
let slideIndex = 0;

// Устанавливаем обработчики событий для кнопок
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

// Функция для показа предыдущего слайда
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
  console.log(shipSpeed[slideIndex])
  timeOutput.value = (calculate(lightYears, shipSpeed[slideIndex]) / secInYear).toFixed(2)
}

// Функция для показа следующего слайда
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
  console.log(shipSpeed[slideIndex])
  timeOutput.value = (calculate(lightYears, shipSpeed[slideIndex]) / secInYear).toFixed(2)
}

// Функция для обновления отображения слайдера
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

// Инициализация слайдера
updateSlider();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// chat gpt - расчёт времени полёта /////////////////////////////////////////////////////////////////////////////////////////////////////////

function calculate(value, acceleration = new Decimal(9.8)) {
  // if (acceleration.equals(0)) {
  //   acceleration = new Decimal(shipSpeed[0]);
  // }

  acceleration = new Decimal(acceleration)

  const speedOfLight = new Decimal(3).times(Decimal.pow(10, 8));
  const lightYearInMeters = new Decimal(value).times(new Decimal(9.461).times(Decimal.pow(10, 15)));

  const t1 = speedOfLight.div(acceleration);

  const d1 = new Decimal(0.5).times(acceleration).times(Decimal.pow(t1, 2));

  if (new Decimal(2).times(d1).greaterThanOrEqualTo(lightYearInMeters)) {
    const t = Decimal.sqrt(new Decimal(2).times(lightYearInMeters).div(acceleration));
    return t.toString();
  } else {
    const d2 = lightYearInMeters.minus(new Decimal(2).times(d1));
    const t2 = d2.div(speedOfLight);
    const totalTime = new Decimal(2).times(t1).plus(t2);
    return totalTime.toString();
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// вывод данных
function lightYearsOuts() {
  lightYearsInput.value = lightYears
}

lightYearsInput.value = '2537000'
timeOutput.value = (calculate(2537000) / secInYear).toFixed(2)

// ввод данных

lightYearsInput.addEventListener('keydown', (event) => {
  if (numberKeys.includes(event.key)) {
    lightYears = lightYears = ''
  }
  lightYears = lightYearsInput.value
})

// GPT //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Добавляем обработчик события для фокуса
lightYearsInput.addEventListener('focus', () => {
  if (lightYears === '2537000') {
    lightYears = ''
    lightYearsInput.value = ''
  }
  focus = true
});

// Добавляем обработчик события для потери фокуса
lightYearsInput.addEventListener('blur', () => {
  focus = false
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


window.addEventListener('keydown', (event) => {
  let key = event.key

  if (numberKeys.includes(key) && focus === false) {
    if (lightYears === '0') {
      lightYears = ''
    }
    lightYears = lightYears + key
    lightYearsOuts()
  } else if (actionKeys.includes(key)) {
    switch (key) {
      case 'Backspace': {
        if (focus === false) {
          lightYears = lightYears.slice(0, -1)
          if (lightYears === '') {
            lightYears = '0'
          }
          lightYearsOuts()
        }
        break
      }
      case 'Enter': {
        lightYears = lightYearsInput.value
        timeOutput.value = (calculate(lightYears, shipSpeed[slideIndex]) / secInYear).toFixed(2)
        break
      }
      case 'Delete': {
        lightYears = ''
        lightYearsInput.value = 0
        break
      }
    }
  }
})

// звёздное небо
ctx = star.getContext('2d')
star.width = innerWidth
star.height = innerHeight
ctx.fillStyle = "white"

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

for (let i = 0; i <= 200; i++) {
  let x, y, r
  r = getRandomInt(1, 3)
  x = getRandomInt(0, innerWidth * 2)
  y = getRandomInt(0, innrtHeight * 2)
  ctx.fillRect(x, y, r, r)
}
