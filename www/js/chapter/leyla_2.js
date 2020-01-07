var background_img;
var city_img;
var city_sp;

function setup() {

    has_camera = true;

    dialogues = dialogues_raw.chapter2;

    createCanvas(SCENE_W, SCENE_H);

    create_ground();

    background_img = loadImage('img/bg_city.png');
    background_img.resize(SCENE_W, SCENE_H);

    city_img = loadImage('img/city.png');
    city_sp = createSprite(500, SCENE_H - 100);
    city_sp.addImage(city_img);

    gamechar_sp = createSprite(50, SCENE_H - 60);
    gamechar_img = loadImage('img/car_small.png');
    gamechar_sp.addImage(gamechar_img);

    create_textbox();
}

function draw() {

    background(background_img);

    apply_gravity();
    basic_movement();

    camera.position.x = gamechar_sp.position.x;
    camera.position.y = gamechar_sp.position.y - 300;

    if (keyWentDown('f')) {
        cur_dialogue_step += 1;
    }

    if ((true) && (gamechar_sp.position.x > SCENE_RBOUND)) {
        transition('chapter3.html');
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
    camera.off();

}
