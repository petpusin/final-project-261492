import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const RequestCheck = props => {

    return (
        <View style={styles.container}>
            <ScrollView style={styles.ScrollContainer} horizontal={false}>
                <View style={styles.CardContainer}>

                    <View style={styles.ImgContainer}>
                        <Image
                            style={styles.ImgTag}
                            source={require('../../assets/restaurantlist/rest011182.jpg')}
                        />
                    </View>

                    <View style={styles.RestTitleRow}>
                        <Text style={styles.RestTxtBold}>ชื่อร้าน</Text>
                        <Text style={styles.RestTxtLight}>ร้านอาหาร1</Text>
                    </View>
                    <View style={styles.RestTitleRow}>
                        <Text style={styles.RestTxtBold}>ผู้ประกอบการ</Text>
                        <Text style={styles.RestTxtLight}>นายกอ ขายดี</Text>
                    </View>
                    <View style={styles.RestTitleRow}>
                        <Text style={styles.RestTxtBold}>ที่ตั้งร้าน</Text>
                        <Text style={styles.RestLocationTxt}>xxx/xx ซ.99 ม.99 อ. ขายดี จังหวัดเชียงใหม่ 50200</Text>
                    </View>
                    <Text style={styles.ContactTxt}>ช่องทางติดต่อ</Text>
                    <View style={styles.RestTitleRow}>
                        <Text style={styles.RestTxtBold}>เบอร์โทรศัพท์</Text>
                        <Text style={styles.RestTxtLight}>099-9999999</Text>
                    </View>
                    <View style={styles.RestTitleRow}>
                        <Text style={styles.RestTxtBold}>ไลน์</Text>
                        <Text style={styles.RestTxtLight}>rest1.line</Text>
                    </View>
                    <View style={styles.RestTitleRow}>
                        <Text style={styles.RestTxtBold}>อีเมล</Text>
                        <Text style={styles.RestTxtLight}>-</Text>
                    </View>
                    <View style={styles.RestTitleRow}>
                        <Text style={styles.RestTxtBold}>เฟสบุ๊ค</Text>
                        <Text style={styles.RestTxtLight}>restaurant1 delicious</Text>
                    </View>
                    <View style={styles.RestTitleRow}>
                        <Text style={styles.RestTxtBold}>เว็ปไซต์</Text>
                        <Text style={styles.RestTxtLight}>restaurant1@website.com</Text>
                    </View>

                    <View style={styles.commentContainer}>
                        <Text style={styles.commentTitleTxt}>ตอบกลับร้านอาหาร (ถ้ามี)</Text>
                        <TextInput style={styles.CommentInputArea} multiline={true} numberOfLines={3} ></TextInput>
                    </View>

                    <View style={styles.btnAlign}>
                        <TouchableOpacity style={styles.touchContainer}>
                            <View style={styles.btn}>
                                <AntDesign name="check" size={24} color="black" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchContainer}>
                            <View style={styles.btn2}>
                                <AntDesign name="close" size={24} color="red" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => props.navigation.goBack()}>
                            <View style={styles.btn3}>
                                <Text style={styles.btnText3}>ย้อนกลับ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },

    ScrollContainer: { width: Dimensions.get('window').width, backgroundColor: '#FFF' },
    CardContainer: { margin: 20, padding: 10, borderRadius: 15, elevation: 3, backgroundColor: '#FFF', shadowOffset: { width: 1, height: 1 }, shadowColor: '#333', shadowOpacity: .3, shadowRadius: 2 },

    ImgContainer: { flexDirection: 'row', justifyContent: 'center', borderWidth: 1, borderRadius: 15, borderColor: '#E7E7DB', alignSelf: 'center', marginBottom: 35 },
    ImgTag: { width: 200, height: 200, borderRadius: 15 },

    RestTitleRow: { marginHorizontal: 20, flex: 1, flexDirection: 'row', },
    RestTxtBold: { fontFamily: 'pr-reg', fontSize: 16, marginRight: 5, marginVertical: 5, color: '#969565' },
    RestTxtLight: { flex: 1, fontFamily: 'pr-reg', fontSize: 16, marginVertical: 5, color: '#4F4F4F' },
    RestLocationTxt: { flex: 1, fontFamily: 'pr-reg', fontSize: 16, marginVertical: 5, color: '#4F4F4F' },
    ContactTxt: { fontFamily: 'pr-bold', fontSize: 16, marginBottom: 10, marginVertical: 15, marginLeft: 20 },
    commentContainer: { marginTop: 50, marginHorizontal: 20, marginBottom: 20 },
    CommentInputArea: { width: '100%', backgroundColor: '#FFFFE3', paddingVertical: 10, paddingHorizontal: 20, fontSize: 14, textAlignVertical: 'top', marginVertical: 10 },
    commentTitleTxt: { fontFamily: 'pr-reg' },

    touchContainer: { backgroundColor: '#FFF', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 3, elevation: 3, shadowOpacity: 0.26, borderRadius: 15, justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 10 },
    btnAlign: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, marginHorizontal: 20 },
    btn: { justifyContent: 'center', },
    btnText: { textAlign: 'center', color: '#000', fontFamily: 'pr-reg', fontSize: 14 },
    btn2: { justifyContent: 'center' },
    btnText2: { textAlign: 'center', color: '#FFF', fontFamily: 'pr-reg', fontSize: 14 },
    btn3: { width: Dimensions.get('window').width * 0.2, height: Dimensions.get('window').height * 0.045, backgroundColor: '#FFF', borderRadius: 15, justifyContent: 'center', padding: 5, marginHorizontal: 8 },
    btnText3: { textAlign: 'center', color: '#000', fontFamily: 'pr-reg', fontSize: 14 },
});


export default RequestCheck