import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


class RecommendRestaurant extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageshadow}>
          <Image style={styles.imgBorder} source={{ uri: this.props.imageUri }}></Image>
        </View>
        <View>
          <Text style={{ fontFamily: 'pr-light', marginTop: 8 }}>ร้าน{this.props.resName}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { width: 144, borderRadius: 16, marginLeft: 16, marginRight: 8, },
  imgBorder: { height: 144, width: 144, borderRadius: 16 },
});

export default RecommendRestaurant;
