var background_img;

var telescope_sp;
var telescope_img;
var telescope_off_check = false;
var telescope_seen = false;

var telescope_stars_img;

var SCENE_W = 1280;
var SCENE_H = 960;

function setup() {

    dialogues = dialogues_raw.chapter1;

    createCanvas(SCENE_W / 2, SCENE_H / 2);

    create_gamechar();
    create_textbox();
    create_ground();

    background_img = loadImage('img/bg_intro.png');
    background_img.resize(SCENE_W, SCENE_H);

    telescope_stars_img = loadImage('img/stars_splash.png');

    telescope_sp = createSprite(450, 400);
    telescope_img = loadImage('img/telescope_small.png');
    telescope_sp.addImage(telescope_img);
}


function draw() {
    if (telescope_off_check) {
        background(telescope_stars_img);
    } else {
        background(background_img);
    }

    if (keyWentDown('f')) {
        if (telescope_off_check) {
            telescope_off_check = false;
            return;
        }
        if (gamechar_sp.overlap(telescope_sp)) {
            telescope_off_check = true;
            telescope_seen = true;
            cur_dialogue = 'outro';
            cur_dialogue_step = 0;
        } else {
            cur_dialogue_step += 1;
        }
    }

    if (telescope_off_check) {
        return;
    }

    apply_gravity();
    basic_movement();
    check_scene_bounds();
    drawSprites();
    run_dialogue();

    if ((telescope_seen) && (gamechar_sp.position.x > 620)) {
        document.location.href = 'chapter2.html';
    }

}
