var GRAVITY = 1;
var JUMP = 11;
var CHAR_SPEED = 10;

var SCENE_W = 1280;
var SCENE_H = 720;
var SCENE_GROUND = SCENE_H - 10;
var SCENE_RBOUND = SCENE_W - 20;
var SCENE_LBOUND = 20;

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

var has_camera;
var fading = false;
var car_mode = false;

var block_move = false;
var cur_text = '';

function preload() {
    // loadJSON seems to lack {cache: false} option, so we fool browser not to
    // cache by hand
    var u_date = Date.now();
    dialogues_raw = loadJSON("json/dialogues.json?_u=" + u_date);
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
    if (block_move) {
        if (!car_mode) {
            gamechar_sp.velocity.x = 0;
            gamechar_sp.velocity.y = 0;
        }
        return;
    }

    if (keyWentDown('space')) {
        if (gamechar_sp.onground) {
            gamechar_sp.velocity.y = -JUMP;
        }
    }
    if (keyWentDown('a')) {
        gamechar_sp.velocity.x = -CHAR_SPEED;
        if (!car_mode) {
            gamechar_sp.mirrorX(-1);
        }
    }
    if (keyWentUp('a')) {
        gamechar_sp.velocity.x = 0;
        if (!car_mode) {
            gamechar_sp.mirrorX(1);
        }
    }

    if (keyWentDown('d')) {
        gamechar_sp.velocity.x = CHAR_SPEED;
    }
    if (keyWentUp('d')) {
        gamechar_sp.velocity.x = 0;
    }

}

function check_scene_bounds() {
    if (gamechar_sp.position.x > SCENE_RBOUND) {
        if (gamechar_sp.velocity.x > 0) {
            gamechar_sp.velocity.x = 0;
        }
    } else if (gamechar_sp.position.x < SCENE_LBOUND) {
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

function create_gamechar(position_x) {
    if (!position_x) {
        position_x = SCENE_W/15;
    }
    gamechar_sp = createSprite(position_x, SCENE_H - 85);
    gamechar_sp.addAnimation(
        'walking',
        'img/leylawalk_1.png',
        'img/leylawalk_2.png',
        'img/leylawalk_3.png',
        'img/leylawalk_4.png'
    );
    gamechar_sp.addAnimation('standing', 'img/leylawalk_4.png');
}

function create_textbox() {
    textbox_img = loadImage('img/textbox_small.png');
    textbox_sp = createSprite(SCENE_W/2, SCENE_H / 15);
    textbox_sp.addImage(textbox_img);
}

function create_ground() {
    ground_sp = createSprite(0, SCENE_GROUND, SCENE_RBOUND * 2, 10);
    platforms.push(ground_sp);
}

function run_dialogue() {

    var cur_dialogue_list = dialogues[cur_dialogue];
    if (typeof cur_dialogue_list == 'undefined') {
        block_move = false;
        textbox_sp.visible = false;
        return;
    }
    cur_text = cur_dialogue_list[cur_dialogue_step];
    if (cur_text) {
        block_move = true;
        textbox_sp.visible = true;
        var display_text = cur_text.role + ': ' + cur_text.text;
        fill('white');
        textSize(SCENE_H / 40);
        textAlign(CENTER, CENTER);
        if (has_camera) {
            textbox_sp.velocity.x = gamechar_sp.velocity.x;
            textbox_sp.position.x = gamechar_sp.position.x;
            text(display_text, gamechar_sp.position.x, 50);
        } else {
            text(display_text, SCENE_W/2, 50);
        }

    } else {
        block_move = false;
        textbox_sp.visible = false;
    }
}

function wait(ms) {
    return new Promise(
        function(resolve) {
            setTimeout(resolve, ms);
        }
    );
}

function fade() {
    element = document.getElementById('defaultCanvas0');
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function transition(target) {
    if ( fading ) {
        return;
    }
    fade();
    wait(2 * 1000).then(function() {
        document.location.href = target;
    });
    fading = true;
}

function focus_gamechar() {
    camera.position.x = gamechar_sp.position.x;
}

function switch_dialogue(dialogue) {
    cur_dialogue = dialogue;
    cur_dialogue_step = 0;
}
