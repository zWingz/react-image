# A React Image Component
[![CircleCI](https://circleci.com/gh/zWingz/react-image/tree/master.svg?style=svg)](https://circleci.com/gh/zWingz/react-image/tree/master)

[DEMO](http://zwing.site/react-image/#/)

## Image

- Auto show the `loading` or `error` status of `img`
- Can be previewed by Component `Preview`
- Group by props `group`
- Loadable by used `IntersectionObserver`

|    Props    | Desc |  Type  | Default |
| ---------- | --- | ------ | ---------- |
| style  |  component Style  | Object |  |
| className | component ClassName | String |  |
| width | component width | Number, String | 100 |
| height | component height | Number, String | initial |
| group | groupId, used by previewer | String | default |
| src | image src | String |  |
| objectFit | Image object-fit style | String | cover |
| imgProps | Image self props | Object |  |
| preview | Can it be previewed | Boolean | true |
| onDelete | onDelete callback | Function |  |
| onClick | onClick callback | Function |  |
| onError | Image onErrer callback | Function |  |
| onLoad | Image onLoad callback | Function |  |

### Example

```jsx
<Image src='1.jpg'/>
<Image src='1.jpg' style={{margin: '10px'}}/>
<Image src='1.jpg' width='120' height='120'/>
<Image src='1.jpg' objectFit='contains'/>
<Image src='1.jpg' imgProps={{alt: 'test', className: 'my-img-class'}}/>
<Image group='my-img-group-1'/>
```


## Previewer

|    Func    | Desc |  Params  |
| ---------- | --- | ------ |
| preview|  preview a image  | image: imgSrc or image index of list, list:Array: Images List |
| show |  open the previewer |  |
| hide |  close the previewer |  |
| destroy |  destroy the ins |  |

### Example

#### preview a single image

```javascript
PreviewApi.preview('1.jpg')
```

#### preivew a image in list

```javascript
const list = ['1.jpg', '2.jpg', '3.jpg']
// use index
PreviewApi.preview(2, list)
// or use src
PreviewApi.preview('2.jpg', list)

```
