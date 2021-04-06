import React, { useState, useCallback, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthGlobal from '../Context/Store/AuthGlobal'
import baseUrl from '../../assets/common/baseUrl';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { colors } from 'react-native-elements';
const RestaurantHome = props => {
  const context = useContext(AuthGlobal);
  const [restaurantId, setRestaurantId] = useState(context.stateUser.user.userId);
  const [rest, setRest] = useState([]);
  const [resId, setResId] = useState('')

  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === undefined || context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("LoginHome")
    } else {

      AsyncStorage.getItem("jwt").then((res) => {

        axios.get(`${baseUrl}restaurant/${restaurantId}`, {
          headers: { Authorization: `Bearer ${res}` },
        }).then((op) => {
          setRest(op.data)
        }).catch((error) => { console.log(error); })
      })

    }

    return () => {
      setRest([])
      setRestaurantId('');
    }
  }, [restaurantId])

  useEffect(() => {
    if (rest.restaurants !== undefined)
      setResId(rest.restaurants._id)
    return () => {
      setResId('')
    }
  }, [rest.restaurants])


  return (
    <View style={styles.container}>
      <View style={{ marginTop: '5%' }}>
        <View style={styles.textInline}>
          <Text style={styles.restNameTitle}>ร้าน</Text>
          <Text style={styles.restNameValue}> {rest.restaurants == undefined ? "โหลดข้อมูล" : Object.values(rest.restaurants.restaurant_name)}</Text>
        </View>
        <View style={styles.textInline}>
          <Text style={styles.statusTitle}>สถานะ</Text>
          <Text style={styles.statusValue}> {rest.restaurants == undefined ? <Text style={{ color: '#000' }}>โหลดข้อมูล</Text> : (rest.restaurants.approve_status == "Approve" ? <Text style={{ color: 'green' }}>ผ่านการอนุมัติ</Text> : <Text style={{ color: 'red' }}>ยังไม่ได้รับการอนุมัติ</Text>)}</Text>
        </View>
      </View>

      <View style={styles.toolsFlex}>
        <View style={styles.toolCard}>
          <TouchableOpacity onPress={() => props.navigation.navigate('MenuList', { resId, resId })}>
            <View style={styles.touchAlign}>
              <MaterialIcons name="restaurant" size={60} color="black" />
              <View style={styles.textContainer}><Text style={styles.toolText}>รายการอาหาร</Text></View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.toolCard}>
          <TouchableOpacity onPress={() => props.navigation.navigate('OrderMain', { resId, resId })}>
            <View style={styles.touchAlign}>
              <MaterialCommunityIcons name="room-service" size={60} color="black" />
              <View style={styles.textContainer}><Text style={styles.toolText}>ออเดอร์ลูกค้า</Text></View>
            </View>
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.toolsFlex}>
        <View style={styles.toolCard}>
          <TouchableOpacity onPress={() => props.navigation.navigate('AnalyticMain', { resId, resId })}>
            <View style={styles.touchAlignSpecial}>
              <MaterialIcons name="assessment" size={80} color="black" />
              <View style={styles.textContainer}><Text style={styles.toolText}>ดูสถิติของร้าน</Text></View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.toolCard}>
          <TouchableOpacity onPress={() => props.navigation.navigate('HistoryMain', { resId, resId })}>
            <View style={styles.touchAlign}>
              <MaterialIcons name="history" size={60} color="black" />
              <View style={styles.textContainer}><Text style={styles.toolText}>ประวัติออเดอร์</Text></View>
            </View>
          </TouchableOpacity>
        </View>
      </View>


    </View >
  );
}


const styles = StyleSheet.create({
  container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF', },

  toolsFlex: { width: '100%', flex: 1, flexDirection: 'row', backgroundColor: '#FFF', justifyContent: 'space-around', marginVertical: 30 },
  toolCard: { justifyContent: 'center', backgroundColor: '#FFF', width: '40%', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, },

  touchAlign: { alignItems: 'center', backgroundColor: '#FFF', height: '100%', justifyContent: 'space-between', paddingTop: '30%', borderRadius: 15 },
  touchAlignSpecial: { alignItems: 'center', backgroundColor: '#fff', height: '100%', justifyContent: 'space-between', paddingTop: '25%', borderRadius: 15 },
  toolText: { fontFamily: 'pr-reg', fontSize: 16, textAlign: 'center', paddingVertical: 10, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, width: '100%' },
  textContainer: { backgroundColor: '#FFFC1B', width: '100%', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 },
  textInline: { flexDirection: 'row' },
  statusValue: { marginLeft: 5, fontFamily: 'pr-reg', color: 'green' },
  restNameValue: { marginLeft: 5, fontFamily: 'pr-reg', fontSize: 18, },
  restNameTitle: { fontFamily: 'pr-reg', fontSize: 18 },
  statusTitle: { fontFamily: 'pr-reg' }

});

export default RestaurantHome;
