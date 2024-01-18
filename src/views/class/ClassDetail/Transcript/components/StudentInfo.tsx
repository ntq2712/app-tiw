import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {fonts} from '~/configs'
import GreenAvatar from '~/common/components/Avatar'
import {useGlobalContext} from '~/provider'
import {Divider} from '~/common/components'

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

const StudentInfo = (props: {scores: Array<TScore>; scoreColumns: Array<TScoreColumn>}) => {
  const {scores, scoreColumns} = props

  const {user, curChildren, is} = useGlobalContext()

  const theUser = is?.student ? user : curChildren

  function sortByIndexAscending(array) {
    return array.sort(function (a, b) {
      return a?.Index - b?.Index
    })
  }

  function getThisScore(studentId, columnId) {
    const thisIndex = scores.findIndex(score => score?.StudentId == studentId && score?.ScoreColumnId == columnId)

    if (thisIndex > -1) {
      return scores[thisIndex]
    }

    return null
  }

  return (
    <View style={[styles.container, {marginTop: 16}]}>
      <View style={{flexDirection: 'row', marginBottom: 8}}>
        <GreenAvatar source={user?.Avatar} />
        <View style={{marginLeft: 16, alignItems: 'flex-start'}}>
          <Text style={styles.studentName}>{theUser?.FullName}</Text>
          <View style={styles.tagCode}>
            <Text style={styles.textCode}>{theUser?.UserCode}</Text>
          </View>
        </View>
      </View>

      <Divider marginVertical={8} />

      <View style={{flexDirection: 'column'}}>
        {sortByIndexAscending(scoreColumns).map((score: TScoreColumn, sindex) => {
          if (score?.Type == 1 || score?.Type == 2) {
            return (
              <View key={`scol-${sindex}`} style={[styles.scoreContainer, {marginTop: 8}]}>
                <Text style={{color: '#000', fontFamily: fonts.Regular}}>{score?.Name}</Text>
                <Text
                  style={{
                    color: getThisScore(user?.UserInformationId, score?.Id)?.Value ? '#2196F3' : '#F44336',
                    fontFamily: fonts.Medium,
                  }}>
                  {getThisScore(user?.UserInformationId, score?.Id)?.Value || 'Chưa nhập'}
                </Text>
              </View>
            )
          }

          return <></>
        })}
      </View>
    </View>
  )
}

export default StudentInfo

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textCode: {fontSize: 12, color: '#fff', fontFamily: fonts.Medium},
  tagCode: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: '#2196F3',
    marginTop: 4,
  },
  studentName: {fontSize: 14, color: '#000', fontFamily: fonts.Medium},
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'column',
  },
})
