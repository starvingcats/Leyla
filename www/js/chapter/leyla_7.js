var background_img;
var city_img;
var city_sp;

var gamechar_sp;
var gamechar_img;

var lamp_sp;
var lamp_off_img;
var lamp_on_img;

var lamp_off_check = false;

var ground_sp;
var platforms = [];

var SCENE_W = 1280;
var SCENE_H = 960;

function setup() {
    createCanvas(SCENE_W / 2, SCENE_H / 2);

    background_img = loadImage('img/background.png');
    //background_img.resize(SCENE_W / 2, SCENE_H / 2);
    background_img.resize(SCENE_W, SCENE_H);

    city_img = loadImage('img/city_small.png');
    city_sp = createSprite(0, 400);
    city_sp.addImage(city_img);

    create_gamechar();

    lamp_sp = createSprite(450, 400);
    lamp_on_img = loadImage('img/lampe_small.png');
    lamp_off_img = loadImage('img/lampe_off_small.png');
    lamp_sp.addImage('on', lamp_on_img);
    lamp_sp.addImage('off', lamp_off_img);

    ground_sp = createSprite(0, 470, 1280, 10);
    platforms.push(ground_sp);

}
function draw() {
  background(background_img);
  camera.zoom = 1;

    apply_gravity();
    basic_movement();

    camera.position.x = gamechar_sp.position.x;
    camera.position.y = gamechar_sp.position.y - 200;
    /*
    if(mouseIsPressed)
      camera.zoom = 0.5;
    else
      camera.zoom = 1;
    */
    if (keyWentDown('f')) {
        gamechar_sp.overlap(lamp_sp, function() {
            if (lamp_sp.getAnimationLabel() == 'on') {
                lamp_sp.changeImage('off');
                lamp_off_check = true;
            } else {
                lamp_sp.changeImage('on');
                lamp_off_check = false;
            }
        });
    }

    if ((lamp_off_check) && (gamechar_sp.position.x > 620)) {
        document.location.href = 'chapter8.html';
    }

    check_scene_bounds();
    drawSprites();
    camera.off();
    //image(background_img, 0 ,0);

}
