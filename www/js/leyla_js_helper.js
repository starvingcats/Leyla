var GRAVITY = 1;
var JUMP = 11;

var cur_dialogue = 'intro';
var cur_dialogue_step = 0;

var dialogues_raw = {};
var dialogues = {};

var gamechar_sp;
var gamechar_img;

var textbox_sp;
var textbox_img;

var ground_sp;
var platforms = [];

function preload() {
    dialogues_raw = loadJSON("json/dialogues.json");
}

function apply_gravity() {
    gamechar_sp.velocity.y += GRAVITY;

    gamechar_sp.onground = false;

    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        platform.visible = false;
        if ((gamechar_sp.overlap(platform)) && gamechar_sp.velocity.y > 0) {
            gamechar_sp.velocity.y = 0;
            gamechar_sp.onground = true;
        }
    }
}

function basic_movement() {
    if (keyWentDown('space')) {
        if (gamechar_sp.onground) {
            gamechar_sp.velocity.y = -JUMP;
        }
    }
    if (keyWentDown('a')) {
        gamechar_sp.velocity.x = -5;
    }
    if (keyWentUp('a')) {
        gamechar_sp.velocity.x = 0;
    }

    if (keyWentDown('d')) {
        gamechar_sp.velocity.x = 5;
    }
    if (keyWentUp('d')) {
        gamechar_sp.velocity.x = 0;
    }

}

function check_scene_bounds() {
    if (gamechar_sp.position.x > 620) {
        if (gamechar_sp.velocity.x > 0) {
            gamechar_sp.velocity.x = 0;
        }
    } else if (gamechar_sp.position.x < 20) {
        if (gamechar_sp.velocity.x < 0) {
            gamechar_sp.velocity.x = 0;
        }
    }

    if (gamechar_sp.velocity.x == 0) {
        gamechar_sp.changeAnimation('standing');
    } else {
        gamechar_sp.changeAnimation('walking');
    }

}

function create_gamechar() {
    gamechar_sp = createSprite(50,440);
    gamechar_sp.addAnimation('walking', 'img/leylawalk1_small.png', 'img/leylawalk2_small.png');
    gamechar_sp.addAnimation('standing', 'img/leylawalk1_small.png');
}

function create_textbox() {
    textbox_img = loadImage('img/textbox_small.png');
    textbox_sp = createSprite(320, 40);
    textbox_sp.addImage(textbox_img);
}

function create_ground() {
    ground_sp = createSprite(0, 470, 1280, 10);
    platforms.push(ground_sp);
}

function run_dialogue() {
    var cur_dialogue_list = dialogues[cur_dialogue];
    var cur_text = cur_dialogue_list[cur_dialogue_step];
    if (cur_text) {
        textbox_sp.visible = true;
        var display_text = cur_text.role + ': ' + cur_text.text;
        text(display_text, 50, 40);
    } else {
        textbox_sp.visible = false;
    }
}
