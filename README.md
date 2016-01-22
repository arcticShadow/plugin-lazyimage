plugin-lazyimage
============

Lazy image preloader plugin. Similar to
[plugin-image](https://github.com/systemjs/plugin-image), expect:
- Faster fetch for your other modules: it starts to load the images after the
Window `load` event, instead of in the same time than your other SystemJS
modules, giving network priority to them.
- Non blocking: [plugin-image](https://github.com/systemjs/plugin-image) waits
for the image, or all the images if you are importing many, imported by a
module to be loaded before executing the code of that module.
- Start or load: it exports two `Promises`, one when the download of the image
starts and one and it ends, allowing you to display an image as soon as
possible, while still allowing you to handle load errors.

It returns `Object` with two `start` and `load` keys. The `start` Promise will
always resolve, use `load` to handle load errors.

To lazy load a single image, simply do:

```
import image from './myImage.jpg!lazyimage';

image.start.then((image) => {
  document.getElementById('myImage')
    .setAttribute('src', image.src);
  });
```

This code will be executed as soon as possible, before the Window `load` event,
and the `image.promise` will resolve as soon as the image starts
downloading (i.e., the image will be progressively displayed).

