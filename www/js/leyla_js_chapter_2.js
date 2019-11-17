var background_img;

var gamechar_sp;
var gamechar_img;

var ground_sp;

var GRAVITY = 1;
var JUMP = 15;

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

    //gamechar_sp.velocity.x = 0;
    gamechar_sp.velocity.y += GRAVITY;

    if (gamechar_sp.overlap(ground_sp)) {
        gamechar_sp.velocity.y = 0;
    }

    if (keyWentDown('space')) {
        gamechar_sp.velocity.y = -JUMP;
    }

    if (keyWentDown('a') || mouseWentDown(RIGHT)) {
        gamechar_sp.velocity.x = -5;
    }
    if (keyWentUp('a') || mouseWentUp(RIGHT)) {
        gamechar_sp.velocity.x = 0;
    }

    if (keyWentDown('d') || mouseWentDown(LEFT)) {
        gamechar_sp.velocity.x = 5;
    }
    if (keyWentUp('d') || mouseWentUp(LEFT)) {
        gamechar_sp.velocity.x = 0;
    }

    if (keyWentDown('f')) {
    }

    if ((false) && (gamechar_sp.position.x > 620)) {
        document.location.href = 'index.html';
    }

    check_scene_bounds();
    drawSprites();
}
