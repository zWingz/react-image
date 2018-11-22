import * as All from '..'
import Image from '../lib/Image'
import ImgPreview, { PreviewApi } from '../lib/ImgPreview'
describe('test export lib', () => {
  it('export Image', () => {
    expect(All.Image).toBe(Image)
  })
  it('export ImgPreview', () => {
    expect(All.Preview).toBe(ImgPreview)
  })
  it('export PreviewApi', () => {
    expect(All.PreviewApi).toBe(PreviewApi)
  })
})
