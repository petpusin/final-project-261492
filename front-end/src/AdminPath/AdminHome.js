import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const AdminHome = props => {

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%', marginTop: 40 }} showsVerticalScrollIndicator={false}>

                <TouchableOpacity style={styles.TouchBtn} onPress={() => props.navigation.navigate('RequestMain')}>
                    <View style={styles.InlineText}>
                        <MaterialIcons name="format-list-bulleted" size={20} color="black" style={{ marginRight: 8 }} />
                        <Text style={styles.mgRight}>ร้านอาหารที่ขอเข้าร่วม</Text>
                        <Text style={styles.chgFontRed}>4</Text>
                        <Text style={styles.mgLeft}>ร้าน</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchBtn} onPress={() => props.navigation.navigate('ListMain')}>
                    <View style={styles.InlineText}>
                        <MaterialIcons name="format-list-bulleted" size={20} color="black" style={{ marginRight: 8 }} />
                        <Text style={styles.mgRight}>รายชื่อร้านอาหารในระบบ</Text>
                        <Text style={styles.chgFontRed}>5</Text>
                        <Text style={styles.mgLeft}>ร้าน</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchBtn} onPress={() => props.navigation.navigate('ReportManagement')}>
                    <View style={styles.InlineText}>
                        <MaterialIcons name="report" size={20} color="black" style={{ marginRight: 8 }} />
                        <Text style={styles.mgRight}>คำร้องเรียน</Text>
                        <Text style={styles.chgFontRed}>2</Text>
                        <Text style={styles.mgLeft}>คำร้อง</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchBtn} onPress={() => props.navigation.navigate('CustomerList')}>
                    <View style={styles.InlineText}>
                        <FontAwesome5 name="user-cog" size={20} color="black" style={{ marginRight: 8 }} />
                        <Text style={styles.mgRight}>ผู้ใช้ Customer</Text>
                        <Text style={styles.chgFontRed}>2</Text>
                        <Text style={styles.mgLeft}>ผู้ใช้</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchBtn} onPress={() => props.navigation.navigate('RestList')}>
                    <View style={styles.InlineText}>
                        <FontAwesome5 name="user-cog" size={20} color="black" style={{ marginRight: 8 }} />
                        <Text style={styles.mgRight}>ผู้ใช้ Restaurant</Text>
                        <Text style={styles.chgFontRed}>2</Text>
                        <Text style={styles.mgLeft}>ผู้ใช้</Text>
                    </View>
                </TouchableOpacity>



            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, height: '100%', width: '100%', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', },

    toolCardContainer: { flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 15 },

    TouchBtn: { backgroundColor: '#FFF', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 3, elevation: 3, shadowOpacity: 0.26, borderRadius: 15, marginHorizontal: 60, marginVertical: 15 },
    imgalign: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF', width: '100%', marginVertical: 30 },
    ImgTag: { width: 100, height: 100 },

    InlineText: { width: '100%', flexDirection: 'row', backgroundColor: '#FFF', justifyContent: 'center', padding: 16, borderRadius: 15 },
    mgLeft: { marginLeft: '5%', fontFamily: 'pr-reg', fontSize: Dimensions.get('window').height * .021 },
    mgRight: { marginRight: '5%', fontFamily: 'pr-reg', fontSize: Dimensions.get('window').height * .021 },
    chgFontRed: { fontFamily: 'pr-reg', color: 'red', fontSize: Dimensions.get('window').height * .021 },
});

export default AdminHome