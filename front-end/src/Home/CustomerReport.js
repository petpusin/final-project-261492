import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image, TextInput } from 'react-native';
import AppContext from '../Context/AppContext'
import { Octicons } from '@expo/vector-icons';


const CustomerReport = props => {

    const { AuthLogin, setAuthLogin, database, setDatabase } = useContext(AppContext);

    return (

        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.CardContainer}>
                    <View style={styles.reportContainer}>
                        <Text style={styles.senderTitle}>ผู้ส่ง</Text>
                        <Text style={styles.senderValue}>{database.username}</Text>
                    </View>
                    <View style={styles.reportContainer}>
                        <Text style={styles.senderTitle}>ถึง</Text>
                        <Text style={styles.senderValueBlack}>ผู้ดูแลระบ</Text>
                    </View>

                    <View style={{ flexDirection: 'row', backgroundColor: '#FFF', width: '100%', paddingHorizontal: 40, marginTop: 20 }}>
                        <Text style={styles.headerTitle}>หัวเรื่อง</Text>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: '#FFF', width: '100%', paddingHorizontal: 40, marginTop: 5 }}>
                        <View style={{ width: '100%', borderRadius: 15 }}><TextInput style={styles.textinputcontainer}></TextInput></View>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: '#FFF', width: '100%', paddingHorizontal: 40, marginTop: 20 }}>
                        <Text style={styles.headerTitle}>รายละเอียด</Text>
                        <Octicons name="report" size={22} style={{ marginLeft: 5 }} color="black" />
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: '#FFF', width: '100%', paddingHorizontal: 40, marginTop: 5 }}>
                        <View style={{ width: '100%', borderRadius: 15 }}><TextInput multiline={true} numberOfLines={4} style={styles.textinputDetailcontainer}></TextInput></View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FFF', width: '100%', paddingHorizontal: 60, marginTop: 60 }}>
                        <TouchableOpacity style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1, borderRadius: 15, backgroundColor: '#FFFC1B', paddingHorizontal: 20, paddingVertical: 10 }}><View style={{ justifyContent: 'center' }}><Text style={styles.btnText}>ส่งคำร้อง</Text></View></TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1, borderRadius: 15, backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 10 }}><View style={{ justifyContent: 'center' }}><Text style={styles.btnText}>ยกเลิก</Text></View></TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
        </View >

    );

}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
    CardContainer: { flexDirection: 'column', alignItems: 'center', alignSelf: 'center', margin: 20, width: 500 / Dimensions.get('window').width + 380, backgroundColor: "#FFF", shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, paddingVertical: 50, borderRadius: 15 },
    reportContainer: { flexDirection: 'row', backgroundColor: '#FFF', width: '100%', paddingHorizontal: 40 },

    senderTitle: { fontFamily: 'pr-reg', fontSize: 16 },
    senderValue: { fontFamily: 'pr-reg', fontSize: 16, marginLeft: 5, color: '#838383' },
    senderValueBlack: { fontFamily: 'pr-reg', fontSize: 16, marginLeft: 5, color: '#000' },

    headerTitle: { fontFamily: 'pr-reg', fontSize: 16, alignSelf: 'center' },
    textinputcontainer: { width: 200, backgroundColor: '#FFFFE3', paddingVertical: 5, paddingHorizontal: 20, fontSize: 14 },
    textinputDetailcontainer: { width: '100%', backgroundColor: '#FFFFE3', paddingVertical: 10, paddingHorizontal: 20, fontSize: 14, textAlignVertical: 'top' },

    btnText: { fontSize: 14, fontFamily: 'pr-reg', }
});


export default CustomerReport