import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {useGlobalContext} from '~/provider'
import {Divider, Empty, GStatusBar, HeaderWhite, SuperLoading} from '~/common/components'
import {Colors, Icon, windowWidth} from 'green-native-ts'
import {fonts} from '~/configs'
import GreenAvatar from '~/common/components/Avatar'

const Students = () => {
  const {user, childrens, is, getMyChildrens} = useGlobalContext()

  const [refreshing, setRefreshing] = React.useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  if (!is.parent) {
    return <></>
  }

  async function onRefresh() {
    setRefreshing(true)
    await getMyChildrens()
    setRefreshing(false)
  }

  const t = {
    Address: null,
    AreaId: null,
    AreaName: null,
    Avatar: null,
    BankAccountName: null,
    BankAccountNumber: null,
    BankBranch: null,
    BankName: null,
    BranchIds: '11',
    CreatedBy: 'GDC ENGLISH',
    CreatedOn: '2023-12-07T09:44:04.063',
    CurrentClassName: 'FOUND 39',
    CurrentSchool: null,
    DOB: null,
    DistrictId: null,
    DistrictName: null,
    Email: 'phuonganh1@gmail.com',
    Enable: true,
    Extension: null,
    FullName: 'Lê Thị Phương Anh',
    Gender: 2,
    JobId: null,
    LearningNeedId: null,
    LearningNeedName: null,
    LearningStatus: 6,
    LearningStatusName: 'Học xong',
    Mobile: '0842996635',
    ModifiedBy: 'GDC ENGLISH',
    ModifiedOn: '2023-12-07T09:44:36.79',
    ParentId: 1846,
    PurposeId: null,
    PurposeName: null,
    RoleId: 3,
    RoleName: 'Học viên',
    SaleId: 1448,
    SaleName: 'DƯƠNG THỊ LÝ',
    SourceId: null,
    SourceName: null,
    StatusId: 0,
    UserCode: 'HV2312070010',
    UserInformationId: 1845,
    UserName: 'ANHLTP',
    WardId: null,
    WardName: null,
  }

  return (
    <>
      <GStatusBar.Dark />
      <HeaderWhite>Danh sách học viên</HeaderWhite>

      <FlatList
        key="students"
        data={childrens || []}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item}: {item: IUser & {CurrentClassName?: string}}) => (
          <TouchableOpacity key={`st-${item?.UserInformationId}`} activeOpacity={1} style={styles.folderItem}>
            <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
              <GreenAvatar source={item?.Avatar} />

              <View style={{flex: 1, marginLeft: 8, alignItems: 'flex-start'}}>
                <Text numberOfLines={1} style={{fontSize: 14, fontFamily: fonts.Bold, color: '#000'}}>
                  {item?.FullName}
                </Text>
                <View
                  style={{
                    backgroundColor: '#1E88E5',
                    paddingHorizontal: 6,
                    paddingVertical: 1,
                    borderRadius: 99,
                    paddingBottom: 1.5,
                    marginTop: 4,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 12,
                      fontFamily: fonts.Bold,
                      color: '#fff',
                    }}>
                    {item?.UserCode}
                  </Text>
                </View>
              </View>
            </View>

            <Divider marginVertical={16} />

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text numberOfLines={1} style={{fontSize: 14, fontFamily: fonts.Regular, color: '#000'}}>
                Tên đăng nhập:
              </Text>
              <Text numberOfLines={1} style={{fontSize: 14, fontFamily: fonts.Bold, color: '#000'}}>
                {item?.UserName}
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 8, alignItems: 'center', justifyContent: 'space-between'}}>
              <Text numberOfLines={1} style={{fontSize: 14, fontFamily: fonts.Regular, color: '#000'}}>
                Điện thoại:
              </Text>
              <Text numberOfLines={1} style={{fontSize: 14, fontFamily: fonts.Bold, color: '#000'}}>
                {item?.Mobile}
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 8, alignItems: 'center', justifyContent: 'space-between'}}>
              <Text numberOfLines={1} style={{fontSize: 14, fontFamily: fonts.Regular, color: '#000'}}>
                Email:
              </Text>
              <Text numberOfLines={1} style={{fontSize: 14, fontFamily: fonts.Bold, color: '#000'}}>
                {item?.Email}
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 8, alignItems: 'center', justifyContent: 'space-between'}}>
              <Text numberOfLines={1} style={{fontSize: 14, fontFamily: fonts.Regular, color: '#000'}}>
                Lớp đang học:
              </Text>
              <Text numberOfLines={1} style={{fontSize: 14, fontFamily: fonts.Bold, color: '#000'}}>
                {item?.CurrentClassName || 'Chưa đăng ký học'}
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 8, alignItems: 'center', justifyContent: 'space-between'}}>
              <Text numberOfLines={1} style={{fontSize: 14, fontFamily: fonts.Regular, color: '#000'}}>
                Tư vấn viên:
              </Text>
              <Text numberOfLines={1} style={{fontSize: 14, fontFamily: fonts.Bold, color: '#000'}}>
                {item?.SaleName}
              </Text>
            </View>

            {/* <Icon name="arrow-forward-ios" type="materialicons" size={16} color={Colors.trans40} /> */}
          </TouchableOpacity>
        )}
        keyExtractor={(item: any) => {
          return item?.Id
        }}
        ListEmptyComponent={<Empty />}
        ListFooterComponent={<View style={{height: 16}} />}
      />

      <SuperLoading loading={loading} />
    </>
  )
}

export default Students

const styles = StyleSheet.create({
  folderItem: {
    width: windowWidth - 32,
    marginLeft: 16,
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
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
    marginTop: 4,
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 999,
  },
})
