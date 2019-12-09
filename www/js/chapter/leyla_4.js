var background_img;
var city_img;
var city_sp;

var lamp_sp;
var lamp_off_img;
var lamp_on_img;

var lamp_off_check = false;

var moths_sp;

var SCENE_W = 1280;
var SCENE_H = 960;

function setup() {

    dialogues = dialogues_raw.chapter4;

    createCanvas(SCENE_W / 2, SCENE_H / 2);

    background_img = loadImage('img/background.png');
    background_img.resize(SCENE_W, SCENE_H);

    city_img = loadImage('img/city_small.png');
    city_sp = createSprite(0, 400);
    city_sp.addImage(city_img);

    create_gamechar();
    create_ground();
    create_textbox();

    lamp_sp = createSprite(450, 400);
    lamp_on_img = loadImage('img/lampe_small.png');
    lamp_off_img = loadImage('img/lampe_off_small.png');
    lamp_sp.addImage('on', lamp_on_img);
    lamp_sp.addImage('off', lamp_off_img);

    moths_sp = createSprite(450, 400);
    moths_sp.addAnimation('swarming', 'img/moth1_small.png', 'img/moth2_small.png')

}
function draw() {
    background(background_img);
    camera.zoom = 1;

    apply_gravity();
    basic_movement();

    camera.position.x = gamechar_sp.position.x;
    camera.position.y = gamechar_sp.position.y - 200;

    if (keyWentDown('f')) {
        if (gamechar_sp.overlap(lamp_sp)) {
            if (lamp_sp.getAnimationLabel() == 'on') {
                lamp_sp.changeImage('off');
                lamp_off_check = true;
                moths_sp.velocity.y = -5;
            } else {
                lamp_sp.changeImage('on');
                lamp_off_check = false;
            }
        } else {
            cur_dialogue_step += 1;
        };
    }

    if ((lamp_off_check) && (gamechar_sp.position.x > 620)) {
        document.location.href = 'chapter5.html';
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
    camera.off();
}
