import { PureComponent } from 'react'
import { handleError, isString, isFunction } from 'lib/util'

class ImageLoader extends PureComponent<TProps, TState> {
  image: any = null // eslint-disable-line react/sort-comp

  constructor(props) {
    super(props)
    const { image: src } = props
    this.state = {
      src,
      isLoading: false,
      isError: false,
    }
  }

  componentDidMount() {
    const { image, placeholder } = this.props
    this.handleLoadImage(image, placeholder)
  }

  componentWillReceiveProps(nextProps) {
    const { image: nextImage } = nextProps
    const { image: prevImage, placeholder } = this.props
    const shouldLoadImage = this.shouldLoadImage(prevImage, nextImage)
    if (shouldLoadImage) {
      this.handleLoadImage(nextImage, placeholder)
    }
  }

  componentWillUnmount() {
    this.clearImageLoader()
  }

  handleLoadImage = (image: string, placeholder?: string): boolean => {
    if (!isString(image)) {
      handleError('src must be a string')
      return false
    }
    this.clearImageLoader()
    this.setState({
      src: placeholder || image,
      loading: image,
      isLoading: true,
      isError: false,
    })
    this.createImageLoader(image)

    return true
  }

  shouldLoadImage = (
    prevImage: string,
    nextImage: string,
  ): boolean => prevImage !== nextImage

  handleOnLoad = () => {
    const src = this.image && this.image.src
    if (!src) {
      handleError('can not get image source')
      return false
    }
    this.setState({
      src, loading: null, isLoading: false, isError: false,
    })
    this.onCallback('onLoad')
    return true
  }

  onCallback = (type: string): boolean => {
    const { [type]: callback } = this.props
    if (!callback) return true
    if (!isFunction(callback)) {
      handleError(`${type} must be a function`)
      return false
    }
    callback(this.state)
    return true
  }

  handleOnError = () => {
    const state = { isLoading: false, isError: true }
    this.setState(state)
    this.onCallback('onError')
  }

  createImageLoader = (src: string) => {
    const image = new Image()
    this.image = image
    image.onload = this.handleOnLoad
    image.onerror = this.handleOnError
    image.src = src
  }

  clearImageLoader = () => {
    if (!this.image) return true
    this.image.onload = null
    this.image.onerror = null
    return true
  }

  renderChildren = () => {
    const { src, isLoading, isError } = this.state
    const { children } = this.props

    if (!isFunction(children)) {
      handleError('children must be a function')
      return children
    }

    return children({ src, isLoading, isError })
  }

  renderProps = (): any => {
    const { isLoading, isError } = this.state
    const {
      renderComponent,
      renderError,
      renderLoading,
    } = this.props

    if (isLoading) {
      if (!renderLoading) {
        handleError('renderLoading is not found')
        return null
      }
      return renderLoading(this.state)
    }

    if (isError) {
      if (!renderError) {
        handleError('renderError is not found')
        return null
      }
      return renderError(this.state)
    }

    if (!renderComponent) {
      handleError('renderComponent is not found')
      return null
    }
    return renderComponent(this.state)
  }

  render() {
    const { children } = this.props

    const shouldRenderProps = !children
    if (shouldRenderProps) return this.renderProps()

    return this.renderChildren()
  }
}

export default ImageLoader
