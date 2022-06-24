// ------ CONFIG ------
const FRAME_DELAY = 2 // höhere Zahl = niederigere Frame Rate
const SPEED = 10 // höhere Zahl = schneller

const FILE_PREFIX = "public/frames_m/Echo-Umlaut_m_"
const FILE_PREFIX_MOBILE = "public/frames_mobil/Echo-Umlaut_mobile_"

// Init
const IS_TOUCH = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0
let IS_MOBILE = window.innerWidth <= 1000
const FRAME_COUNT = 29
let counter = 0
let size = updateSize()
let frc = 0


//PRELOADER

images = []
const preloadImages = () => {
  for (let i = 1; i < FRAME_COUNT; i++) {
    images[i] = new Image()
    images[i].src = currentFrame(i)
  }
}

preloadImages()

const html = document.documentElement
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

let img = new Image()
img.src = currentFrame(0)
canvas.width = window.innerWidth
canvas.height = window.innerHeight

img.onload = function () {
  context.drawImage(
    img,
    canvas.width / 2 - size / 2,
    canvas.height / 2 - size / 2,
    size,
    size
  )
}

document.addEventListener('resize', e => {
  size = updateSize()
})

if (IS_TOUCH) {
  document.addEventListener('scroll', event => {
    const scrollTop = html.scrollTop
    const tmp = scrollTop * 0.1

    counter = Math.floor(tmp % FRAME_COUNT)
    requestAnimationFrame(() => updateImage(counter))
  })
} else {
  document.addEventListener('wheel', event => {
    if (frc++ % FRAME_DELAY != 0) {
      if (checkScrollDirectionIsUp(event)) {
        counter -= Math.floor(1 + SPEED / 10)
        if (counter < 0) {
          counter = FRAME_COUNT - 1
        }
      } else {
        counter += Math.floor(1 + SPEED / 10)
        if (counter >= FRAME_COUNT) {
          counter = 0
        }
      }
      requestAnimationFrame(() => updateImage(counter))
    }
  })
}

function pad (num) {
  var s = '000000000' + num
  return s.substring(s.length - 5, s.length)
}

function currentFrame (num) {
  console.log(pad(num % FRAME_COUNT))
  if (IS_TOUCH) {
    num = num % FRAME_COUNT
  }
  if (IS_MOBILE) {
     return FILE_PREFIX_MOBILE + pad(num) + '.jpg'
  } else {
      return FILE_PREFIX + pad(num) + '.jpg'
  }
}

const updateImage = index => {
  img.src = currentFrame(index)
  context.drawImage(
    img,
    canvas.width / 2 - size / 2,
    canvas.height / 2 - size / 2,
    size,
    size
  )
}

function updateSize () {
  if (IS_MOBILE) {
    return Math.max(window.innerWidth, window.innerHeight + 200)
  } else {
    return Math.max(window.innerWidth, window.innerHeight)
  }
}

function checkScrollDirectionIsUp (event) {
  if (event.wheelDelta) {
    return event.wheelDelta > 0
  }
  return event.deltaY < 0
}
