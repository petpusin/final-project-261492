import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class NearRestaurant extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.imgBorder} source={{ uri: this.props.imageUri }}></Image>
        </View>
        <View>
          <Text style={{ fontFamily: 'pr-light', marginTop: 8 }}>{this.props.resName}</Text>

        </View>
        {/* <View>
          <Text style={{ fontFamily: 'pr-light', color: 'gray' }}>{this.props.distance}</Text>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { height: null, width: 144, marginLeft: 16, marginRight: 8, },
  imgContainer: { borderRadius: 16 },
  imgBorder: { height: 144, width: 144, borderRadius: 16 },
});

export default NearRestaurant;
