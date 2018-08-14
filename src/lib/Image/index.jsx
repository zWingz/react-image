import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import LoadingIcon from '../LoadingIcon'
import { CanUseIntersecion, observe, unobserve } from './observer'
import { PreviewApi } from '../ImgPreview'
import picNull from '../../assets/pic_null.png'
import picError from '../../assets/pic_loading_fail.png'
export default class ReactImage extends React.PureComponent {
  static propTypes = {
    /** Component Style */
    style: PropTypes.object,
    /** Component className */
    className: PropTypes.any,
    /** Number or String, default 100 */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Number or String, efult initial */
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Number or String, Image group id, used by ImagePreview */
    group: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Image src */
    src: PropTypes.string,
    /** Image style of object-fit, default cover */
    objectFit: PropTypes.string,
    /** Image other props, like: alt/className/style */
    imgProps: PropTypes.object,
    /** Can it be previewed  */
    preview: PropTypes.bool,
    /** onDelete callback, param: src, it will display an icon on right corner when hover */
    onDelete: PropTypes.func,
    /** Image onError callback, param: src */
    onError: PropTypes.func,
    /** Image onLoad callback, param: src */
    onLoad: PropTypes.func,
    /** Image onClick onClick, param: src */
    onClick: PropTypes.func
  }

  static defaultProps = {
    width: 100,
    group: 'default',
    objectFit: 'cover',
    preview: true
  }

  constructor() {
    super()
    this.refDom = React.createRef()
  }

  state = {
    isError: false,
    isLoading: true,
    loadObserve: !CanUseIntersecion // InterseciontObserver, 监听图片是否出现在viewport
  }

  get url() {
    const { src } = this.props
    return src === ''
      ? picNull
      : this.state.isError
        ? picError
        : src
  }

  get style() {
    const { height, width } = this.props
    return {
      width: width + 'px',
      height: height ? height + 'px' : 'initial',
      ...this.props.style
    }
  }

  get imgStyle() {
    const ret = {
      objectFit: this.props.objectFit
    }
    const { imgProps } = this.props
    if(imgProps && imgProps.style) {
      Object.assign(ret, imgProps.style)
    }
    Object.assign(ret, {
      display: this.state.isLoading ? 'none' : ''
    })
    return ret
  }

  onError = () => {
    const { onError, src } = this.props
    this.setState({
      isLoading: false,
      isError: true
    })
    onError && onError(src)
  }

  onLoad = () => {
    const { onLoad, src } = this.props
    this.setState({
      isLoading: false
    })
    onLoad && onLoad(src)
  }

  onClickHandler = () => {
    const { isLoading, isError } = this.state
    const {
      src, group, preview, onClick
    } = this.props
    if(preview && src && !isLoading && !isError) {
      const dom = document.querySelectorAll(`.mask-img[data-img-group="${group}"]`)
      const list = Array.from(dom).map(each => each.dataset.imgSrc)
      PreviewApi.preview(src, list)
    }
    onClick && onClick(src)
  }

  componentDidMount() {
    // pushToGroup(this.props.group, this.props.src)
    observe(this.refDom.current, () => {
      this.setState({
        loadObserve: true
      })
    })
  }

  componentWillUnmount() {
    unobserve(this.refDom.current)
  }

  render() {
    // const { width, height } = this.props
    const {
      group, imgProps, onDelete, src
    } = this.props
    const { isLoading, loadObserve } = this.state

    return (
      <span
        className={['mask-img', this.props.className].join(
          ' '
        )}
        data-img-group={group}
        data-img-src={this.url}
        style={this.style}
        ref={this.refDom}
      >
        {this.props.onDelete ? (
          <span className="delete-img">
            <i className="react-image-icon" style={{display: 'inline-block'}} onClick={() => onDelete(src)}>
              &#xe904;
            </i>
          </span>
        ) : null}
        {loadObserve && (
          <img
            {...imgProps}
            src={this.url}
            onError={this.onError}
            onLoad={this.onLoad}
            onClick={this.onClickHandler}
            style={this.imgStyle}
          />
        )}
        {isLoading && (
          <div className="mask-loading">
            <LoadingIcon size="sm" />
            <span className="mask-loading-text">Loading</span>
          </div>
        )}
      </span>
    )
  }
}
