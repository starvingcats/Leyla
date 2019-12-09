var background_img;
var city_img;
var city_sp;

var SCENE_W = 1280;
var SCENE_H = 960;

function setup() {

    dialogues = dialogues_raw.chapter2;

    createCanvas(SCENE_W / 2, SCENE_H / 2);

    create_ground();
    create_textbox();

    background_img = loadImage('img/background.png');
    background_img.resize(SCENE_W, SCENE_H);

    city_img = loadImage('img/city_small.png');
    city_sp = createSprite(0, 400);
    city_sp.addImage(city_img);

    gamechar_sp = createSprite(50,440);
    gamechar_img = loadImage('img/car_small.png');
    gamechar_sp.addImage(gamechar_img);

}

function draw() {
    background(background_img);
    camera.zoom = 1;

    apply_gravity();
    basic_movement();

    camera.position.x = gamechar_sp.position.x;
    camera.position.y = gamechar_sp.position.y - 200;
    /*
    if(mouseIsPressed)
      camera.zoom = 0.5;
    else
      camera.zoom = 1;
    */
    if (keyWentDown('f')) {
        cur_dialogue_step += 1;
    }

    if ((true) && (gamechar_sp.position.x > 620)) {
        document.location.href = 'chapter3.html';
    }

    check_scene_bounds();
    drawSprites();
    run_dialogue();
    camera.off();

}
