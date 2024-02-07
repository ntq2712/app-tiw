import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {fonts} from '~/configs'
import {useGlobalContext} from '~/provider'

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

const MoreInfo = (props: {scores: Array<TScore>; scoreColumns: Array<TScoreColumn>}) => {
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
    <>
      {sortByIndexAscending(scoreColumns).map((score: TScoreColumn, sindex) => {
        if (score?.Type != 1 && score?.Type != 2) {
          return (
            <View style={[styles.container, {marginTop: 16}]}>
              <View style={{flexDirection: 'column', marginTop: -8}}>
                <View
                  key={`scol-${sindex}`}
                  style={[styles.scoreContainer, {alignItems: 'flex-start', flexDirection: 'column', marginTop: 8}]}>
                  <Text style={{color: '#000', fontFamily: fonts.Semibold}}>{score?.Name}</Text>
                  <Text
                    style={{
                      color: getThisScore(theUser?.UserInformationId, score?.Id)?.Value ? '#2196F3' : '#F44336',
                      fontFamily: fonts.Regular,
                      marginTop: 8,
                    }}>
                    {getThisScore(theUser?.UserInformationId, score?.Id)?.Value || 'Chưa nhập'}
                  </Text>
                </View>
              </View>
            </View>
          )
        }

        return <></>
      })}
    </>
  )
}

export default MoreInfo

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'column',
  },
})
