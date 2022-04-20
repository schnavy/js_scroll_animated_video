let counter = 0

const html = document.documentElement
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const FRAME_COUNT = 29
// const MAX_FRAMES = 2000
const SPEED = 50

function pad (num) {
  var s = '000000000' + num
  return s.substr(s.length - 5)
}

function currentFrame (num) {
  console.log(pad(num % FRAME_COUNT));
  return 'public/01_web/frame' + pad(num % FRAME_COUNT +1) + '.jpg'
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
  context.drawImage(img, canvas.width / 2 - size / 2, canvas.height / 2 - size / 2,size, size)
}

const updateImage = index => {
  
  let size = Math.max(window.innerWidth, window.innerHeight)
  img.src = currentFrame(index)
  context.drawImage(img, canvas.width / 2 - size / 2, canvas.height / 2 - size / 2,size, size)
}


function checkScrollDirectionIsUp (event) {
  if (event.wheelDelta) {
    return event.wheelDelta > 0
  }
  return event.deltaY < 0
}


document.addEventListener('scroll', event => {
  // if (checkScrollDirectionIsUp(event)) {
  //   counter-= 1+SPEED/10
  //   if (counter < 0) {
  //     counter = FRAME_COUNT
  //   }
  // } else {
  //   counter+= 1+SPEED/10
  //   if (counter > FRAME_COUNT) {
  //     counter = 0
  //   }
  // }

  const scrollTop = html.scrollTop;
  // const maxScrollTop = html.scrollHeight - window.innerHeight;
  // const scrollFraction = scrollTop / maxScrollTop;
  // const frameIndex = Math.floor(scrollFraction * maxScrollTop)

  const tmp = scrollTop *0.1
  
  counter = Math.floor(tmp)
  




console.log(counter);

  requestAnimationFrame(() => updateImage(counter))
})


preloadImages()
