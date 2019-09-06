# react_carousel_comp 轮播 走马灯组件

### Install
```
yarn add react_carousel_comp_xujie
```
```
npm i react_carousel_comp_xujie
```
### demo
[demo](https://jyoketsu.github.io/react_carousel_comp/)
### Usage
```html
 <Carousel>
    {
        images.map((image, index) => (
            <ChildComp key={index} image={image} />
        ))
    }
</Carousel>
```

| 属性 Property | 说明 Description | 类型 Type | 默认值 Default |
| ------ | ------ | ------ | ------ |
| perNum | 显示子元素的个数 | number | 4 |
| autoPlay | 是否自动滚动 | boolean | false |
| style | 样式 | object | {width: '100%',height: '100%'} |
