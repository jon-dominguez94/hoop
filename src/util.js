// window.requestAnimFrame = (function () {
//   return window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     window.oRequestAnimationFrame ||
//     window.msRequestAnimationFrame ||
//     function (/* function */ callback, /* DOMElement */ element) {
//       window.setTimeout(callback, 1000 / 60);
//     };
// })();

export const requestAnimFrame = (cb) => {
  // console.log('anim');
  return window.requestAnimationFrame(cb) ||
    window.webkitRequestAnimationFrame(cb) ||
    window.mozRequestAnimationFrame(cb) ||
    window.oRequestAnimationFrame(cb) ||
    window.msRequestAnimationFrame(cb) ||
    function (/* function */ cb, /* DOMElement */ element) {
      window.setTimeout(cb, 1000 / 60);
    };
};
