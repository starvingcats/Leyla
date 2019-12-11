var background_img;

var house_sp;
var house_on_img;
var house_off_img;

var house_off_check = false;

var telescope_sp;
var telescope_img;
var telescope_off_check = false;
var telescope_seen = false;

var telescope_stars_img;

function setup() {

    dialogues = dialogues_raw.chapter3;

    createCanvas(SCENE_W, SCENE_H);

    background_img = loadImage('img/bg_city.png');

    telescope_stars_img = loadImage('img/citysky_splash.png');

    create_gamechar();
    create_ground();
    create_textbox();

    house_sp = createSprite(3 * SCENE_W / 4, SCENE_GROUND - 130);
    house_on_img = loadImage('img/house_small.png');
    house_off_img = loadImage('img/house_small_dark.png');
    house_sp.addImage('on', house_on_img);
    house_sp.addImage('off', house_off_img);

    telescope_sp = createSprite(SCENE_W / 2, SCENE_GROUND - 60);
    telescope_img = loadImage('img/telescope_small.png');
    telescope_sp.addImage(telescope_img);

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
          cur_dialogue = 'midclue';
          if (house_off_check) {
              telescope_seen = true;
              cur_dialogue = 'outro';
          }
      });

  }

  if ((house_off_check) && (telescope_off_check)) {
      return;
  }

  if ((house_off_check) && (gamechar_sp.position.x > SCENE_RBOUND)) {
      document.location.href = 'chapter4.html';
  }

  check_scene_bounds();
  drawSprites();
  run_dialogue();

}
