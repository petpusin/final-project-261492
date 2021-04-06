import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class ModeTitle extends Component {

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.header__line1}>เลือก</Text>
        <Text style={styles.header__line2}>ประเภทของบัญชี</Text>
        <Text style={styles.header__line3}>เพื่อสร้างบัญชี</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { width: '100%', backgroundColor: '#FFFC1B', alignItems: 'center', justifyContent: 'center', marginVertical: 48, paddingVertical: 32, shadowOffset: { width: 0, height: 0 }, shadowColor: '#000', shadowOpacity: 0.1, elevation: 3, },
  header__line1: { color: '#000', fontSize: 32, fontFamily: 'pr-reg' },
  header__line2: { color: '#989762', fontSize: 18, fontFamily: 'pr-reg' },
  header__line3: { color: '#D2D18F', fontSize: 16, fontFamily: 'pr-reg' }
});

export default ModeTitle;