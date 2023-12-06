import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {fonts} from '~/configs'
import {Colors} from 'green-native-ts'
import RestApi from '~/api/RestApi'
import DocumentSubItem from './DocumentSubItem'
import SuperLoading from '~/common/components/SuperLoading'

const DocumentItem = ({index, item}) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  function toggle() {
    setVisible(!visible)
  }

  const [data, setData] = useState<
    Array<{
      CreatedBy: string
      CreatedOn: string
      CurriculumDetailId: number
      Enable: boolean
      FileCurriculumId: null
      FileName: string
      FileType: string
      FileUrl: string
      Id: number
      Index: number
      IsComplete: boolean
      IsHide: boolean
      ModifiedBy: string
      ModifiedOn: string
    }>
  >([])

  useEffect(() => {
    getFiles()
  }, [item])

  async function getFiles() {
    setLoading(true)
    try {
      const res = await RestApi.get<any>('Class/file-curriculum-in-class', {
        CurriculumDetailInClassId: item?.Id,
      })

      if (res.status == 200) {
        setData(res.data.data)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={[styles.container, {marginTop: index == 0 ? 0 : 16, flexDirection: 'column'}]}>
      <TouchableOpacity onPress={toggle} activeOpacity={0.7} style={styles.item}>
        <Text style={[styles.name, {fontSize: 16, color: '#009688'}]}>{item?.Name}</Text>
      </TouchableOpacity>

      {visible && (
        <>
          <View style={{width: '100%', backgroundColor: Colors.trans20, height: 1, marginVertical: 16}} />

          {data.map((file, index) => {
            return (
              <>
                <DocumentSubItem key={`file-${index}`} file={file} index={index} />
              </>
            )
          })}
        </>
      )}

      <SuperLoading loading={loading} />
    </View>
  )
}

export default DocumentItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    marginTop: -2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#0B1B19',
    flex: 1,
  },
})
