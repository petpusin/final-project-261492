import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';


const ReportingDetail = props => {

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.CardContainer}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 40, width: '100%', marginBottom: 10 }}>
                        <Text style={styles.titleText}>หัวข้อ</Text><Text style={styles.titleTextValue}>อาหารไม่ตรงกับรูปภาพ</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 40, width: '100%' }}>
                        <Text style={styles.titleText}>ส่งจาก</Text><Text style={styles.titleTextValue}>cust01</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 40, width: '100%' }}>
                        <Text style={styles.titleText}>บทบาท</Text><Text style={styles.titleTextValue}>Customer</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 40, width: '100%', marginTop: 40 }}>
                        <Text style={styles.titleText}>ข้อความ</Text><Text style={styles.titleTextValue}>Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum</Text>
                    </View>
                </View>
            </ScrollView>
        </View >
    );
}


const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
    CardContainer: { flexDirection: 'column', alignItems: 'center', alignSelf: 'center', margin: 20, width: 500 / Dimensions.get('window').width + 380, backgroundColor: "#FFF", shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, paddingVertical: 50 },

    titleText: { fontFamily: 'pr-reg', fontSize: 16, marginRight: 16 },
    titleTextValue: { fontFamily: 'pr-reg', fontSize: 16, color: 'grey', flexShrink: 1 }

});


export default ReportingDetail