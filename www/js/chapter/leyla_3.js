var background_img;
var background_sp;

var house_sp;
var house_on_img;
var house_off_img;
var house_off_check = false;

var telescope_sp;
var telescope_img;
var telescope_off_check = false;
var telescope_seen = false;

var car_img;
var car_sp;

var telescope_stars_img;
var telescope_stars_img2;
var telescope_view;

function setup() {

    has_camera = true;

    dialogues = dialogues_raw.chapter3;

    createCanvas(SCENE_W, SCENE_H);

    background_img = loadImage('img/lvl3_background.png');
    background_sp = createSprite(500, 366);
    background_sp.addImage(background_img);
    SCENE_RBOUND = 900;

    telescope_stars_img = loadImage('img/lvl3_telescopeview.png');
    telescope_stars_img2 = loadImage('img/lvl3_telescopeview_2.png');
    telescope_view = telescope_stars_img;

    create_ground();
    create_textbox();

    house_sp = createSprite(SCENE_W / 5, SCENE_GROUND - 300);
    house_on_img = loadImage('img/lvl3_house.png');
    house_off_img = loadImage('img/lvl3_house_off.png');
    house_sp.addImage('on', house_on_img);
    house_sp.addImage('off', house_off_img);

    telescope_sp = createSprite(800, SCENE_GROUND - 60);
    telescope_img = loadImage('img/telescope.png');
    telescope_sp.addImage(telescope_img);

    create_gamechar();

}

function draw() {

    if ((telescope_off_check)) {
        background(telescope_view);
    }

    apply_gravity();
    basic_movement();
    focus_gamechar();
    if (keyWentDown('f')) {
        if ((telescope_off_check)) {
            telescope_off_check = false;
            return;
        } else if ((gamechar_sp.overlap(house_sp)) && (cur_dialogue_step > 0)) {
            house_sp.changeImage('off');
            house_off_check = true;
            switch_dialogue('houseoff');
        } else if ((gamechar_sp.overlap(telescope_sp)) && (cur_dialogue_step > 0) && (cur_dialogue != 'midclue')  && (cur_dialogue != 'houseoff')) {
            telescope_off_check = true;
            switch_dialogue('midclue');
        } else if ((gamechar_sp.overlap(telescope_sp)) && (cur_dialogue_step > 0) && (cur_dialogue == 'houseoff')) {
            telescope_off_check = true;
            telescope_seen = true;
            telescope_view = telescope_stars_img2;
            switch_dialogue('outro');
        } else {
            cur_dialogue_step += 1;
        }
    }

    if ((telescope_off_check)) {
        return;
    }

    if ((telescope_seen) && (house_off_check) && (gamechar_sp.position.x > SCENE_RBOUND)) {
        transition('chapter4.html');
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
    camera.off();
}
