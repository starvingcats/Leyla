var background_img;

function setup() {

    createCanvas(SCENE_W, SCENE_H);

    background_img = loadImage('img/endscreen.png');
    background_img.resize(SCENE_W, SCENE_H);

}

function draw() {

    background(background_img);

    if ((keyWentDown('f')) || (keyWentDown('a')) ||
        (keyWentDown('d')) || (keyWentDown('space'))) {
        transition('index.html');
    }

    drawSprites();

}
