import React, { Component} from 'react';
import './App.css';
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 512;
const TILE_WIDTH = 64;
const TILE_HEIGHT = 64;
class Game {
  layers = [
  [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
  1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
  1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
  1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
  1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 

  ]
  ];
constructor(ctx){
console.log("init");
this.ctx = ctx;

}
init = async () => {

console.log("load");
const tile0 =  await this.loadImage("./assets/layers/0.png");
const tile1 =  await this.loadImage("./assets/layers/1.png");

this.images = {
  0:tile0,
  1:tile1,
}

};
loadImage = (src) => {

  var img = new Image();
  var d = new Promise (function (resolve , reject){
    img.onload = function () {
      resolve(img);
    };
img.onerror = function () {
  reject("colud not laod" + src);
};


  });
  img.src= src;
  return d;


}


draw = () => {

console.log("draw");
  

    const cols = CANVAS_WIDTH / TILE_WIDTH;
    const rows = CANVAS_HEIGHT / TILE_HEIGHT;
    console.log(this.layers);
    for(var i = 0; i<this.layers.length; i++) {
        const layer = this.layers[i];
        for(var j = 0;j<rows;j++){
          for(var k = 0;k < cols; k++){
            const imageType = layer[j * cols + k];
            console.log(imageType);
            this.ctx.drawImage(this.images[imageType],
              0 ,0, 
              TILE_WIDTH,TILE_HEIGHT
              ,k*TILE_WIDTH,j * TILE_HEIGHT,
              TILE_WIDTH,TILE_HEIGHT );
             }
        }


    }

}

}
class App extends Component {
    constructor(props){
      
    super(props);

    this.canvasRef=React.createRef();


}
start = async () => {
  const ctx = this.canvasRef.current.getContext('2d');
this.game = new Game (ctx);
await this.game.init();
this.game.draw();



}



      render(){

        return(
          <div style={{height:'100%',display:'flex', justifyContent:'center' ,alignItems:'center',background:'black'}}>
          <button onClick = {this.start}>START </button>
            <canvas ref={this.canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}

            ></canvas>

          </div>

      )
  }
}

export default App;
