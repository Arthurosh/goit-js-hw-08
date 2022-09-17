import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const VIDEO_CURRENT_TIME = 'videoplayer-current-time';

const getTime = function () {
  player.getCurrentTime().then(seconds => {
    localStorage.setItem(VIDEO_CURRENT_TIME, seconds);
  });
};

if (localStorage.getItem(VIDEO_CURRENT_TIME)) {
  player.setCurrentTime(localStorage.getItem(VIDEO_CURRENT_TIME));
}

player.on('timeupdate', throttle(getTime, 1000));
