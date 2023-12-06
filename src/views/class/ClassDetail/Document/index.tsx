import React, {useEffect, useState} from 'react'
import RestApi from '~/api/RestApi'
import DocumentItem from './DocumentItem'
import {requestMultiple, PERMISSIONS} from 'react-native-permissions'
import {isAndroid} from 'green-native-ts/src/function'
import Empty from '~/common/components/Empty'

const Document = ({detail, router, schedule, curStudent}) => {
  useEffect(() => {
    if (router) {
      getDocs()
    }
  }, [router])

  const [loading, setLoading] = useState<boolean>(true)

  const [data, setData] = useState<
    Array<{
      ClassId: number
      CompletePercent: number
      CreatedBy: string
      CreatedOn: string
      CurriculumId: number
      Enable: true
      Id: number
      IsComplete: boolean
      Lesson: any
      ModifiedBy: any
      ModifiedOn: any
      Name: string
      Time: any
    }>
  >([])

  async function getDocs() {
    setLoading(true)
    try {
      const res = await RestApi.getBy<any>('Class/curriculum-in-class', router?.params?.Id)

      if (res.status == 200) {
        getFolders(res.data.data[0]?.Id)
      }
    } catch (error) {}
  }

  async function getFolders(id) {
    setLoading(true)
    try {
      const res = await RestApi.get<any>('Class/curriculum-details-in-class', {CurriculumIdInClassId: id})
      if (res.status == 200) {
        setData(res.data.data)
      }
    } catch (error) {
    } finally {
      setLoading(false)
      if (isAndroid()) {
        requestMultiple([PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]).then(statuses => {
          console.log('- Quyền truy cập bộ nhớ: ', statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE])
        })
      }
    }
  }

  return (
    <>
      {data &&
        data.map((item, index) => {
          return <DocumentItem key={`docs-${index}`} item={item} index={index} />
        })}

      {!loading && data.length == 0 && <Empty />}
    </>
  )
}

export default Document
