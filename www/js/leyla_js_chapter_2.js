var background_img;

var gamechar_sp;
var gamechar_img;

var ground_sp;

function setup() {
    createCanvas(640, 480);

    background_img = loadImage('img/bg_lvl2.png');
    background_img.resize(640, 480);

    gamechar_sp = createSprite(50,440);
    gamechar_img = loadImage('img/char_small.png');
    gamechar_sp.addImage(gamechar_img);

    ground_sp = createSprite(0, 470, 1280, 10);

}
function draw() {
    background(background_img);
    apply_gravity();
    basic_movement();


    if (keyWentDown('f')) {
    }

    if ((false) && (gamechar_sp.position.x > 620)) {
        document.location.href = 'index.html';
    }

    check_scene_bounds();
    drawSprites();
}
