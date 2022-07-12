// Copyright (C) 2022 David Wahrenburg - All Rights Reserved
// Frame Visuals by Julika Hother
    
// ------ CONFIG ------

const FRAME_DELAY = 0 // höhere Zahl = niederigere Frame Rate
const SCROLL_ANIMATION_SPEED = 50 // höhere Zahl = schneller


// ------ SETUP ------
const FRAME_COUNT = 120
const ASPECT_RATIO = 19 / 9;

const FILE_PREFIX = 'public/frames_desktop/frame_'
const FILE_PREFIX_MOBILE = 'public/frames_mobile/frame_mobile_'

//  INIT
const IS_TOUCH = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0
let IS_MOBILE = window.innerWidth <= 1000
let counter = 0
let size = updateSize()
let frame_counter = 0

window.addEventListener(
  'resize',
  e => {
    size = updateSize()
    updateImage(counter)
  },
  true
)

//  PRELOADER
let images = []
for (let i = 0; i < FRAME_COUNT; i++) {
  images[i] = new Image()
  images[i].src = IS_MOBILE
    ? FILE_PREFIX_MOBILE + pad(i) + '.jpeg'
    : FILE_PREFIX + pad(i) + '.jpeg'
}

// PAINT CANVAS

const html = document.documentElement
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
let img = new Image()
;(img = images[0]), (canvas.width = window.innerWidth)
canvas.height = window.innerHeight

img.onload = () => {
  context.drawImage(
    img,
    canvas.width / 2 - ((size * ASPECT_RATIO) / 2),
    canvas.height / 2 - size / 2,
    (size * ASPECT_RATIO),
    size
  )
}

//  SCROLL ANIMATION
activate_scroll()

function activate_scroll () {
  if (IS_TOUCH) {
    document.addEventListener('scroll', event => {
      const scrollTop = html.scrollTop
      const tmp = scrollTop * 0.1

      counter = Math.floor(tmp % FRAME_COUNT)
      requestAnimationFrame(() => updateImage(counter))
    })
  } else {
    document.addEventListener('wheel', event => {
      if (frame_counter++ % FRAME_DELAY != 0) {
        if (checkScrollDirectionIsUp(event)) {
          counter -= SCROLL_ANIMATION_SPEED / 100
          if (counter < 0) {
            counter = FRAME_COUNT - 1
          }
        } else {
          counter += SCROLL_ANIMATION_SPEED / 100
          if (counter >= FRAME_COUNT) {
            counter = 0
          }
        }
        requestAnimationFrame(() => updateImage(Math.floor(counter)))
      }
    })
  }
}

//  HELFER

function pad (num) {
  var s = '000000000' + num
  return s.substring(s.length - 4, s.length)
}

const updateImage = index => {
  if (IS_TOUCH) {
    index = index % FRAME_COUNT
  }
  //img.src = currentFrame(index)
  context.drawImage(
    images[index],
    canvas.width / 2 - (size * 2.1) / 2,
    canvas.height / 2 - size / 2,
    (size * 2.1),
    size
  )
}

function updateSize () {
  if (IS_MOBILE) {
    return Math.max(window.innerWidth, window.innerHeight + 200)
  } else {
    return Math.max(window.innerWidth / ASPECT_RATIO, window.innerHeight);
  }
}

function checkScrollDirectionIsUp (event) {
  if (event.wheelDelta) {
    return event.wheelDelta > 0
  }
  return event.deltaY < 0
}
