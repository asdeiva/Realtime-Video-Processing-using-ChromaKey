let video = document.querySelector('#v1')
let canvas1 = document.querySelector('#c1')
let canvas2 = document.querySelector('#c2')
let context1 = canvas1.getContext('2d')
let context2 = canvas2.getContext('2d')


// Prefer camera resolution nearest to 1280x720.
const constraints = {
    audio: true,
    video: true
  };

  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia(constraints)
    .then((mediaStream) => {
      video.srcObject = mediaStream;
        video.play();
    })
    .catch((err) => {
      // always check for errors at the end.
      console.error(`${err.name}: ${err.message}`);
    });
  }

  video.addEventListener('play',function(){
    console.log('video started');
    draw(this,context1,300,300)
    draw(this,context2,300,300)
    
  },false);
function draw (video, context,width,height) {
    context.drawImage(video,0,0,width,height)
    setTimeout(draw,10,video, context,width,height)
    computeFrame(context1)
    computeFrame(context2)    
    requestAnimationFrame(draw)
    
}
function computeFrame(context){
    let frame = context.getImageData(0,0,width,height)
    for (let i = 0; i < frame.data.length; i+=4) {
        let r = frame.data[i] //red
        let g = frame.data[i+1] //green
        let b = frame.data[i+2]// //blue
        if(g>100 & g<190){
            frame.data[i+3] = 0 //alpha
        }
    }
    context.putImageData(frame,0,0)
}