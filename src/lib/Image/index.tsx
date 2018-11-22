import * as React from 'react'
import * as PropTypes from 'prop-types'
import { RefObject, createRef, ImgHTMLAttributes, CSSProperties, PureComponent } from 'react'
import './style.scss'
import LoadingIcon from '../LoadingIcon'
import { CanUseIntersecion, observe, unobserve } from './observer'
import { PreviewApi } from '../ImgPreview'
import ErrorIcon from '../ErrorIcon'
import { ObjectFitProperty } from 'csstype'

export type iImageProp = {
  src: string;
  height?: string | number;
  width?: string | number;
  style?: CSSProperties;
  group?: string | number;
  objectFit?: ObjectFitProperty;
  preview?: boolean;
  imgProps?: ImgHTMLAttributes<any>;
  mask?: boolean;
  onClick?: Function;
  onError?: (src: string) => void;
  onLoad?: (src: string) => void;
  onDelete?: (src: string) => void;
  alt?: string;
  className?: string;
  observer?: IntersectionObserver;
}

export default class ReactImage extends PureComponent<iImageProp> {

  get style(): CSSProperties {
    const { height, width } = this.props
    return {
      width: width + 'px',
      height: height ? height + 'px' : 'initial',
      ...this.props.style
    }
  }

  get imgStyle(): CSSProperties {
    const { isLoading, isError } = this.state
    const ret = {
      objectFit: this.props.objectFit
    }
    const { imgProps } = this.props
    if (imgProps && imgProps.style) {
      Object.assign(ret, imgProps.style)
    }
    Object.assign(ret, {
      display: isLoading || isError ? 'none' : ''
    })
    return ret
  }
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
    /** show mask when hover */
    mask: PropTypes.bool,
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
    preview: true,
    mask: true
  }
  refDom: RefObject<HTMLDivElement> = null

  state = {
    isError: false,
    isLoading: true,
    loadObserve: !CanUseIntersecion() // IntersecintObserver, 监听图片是否出现在viewport
  }

  constructor(p) {
    super(p)
    this.refDom = createRef()
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
      isLoading: false,
      isError: false
    })
    onLoad && onLoad(src)
  }
  onDelete = () => {
    this.props.onDelete(this.props.src)
  }
  onClickHandler = () => {
    const { isLoading, isError } = this.state
    const { src, group, preview, onClick } = this.props
    if (preview && src && !isLoading && !isError) {
      const dom: NodeListOf<HTMLImageElement> = document.querySelectorAll(
        `.mask-img[data-img-group="${group}"]`
      )
      const list = Array.from(dom).map(each => each.dataset.imgSrc)
      PreviewApi.preview(src, list)
    }
    onClick && onClick(src)
  }

  componentDidMount() {
    // pushToGroup(this.props.group, this.props.src)
    observe(
      this.refDom.current,
      () => {
        this.setState({
          loadObserve: true
        })
      },
      this.props.observer
    )
  }

  componentWillUnmount() {
    if (!this.state.loadObserve) {
      unobserve(this.refDom.current, this.props.observer)
    }
  }

  render() {
    // const { width, height } = this.props
    const {
      group,
      imgProps,
      onDelete,
      src,
      height,
      preview,
      className,
      mask
    } = this.props
    const { isLoading, loadObserve, isError } = this.state

    return (
      <span
        className={['mask-img', mask ? 'mask' : '', className].join(' ')}
        data-img-group={preview ? group : null}
        data-img-src={preview ? src : null}
        style={this.style}
        ref={this.refDom}
      >
        {onDelete ? (
          <span className='delete-img'>
            <i
              className='react-image-icon'
              style={{ display: 'inline-block' }}
              onClick={this.onDelete}
            >
              &#xe904;
            </i>
          </span>
        ) : null}
        {loadObserve && (
          <img
            {...imgProps}
            src={src}
            onError={this.onError}
            onLoad={this.onLoad}
            onClick={this.onClickHandler}
            style={this.imgStyle}
          />
        )}
        {isLoading && (
          <div
            className='mask-loading'
            style={{ minHeight: `${height || 100}px` }}
          >
            <LoadingIcon size='sm' />
          </div>
        )}
        {isError && <ErrorIcon style={{ width: '100%', height: '100%' }} />}
      </span>
    )
  }
}
