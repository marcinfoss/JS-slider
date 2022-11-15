const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

/*const CANVAS_WIDTH = canvas.width = 1200;
const CANVAS_HEIGHT = canvas.height = 750;

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;*/

const CANVAS_WIDTH = canvas.width = visualViewport.width;
const CANVAS_HEIGHT = canvas.height = visualViewport.height;

const IS_VERTICAL = (CANVAS_HEIGHT > CANVAS_WIDTH);

const COLUMNS = 4;
const ROWS = 4;

const TILE_WIDTH = CANVAS_WIDTH / COLUMNS;
const TILE_HEIGHT = CANVAS_HEIGHT / ROWS;



let canvasPosition = canvas.getBoundingClientRect();

addEventListener('click', this.handleClick, false);

addEventListener('touchend', this.touchHandler, false);

function swapTiles(x, y, nr){
    const empty = TILES[0].position;
    if (x > 0 && x < CANVAS_WIDTH &&
        y > 0 && y < CANVAS_HEIGHT) {

        if ((empty - nr === 1 && empty % COLUMNS > 0) ||
            (nr - empty === 1 && nr % COLUMNS > 0) ||
            (Math.abs(empty - nr) == COLUMNS)) {
            let temp = TILES[0].position;

            for (let j = 0; j < TILES.length; j++) {
                if (TILES[j].position == nr) {
                    TILES[0].position = TILES[j].position;
                    TILES[j].position = temp;
                    j = TILES.length;
                }
            }
        }
    }
}

function handleClick(e) {
    const click = {
        x: e.clientX - canvasPosition.x,
        y: e.clientY - canvasPosition.y
    };
    let nr = Math.floor(click.x / TILE_WIDTH) + Math.floor(click.y / TILE_HEIGHT) * ROWS;
    swapTiles(click.x, click.y, nr);

}

function touchHandler(e) {
    // Cache the client X/Y coordinates
    const click = {
        x: e.touches[0].clientX - canvasPosition.x,
        y: e.touches[0].clientY - canvasPosition.y
    };
    let nr = Math.floor(click.x / TILE_WIDTH) + Math.floor(click.y / TILE_HEIGHT) * ROWS;
    swapTiles(click.x, click.y, nr);

}


function validMoves(){
    switch(TILES[0].position) {
        case 0:
            return [1, 4];
        case 1:
            return [0, 5, 2];
        case 2:
            return [1, 6, 3];
        case 3:
            return [2, 7];

        case 4:
            return [0, 5, 8];
        case 5:
            return [1, 4, 6, 9];
        case 6:
            return [5, 7, 2, 10];
        case 7:
            return [3, 6, 11];
        case 8:
            return [4, 9, 12];
        case 9:
            return [13, 8, 10, 5];
        case 10:
            return [9, 6, 14, 11];
        case 11:
            return [10, 7, 15];
        case 12:
            return [8, 13];
        case 13:
            return [12, 14, 9];
        case 14:
            return [13, 15, 10];
        case 15:
            return [11, 14];
    }
}

function scramble(moves){
    for(let j=0; j<moves; j++){
        const VALID_MOVES = validMoves();
        const move = VALID_MOVES[Math.floor( Math.random()*VALID_MOVES.length)];
        swapTiles(1,1,move);
        //console.log(VALID_MOVES," ",move);
    }
}

const image_number = Math.floor(Math.random()*4)+1;
const sliderImg = new Image();
let vertical = "";
if(IS_VERTICAL){
    vertical = "vertical/";
}
let loaded = false;
function setLoadingFlag(){
    loaded = true;
}
sliderImg.onload = setLoadingFlag();
sliderImg.src = 'img/'+ vertical + image_number +'.jpg';
//sliderImg.src = 'img/3.jpg'
window.setTimeout(processImages,500);
var TILE_IMG_WIDTH = Math.floor(sliderImg.width / COLUMNS);
var TILE_IMG_HEIGTH = Math.floor(sliderImg.height / ROWS);

class Tile {
    constructor(number) {
        this.number = number;
        this.position = number;
        this.image = sliderImg;

    }

    draw() {
        //ctx.drawImage(IMAGES[this.frame], TILE_WIDTH * (number % 3), TILE_HEIGHT * ( Math.floor(number/3) ), TILE_WIDTH, TILE_HEIGHT);
        ctx.drawImage(sliderImg,
            TILE_IMG_WIDTH * (this.number % COLUMNS), TILE_IMG_HEIGTH * (Math.floor(this.number / ROWS)), TILE_IMG_WIDTH, TILE_IMG_HEIGTH,
            TILE_WIDTH * (this.position % COLUMNS), TILE_HEIGHT * (Math.floor(this.position / ROWS)), TILE_WIDTH, TILE_HEIGHT);
        ctx.beginPath();
        ctx.rect(TILE_WIDTH * (this.position % COLUMNS), TILE_HEIGHT * (Math.floor(this.position / ROWS)), TILE_WIDTH, TILE_HEIGHT);
        ctx.stroke();
        if (this.number == 0) {
            ctx.beginPath();
            ctx.fillRect(TILE_WIDTH * (this.position % COLUMNS), TILE_HEIGHT * (Math.floor(this.position / ROWS)), TILE_WIDTH, TILE_HEIGHT)

            ctx.fill();
        }
        //ctx.fillRect(0,0,100,100);
    }

}


const TILES = [
    new Tile(0),
    new Tile(1),
    new Tile(2),
    new Tile(3),
    new Tile(4),
    new Tile(5),
    new Tile(6),
    new Tile(7),
    new Tile(8),
    new Tile(9),
    new Tile(10),
    new Tile(11),
    new Tile(12),
    new Tile(13),
    new Tile(14),
    new Tile(15),
]


function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    TILES.forEach(tile => tile.draw());
    TILES[0].draw();
    //TILES[0].draw();


    requestAnimationFrame(animate);
}
scramble(10);

animate();

function processImages() 
	{
	    TILE_IMG_WIDTH = Math.floor(sliderImg.width / COLUMNS);
        TILE_IMG_HEIGTH = Math.floor(sliderImg.height / ROWS);
      
    }