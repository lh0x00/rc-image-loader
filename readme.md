# about

[![npm version][npm-version-image]][npm-url]
[![npm downloads][npm-downloads-image]][npm-url]
[![github issues][github-issues-image]][github-issues-url]
[![build status][travis-image]][npm-url]
[![greenkeeper status][greenkeeper-image]][npm-url]

handle render a preview image is tiny while waiting for real image loading. the real image is lazy-loaded when loaded. when use package in server-side, image source return is real-image for best seo.


# install

```bash
# use npm
$ npm install rc-image-loader

# or yarn
$ yarn add rc-image-loader
```

# usage

[online example](https://codesandbox.io/s/q8vkmqx4vq)

#### child function

```javascript
import React from "react";
import ImageLoader from "rc-image-loader";

const onLoad = data => console.log(`Loaded image: `, data.src);

const onError = data => console.log(`Error image: `, data.loading);

const App = () => (
  <div>
    // simple
    <ImageLoader placeholder="tiny-image.jpg" image="real-image.jpg">
      {({ src }) => (<img src={src} alt="example for rc-image-loader" />)}
    </ImageLoader>

    // or use with callback
    <ImageLoader placeholder="tiny-image.jpg" image="real-image.jpg" onLoad={onLoad} onError={onError}>
      {({ src }) => (<img src={src} alt="example for rc-image-loader" />)}
    </ImageLoader>
  </div>
);

export default App;
```

#### render props

```javascript
import React from "react";
import ImageLoader from "rc-image-loader";

const onLoad = data => console.log(`Loaded image: `, data.src);

const onError = data => console.log(`Error image: `, data.loading);

const App = () => (
  <div>
    <ImageLoader
      placeholder="tiny-image.jpg"
      image="real-image.jpg"
      renderComponent={({ src }) => (<img src={src} alt="render real image" />)}
      renderLoading={({ src }) => (<img src={src} alt="render tiny image" />)}
      renderError={({ loading }) => (<text>Failed when load image: {loading}</text>)}
      onLoad={onLoad}
      onError={onError}
    />
  </div>
);

export default App;
```

# documents

## config

| name           | type    | description                                                                                                            |
| -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| image          | String  | (required) real image source                                                                                           |
| placeholder    | String  | (required) tiny image source                                                                                           |
| renderComponent| Func    | (optional) component will render when loaded real image, when use render props. defualt: undefined                     |
| renderError    | Func    | (optional) component will render have a error load image, when use render props. defualt: undefined                    |
| renderLoading  | Func    | (optional) component will render when loading real image, when use render props. defualt: undefined                    |
| onLoaded       | Func    | (optional) function callback when loaded image. default: undefined                                                     |
| onError        | Func    | (optional) function callback when failed load image. default: undefined                                                |

## props

values return to your components, append to props

| name      | type    | description                                |
| --------- | ------- | ------------------------------------------ |
| src       | String  | image source render (tiny or real)         |
| loading   | String  | image source is loading                    |
| isError   | Boolean | if have a error when load image            |
| isLoading | Boolean | if real image is loading                   |

[npm-url]: https://npmjs.org/package/rc-image-loader
[npm-version-image]: https://badge.fury.io/js/rc-image-loader.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/rc-image-loader.svg
[github-issues-image]: https://img.shields.io/github/issues/lamhieu-vk/rc-image-loader.svg
[github-issues-url]: https://github.com/lamhieu-vk/rc-image-loader/issues
[travis-image]: https://travis-ci.com/lamhieu-vk/rc-image-loader.svg?branch=master
[greenkeeper-image]: https://badges.greenkeeper.io/lamhieu-vk/rc-image-loader.svg
