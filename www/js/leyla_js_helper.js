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
