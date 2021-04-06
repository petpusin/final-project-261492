import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

class PromotionRestaurant extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.imgBorder} source={this.props.imageUri}></Image>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 3,


  },
  imgContainer: {


    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    shadowOpacity: 0.26,
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 20,
    padding: 1


  },
  imgBorder: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderRadius: 20,
  },
});

export default PromotionRestaurant;
