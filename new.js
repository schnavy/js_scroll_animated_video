const IS_TOUCH = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0
let IS_MOBILE = window.innerWidth <= 1000

const FRAME_COUNT = 29
const SPEED = 30
let counter = 0
let size = updateSize()

const html = document.documentElement
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

function pad (num) {
  var s = '000000000' + num
  return s.substr(s.length - 5)
}

function currentFrame (num) {
  console.log(pad(num % FRAME_COUNT))
  if (IS_TOUCH) {
    num = (num % FRAME_COUNT) + 1
  }
  if (IS_MOBILE) {
    
    return 'https://umlautfilms.de/wp-content/uploads/2022/06/Echo-Umlaut_mobile_' + pad(num) + '.jpg'
  } else {
    return 'https://umlautfilms.de/wp-content/uploads/2022/06/Echo-Umlaut_' + pad(num) + '.jpg'
  }
}

const preloadImages = () => {
  for (let i = 1; i < FRAME_COUNT; i++) {
    const img = new Image()
    img.src = currentFrame(i)
  }
}

const img = new Image()
img.src = currentFrame(0)
canvas.width = window.innerWidth
canvas.height = window.innerHeight
img.onload = function () {
  let size = Math.max(window.innerWidth, window.innerHeight)
  context.drawImage(
    img,
    canvas.width / 2 - size / 2,
    canvas.height / 2 - size / 2,
    size,
    size
  )
}

const updateImage = index => {
  let size = Math.max(window.innerWidth, window.innerHeight)
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
    if (checkScrollDirectionIsUp(event)) {
      counter -= 1 + SPEED / 10
      if (counter < 0) {
        counter = FRAME_COUNT -1
      }
    } else {
      counter += 1 + SPEED / 10
      if (counter >= FRAME_COUNT) {
        counter = 0
      }
    }
    requestAnimationFrame(() => updateImage(counter))
  })

}

preloadImages()
