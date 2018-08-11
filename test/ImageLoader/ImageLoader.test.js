/** eslint-disable */

import React from 'react'
import { mount, shallow } from 'enzyme'
import ImageLoader from 'components/ImageLoader'

const data = {
  placeholder: 'http://res.cloudinary.com/lh-imagecloud/image/upload/c_scale,w_25/v1515930477/Mesh-Triangles-Surface-Colorful-Angular-WallpapersByte-com-3840x2400_kfsxmi.jpg',
  image: 'http://res.cloudinary.com/lh-imagecloud/image/upload/v1515930477/Mesh-Triangles-Surface-Colorful-Angular-WallpapersByte-com-3840x2400_kfsxmi.jpg',
}

describe('ImageLoader', () => {
  const Component = () => (
    <ImageLoader placeholder={data.placeholder} image={data.image}>
      {({ src }) => <img src={src} alt="ImageLoader example" />}
    </ImageLoader>
  )

  it('render component', () => {
    const component = mount(<Component />)
    expect(component.find('img[src][alt]').length).toEqual(1)
  })

  it('real-image in server-side', () => {
    const result = `<img src="${data.image}" alt="ImageLoader example"/>`
    expect(shallow(<Component />).html()).toEqual(result)
  })

  it('placeholder image while loading', () => {
    const component = mount(<Component />)
    expect(component.find('img').props().src).toEqual(data.placeholder)
  })
})
