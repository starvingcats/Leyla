var background_img;
var city_img;
var city_sp;

var lamp_sp;
var lamp_on_img;

var lamp_off_check = false;

var monument_sp;
var monument_img;

var SCENE_W = 1280;
var SCENE_H = 960;

function setup() {

    dialogues = dialogues_raw.chapter6;

    createCanvas(SCENE_W / 2, SCENE_H / 2);

    background_img = loadImage('img/background.png');
    background_img.resize(SCENE_W, SCENE_H);

    city_img = loadImage('img/city_small.png');
    city_sp = createSprite(0, 400);
    city_sp.addImage(city_img);

    create_gamechar();
    create_ground();
    create_textbox();

    monument_img = loadImage('img/monument_small.png');
    monument_sp = createSprite(450, 400);
    monument_sp.addImage(monument_img);

    lamp_sp = createSprite(400, 370);
    lamp_on_img = loadImage('img/pivotlamp_small.png');
    lamp_sp.addImage('on', lamp_on_img);

}
function draw() {
    background(background_img);

    apply_gravity();
    basic_movement();

    if (keyWentDown('f')) {
        if (gamechar_sp.overlap(lamp_sp)) {
            if (!lamp_off_check) {
                lamp_sp.rotation = 20;
                lamp_sp.position.y += 20;
                lamp_off_check = true;
            } else {
                lamp_sp.rotation = 0;
                lamp_sp.position.y -= 20;
                lamp_off_check = false;
            }
        } else {
            cur_dialogue_step += 1;
        };
    }

    if ((lamp_off_check) && (gamechar_sp.position.x > 620)) {
        document.location.href = 'chapter7.html';
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
}
