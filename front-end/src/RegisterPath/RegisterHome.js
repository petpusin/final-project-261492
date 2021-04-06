import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ModeTitle from './ModeTitle'


const LoginMode = props => {
  console.log(Dimensions.get('window').width * .325)
  return (

    < View style={styles.container} >
      <ScrollView style={styles.ScrollContainer} horizontal={false}>
        <ModeTitle />
        <View style={styles.login__mode__layout}>
          <View style={Dimensions.get('window').width < Dimensions.get('window').height ? styles.mode_space : styles.mode_space2}  >
            <TouchableOpacity style={styles.TouchScale} onPress={() => props.navigation.navigate('RegisterForCustomer')}>
              <View style={{ alignItems: 'center' }}>
                <Image style={{ width: 120, height: 120, marginTop: 16 }} source={require('../../assets/login/customer_mode_logo.png')}></Image>
              </View>
              <View style={styles.alignText}><Text style={styles.TextinBox}>บัญชีผู้ใช้งาน</Text></View>
            </TouchableOpacity>
          </View>
          <View style={Dimensions.get('window').width < Dimensions.get('window').height ? styles.mode_space : styles.mode_space2}  >
            <TouchableOpacity style={styles.TouchScale} onPress={() => props.navigation.navigate('RegisterForRestaurant')}>
              <View style={{ alignItems: 'center' }}>
                <Image style={{ width: 120, height: 120, marginTop: 16 }} source={require('../../assets/login/restaurant_mode_logo.png')}></Image>
              </View>
              <View style={styles.alignText}><Text style={styles.TextinBox}>บัญชีร้านอาหาร</Text></View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </View >

  );
}


const styles = StyleSheet.create({
  container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
  ScrollContainer: { backgroundColor: '#FFF', width: '100%' },

  login__mode__layout: { width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FFF', marginBottom: 40 },
  mode_space: { height: 216, width: 168, alignItems: 'center', backgroundColor: '#FFF', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 3, elevation: 3, shadowOpacity: 0.26, padding: 1, borderRadius: 16 },
  mode_space2: { height: 280, width: 128, alignItems: 'center', backgroundColor: '#FFF', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 3, elevation: 3, shadowOpacity: 0.26, padding: 1, borderRadius: 16 },
  TouchScale: { backgroundColor: '#FFF', width: '100%', height: '100%', borderRadius: 16 },

  TextinBox: { fontFamily: 'pr-light', fontSize: 16 },
  alignText: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  img_mode: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});

export default LoginMode;
