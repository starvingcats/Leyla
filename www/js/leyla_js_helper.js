var GRAVITY = 1;
var JUMP = 11;

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
