var background_img;
var city_img;
var city_sp;

var house_sp;
var house_off_img;
var house_on_img;

var house_off_check = false;

var dude_sp;
var dude_img;

var SCENE_W = 1280;
var SCENE_H = 960;

function setup() {

    dialogues = dialogues_raw.chapter8;

    createCanvas(SCENE_W / 2, SCENE_H / 2);

    background_img = loadImage('img/background.png');
    background_img.resize(SCENE_W, SCENE_H);

    city_img = loadImage('img/city_small.png');
    city_sp = createSprite(0, 400);
    city_sp.addImage(city_img);

    create_gamechar();
    create_ground();
    create_textbox();

    house_sp = createSprite(450, 350);
    house_on_img = loadImage('img/aggrohouse_small_on.png');
    house_off_img = loadImage('img/aggrohouse_small_off.png');
    house_sp.addImage('on', house_on_img);
    house_sp.addImage('off', house_off_img);

}
function draw() {
    background(background_img);

    apply_gravity();
    basic_movement();

    if (keyWentDown('f')) {
        if (gamechar_sp.overlap(house_sp)) {
            if (house_sp.getAnimationLabel() == 'on') {
                house_sp.changeImage('off');
                house_off_check = true;
            } else {
                house_sp.changeImage('on');
                house_off_check = false;
            }
        } else {
            cur_dialogue_step += 1;
        };
    }

    if ((house_off_check) && (gamechar_sp.position.x > 620)) {
        document.location.href = 'index.html';
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
}
