var capture,w,h;

var resol;
function setup() {
  createCanvas(600,400,WEBGL); // 加入3d
  capture = createCapture(VIDEO); // 開啟webcam抓取每瞬時imamge
  capture.hide(); // 需要將預設的攝影機關閉

  resol = 10;
  //console.log(capture.width,capture.height);
}

function draw() {
  //console.log(capture.width,capture.height);
  background(50);
  
  // webcam 的長寬是會變動的 因此需在 draw 裡面找瞬時的長寬比
  w = capture.width;
  h = capture.height;
  camera(w/2,h/2, 300, 
         w/2,h/2, -300, 
         0, 1, 0);
  //image(capture, 0, 0, map(w,0,w,0,width), map(h,0,w,0,width)); //保留 寬方向比例 變形

  // get color
  capture.loadPixels();

  // 擷取
  for(var x=0;x<w;x+=resol){
      for(var y=0;y<h;y+=resol){
        // 總量為 RGBA 因此陣列為全長*4 
        pixelindex = (y*w+x)*4; // 特定點為 >> 寬度*第幾行(row)+在第幾列(col)上

        let pixelcolorR = capture.pixels[pixelindex];
        let pixelcolorG = capture.pixels[pixelindex+1];
        let pixelcolorB = capture.pixels[pixelindex+2];
        let pixelcolorA = capture.pixels[pixelindex+3];

        let size = 8;
        //console.log(v);
        push();
            //繪圖與位移
            rectMode(CENTER);
            let pixelbright = (pixelcolorR*2+pixelcolorB+pixelcolorG*3)/6; // 快速用RGB算亮度
            
            
            noStroke();
            //scale(map(pixelbright,0,255,4.0,0.4));//用亮度算深度 > 改變大小 > 近亮大 遠暗小
            fill(pixelcolorG,pixelcolorG,pixelcolorB,200);// 一般顏色
            translate(x,y,map(pixelbright,0,255,0,-250)); //WEBGL設定以畫面為中心(0,0,0)
            rect(-size/2,-size/2,size,size);
        pop();
      }
    }

}
