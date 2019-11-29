var background_img;

var gamechar_sp;
var gamechar_img;

var ground_sp;

var poster_img;
var poster_sp;

var spot_img;
var spot_1_sp;
var spot_2_sp;
var spot_1_up;
var spot_2_up;
var spot_places = [];

var platform_1_sp;
var platform_2_sp;
var platform_3_sp;
var platforms = [];

var pickables = [];
var picked;

function setup() {
    createCanvas(640, 480);

    background_img = loadImage('img/bg_lvl2.png');
    background_img.resize(640, 480);

    gamechar_sp = createSprite(50,440);
    gamechar_img = loadImage('img/char_small.png');
    gamechar_sp.addImage(gamechar_img);

    ground_sp = createSprite(0, 470, 1280, 10);
    platform_1_sp = createSprite(365, 410, 25, 5);
    platform_2_sp = createSprite(365, 350, 25, 5);
    platform_3_sp = createSprite(450, 300, 200, 5);
    platforms.push(ground_sp);
    platforms.push(platform_1_sp);
    platforms.push(platform_2_sp);
    platforms.push(platform_3_sp);

    poster_sp = createSprite(450, 380);
    poster_img = loadImage('img/plakat_small.png');
    poster_sp.addImage(poster_img);

    spot_img = loadImage('img/plakatstrahler_small.png')
    spot_1_sp = createSprite(420, 350);
    spot_1_up = createSprite(420, 290, 20 , 20);
    spot_1_sp.addImage(spot_img);
    pickables.push(spot_1_sp);
    spot_places.push(spot_1_up);
    spot_1_up.visible = false;

    spot_2_sp = createSprite(500, 350);
    spot_2_up = createSprite(500, 290, 20 , 20);
    spot_2_sp.addImage(spot_img);
    pickables.push(spot_2_sp);
    spot_places.push(spot_2_up);
    spot_2_up.visible = false;

}

function draw() {
    background(background_img);
    apply_gravity();
    basic_movement();


    if (keyWentDown('f')) {
      if ( !picked ) {
        for (var i = 0; i < pickables.length; i++) {
          var pickable = pickables[i];
          if ( (gamechar_sp.overlap(pickable)) && (pickable.mirrorY() != -1) ) {
            picked = pickable;
            picked.visible = false;
          }
        }
      } else {
        for (var i = 0; i < spot_places.length; i++) {
          var spot_place = spot_places[i];
          if (gamechar_sp.overlap(spot_place)) {
            picked.visible = true;
            picked.mirrorY(-1);
            picked.position.y = picked.position.y + 10;
            picked = null;
          }
        }
      }
    }

    if ( (spot_1_sp.mirrorY() == -1) &&
         (spot_2_sp.mirrorY() == -1) &&
         (gamechar_sp.position.x > 620) ) {
        document.location.href = 'index.html';
    }

    check_scene_bounds();
    drawSprites();
}
