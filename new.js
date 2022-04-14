var currentVideoIndex = 0
var listOfVideoSources = [
  // 'http://umlautfilms.de/wp-content/uploads/2022/01/Komp-1_1_2-1.mp4',
  // 'http://umlautfilms.de/wp-content/uploads/2022/01/Komp-1_1_3-1.mp4',
  // 'http://umlautfilms.de/wp-content/uploads/2022/01/Komp-1_1_5-1.mp4'
  // 'https://umlautfilms.de/wp-content/uploads/2022/01/Type_1_desk.mp4',
  // 'https://umlautfilms.de/wp-content/uploads/2022/01/Type_2_desk.mp4',
  // 'https://umlautfilms.de/wp-content/uploads/2022/01/Type_3_desk.mp4',
  
  'webm/Chrome_ImF.webm',
  'webm/Type_1_desk.webm',
  'webm/Type_2_desk.webm',
  'webm/Type_3_desk.webm'

]
let vid = document.querySelector('.cover-region .background-video video')
let source = document.querySelector(
  '.cover-region .background-video video source'
)
let frameNumber = 0 // start video at frame 0
// lower numbers = faster playback
let playbackConst = 1000

let height = document.querySelector(".lay-content").clientHeight


window.onload = () => {
  
  currentVideoIndex = getRandomIndex()
  loadVideo(currentVideoIndex)
  
  

}

// dynamically set the page height according to video length
vid.addEventListener('loadedmetadata', function () {
  duration = vid.duration
  playbackConst = height / duration
  window.requestAnimationFrame(scrollPlay)

})


// video.onended = function(e) {
//   console.log("ende");
//   currentVideoIndex = getRandomIndex()
//   loadVideo(currentVideoIndex)
// };


function scrollPlay(){  
  var frameNumber  = window.pageYOffset/playbackConst;
  vid.currentTime  = frameNumber;
  window.requestAnimationFrame(scrollPlay);
}





function loadVideo (currentVideoIndex) {
  source.setAttribute('src', listOfVideoSources[currentVideoIndex])
  vid.load()
}

function next() {
  currentVideoIndex = getRandomIndex()
  loadVideo(currentVideoIndex)
}

function getRandomIndex () {
  let r = Math.floor(listOfVideoSources.length * Math.random())
  return r
}


