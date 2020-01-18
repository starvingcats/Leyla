var background_img;

function setup() {

    createCanvas(SCENE_W, SCENE_H);

    background_img = loadImage('img/startscreen.png');
    background_img.resize(SCENE_W, SCENE_H);

}

function draw() {

    background(background_img);

    if ((keyWentDown('f')) || (keyWentDown('a')) ||
        (keyWentDown('d')) || (keyWentDown('space'))) {
        transition('chapter1.html');
    }

    drawSprites();

}
