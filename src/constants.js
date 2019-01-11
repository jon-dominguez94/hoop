const constants = {
  FRAMERATE: 60,
  DEFAULT_HEIGHT: 510,
  DEFAULT_WIDTH: 900,
  TOUCH_INPUT: navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i),

  ENEMY_COUNT: 2,
  ENEMY_SIZE: 10,
  ENEMY_TYPE_NORMAL: 1,
  ENEMY_TYPE_BOMB: 2,
  ENEMY_TYPE_NORMAL_MOVER: 3,
  ENEMY_TYPE_BOMB_MOVER: 4,
  ENEMY_MOVER_START_FRAME: FRAMERATE * 2
};

export default constants;