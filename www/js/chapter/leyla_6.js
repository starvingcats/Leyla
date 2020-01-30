var background_img;

var lamp1_sp;
var lamp2_sp;
var lamp3_sp;
var lamp_even_img;
var lamp_high_img;
var lamp_low_img;

var lamp_1_check = false;
var lamp_2_check = false;

var wrench_sp;
var wrench_img;
var wrench_check = false;

var dl2_done = false;
var dl3_done = false;
var dw_done = false;
var od_done = false;

function setup() {

    dialogues = dialogues_raw.chapter6;
    has_camera = true;

    createCanvas(SCENE_W, SCENE_H);

    background_img = loadImage('img/lvl6_background.png');
    background_sp = createSprite(2900, 360);
    background_sp.addImage(background_img);
    SCENE_RBOUND = 5500;

    wrench_img = loadImage('img/lvl6_wrench.png');
    wrench_sp = createSprite(4 * SCENE_W, SCENE_H - 50);
    wrench_sp.addImage(wrench_img);

    lamp_even_img = loadImage('img/lvl6_lamp_even.png');
    lamp_high_img = loadImage('img/lvl6_lamp_high.png');
    lamp_low_img = loadImage('img/lvl6_lamp_low.png');

    lamp1_sp = createSprite(3 * SCENE_W / 4 + 100, SCENE_H - 150);
    lamp1_sp.addImage('even', lamp_even_img);
    lamp1_sp.addImage('high', lamp_high_img);
    lamp1_sp.addImage('low', lamp_low_img);
    lamp1_sp.changeImage('high');

    lamp2_sp = createSprite(2 * SCENE_W + 40, SCENE_H - 150);
    lamp2_sp.addImage('even', lamp_even_img);
    lamp2_sp.addImage('high', lamp_high_img);
    lamp2_sp.addImage('low', lamp_low_img);
    lamp2_sp.changeImage('low');

    lamp3_sp = createSprite(3.3 * SCENE_W, SCENE_H - 150);
    lamp3_sp.addImage('even', lamp_even_img);
    lamp3_sp.addImage('high', lamp_high_img);
    lamp3_sp.addImage('low', lamp_low_img);
    lamp3_sp.changeImage('even');

    create_gamechar();
    create_ground();
    create_textbox();
}

function draw() {
    background(background_img);

    apply_gravity();
    basic_movement();
    focus_gamechar();

    if (keyWentDown('f')) {
        if ((gamechar_sp.overlap(lamp1_sp)) && (wrench_check) && (cur_dialogue_step > 1)) {
            lamp1_sp.changeImage('even');
            lamp_1_check = true;
        } else if ((gamechar_sp.overlap(lamp2_sp)) && (wrench_check) && (cur_dialogue_step > 1)) {
            lamp2_sp.changeImage('even');
            lamp_2_check = true;
        } else if ((gamechar_sp.overlap(wrench_sp)) && (!wrench_check) && (cur_dialogue_step > 1)) {
            wrench_check = true;
            wrench_sp.visible = false;
        } else {
            cur_dialogue_step += 1;
        };
    }

    if ((gamechar_sp.position.x > 2 * SCENE_W) && (!dl2_done) && (cur_dialogue != 'lamp2') && (!lamp_1_check) && (!lamp_2_check)) {
        switch_dialogue('lamp2');
        dl2_done = true;
    }

    if ((gamechar_sp.position.x > 3.2 * SCENE_W) && (!dl3_done) && (cur_dialogue != 'lamp3') && (!lamp_1_check) && (!lamp_2_check)) {
        switch_dialogue('lamp3');
        dl3_done = true;
    }

    if ((gamechar_sp.position.x > 3.8 * SCENE_W) && (!dw_done) && (cur_dialogue != 'wrench') && (!lamp_1_check) && (!lamp_2_check)) {
        switch_dialogue('wrench');
        dw_done = true;
    }

    if ((lamp_1_check) && (lamp_2_check) && (!od_done)) {
        od_done = true;
        switch_dialogue('outro');
    }

    if ((lamp_1_check) && (lamp_2_check) && (gamechar_sp.position.x > SCENE_RBOUND)) {
        transition('chapter7.html');
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
    camera.off();
}
