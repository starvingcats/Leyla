var background_img;

function setup() {

    createCanvas(SCENE_W, SCENE_H);

    background_img = loadImage('img/startscreen.png');
    background_img.resize(SCENE_W, SCENE_H);

    button = createButton('&#128362;');
    button.position(SCENE_W / 2, SCENE_H - 100);
    button.mousePressed(dummy);
    button.center('horizontal');
}

function dummy() {
    console && console.log("User Interaction done, audio should work now");
}

function draw() {

    background(background_img);

    if ((keyWentDown('f')) || (keyWentDown('a')) ||
        (keyWentDown('d')) || (keyWentDown('space'))) {
        transition('chapter1.html');
    }

    drawSprites();

}
