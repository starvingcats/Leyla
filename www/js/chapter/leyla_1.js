var background_img;

var gamechar_sp;
var gamechar_img;

var telescope_sp;
var telescope_img;
var telescope_off_check = false;
var telescope_seen = false;

var telescope_stars_img;


var ground_sp;
var platforms = [];

var SCENE_W = 1280;
var SCENE_H = 960;

var dialogues_raw = {};
var dialogues = {};
var cur_dialogue = 'intro';
var cur_dialogue_step = 0;


function preload() {
    dialogues_raw = loadJSON("json/dialogues.json");
}

function setup() {

    dialogues = dialogues_raw.chapter1;
    console.log(dialogues_raw);
    console.log(dialogues);

    //console.log(dialogues);

    createCanvas(SCENE_W / 2, SCENE_H / 2);

    create_gamechar();

    background_img = loadImage('img/bg_intro.png');
    //background_img.resize(SCENE_W / 2, SCENE_H / 2);
    background_img.resize(SCENE_W, SCENE_H);

    telescope_stars_img = loadImage('img/stars_splash.png');

    telescope_sp = createSprite(450, 400);
    telescope_img = loadImage('img/telescope_small.png');
    telescope_sp.addImage(telescope_img);

    ground_sp = createSprite(0, 470, 1280, 10);
    platforms.push(ground_sp);

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

    if ((telescope_seen) && (gamechar_sp.position.x > 620)) {
        document.location.href = 'chapter2.html';
    }

    check_scene_bounds();
    drawSprites();

    var cur_dialogue_list = dialogues[cur_dialogue];
    var cur_text = cur_dialogue_list[cur_dialogue_step];
    if (cur_text) {
        fill("white");
        var display_text = cur_text.role + ': ' + cur_text.text;
        text(display_text, 320, 240);
    }
}
