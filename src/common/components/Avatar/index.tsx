import {Image, ImageProps, ImageURISource, StyleSheet} from 'react-native'
import React, {FC, useEffect, useState} from 'react'
import {Colors} from 'green-native-ts'

type TGreenAvatar = {
  source: ImageURISource | string
  imageProps?: ImageProps
}

const GreenAvatar: FC<TGreenAvatar> = props => {
  const {source, imageProps} = props

  const [thisImage, setThisImage] = useState(null)

  useEffect(() => {
    getImageSource()
  }, [source])

  // TRUYỀN RỖNG THÌ HIỆN DEFAULT AVATAR
  function getImageSource() {
    if (!source) {
      setThisImage(require('./assets/default-avatar.png'))
    } else {
      if (typeof source == 'string') {
        setThisImage({uri: source})
      } else {
        setThisImage(source)
      }
    }
  }

  // KHI NÓ KHÔNG LOAD ĐƯỢC TẤM HÌNH THÌ NÓ HIỆN DEFAULT
  function handleError() {
    setThisImage(require('./assets/default-avatar.png'))
  }

  return (
    <>
      <Image
        {...imageProps}
        resizeMode={imageProps?.resizeMode || 'contain'}
        source={thisImage}
        onError={handleError}
        style={[styles.defaultImage, imageProps?.style || {}]}
      />
    </>
  )
}

export default GreenAvatar

const styles = StyleSheet.create({
  defaultImage: {
    width: 42,
    height: 42,
    borderWidth: 1,
    borderRadius: 9999,
    borderColor: Colors.trans10,
  },
})
