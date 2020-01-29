var background_img;
var background_sp;

var telescope_sp;
var telescope_img;
var telescope_off_check = false;
var telescope_seen = false;

var midground_sp;
var midground_img;

var car_sp;
var car_img;

var grandpa_sp;
var grandpa_img;

var mother_sp;
var mother_img;

var telescope_stars_img;

function setup() {

    has_camera = true;

    dialogues = dialogues_raw.chapter1;

    createCanvas(SCENE_W, SCENE_H);
    create_ground();

    background_img = loadImage('img/lvl1_background.png');
    background_sp = createSprite(0, 360);
    background_sp.addImage(background_img);
    SCENE_RBOUND = 950;

    create_textbox();

    midground_img = loadImage('img/lvl1_midground.png');
    midground_sp = createSprite(0, SCENE_H - 270);
    midground_sp.addImage(midground_img);

    telescope_stars_img = loadImage('img/lvl1_telescopeview.png');

    telescope_sp = createSprite(100, SCENE_H - 80);
    telescope_img = loadImage('img/telescope.png');
    telescope_sp.addImage(telescope_img);

    car_sp = createSprite(SCENE_W + 100, SCENE_H - 120);
    car_img = loadImage('img/car_empty.png');
    car_sp.addImage(car_img);

    grandpa_sp = createSprite(10, SCENE_H - 160);
    grandpa_img = loadImage('img/grandpa.png');
    grandpa_sp.addImage(grandpa_img);

    mother_sp = createSprite(SCENE_W - 250, SCENE_H - 120);
    mother_img = loadImage('img/mom.png');
    mother_sp.addImage(mother_img);

    create_gamechar(SCENE_W - 450);
}

function draw() {
    if (telescope_off_check) {
        background(telescope_stars_img);
    }

    if (keyWentDown('f')) {
        if (telescope_off_check) {
            telescope_off_check = false;
            return;
        }
        if ( (gamechar_sp.overlap(telescope_sp)) && (!telescope_seen) && (cur_dialogue != 'grandpa') ) {
            switch_dialogue('grandpa');
        } else if ( (gamechar_sp.overlap(telescope_sp)) && (cur_dialogue == 'grandpa') && (!cur_text) ) {
            telescope_off_check = true;
            telescope_seen = true;
            switch_dialogue('outro');
        } else {
            cur_dialogue_step += 1;
        }
    }

    if (telescope_off_check) {
        return;
    }

    apply_gravity();
    basic_movement();
    focus_gamechar();

    check_scene_bounds();
    drawSprites();
    run_dialogue();

    if ((telescope_seen) && (gamechar_sp.position.x > SCENE_RBOUND)) {
        transition('chapter2.html');
    }

    camera.off();

}
