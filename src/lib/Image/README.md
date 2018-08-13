# 图片查看器

已注入到`React.Component.prototype`中

## 调用

```javascript
this.$imgPreview
```

## Api

|    func    | 说明 |  参数  |
| ---------- | --- | ------ |
| destroy |  销毁 |  |
| show |  打开 |  |
| hide |  关闭 |  |
| preview(img, list)|  预览图片, 如果提供list, 则会调用setList | img:[number,string,object], list: Array |

## 相关组件

已自动注入到`MaskImg`组件中.
