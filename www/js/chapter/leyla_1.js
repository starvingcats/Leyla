var background_img;

var gamechar_sp;
var gamechar_img;

var telescope_sp;
var telescope_img;
var telescope_off_check = false;

var ground_sp;
var platforms = [];

var SCENE_W = 1280;
var SCENE_H = 960;

function setup() {
    createCanvas(SCENE_W / 2, SCENE_H / 2);

    background_img = loadImage('img/bg_intro.png');
    //background_img.resize(SCENE_W / 2, SCENE_H / 2);
    background_img.resize(SCENE_W, SCENE_H);

    gamechar_sp = createSprite(50,440);
    gamechar_img = loadImage('img/char_small.png');
    gamechar_sp.addImage(gamechar_img);

    telescope_sp = createSprite(450, 400);
    telescope_img = loadImage('img/telescope_small.png');
    telescope_sp.addImage(telescope_img);

    ground_sp = createSprite(0, 470, 1280, 10);
    platforms.push(ground_sp);

}
function draw() {
  background(background_img);

    apply_gravity();
    basic_movement();

    if (keyWentDown('f')) {
        gamechar_sp.overlap(telescope_sp, function() {
            telescope_off_check = true;
        });
    }

    if ((telescope_off_check) && (gamechar_sp.position.x > 620)) {
        document.location.href = 'chapter2.html';
    }

    check_scene_bounds();
    drawSprites();

}
