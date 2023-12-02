import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {fonts} from '~/configs'
import {Colors, parseMoney} from 'green-native-ts'
import moment from 'moment'

function FirstInfo({detail, router}) {
  return (
    <View style={[styles.container, {flexDirection: 'column'}]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          resizeMode="contain"
          source={
            router?.params?.Thumbnail ? {uri: router?.params?.Thumbnail} : require('~/assets/images/default-class.png')
          }
          style={styles.thumbnail}
        />

        <View style={styles.main}>
          <View style={{flexDirection: 'row'}}>
            <Text numberOfLines={2} style={styles.name}>
              {router?.params?.Name}
            </Text>
          </View>

          <View style={{width: '100%', backgroundColor: '#A4A4A433', height: 1, marginVertical: 8}} />

          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <View
              style={{
                paddingHorizontal: 8,
                paddingTop: 2,
                paddingBottom: 4,
                borderRadius: 999,
                backgroundColor:
                  router?.params?.Status == 2 ? '#2196F3' : router?.params?.Status == 1 ? '#4CAF50' : '#E53935',
              }}>
              <Text style={{fontFamily: fonts.Semibold, color: '#fff'}}>{router?.params?.StatusName}</Text>
            </View>

            <View
              style={{
                paddingHorizontal: 8,
                paddingTop: 2,
                paddingBottom: 4,
                borderRadius: 999,
                marginLeft: 8,
                backgroundColor: router?.params?.Type == 1 ? '#E91E63' : '#009688',
              }}>
              <Text style={{fontFamily: fonts.Semibold, color: '#fff'}}>{router?.params?.TypeName}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <Image
                resizeMode="contain"
                source={require('~/assets/icons/users.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={styles.textInfo}>
                {router?.params?.TotalStudent}/{router?.params?.MaxQuantity}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                source={require('~/assets/icons/notebook.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={styles.textInfo}>
                {router?.params?.LessonCompleted}/{router?.params?.TotalLesson}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{width: '100%', backgroundColor: '#A4A4A433', height: 1, marginVertical: 16}} />

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
        <View
          style={{
            paddingHorizontal: 8,
            paddingTop: 2,
            paddingBottom: 4,
            borderRadius: 999,
            backgroundColor: '#F06292',
          }}>
          <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#fff'}}>
            Giá: {parseMoney(detail?.Price)}
          </Text>
        </View>

        <Text style={{fontFamily: fonts.Semibold, color: '#000', fontSize: 12}}>
          {moment(detail?.StartDay).format('DD/MM/YYYY')} - {moment(detail?.EndDay).format('DD/MM/YYYY')}
        </Text>
      </View>
    </View>
  )
}

function TeachersInfo({detail, router}) {
  return (
    <>
      {router?.params?.Teachers && (
        <View style={[styles.container, {marginTop: 16, flexDirection: 'column'}]}>
          <Text style={[styles.name, {fontSize: 15}]}>Giáo viên</Text>
          {router?.params?.Teachers.map(teacher => {
            return (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.trans10,
                  padding: 8,
                  paddingHorizontal: 10,
                  marginTop: 10,
                  borderRadius: 8,
                }}>
                <Text style={[styles.name, {color: '#2196F3', fontSize: 14}]}>{teacher?.TeacherName}</Text>
                <Text style={{fontFamily: fonts.Regular, fontSize: 14, color: '#0B1B19', marginTop: 4}}>
                  Mã: {teacher?.TeacherCode}
                </Text>
              </View>
            )
          })}
        </View>
      )}
    </>
  )
}

const Info = ({detail, router}) => {
  return (
    <>
      <FirstInfo router={router} detail={detail} />

      <View style={[styles.container, {marginTop: 16}]}>
        <View style={[styles.main, {marginLeft: 0}]}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.name, {fontSize: 14}]}>Trung tâm: {router?.params?.BranchName}</Text>
          </View>

          <View style={{width: '100%', backgroundColor: '#A4A4A433', height: 1, marginVertical: 8}} />

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.name, {fontSize: 14}]}>Chương trình: {router?.params?.ProgramName}</Text>
          </View>

          <View style={{width: '100%', backgroundColor: '#A4A4A433', height: 1, marginVertical: 8}} />

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.name, {fontSize: 14}]}>Giáo trình: {router?.params?.CurriculumName}</Text>
          </View>

          <View style={{width: '100%', backgroundColor: '#A4A4A433', height: 1, marginVertical: 8}} />

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.name, {fontSize: 14}]}>Học vụ: {router?.params?.AcademicName}</Text>
          </View>
        </View>
      </View>

      <TeachersInfo router={router} detail={detail} />
    </>
  )
}

export default Info

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
  },
  name: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#0B1B19',
    flex: 1,
  },
  thumbnail: {
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    width: 90,
    height: 90,
  },
  textInfo: {
    fontFamily: fonts.Medium,
    color: '#000',
    fontSize: 14,
    marginLeft: 8,
    marginTop: -2,
  },
  main: {flex: 1, marginLeft: 16, alignItems: 'flex-start'},
})
