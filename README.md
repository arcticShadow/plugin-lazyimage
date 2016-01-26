plugin-lazyimage
============

Lazy image preloader plugin. Similar to
[plugin-image](https://github.com/systemjs/plugin-image), expect:
- Non blocking: modules using [plugin-image](https://github.com/systemjs/plugin-image) are not executed until the image, or all the images, are loaded. Imports using [plugin-lazyimage](https://github.com/laurentgoudet/plugin-lazyimage) return immediatly.
- Deferred image loading: images imported through [plugin-image](https://github.com/systemjs/plugin-image) are downloaded immediatly, causing network contention with your other requests (JS, CSS). Images imported through [plugin-lazyimage](https://github.com/laurentgoudet/plugin-lazyimage) are delayed until the the Window `load` event
- Progressive rendering: [plugin-image](https://github.com/systemjs/plugin-image) does allow to progressively render an image (it only returns when the image is fully loaded). [plugin-lazyimage](https://github.com/laurentgoudet/plugin-lazyimage) returns an `Object` with two `start` and `load` Promises, allowing you to display an image as soon as possible (the `start` Promise always resolves) while still handling load errors.

To install with jspm:

```
jspm install lazyimage=github:laurentgoudet/plugin-lazyimage@0.0.2
```

To lazy load a single image, simply do:

```
import image from './myImage.jpg!lazyimage';

image.start.then((image) => {
  document.getElementById('myImage')
    .setAttribute('src', image.src);
  });
```

This code will be executed as soon as possible, before the Window `load` event,
and the `image.start` Promise will resolve as soon as the image starts
loading (i.e., the image will be progressively displayed to the user).

