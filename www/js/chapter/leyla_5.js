var background_img;

var kioskspot_1_sp;
var kioskspot_1_on_img;
var kioskspot_1_off_img;
var kioskspot_1_check = false;

var kioskspot_2_sp;
var kioskspot_2_on_img;
var kioskspot_2_off_img;
var kioskspot_2_check = false;

var cafespot_sp;
var cafespot_on_img;
var cafespot_off_img;
var cafespot_check = false;

var platform_1_sp;
var platform_2_sp;
var platforms = [];

var pickables = [];
var picked;

var person_sp;
var person_img;

var person_check = false;
var done_check = false;

function setup() {

    dialogues = dialogues_raw.chapter5;
    has_camera = true;

    createCanvas(SCENE_W, SCENE_H);

    background_img = loadImage('img/lvl5_background.png');
    background_sp = createSprite(1900, 360);
    background_sp.addImage(background_img);
    SCENE_RBOUND = 3700;
    JUMP = 22;

    person_img = loadImage('img/lvl5_person.png');
    person_sp = createSprite(1300, SCENE_GROUND - 110);
    person_sp.addImage(person_img);

    kioskspot_1_on_img = loadImage('img/lvl5_kioskspot_1.png');
    kioskspot_1_off_img = loadImage('img/lvl5_kioskspot_1_off.png');
    kioskspot_1_sp = createSprite(1350, SCENE_GROUND - 400);
    kioskspot_1_sp.addImage('on', kioskspot_1_on_img);
    kioskspot_1_sp.addImage('off', kioskspot_1_off_img);

    kioskspot_2_on_img = loadImage('img/lvl5_kioskspot_2.png');
    kioskspot_2_off_img = loadImage('img/lvl5_kioskspot_2_off.png');
    kioskspot_2_sp = createSprite(1600, SCENE_GROUND - 400);
    kioskspot_2_sp.addImage('on', kioskspot_2_on_img);
    kioskspot_2_sp.addImage('off', kioskspot_2_off_img);

    cafespot_on_img = loadImage('img/lvl5_cafespot.png');
    cafespot_off_img = loadImage('img/lvl5_cafespots_off.png');
    cafespot_sp = createSprite(3000, SCENE_GROUND- 510);
    cafespot_sp.addImage('on', cafespot_on_img);
    cafespot_sp.addImage('off', cafespot_off_img);

    platform_1_sp = createSprite(3000, SCENE_GROUND- 380, 500, 5);
    platform_2_sp = createSprite(2350, SCENE_GROUND- 200, 400, 5);
    platforms.push(platform_1_sp);
    platforms.push(platform_2_sp);

    create_gamechar();
    create_ground();
    create_textbox();
}

function draw() {

    apply_gravity();
    basic_movement();
    focus_gamechar();

    if (keyWentDown('f')) {
        if ((gamechar_sp.overlap(person_sp)) && (!person_check)) {
            switch_dialogue('person');
            person_check = true;
        } else if ((gamechar_sp.overlap(kioskspot_1_sp)) && (person_check) && (!kioskspot_1_check) && (cur_dialogue_step > 1)) {
            kioskspot_1_sp.changeImage('off');
            kioskspot_1_check = true;
        } else if ((gamechar_sp.overlap(kioskspot_2_sp)) && (person_check) && (!kioskspot_2_check) && (cur_dialogue_step > 1)) {
            kioskspot_2_sp.changeImage('off');
            kioskspot_2_check = true;
        } else if ((gamechar_sp.overlap(cafespot_sp)) && (!cafespot_check) && (person_check)) {
            cafespot_sp.changeImage('off');
            cafespot_check = true;
        } else {
            cur_dialogue_step += 1;
        };

    }

    if ( (kioskspot_1_check) && (kioskspot_2_check) && (cafespot_check) && (!done_check)) {
        switch_dialogue('outro');
        done_check = true;
    }

    if ( (gamechar_sp.position.x > SCENE_RBOUND) && (done_check) ) {
        transition('chapter6.html');
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
    camera.off();
}
