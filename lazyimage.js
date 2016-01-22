/*
  Lazy image plugin
  Adapted from plugin-image
  https://github.com/systemjs/plugin-image
*/
exports.build = false;
exports.fetch = function(load) {
  load.metadata.start = new Promise(function(startResolve) {
    load.metadata.load = new Promise(function(loadResolve, loadReject) {
      function loadImage() {
        var img = new Image();
        img.onerror = loadReject;
        img.onload = function(evt) {
          try {
            delete img.onload; //release memory - suggested by John Hann
          } catch(err) {
            img.onload = function() {}; // IE7 :(
          }
          loadResolve();
        }
        img.src = load.address;
        startResolve(img);
      };
      if (document.readyState === 'complete') {
        loadImage();
      } else {
        window.addEventListener('load', loadImage, false);
      }
    });
  });
  return Promise.resolve('');
};

exports.instantiate = function(load) {
  return {
    start: load.metadata.start,
    load: load.metadata.load
  };
};
