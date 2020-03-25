var background_img;
var background_sp;

var city_img;
var city_sp;

function preload() {
    var u_date = Date.now();
    dialogues_raw = loadJSON("json/dialogues.json?_u=" + u_date);

    background_img = loadImage('img/lvl2_background.png');
    gamechar_img = loadImage('img/car_driving.png');
}

function setup() {

    has_camera = true;
    car_mode = true;

    dialogues = dialogues_raw.chapter2;

    createCanvas(SCENE_W, SCENE_H);
    SCENE_RBOUND = 3000;
    CHAR_SPEED = 6;

    create_ground();
    background_sp = createSprite(200, 366);
    background_sp.addImage(background_img);

    gamechar_sp = createSprite(50, SCENE_H - 100);
    gamechar_sp.addImage(gamechar_img);

    create_textbox();
}

function draw() {

    apply_gravity();
    basic_movement();

    focus_gamechar();

    if (keyWentDown('f') || keyWentDown(40)) {
	cur_dialogue_step += 1;
    }

    if ((gamechar_sp.position.x > SCENE_RBOUND / 2) && (cur_dialogue != 'city')) {
	switch_dialogue('city');
    }

    if ((true) && (gamechar_sp.position.x > SCENE_RBOUND)) {
	transition('chapter3.html');
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
    camera.off();

}
