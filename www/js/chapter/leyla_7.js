var background_img;

var person1_sp;
var person1_img;
var person1_check = false;
var person1_2_check = false;

var person2_sp;
var person2_img;
var person2_check = false;

var house_sp;
var house_cold_img;
var house_warm_img;
var house_check = false;

function setup() {

    dialogues = dialogues_raw.chapter7;
    has_camera = true;

    createCanvas(SCENE_W, SCENE_H);

    background_img = loadImage('img/lvl7_background.png');
    background_sp = createSprite(1600, 360);
    background_sp.addImage(background_img);
    SCENE_RBOUND = 3200;

    house_cold_img = loadImage('img/lvl7_house_cold.png');
    house_warm_img = loadImage('img/lvl7_house_warm.png');
    house_sp = createSprite(2600, SCENE_GROUND - 350);
    house_sp.addImage('cold', house_cold_img);
    house_sp.addImage('warm', house_warm_img);
    house_sp.changeImage('cold');

    person1_img = loadImage('img/lvl7_person_1.png');
    person1_sp = createSprite(550, SCENE_GROUND - 110);
    person1_sp.addImage(person1_img);

    person2_img = loadImage('img/lvl7_person_2.png');
    person2_sp = createSprite(2600, SCENE_GROUND - 110);
    person2_sp.addImage(person2_img);

    create_gamechar();
    create_ground();
    create_textbox();

}

function draw() {
    background(background_img);

    apply_gravity();
    basic_movement();
    focus_gamechar();

    if (keyWentDown('f') || keyWentDown(40)) {
        if ((gamechar_sp.overlap(person2_sp)) && (person1_check) && (!person2_check) && (cur_dialogue_step > 1)) {
            person2_check = true;
            switch_dialogue('person2');
        } else if ((gamechar_sp.overlap(person1_sp)) && (!person1_check) && (!person2_check)) {
            person1_check = true;
            switch_dialogue('person1');
        } else if ((gamechar_sp.overlap(person1_sp)) && (person1_check) && (person2_check) && (!person1_2_check) && (cur_dialogue_step > 1)) {
            person1_2_check = true;
            switch_dialogue('person1_2');
        } else if ((gamechar_sp.overlap(house_sp)) && (person1_check) && (person2_check) && (person1_2_check) && (cur_dialogue_step > 1) && (cur_dialogue != 'outro')) {
            house_check = true;
            switch_dialogue('outro');
            wait(4 * 1000).then(function() {
                house_sp.changeImage('warm');
            });
        } else {
            cur_dialogue_step += 1;
        };

    }

    if ((house_check) && (gamechar_sp.position.x > SCENE_RBOUND)) {
        transition('chapter8.html');
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
    camera.off();
}
