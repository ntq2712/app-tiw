import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import FileViewer from 'react-native-file-viewer'
import RNFS from 'react-native-fs'
import {
  addDownloadCompleteListener,
  addDownloadFailedListener,
  addDownloadProgressListener,
  startDownload,
} from '@ngenux/react-native-background-downloader'
import {Colors, Icon, windowWidth} from 'green-native-ts'
import {fonts} from '~/configs'
import {SuperLoading} from '~/common/components'

let downloading = null

const RenderFile = props => {
  const {index, file} = props

  const [downloadInfo, setDownLoadInfo] = useState(null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)

  function setDownloading(params) {
    downloading = params
  }

  useEffect(() => {
    if (progress == 100) {
      setDownloading(null)
      setProgress(0)
    }
  }, [progress])

  useEffect(() => {
    // Add a download progress listener
    addDownloadProgressListener((event: any) => {
      setProgress(parseInt(event.progress, 10))
    })

    // Add a download complete listener
    addDownloadCompleteListener(event => {
      if (downloading?.Id == file?.Id) {
        setProgress(parseInt(event.progress, 10))
        setDownLoadInfo(prev => ({
          ...prev,
          downloadLocation: `file://${event.downloadLocation}`,
        }))
      }
    })

    // Add a download failed listener
    addDownloadFailedListener(event => {
      console.log('Download failed:', event)
    })
  }, [])

  const handleStartDownload = async file => {
    try {
      const info = await startDownload(file?.FileUrl, `gdc-${file?.FileName}`)

      setDownLoadInfo(info)
    } catch (error) {
      console.error('Error starting download:', error)
    }
  }

  function getUrlExtension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim()
  }

  async function downloadAndOpen(file) {
    const extension = getUrlExtension(file?.FileUrl)

    if (extension == 'mp4' || extension == 'mp3' || extension == 'mov') {
      const localFile = `${RNFS.DocumentDirectoryPath}/gdc-${file?.FileName}`

      RNFS.exists(localFile)
        .then(exists => {
          if (exists) {
            setDownLoadInfo({downloadLocation: localFile})
          } else {
            setDownloading(file)
            handleStartDownload(file)
          }
        })
        .catch(error => {
          console.error('Lỗi khi kiểm tra tệp:', error)
        })
    } else {
      const localFile = `${RNFS.DocumentDirectoryPath}/gdc-${file?.FileName}`

      RNFS.exists(localFile)
        .then(exists => {
          if (exists) {
            FileViewer.open(localFile).catch(error => {
              Alert.alert('Không thể mở', 'Không tìm thấy ứng dụng phù hợp để mở')
            })
          } else {
            const options = {
              fromUrl: file?.FileUrl,
              toFile: localFile,
            }

            RNFS.downloadFile(options)
              .promise.then(() => FileViewer.open(localFile))
              .then(() => {})
              .catch(error => {
                Alert.alert('Không thể mở', 'Không tìm thấy ứng dụng phù hợp để mở')
              })
          }
        })
        .catch(error => {
          console.error('Lỗi khi kiểm tra tệp:', error)
        })
    }

    setLoading(false)
  }

  function isVideo() {
    const extension = getUrlExtension(file?.FileUrl)
    return extension == 'mp4' || extension == 'mp3' || extension == 'mov'
  }

  function handlePressItem() {
    setLoading(true)
    if (isVideo() && downloading?.Id != file?.Id && !downloadInfo?.downloadLocation) {
      downloadAndOpen(file)
      return
    }

    if (isVideo() && downloading?.Id != file?.Id && downloadInfo?.downloadLocation) {
      FileViewer.open(downloadInfo?.downloadLocation)

      setLoading(false)
      return
    }

    if (!isVideo()) {
      downloadAndOpen(file)
      return
    }
  }

  return (
    <TouchableOpacity
      key={`folder-${file?.Id}`}
      onPress={handlePressItem}
      activeOpacity={0.7}
      style={styles.folderItem}>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <Text numberOfLines={1} style={styles.textFileName}>
          {file?.FileName || file?.FileUrl}
        </Text>

        <View style={{flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
          <View style={[styles.numfilesContainer, {backgroundColor: !!file?.FileType ? '#1E88E5' : '#E57373'}]}>
            <Text style={styles.textNumFiles}>{file?.FileType?.toUpperCase() || 0}</Text>
          </View>

          {downloading?.Id == file?.Id && (
            <Text style={{fontSize: 14, marginLeft: 8, color: '#000', fontFamily: fonts.Semibold}}>{progress}%</Text>
          )}
        </View>
      </View>

      {!!file?.FileType ? (
        <Icon name="arrow-forward-ios" type="materialicons" size={16} color={Colors.trans40} />
      ) : (
        <></>
      )}

      <SuperLoading loading={loading} />
    </TouchableOpacity>
  )
}

export default RenderFile

const styles = StyleSheet.create({
  folderItem: {
    width: windowWidth - 32,
    marginLeft: 16,
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFileName: {
    color: '#000',
    fontFamily: fonts.Medium,
    fontSize: 16,
  },
  textNumFiles: {
    color: '#fff',
    fontFamily: fonts.Bold,
    fontSize: 14,
    marginTop: -1,
  },
  numfilesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 999,
  },
})
