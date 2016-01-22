/*
  Lazy image plugin
  Adapted from plugin-image
  https://github.com/systemjs/plugin-image
*/
exports.build = false;
exports.fetch = function(load) {
  load.metadata.imgPromise = new Promise(function(resolve, reject) {
    function loadImage() {
      var img = new Image();
      img.onload = function(evt) {
        try {
          delete img.onload; //release memory - suggested by John Hann
        } catch(err) {
          img.onload = function() {}; // IE7 :(
        }
      }
      img.src = load.address;
      resolve(img);
    };
    if (document.readyState === 'complete') {
      loadImage();
    } else {
      window.addEventListener('load', loadImage, false);
    }
  });
  return Promise.resolve('');
};

exports.instantiate = function(load) {
  // we don't want to unpack the promise here, as it delay the execution of the
  // consumer. I couldn't find a better way to not unpack the Promise.
  return { promise: load.metadata.imgPromise };
};
