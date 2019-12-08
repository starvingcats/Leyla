var background_img;
var city_img;
var city_sp;

var gamechar_sp;
var gamechar_img;

var house_sp;
var house_on_img;
var house_off_img;

var house_off_check = false;

var ground_sp;
var platforms = [];

var SCENE_W = 1280;
var SCENE_H = 960;

function setup() {
    createCanvas(SCENE_W / 2, SCENE_H / 2);

    background_img = loadImage('img/background.png');
    //background_img.resize(SCENE_W / 2, SCENE_H / 2);
    background_img.resize(SCENE_W, SCENE_H);

    city_img = loadImage('img/city_small.png');
    city_sp = createSprite(0, 400);
    city_sp.addImage(city_img);

    gamechar_sp = createSprite(50,440);
    gamechar_img = loadImage('img/char_small.png');
    gamechar_sp.addImage(gamechar_img);

    house_sp = createSprite(450, 400);
    house_on_img = loadImage('img/house_small.png');
    house_off_img = loadImage('img/house_small_dark.png');
    house_sp.addImage('on', house_on_img);
    house_sp.addImage('off', house_off_img);

    ground_sp = createSprite(0, 470, 1280, 10);
    platforms.push(ground_sp);

}
function draw() {
  background(background_img);

  apply_gravity();
  basic_movement();
  if (keyWentDown('f')) {
      gamechar_sp.overlap(house_sp, function() {
          if (house_sp.getAnimationLabel() == 'on') {
              house_sp.changeImage('off');
              house_off_check = true;
          } else {
              house_sp.changeImage('on');
              house_off_check = false;
          }
      });
  }

  if ((house_off_check) && (gamechar_sp.position.x > 620)) {
      document.location.href = 'chapter4.html';
  }

  check_scene_bounds();
  drawSprites();

}
