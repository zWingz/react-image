# A React Image Component

[![CircleCI](https://circleci.com/gh/zWingz/react-image/tree/master.svg?style=svg)](https://circleci.com/gh/zWingz/react-image/tree/master) [![codecov](https://codecov.io/gh/zWingz/react-image/branch/master/graph/badge.svg)](https://codecov.io/gh/zWingz/react-image)

[DEMO](http://zwing.site/react-image/#/)

[![Edit v3r46pjql0](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/v3r46pjql0)

## Image

- Auto show the `loading` or `error` status of `img`
- Can be previewed by Component `Preview`
- Group by props `group`
- Loadable by used `IntersectionObserver`

| Props     | Desc                                         | Type           | Default |
| --------- | -------------------------------------------- | -------------- | ------- |
| style     | --                                           | Object         |         |
| className | --                                           | String         |         |
| width     | --                                           | Number, String | 100     |
| height    | --                                           | Number, String | initial |
| src       | --                                           | String         |         |
| onClick   | --                                           | Function       |         |
| mask      | mask style when img hover                    | Boolean        | true    |
| group     | groupId, used to preview image in same group | String         | default |
| objectFit | img object-fit style                         | String         | cover   |
| imgProps  | img props                                    | Object         |         |
| preview   | can be previewed                             | Boolean        | true    |
| onDelete  | delete icon callback                         | Function       |         |
| onError   | img onerror callback                         | Function       |         |
| onLoad    | img onload callback                          | Function       |         |

### Example

```jsx
<Image src='1.jpg'/>
<Image src='1.jpg' style={{margin: '10px'}}/>
<Image src='1.jpg' width='120' height='120'/>
<Image src='1.jpg' objectFit='contains'/>
<Image src='1.jpg' imgProps={{alt: 'test', className: 'my-img-class'}}/>
<Image src='1.jpg' group='my-img-group-1'/> // PreviewApi/preview('1.jpg', [ /* group-img-list */ ])
```

## PreviewApi

| Func    | Desc                | Params                                                        |
| ------- | ------------------- | ------------------------------------------------------------- |
| preview | preview a image     | image: imgSrc or image index of list, list:Array: Images List |
| show    | open the previewer  |                                                               |
| hide    | close the previewer |                                                               |
| destroy | destroy the ins     |                                                               |

### Demo

#### preview a single image

```javascript
PreviewApi.preview('1.jpg')
```

#### preivew an image in list

```javascript
const list = ['1.jpg', '2.jpg', '3.jpg']
// use index
PreviewApi.preview(2, list)
// or use src
PreviewApi.preview('2.jpg', list)
```
