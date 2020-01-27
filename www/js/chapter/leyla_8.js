var background_img;

var house_sp;
var house_off_img;
var house_on_img;

var house_off_check = false;

var dude_sp;
var dude_img;

function setup() {

    dialogues = dialogues_raw.chapter8;
    has_camera = true;

    createCanvas(SCENE_W, SCENE_H);

    background_img = loadImage('img/lvl8_background.png');
    background_sp = createSprite(3700, 360);
    background_sp.addImage(background_img);
    SCENE_RBOUND = 6000;

    create_gamechar();
    create_ground();
    create_textbox();

    house_sp = createSprite(3 * SCENE_W / 4, SCENE_GROUND - 110);
    house_on_img = loadImage('img/aggrohouse_small_on.png');
    house_off_img = loadImage('img/aggrohouse_small_off.png');
    house_sp.addImage('on', house_on_img);
    house_sp.addImage('off', house_off_img);

}

function draw() {

    apply_gravity();
    basic_movement();
    focus_gamechar();

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

    if ((house_off_check) && (gamechar_sp.position.x > SCENE_RBOUND)) {
        transition('index.html');
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
    camera.off();
}
