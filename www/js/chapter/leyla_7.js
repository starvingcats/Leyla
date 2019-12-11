var background_img;

var lamp_sp;
var lamp_on_img;
var lamp_off_img;

var bush_sp;
var bush_img;

var lamp_off_check = false;

function setup() {

    dialogues = dialogues_raw.chapter7;

    createCanvas(SCENE_W, SCENE_H);

    background_img = loadImage('img/bg_lvl2.png');

    create_gamechar();
    create_ground();
    create_textbox();

    lamp_sp = createSprite(SCENE_W / 2, SCENE_GROUND - 50);
    lamp_on_img = loadImage('img/bushlamp1_small.png');
    lamp_off_img = loadImage('img/bushlamp2_small.png');
    lamp_sp.addImage('on', lamp_on_img);
    lamp_sp.addImage('off', lamp_off_img);

    bush_img = loadImage('img/greenbush_small.png');
    bush_sp = createSprite(SCENE_W / 2 + 100, SCENE_GROUND - 50);
    bush_sp.addImage(bush_img);

}

function draw() {
    background(background_img);

    apply_gravity();
    basic_movement();

    if (keyWentDown('f')) {
        if (gamechar_sp.overlap(lamp_sp)) {
            if (lamp_sp.getAnimationLabel() == 'on') {
                lamp_sp.changeImage('off');
                lamp_sp.position.x -= 45;
                lamp_sp.position.y += 10;
                lamp_off_check = true;
            } else {
                lamp_sp.changeImage('on');
                lamp_sp.position.x += 45;
                lamp_sp.position.y -= 10;
                lamp_off_check = false;
            }
        } else {
            cur_dialogue_step += 1;
        };
    }

    if ((lamp_off_check) && (gamechar_sp.position.x > SCENE_RBOUND)) {
        document.location.href = 'chapter8.html';
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
}
