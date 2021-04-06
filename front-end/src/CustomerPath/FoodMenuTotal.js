import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image, TextInput } from 'react-native';

const FoodMenuTotal = props => {
    // console.log(500 / Dimensions.get('window').width + 380)
    return (

        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.CardContainer}>
                    <View><Image style={styles.imageTag} source={require('../../assets/restaurantlist/rest011182.jpg')}></Image></View>
                    <View><Text style={styles.MenuTitleText}>ข้าวผัด</Text></View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <Text style={styles.detailTextTitle}>ธรรมดา</Text>
                        <Text style={styles.detailTextPrice}>+ 30 ฿</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.detailTextTitle}>พิเศษ</Text>
                        <Text style={styles.detailTextPrice}>+ 40 ฿</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.detailTextTitle}>หมู</Text>
                        <Text style={styles.detailTextPrice}>+ 0 ฿</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.detailTextTitle}>ไก่</Text>
                        <Text style={styles.detailTextPrice}>+ 0 ฿</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.detailTextTitle}>กุ้ง</Text>
                        <Text style={styles.detailTextPrice}>+ 0 ฿</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.detailTextTitle}>ไข่ดาว</Text>
                        <Text style={styles.detailTextPrice}>+ 10 ฿</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.detailTextTitle}>ไข่เจียว</Text>
                        <Text style={styles.detailTextPrice}>+ 10 ฿</Text>
                    </View>

                    <TextInput> </TextInput>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.detailTotalTextTitle}>รวม</Text>
                        <Text style={styles.detailTextPrice}>30 ฿</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity><Text>ยืนยัน</Text></TouchableOpacity>
                        <TouchableOpacity><Text>ย้อนกลับ</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View >

    );

}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },

    CardContainer: { flexDirection: 'column', alignItems: 'center', alignSelf: 'center', margin: 24, width: 500 / Dimensions.get('window').width + 380, backgroundColor: "#FFF", shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, paddingVertical: 50 },
    imageTag: { width: 120, height: 120, },
    MenuTitleText: { fontFamily: 'pr-reg', color: '#000' },
    detailTextTitle: { fontFamily: 'pr-reg', color: '#6F6F6F' },
    detailTextPrice: { fontFamily: 'pr-reg', color: '#A7A7A7' },
    detailTotalTextTitle: { fontFamily: 'pr-reg', color: '#000' },
});


export default FoodMenuTotal