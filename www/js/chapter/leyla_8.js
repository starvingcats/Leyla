var background_sp;
var background_img;

var billboard1_sp;
var billboard1_img;

var billboard2_sp;
var billboard2_img;

var billboard3_sp;
var billboard3_img;

var lamp1_sp;
var lamp1_img;
var lamp_1_check = false;

var lamp2_sp;
var lamp2_img;
var lamp_2_check = false;

var lamp3_sp;
var lamp3_img;
var lamp_3_check = false;

var lamp4_sp;
var lamp4_img;
var lamp_4_check = false;

var bus_sp;
var bus_img;

function setup() {

    dialogues = dialogues_raw.chapter8;
    has_camera = true;

    createCanvas(SCENE_W, SCENE_H);

    background_img = loadImage('img/lvl8_background.png');
    background_sp = createSprite(3700, 360);
    background_sp.addImage(background_img);
    SCENE_RBOUND = 6500;

    billboard1_on_img = loadImage('img/lvl8_billboard_1.png');
    billboard1_off_img = loadImage('img/lvl8_billboard_1_off.png');
    billboard1_sp = createSprite(1000, SCENE_GROUND - 280);
    billboard1_sp.addImage('on', billboard1_on_img);
    billboard1_sp.addImage('off', billboard1_off_img);
    billboard1_sp.changeImage('on');

    billboard2_on_img = loadImage('img/lvl8_billboard_2.png');
    billboard2_off_img = loadImage('img/lvl8_billboard_2_off.png');
    billboard2_sp = createSprite(2600, SCENE_GROUND - 310);
    billboard2_sp.addImage('on', billboard2_on_img);
    billboard2_sp.addImage('off', billboard2_off_img);
    billboard2_sp.changeImage('on');

    billboard3_on_img = loadImage('img/lvl8_billboard_3.png');
    billboard3_off_img = loadImage('img/lvl8_billboard_3_off.png');
    billboard3_sp = createSprite(4400, SCENE_GROUND - 300);
    billboard3_sp.addImage('on', billboard3_on_img);
    billboard3_sp.addImage('off', billboard3_off_img);
    billboard3_sp.changeImage('on');

    lamp1_on_img = loadImage('img/lvl8_spot_2.png');
    lamp1_off_img = loadImage('img/lvl8_spot_2_off.png');
    lamp1_sp = createSprite(1100, SCENE_GROUND - 430);
    lamp1_sp.addImage('on', lamp1_on_img);
    lamp1_sp.addImage('off', lamp1_off_img);
    lamp1_sp.changeImage('on');

    lamp2_on_img = loadImage('img/lvl8_spot_1.png');
    lamp2_off_img = loadImage('img/lvl8_spot_1_off.png');
    lamp2_sp = createSprite(2000, SCENE_GROUND - 430);
    lamp2_sp.addImage('on', lamp2_on_img);
    lamp2_sp.addImage('off', lamp2_off_img);
    lamp2_sp.changeImage('on');

    lamp3_on_img = loadImage('img/lvl8_spot_2.png');
    lamp3_off_img = loadImage('img/lvl8_spot_2_off.png');
    lamp3_sp = createSprite(3200, SCENE_GROUND - 430);
    lamp3_sp.addImage('on', lamp3_on_img);
    lamp3_sp.addImage('off', lamp3_off_img);
    lamp3_sp.changeImage('on');

    lamp4_on_img = loadImage('img/lvl8_spot_1.png');
    lamp4_off_img = loadImage('img/lvl8_spot_1_off.png');
    lamp4_sp = createSprite(4350, SCENE_GROUND - 430);
    lamp4_sp.addImage('on', lamp4_on_img);
    lamp4_sp.addImage('off', lamp4_off_img);
    lamp4_sp.changeImage('on');

    bus_img = loadImage('img/lvl8_bus.png');
    bus_sp = createSprite(7800, SCENE_GROUND - 230);
    bus_sp.addImage(bus_img);
    bus_sp.visible = false;

    create_gamechar();
    create_ground();
    create_textbox();
}

function draw() {

    apply_gravity();
    basic_movement();
    focus_gamechar();

    if (keyWentDown('f') || keyWentDown(40)) {
        if ((gamechar_sp.overlap(lamp1_sp)) && (!lamp_1_check) && (cur_dialogue_step > 2)) {
            lamp_1_check = true;
            lamp1_sp.changeImage('off');
            billboard1_sp.changeImage('off');
        } else if ((gamechar_sp.overlap(lamp2_sp)) && (!lamp_2_check)  && (cur_dialogue_step > 1)) {
            lamp_2_check = true;
            lamp2_sp.changeImage('off');
        } else if ((gamechar_sp.overlap(lamp3_sp)) && (!lamp_3_check)  && (cur_dialogue_step > 1)) {
            lamp_3_check = true;
            lamp3_sp.changeImage('off');
        } else if ((gamechar_sp.overlap(lamp4_sp)) && (!lamp_4_check)  && (cur_dialogue_step > 1)) {
            lamp_4_check = true;
            lamp4_sp.changeImage('off');
            billboard3_sp.changeImage('off');
        } else {
            cur_dialogue_step += 1;
        };
    }

    if ((gamechar_sp.position.x > SCENE_W - 300) && (cur_dialogue != 'billboard') && (!lamp_1_check)) {
        switch_dialogue('billboard');
    }


    if ((lamp_2_check) && (lamp_3_check)) {
        billboard2_sp.changeImage('off');
    }

    if ((!bus_sp.visible) && (lamp_1_check) && (lamp_2_check) && (lamp_3_check) && (lamp_4_check) && (gamechar_sp.position.x > SCENE_RBOUND - 1000)) {
        switch_dialogue('outro');
        bus_sp.visible = true;
        bus_sp.velocity.x = -10;
        wait(3 * 1000).then(function() {
            bus_sp.velocity.x = 0;
            transition('chapter9.html');
        });
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
    camera.off();
}
