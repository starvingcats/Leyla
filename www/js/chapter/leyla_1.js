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

function setup() {
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
      gamechar_sp.overlap(telescope_sp, function() {
          telescope_off_check = true;
          telescope_seen = true;
      });
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

  if (telescope_seen) {
      fill("white");
      text('Jetzt muss ich nach Hause gehen...', 320, 240);
  }

}
