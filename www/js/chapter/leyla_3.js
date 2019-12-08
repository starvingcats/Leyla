var background_img;
var city_img;
var city_sp;

var gamechar_sp;
var gamechar_img;

var house_sp;
var house_on_img;
var house_off_img;

var house_off_check = false;

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

    background_img = loadImage('img/background.png');
    //background_img.resize(SCENE_W / 2, SCENE_H / 2);
    background_img.resize(SCENE_W, SCENE_H);

    telescope_stars_img = loadImage('img/citysky_splash.png');

    city_img = loadImage('img/city_small.png');
    city_sp = createSprite(0, 400);
    city_sp.addImage(city_img);

    create_gamechar();

    house_sp = createSprite(450, 400);
    house_on_img = loadImage('img/house_small.png');
    house_off_img = loadImage('img/house_small_dark.png');
    house_sp.addImage('on', house_on_img);
    house_sp.addImage('off', house_off_img);

    telescope_sp = createSprite(250, 400);
    telescope_img = loadImage('img/telescope_small.png');
    telescope_sp.addImage(telescope_img);

    ground_sp = createSprite(0, 470, 1280, 10);
    platforms.push(ground_sp);

}
function draw() {

    if ((house_off_check) && (telescope_off_check)) {
        background(telescope_stars_img);
    } else {
        background(background_img);
    }

  apply_gravity();
  basic_movement();
  if (keyWentDown('f')) {
      if (telescope_off_check) {
          telescope_off_check = false;
          return;
      }

      gamechar_sp.overlap(house_sp, function() {
          if (house_sp.getAnimationLabel() == 'on') {
              house_sp.changeImage('off');
              house_off_check = true;
          } else {
              house_sp.changeImage('on');
              house_off_check = false;
          }
      });

      gamechar_sp.overlap(telescope_sp, function() {
          telescope_off_check = true;
          if (house_off_check) {
              telescope_seen = true;
          }
      });

  }

  if (telescope_off_check) {
      return;
  }


  if ((house_off_check) && (gamechar_sp.position.x > 620)) {
      document.location.href = 'chapter4.html';
  }

  check_scene_bounds();
  drawSprites();

  if (!house_off_check) {
      fill("white");
      text('Ich muss erst das Licht in meinem Zimmer ausmachen...', 320, 240);
  } else if (telescope_seen) {
      fill("white");
      text('Das reicht noch nicht. Ich muss mehr Lichter ausmachen...', 320, 240);
  }
}
