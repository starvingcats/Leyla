var background_img;

var lamp_sp;
var lamp_on_img;

var lamp_off_check = false;

var monument_sp;
var monument_img;

function setup() {

    dialogues = dialogues_raw.chapter6;

    createCanvas(SCENE_W, SCENE_H);

    background_img = loadImage('img/bg_lvl2.png');

    create_gamechar();
    create_ground();
    create_textbox();

    monument_img = loadImage('img/monument_small.png');
    monument_sp = createSprite((3 * SCENE_W / 4), SCENE_H - 150);
    monument_sp.addImage(monument_img);

    lamp_sp = createSprite(2 * SCENE_W / 3, SCENE_H - 150);
    lamp_on_img = loadImage('img/pivotlamp_small.png');
    lamp_sp.addImage('on', lamp_on_img);

}

function draw() {
    background(background_img);

    apply_gravity();
    basic_movement();

    if (keyWentDown('f')) {
        if (gamechar_sp.overlap(lamp_sp)) {
            if (!lamp_off_check) {
                lamp_sp.rotation = 20;
                lamp_sp.position.y += 60;
                lamp_off_check = true;
            } else {
                lamp_sp.rotation = 0;
                lamp_sp.position.y -= 60;
                lamp_off_check = false;
            }
        } else {
            cur_dialogue_step += 1;
        };
    }

    if ((lamp_off_check) && (gamechar_sp.position.x > SCENE_RBOUND)) {
        document.location.href = 'chapter7.html';
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
}
