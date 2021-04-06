import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tutorial = props => {

    return (

        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.CardContainer}>
                    <View style={{ width: '100%', alignItems: 'center', marginBottom: 8, backgroundColor: '#FFF', borderBottomLeftRadius: 48, borderBottomRightRadius: 48, paddingBottom: 32, paddingTop: 24, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, marginTop: -24 }}>
                        <Text style={styles.howtotext}>วิธีการสั่งอาหาร</Text>
                        <View style={{ flexDirection: 'row' }}><MaterialCommunityIcons name="help-circle" color={'#000'} size={24} style={{ marginRight: 8 }} /><Text style={styles.howtosubtext}>How to</Text></View>
                    </View>
                    <View style={styles.titlecover}>
                        <View style={styles.titlebg}><Text style={styles.titleH1Tutorial}>1 เข้าสู่ระบบ</Text></View>
                        <Text style={styles.detailTutorial}>ที่หน้าหลักมุมบนขวาของหน้าจอกดเข้าสู่ระบบเพื่อใช้งาน</Text>
                    </View>

                    <View style={styles.titlecover}>
                        <View style={styles.titlebg}><Text style={styles.titleH1Tutorial}>2 เลือกเมนูอาหาร</Text></View>
                        <MaterialCommunityIcons name="food-fork-drink" size={80} color="black" style={{ marginVertical: 8, marginLeft: 32 }} />
                        <Text style={styles.detailTutorial}>เลือกเมนูที่สนใจทำการเลือกสิ่งที่ต้องการ</Text>
                    </View>

                    <View style={styles.titlecover}>
                        <View style={styles.titlebg}><Text style={styles.titleH1Tutorial}>3 ยืนยันรายการ</Text></View>
                        <Text style={styles.detailTutorial}>ทำการยืนยันอาหารที่ต้องการสั่ง</Text>
                    </View>

                    <View style={styles.titlecover}>
                        <View style={styles.titlebg}><Text style={styles.titleH1Tutorial}>4 ตรวจสอบสถานะ</Text></View>
                        <Text style={styles.detailTutorial}>ตรวจสอบสถานะของรายการที่สั่งได้ที่แถบเมนูด้านล่าง"สถานะออเดอร์"</Text>
                    </View>

                    <View style={styles.titlecover}>
                        <View style={styles.titlebg}><Text style={styles.titleH1Tutorial}>5 รับอาหาร</Text></View>
                        <Text style={styles.detailTutorial}>เมื่อสถานะการทำอาหารเสร็จแล้วสามารถไปรับอาหารและทำการชำระเงินที่หน้าร้านอาหาร</Text>
                    </View>

                </View>

            </ScrollView>
        </View >

    );

}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
    CardContainer: { flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center', margin: 24, width: 376, backgroundColor: "#FFF", shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, paddingBottom: 48, borderRadius: 16 },

    howtotext: { fontSize: 24, fontFamily: 'pr-reg' },
    howtosubtext: { fontSize: 16, fontFamily: 'pr-reg', },


    titlecover: { marginVertical: 16, width: '100%' },
    titlebg: { flexDirection: 'row', borderTopEndRadius: 48, borderBottomEndRadius: 48, backgroundColor: '#FFFEB8', width: 216, paddingVertical: 16, paddingHorizontal: 32, marginBottom: 16 },
    titleH1Tutorial: { fontFamily: 'pr-reg', fontSize: 16, },
    detailTutorial: { fontFamily: 'pr-reg', fontSize: 16, color: '#A7A7A7', paddingHorizontal: 32 },
});


export default Tutorial