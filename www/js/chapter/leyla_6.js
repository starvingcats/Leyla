var background_img;
var city_img;
var city_sp;

var gamechar_sp;
var gamechar_img;

var lamp_sp;
var lamp_off_img;
var lamp_on_img;

var lamp_off_check = false;

var monument_sp;
var monument_img;

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

    monument_img = loadImage('img/monument_small.png');
    monument_sp = createSprite(450, 400);
    monument_sp.addImage(monument_img);

    lamp_sp = createSprite(400, 370);
    lamp_on_img = loadImage('img/pivotlamp_small.png');
    //lamp_off_img = loadImage('img/lampe_off_small.png');
    lamp_sp.addImage('on', lamp_on_img);
    //lamp_sp.addImage('off', lamp_off_img);

    ground_sp = createSprite(0, 470, 1280, 10);
    platforms.push(ground_sp);

}
function draw() {
    background(background_img);

    apply_gravity();
    basic_movement();

    if (keyWentDown('f')) {
        gamechar_sp.overlap(lamp_sp, function() {
            if (!lamp_off_check) {
                lamp_sp.rotation = 20;
                lamp_sp.position.y += 20;
                lamp_off_check = true;
            } else {
                //lamp_sp.changeImage('on');
                lamp_sp.rotation = 0;
                lamp_sp.position.y -= 20;
                lamp_off_check = false;
            }
        });
    }

    if ((lamp_off_check) && (gamechar_sp.position.x > 620)) {
        document.location.href = 'chapter7.html';
    }

    check_scene_bounds();
    drawSprites();
}
