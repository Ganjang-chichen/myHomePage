const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

var config = {
    type: Phaser.AUTO,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    parent: 'container',
    backgroundColor : '#ffffff',
    physics: {
        default: 'matter',
        matter : {
            gravity : 3000,
            debug : false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var unbrella;
var mushrooms = new Array();
var pinkbeens = new Array();
var rocks = new Array();

let x = parseInt(CANVAS_WIDTH/2), y = parseInt(CANVAS_HEIGHT/2);
let CANVAS = document.querySelector('canvas');
document.addEventListener('mousemove', (e) => {
    x = e.clientX;
    y = e.clientY;
});

var game = new Phaser.Game(config);

function preload (){
    this.load.image('mushroom', 'images/mushroom100.png');
    this.load.image('pinkbeen', 'images/pinkbeen100.png');
    this.load.image('rock', 'images/rock100.png');
    this.load.image('unbrella', 'images/unbrella.png');
    
}

function create (){

    //  By default it will create a rectangular body the size of the texture
    unbrella = this.matter.add.image(
        parseInt(CANVAS_WIDTH/2), 
        parseInt(CANVAS_HEIGHT/2), 
        'unbrella', null, 
        { 
            shape : 'circle', 
            mass : 30, 
            ignoreGravity : true
        }
    );
    unbrella.setFixedRotation();
    unbrella.setBounce(1);
    unbrella.setInteractive();
    this.matter.world.setBodyRenderStyle(unbrella, lineOpacity=0)
    
    add_monster(this, 20);

}

function update ()
{
    if(x !== unbrella.x || y !== unbrella.y) {
        let vX = (unbrella.x - x);
        let vY = (unbrella.y - y)
        if(vX > 10) {
            vX  = 20;
        }
        if(vY > 10) {
            vY  = 20;
        }
        if(vX < -10) {
            vX  = -20;
        }
        if(vY < -10) {
            vY  = -20;
        }
        unbrella.setVelocityX(-vX);
        unbrella.setVelocityY(-vY);
    }

    for(let i = 0; i < rocks.length; i++) {
        if(rocks[i].y > CANVAS_HEIGHT + 10) {
            rocks[i].y = 10;
            rocks[i].x = getRandomInt(10, CANVAS_WIDTH - 10);
        }
    }
    for(let i = 0; i < pinkbeens.length; i++) {
        if(pinkbeens[i].y > CANVAS_HEIGHT + 10) {
            pinkbeens[i].y = 10;
            pinkbeens[i].x = getRandomInt(10, CANVAS_WIDTH - 10);
        }
    }
    for(let i = 0; i < mushrooms.length; i++) {
        if(mushrooms[i].y > CANVAS_HEIGHT + 10) {
            mushrooms[i].y = 10;
            mushrooms[i].x = getRandomInt(10, CANVAS_WIDTH - 10);
        }
    }
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function add_monster(e, mobCount) {

    if(!Number.isInteger(mobCount)) {
        mobCount = 10;
    }else if(mobCount < 1) {
        mobCount = 10;
    }

    for(let i = 0; i < mobCount; i ++) {
        let randX = getRandomInt(10, CANVAS_WIDTH - 10);
        let randY = getRandomInt(10, 30);
        let rock = e.matter.add.image(randX, randY, 'rock', null, { shape : 'circle', mass : 1});
        rock.setBounce(1);
        rock.setInteractive();

        rocks.push(rock);
    }

    for(let i = 0; i < mobCount; i ++) {
        let randX = getRandomInt(10, CANVAS_WIDTH - 10);
        let randY = getRandomInt(10, 30);
        let pinkbeen = e.matter.add.image(randX, randY, 'pinkbeen', null, { shape : 'circle', mass : 1});
        pinkbeen.setBounce(1);
        pinkbeen.setInteractive();

        pinkbeens.push(pinkbeen);
    }

    for(let i = 0; i < mobCount; i ++) {
        let randX = getRandomInt(10, CANVAS_WIDTH - 10);
        let randY = getRandomInt(10, 30);
        let mushroom = e.matter.add.image(randX, randY, 'mushroom', null, { shape : 'circle', mass : 1});
        mushroom.setBounce(1);
        mushroom.setInteractive();

        mushrooms.push(mushroom);
    }
}