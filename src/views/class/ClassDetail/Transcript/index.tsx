import {View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {HeaderWhite, SuperLoading} from '~/common/components'
import {useRoute} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import {ClassInfo, MoreInfo, StudentInfo} from './components'

type TScore = TApiAuth & {
  ClassId: number
  ScoreColumnId: number
  StudentId: number
  TranscriptId: number
  Value: string
}

type TScoreColumn = TApiAuth & {
  ClassId: number
  Factor: number
  Index: number
  Name: string
  Type: number
  TypeName: string
}

const Transcript = () => {
  const router: any = useRoute()

  const [thisExam, setThisExam] = useState<TClassExam>(null)
  const [thisClass, setThisClass] = useState<TClassDetail>(null)

  const [scores, setScores] = useState<Array<TScore>>([])
  const [scoreColumns, setScoreColumns] = useState<Array<TScoreColumn>>([])

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (router?.params?.exam) {
      setThisExam(router?.params?.exam)
    }

    if (router?.params?.classDetail) {
      setThisClass(router?.params?.classDetail)
    }

    if (router?.params?.class && router?.params?.exam) {
      getScoreColumns(router?.params?.class)
      getScores(router?.params?.class, router?.params?.exam?.Id)
    }
  }, [router])

  // LẤY DANH SÁCH ĐIỂM ĐÃ CHẤM
  async function getScoreColumns(classId) {
    setLoading(true)
    try {
      const res = await RestApi.get<TScoreColumn>('ScoreColumn', {
        classId: classId,
      })

      if (res.status == 200) {
        setScoreColumns(res.data.data)
      } else {
        setScoreColumns([])
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  // LẤY DANH SÁCH ĐIỂM ĐÃ CHẤM
  async function getScores(classId, transcriptId) {
    setLoading(true)
    try {
      const res = await RestApi.get<TScore>('Score', {
        classId: classId,
        transcriptId: transcriptId,
        pageSize: 999,
        pageIndex: 1,
      })

      if (res.status == 200) {
        setScores(res.data.data)
      } else {
        setScores([])
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <HeaderWhite>{thisExam?.Name}</HeaderWhite>

      <View style={{marginTop: 16}}>
        <ClassInfo detail={thisClass} />
      </View>

      <StudentInfo scores={scores} scoreColumns={scoreColumns} />

      <MoreInfo scores={scores} scoreColumns={scoreColumns} />

      <SuperLoading loading={loading} />
    </>
  )
}

export default Transcript
