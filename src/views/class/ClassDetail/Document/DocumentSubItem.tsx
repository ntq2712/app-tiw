import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Colors, Icon} from 'green-native-ts'
import {colors, fonts} from '~/configs'
import FileViewer from 'react-native-file-viewer'
import RNFS from 'react-native-fs'
import {
  addDownloadCompleteListener,
  addDownloadFailedListener,
  addDownloadProgressListener,
  startDownload,
} from '@ngenux/react-native-background-downloader'

let downloading = null

const DocumentSubItem = props => {
  const {index, file} = props

  const [downloadInfo, setDownLoadInfo] = useState(null)
  const [progress, setProgress] = useState(0)

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
  }

  function isVideo() {
    const extension = getUrlExtension(file?.FileUrl)
    return extension == 'mp4' || extension == 'mp3' || extension == 'mov'
  }

  return (
    <View
      style={{
        backgroundColor: Colors.trans05,
        borderRadius: 8,
        marginTop: index == 0 ? 0 : 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}>
      <Text style={[styles.name, {fontSize: 16, color: '#000'}]}>{file?.FileName}</Text>

      {downloading?.Id == file?.Id && (
        <Text style={{fontSize: 14, color: '#000', fontFamily: fonts.Semibold}}>{progress}%</Text>
      )}

      {isVideo() && downloading?.Id != file?.Id && !downloadInfo?.downloadLocation && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => downloadAndOpen(file)}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 88,
            padding: 8,
            borderWidth: 1,
            borderColor: Colors.trans10,
            marginLeft: 16,
          }}>
          <Icon type="materialicons" name="file-download" color="#fff" />
        </TouchableOpacity>
      )}

      {isVideo() && downloading?.Id != file?.Id && downloadInfo?.downloadLocation && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => FileViewer.open(downloadInfo?.downloadLocation)}
          style={{
            backgroundColor: '#2196F3',
            borderRadius: 88,
            padding: 8,
            borderWidth: 1,
            borderColor: Colors.trans10,
            marginLeft: 16,
          }}>
          <Icon type="ionicons" name="eye" color="#fff" />
        </TouchableOpacity>
      )}

      {!isVideo() && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => downloadAndOpen(file)}
          style={{
            backgroundColor: '#2196F3',
            borderRadius: 88,
            padding: 8,
            borderWidth: 1,
            borderColor: Colors.trans10,
            marginLeft: 16,
          }}>
          <Icon type="ionicons" name="eye" color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default DocumentSubItem

const styles = StyleSheet.create({
  name: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#0B1B19',
    flex: 1,
  },
})
