
let counter = 0;

function pad(num) {
  var s = "000000000" + num;
  return s.substr(s.length - 5);
}

function currentFrame(num) {
  return "public/01_web/frame" +pad(num)+ ".jpg"
}



const html = document.documentElement;
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frameCount = 29;

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=1158;
canvas.height=770;
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
    );
    
    console.log(frameIndex);
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()
















// var currentVideoIndex = 0
// var listOfVideoSources = [
//   // 'http://umlautfilms.de/wp-content/uploads/2022/01/Komp-1_1_2-1.mp4',
//   // 'http://umlautfilms.de/wp-content/uploads/2022/01/Komp-1_1_3-1.mp4',
//   // 'http://umlautfilms.de/wp-content/uploads/2022/01/Komp-1_1_5-1.mp4'
//   // 'https://umlautfilms.de/wp-content/uploads/2022/01/Type_1_desk.mp4',
//   // 'https://umlautfilms.de/wp-content/uploads/2022/01/Type_2_desk.mp4',
//   // 'https://umlautfilms.de/wp-content/uploads/2022/01/Type_3_desk.mp4',
  
//   'webm/Chrome_ImF.webm',
//   'webm/Type_1_desk.webm',
//   'webm/Type_2_desk.webm',
//   'webm/Type_3_desk.webm'
// ]

// let vid = document.querySelector('.cover-region .background-video video')
// let source = document.querySelector(
//   '.cover-region .background-video video source'
// )
// let frameNumber = 0 // start video at frame 0
// // lower numbers = faster playback
// let playbackConst = 1000

// let height = document.querySelector(".lay-content").clientHeight


// window.onload = () => {
  
//   currentVideoIndex = getRandomIndex()
//   loadVideo(currentVideoIndex)
  
  

// }

// // dynamically set the page height according to video length
// vid.addEventListener('loadedmetadata', function () {
//   duration = vid.duration
//   playbackConst = height / duration
//   window.requestAnimationFrame(scrollPlay)

// })


// // video.onended = function(e) {
// //   console.log("ende");
// //   currentVideoIndex = getRandomIndex()
// //   loadVideo(currentVideoIndex)
// // };


// function scrollPlay(){  
//   var frameNumber  = window.pageYOffset/playbackConst;
//   vid.currentTime  = frameNumber;
//   window.requestAnimationFrame(scrollPlay);
// }





// function loadVideo (currentVideoIndex) {
//   source.setAttribute('src', listOfVideoSources[currentVideoIndex])
//   vid.load()
// }

// function next() {
//   currentVideoIndex = getRandomIndex()
//   loadVideo(currentVideoIndex)
// }

// function getRandomIndex () {
//   let r = Math.floor(listOfVideoSources.length * Math.random())
//   return r
// }


