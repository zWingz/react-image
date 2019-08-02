import { ImgHTMLAttributes, CSSProperties, PureComponent } from 'react'
import { ObjectFitProperty } from 'csstype'

declare module '@zzwing/react-image' {
  export type iImageProp = {
    src: string
    height?: string | number
    width?: string | number
    style?: CSSProperties
    group?: string | number
    objectFit?: ObjectFitProperty
    preview?: boolean
    imgProps?: ImgHTMLAttributes<any>
    mask?: boolean
    onClick?: (src: string) => void
    onError?: (src: string) => void
    onLoad?: (src: string) => void
    onDelete?: (src: string) => void
    className?: string
    observer?: IntersectionObserver
    showPreviewList?: boolean
  }
  export class Image extends PureComponent<iImageProp> {}
  export interface PreviewInterface {
    (current: number | string, list?: string[], showList?: boolean): void
  }
  export interface PreviewInstance {
    preview: PreviewInterface
    show: () => void
    hide: () => void
    component: ImgPpreview
    destroy: () => void
  }
  export interface PreviewInstanceCallback {
    (Instance: PreviewInstance): void
  }
  export default class ImgPpreview extends PureComponent {
    static newInstance: (callback: PreviewInstanceCallback) => void
  }

  export const PreviewApi: {
    destroy: () => void
    preview: PreviewInterface
    show: () => void
    hide: () => void
  }
  export function createObserver(container?: HTMLElement): IntersectionObserver
}
