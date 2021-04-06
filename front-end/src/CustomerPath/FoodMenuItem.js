import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { connect } from "react-redux";
import * as action from "../../store/action/cartAction";
const FoodMenuEdit = props => {
    return (

        <View style={styles.container}>
            <View style={styles.YellowTab}></View>
            <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', }}>
                <Image style={styles.ImageContainer} source={{ uri: props.imageUri }}></Image>
                <View style={{ flexDirection: 'column', width: 140 }}>
                    <View><Text style={styles.MenuTitleText}>{props.menuTitle}</Text></View>
                    <View><Text style={styles.MenuCountText}>{props.cartItem.quantity}</Text></View>
                </View>
            </View>
        </View>

    );

}
const mapStatetoProps = (state) => {
    const { cartItem } = state;
    return {
        cartItem: cartItem,
    }

};
const styles = StyleSheet.create({
    container: { backgroundColor: '#FFF', borderRadius: 15, width: '100%' },

    YellowTab: { height: 15, backgroundColor: '#FFFC1B', borderTopLeftRadius: 15, borderTopRightRadius: 15 },
    MenuTitleText: { fontFamily: 'pr-reg', fontSize: 18, marginLeft: 20 },
    MenuCountText: { fontFamily: 'pr-bold', fontSize: 16, marginLeft: 20, color: '#C4C4AF' },

    ImageContainer: { width: 120, height: 120, borderRadius: 15 }

});


export default connect(mapStatetoProps, null)(FoodMenuEdit)