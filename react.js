import React, { Component } from "react";
import "./App.css";
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 512;
const TILE_WIDTH = 64;
const TILE_HEIGHT = 64;

class Game {
  // HARİTA
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


  constructor(ctx) {
    console.log("init");
    this.ctx = ctx;
    this.x = 300;
    this.y = 300;
    this.dirx = 0;
    this.diry = 0;


  }

// resim alma
  init = async () => {
    console.log("load");
    const tile0 = await this.loadImage("./assets/layers/0.png");
    const tile1 = await this.loadImage("./assets/layers/1.png");
    const user0 = await this.loadImage("./assets/users/0.png")
    this.images = {
      user0: user0,
      0: tile0,
      1: tile1,
    };

    window.addEventListener('keydown',this.onKeyDown);
    window.addEventListener('keyup',this.onKeyUp);

  };

    onKeyDown  = event => {
        const keyCode = event.keyCode;
        //sol
        if (keyCode === 37){
          console.log('sol');
          this.dirx = -1;
        }
        //sağ
        if (keyCode === 39){
            this.dirx = 1;
        }
        //yukarı
        if (keyCode === 38){
            this.diry = -1;
        }
        //ağağı
        if (keyCode === 40){
            this.diry = 1;
        }



    };
    onKeyUp  = event => {
        const keyCode = event.keyCode;

        if(keyCode === 37 || keyCode === 39){
          this.dirx = 0;

        }
        if(keyCode === 38 || keyCode === 40){
          this.diry = 0;
        }


    };



  //resim alma foksiyonu
  loadImage = src => {
    var img = new Image();
    var d = new Promise(function(resolve, reject) {
      img.onload = function() {
        resolve(img);
      };
      img.onerror = function() {
        reject("colud not laod" + src);
      };
    });
    img.src = src;
    return d;
  };
  update = () => {

    this.x+=this.dirx*5;
    this.y+=this.diry*5;


  };


// kulanıcı
  user = () => {

      this.ctx.drawImage(
        this.images.user0,
        0,
        0,
        TILE_WIDTH,
        TILE_HEIGHT,
       this.x,
        this.y,
        TILE_WIDTH,
        TILE_HEIGHT
      );


  }
//harita
  map = () => {
    console.log("draw");

    const cols = CANVAS_WIDTH / TILE_WIDTH;
    const rows = CANVAS_HEIGHT / TILE_HEIGHT;
    console.log(this.layers);
    for (var i = 0; i < this.layers.length; i++) {
      const layer = this.layers[i];
      for (var j = 0; j < rows; j++) {
        for (var k = 0; k < cols; k++) {
            const imageType = layer[j * cols + k];
            console.log(imageType);
            this.ctx.drawImage(
            this.images[imageType],
            0,
            0,
            TILE_WIDTH,
            TILE_HEIGHT,
            k * TILE_WIDTH,
            j * TILE_HEIGHT,
            TILE_WIDTH,
            TILE_HEIGHT
                  );
              }
          }
      }
  };
}
class App extends Component {
  constructor(props,game) {
    super(props);
    this.canvasRef = React.createRef();
    this.game=game;
  }
  start = async () => {

    const ctx = this.canvasRef.current.getContext("2d");
    this.game = new Game(ctx);
    await this.game.init();

    this.loop();
  };
  loop = () => {
  requestAnimationFrame ( () => {

    this.game.map();
    this.game.user();
      this.game.update();

          this.loop();

  });
};
  render() {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "black"
        }}
      >
        <button  onClick={this.start} className="selam" >START </button>
        <canvas
          ref={this.canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
      </div>
    );
  }
}

export default App;
