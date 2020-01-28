var background_img;
var background_sp;
var city_img;
var city_sp;

var lamp_sp;
var lamp_off_img;
var lamp_on_img;

var lamp_off_check = false;

var lamp_light_img;
var lamp_light_sp;

var moths_sp;

var person_sp;
var person_img;

var janitor_sp;
var janitor_img;

var person_check = false;
var janitor_check = false;

function setup() {

    has_camera = true;
    dialogues = dialogues_raw.chapter4;

    createCanvas(SCENE_W, SCENE_H);
    SCENE_RBOUND = 3800;

    background_img = loadImage('img/lvl4_background.png');
    background_sp = createSprite(2200, 360);
    background_sp.addImage(background_img);

    person_img = loadImage('img/lvl4_person.png');
    person_sp = createSprite(500, SCENE_GROUND - 110);
    person_sp.addImage(person_img);

    janitor_img = loadImage('img/lvl4_janitor.png');
    janitor_sp = createSprite(3400, SCENE_GROUND - 115);
    janitor_sp.addImage(person_img);

    lamp_sp = createSprite(1000, SCENE_GROUND - 350);
    lamp_on_img = loadImage('img/lvl4_lamp_on.png');
    lamp_off_img = loadImage('img/lvl4_lamp_off.png');
    lamp_sp.addImage('on', lamp_on_img);
    lamp_sp.addImage('off', lamp_off_img);

    lamp_light_sp = createSprite(1000, SCENE_GROUND - 330);
    lamp_light_img = loadImage('img/lvl4_lamplight.png');
    lamp_light_sp.addImage(lamp_light_img);

    moths_sp = createSprite(1000, SCENE_GROUND - 600);
    moths_sp.addAnimation('swarming', 'img/lvl4_moths_1.png', 'img/lvl4_moths_2.png', 'img/lvl4_moths_3.png')

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
            cur_dialogue = 'person';
            cur_dialogue_step = 0;
            person_check = true;
        } else if ((gamechar_sp.overlap(janitor_sp)) && (person_check) && (!janitor_check)) {
            cur_dialogue = 'janitor';
            cur_dialogue_step = 0;
            janitor_check = true;
        } else if ((gamechar_sp.overlap(lamp_sp)) && (janitor_check)) {
            if (lamp_sp.getAnimationLabel() == 'on') {
                lamp_sp.changeImage('off');
                lamp_light_sp.visible = false;
                lamp_off_check = true;
                moths_sp.velocity.y = -5;
                cur_dialogue = 'outro';
                cur_dialogue_step = 0;
            } else {
                lamp_sp.changeImage('on');
                lamp_light_sp.visible = true;
                lamp_off_check = false;
            }
        } else {
            cur_dialogue_step += 1;
        };
    }

    if ((lamp_off_check) && (gamechar_sp.position.x > SCENE_RBOUND)) {
        transition('chapter5.html');
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
    camera.off();
}
