var GRAVITY = 1;
var JUMP = 15;


function apply_gravity() {
    gamechar_sp.velocity.y += GRAVITY;

    if (gamechar_sp.overlap(ground_sp)) {
        gamechar_sp.velocity.y = 0;
    }
}

function basic_movement() {
    if (keyWentDown('space')) {
        gamechar_sp.velocity.y = -JUMP;
    }
    if (keyWentDown('a') || mouseWentDown(RIGHT)) {
        gamechar_sp.velocity.x = -5;
    }
    if (keyWentUp('a') || mouseWentUp(RIGHT)) {
        gamechar_sp.velocity.x = 0;
    }

    if (keyWentDown('d') || mouseWentDown(LEFT)) {
        gamechar_sp.velocity.x = 5;
    }
    if (keyWentUp('d') || mouseWentUp(LEFT)) {
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
}
