import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Modal, TouchableOpacity, Dimensions, Image, Alert } from 'react-native';
import Slider from '@react-native-community/slider';

import HextagonIcon from '../Themes/HextagonIcon';
import ThumbSlider from '../../assets/register/ThumbSlider.png'
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import CheckBox from '@react-native-community/checkbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

const RegisterForCustomer = props => {


    const [conSenseState, setConsenseState] = useState(false);
    const [authSubmit, setAuthSubmit] = useState(false);
    const [user, setUser] = useState(
        {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            gender: '',
            age: '13',
            career: '',
            careerDetail: '',
            phonenumber: '',
            email: '',
            isValidUser: false,
            isValidPassword: false,
            isValidFirstname: false,
            isValidAge: false,
            isValidPhoneNumber: false,
            isValidEmail: false,
        }
    )
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const setMaleGender = () => { setUser({ ...user, gender: 'male' }) }
    const setFemaleGender = () => { setUser({ ...user, gender: 'female' }) }

    const usernameRecord = (userinput) => { { setUser({ ...user, username: userinput }) } }
    const passRecord = (userinput) => { setUser({ ...user, password: userinput }) }
    const firstnameRecord = (userinput) => { setUser({ ...user, firstname: userinput }) }
    const lastnameRecord = (userinput) => { setUser({ ...user, lastname: userinput }) }
    const ageRecord = (userinput) => { setUser({ ...user, age: userinput }) }
    const careerRecord = (userinput) => { setUser({ ...user, career: userinput }) }
    const careerDetailRecord = (userinput) => { setUser({ ...user, careerDetail: userinput }) }
    const phoneNumberRecord = (userinput) => { setUser({ ...user, phonenumber: userinput }) }
    const emailRecord = (userinput) => { setUser({ ...user, email: userinput }) }

    const openConsense = () => { setConsenseState(true) }
    const closeConsense = () => { setConsenseState(false) }

    const checkUsername = () => { if (user.username.trim().length >= 4 & user.username.trim().length <= 16) { setUser({ ...user, isValidUser: true }) } else { setUser({ ...user, isValidUser: false }) } }
    const checkPassword = () => { if (user.password.trim().length >= 6 & user.password.trim().length <= 16) { setUser({ ...user, isValidPassword: true }) } else { setUser({ ...user, isValidPassword: false }) } }
    const checkFirstname = () => { if (user.firstname.trim().length >= 1 & user.firstname.trim().length <= 16) { setUser({ ...user, isValidFirstname: true }) } else { setUser({ ...user, isValidFirstname: false }) } }
    const checkPhonenumber = () => { if (user.phonenumber.trim().length === 9 || user.phonenumber.trim().length === 10) { setUser({ ...user, isValidPhoneNumber: true }) } else { setUser({ ...user, isValidPhoneNumber: false }) } }
    const checkEmail = () => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

        if (expression.test(String(user.email).toLowerCase())) {
            setUser({ ...user, isValidEmail: true })
        } else { setUser({ ...user, isValidEmail: false }) }
    }
    const togcheckbox = (bool) => {
        setToggleCheckBox(bool)
        setAuthSubmit(bool)
    }

    const checkBeforeNavigate = () => {
        if (user.isValidUser & user.isValidPassword & user.gender != '' & user.career != '' & user.isValidPhoneNumber & user.isValidEmail && user.isValidFirstname) {
            let customer = {
                cus_firstname: user.firstname,
                cus_lastname: user.lastname,
                cus_age: user.age,
                cus_phone: user.phonenumber,
                cus_email: user.email,
                username: user.username,
                password: user.password,
                career: user.career,
                careerDetail: user.careerDetail
            }
            axios
                .post(`${baseURL}customer/register`, customer)
                .then((res) => {
                    if (res.status == 200) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Registration Succeeded",
                            text2: "Please Login into your account",
                        });
                        setTimeout(() => {
                            props.navigation.navigate('LoginHome')
                        }, 500)
                    }

                }).catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again",
                    });
                })

        }
        else {
            Alert.alert(
                //title
                'ไม่สามารถยืนยันได้',
                //body
                'โปรดระบุข้อมูลให้ครบถ้วน',
                [
                    { text: 'ปิด' },
                ],
                { cancelable: false },
                //clicking out side of alert will not cancel

            );
        }
    }

    return (

        <View style={styles.container}>
            <ScrollView horizontal={false} showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
                <View style={styles.FormContainerWrap}>
                    <View style={styles.RegisterTitle}><HextagonIcon /><Text style={styles.TitleText}>สร้างบัญชีใหม่</Text></View>
                    <View style={styles.FormContainer}><View style={{ flexDirection: 'row', alignItems: 'center' }}><MaterialCommunityIcons style={{ marginRight: 8, marginLeft: -8 }} name='account' size={24} /><Text style={styles.FormFillTitle}>กำหนดชื่อผู้ใช้</Text></View></View>
                    <View style={styles.FormContainer}><TextInput value={user.username} onChangeText={(value) => { usernameRecord(value.toLowerCase()) }} onEndEditing={() => checkUsername()} style={styles.FillFormText}></TextInput></View>
                    {user.isValidUser == true ? null : <View><Text style={styles.validText}>ระบุ 4 - 16 ตัวอักษร</Text></View>}
                    <View style={styles.FormContainer}><View style={{ flexDirection: 'row', alignItems: 'center' }}><FontAwesome name="lock" style={{ marginRight: 8 }} size={24} color="black" /><Text style={styles.FormFillTitle}>กำหนดรหัสผ่าน</Text></View></View>
                    <View style={styles.FormContainer}><TextInput value={user.password} onChangeText={(value) => passRecord(value)} onEndEditing={() => checkPassword()} secureTextEntry={true} style={styles.FillFormText}></TextInput></View>
                    {user.isValidPassword == true ? null : <View><Text style={styles.validText}>ระบุ 6 - 16 ตัวอักษร</Text></View>}
                    <View style={styles.FormContainer}><Text style={styles.FormFillTitle}>ชื่อจริง</Text></View>
                    <View style={styles.FormContainer}><TextInput value={user.firstname} onChangeText={(value) => firstnameRecord(value)} onEndEditing={() => checkFirstname()} style={styles.FillFormText}></TextInput></View>
                    {user.isValidFirstname == true ? null : <View><Text style={styles.validText}>*ระบุไม่เกิน 16 ตัวอักษร</Text></View>}
                    <View style={styles.FormContainer}><Text style={styles.FormFillTitle}>นามสกุล</Text></View>
                    <View style={styles.FormContainer}><TextInput value={user.lastname} onChangeText={(value) => lastnameRecord(value)} style={styles.FillFormText}></TextInput></View>
                    {/* Tag Text ชาย กับ หญิงจะไม่โผล่พร้อมกับ จะขึ้นตามที่เลือก 1 อัน */}
                    <View style={styles.FormContainerGenderTitle}><Text style={styles.FormFillTitleGen}>เพศ : </Text>{user.gender === '' ? <Text style={styles.genderTxt}>โปรดเลือก</Text> : (user.gender === 'male' ? <Text style={styles.genderTxt}>ชาย</Text> : <Text style={styles.genderTxt}>หญิง</Text>)}</View>
                    <View style={styles.GenderContainer}>
                        <TouchableOpacity onPress={() => setMaleGender()}><Image style={styles.genderBtn} source={require('../../assets/register/MaleBtn.png')}></Image></TouchableOpacity>
                        <TouchableOpacity onPress={() => setFemaleGender()}><Image style={styles.genderBtn} source={require('../../assets/register/FemaleBtn.png')}></Image></TouchableOpacity>
                    </View>
                    <View style={styles.FormContainerAgeTitle}><Text style={styles.FormFillTitle}>อายุ : </Text><Text style={styles.AgeText}>{user.age}</Text></View>
                    <View style={styles.FormContainer}>
                        <Slider
                            style={{ width: 200, height: 48 }}
                            minimumValue={13}
                            maximumValue={65}
                            thumbImage={ThumbSlider}
                            minimumTrackTintColor="#000"
                            maximumTrackTintColor="#616000"
                            onValueChange={(value) => ageRecord(value)}
                            step={1}
                            thumbTintColor="#FFFC1B"

                        />

                    </View>
                    <View style={styles.FormContainer}><Text style={styles.FormFillTitle}>อาชีพ</Text></View>


                    <DropDownPicker
                        items={[
                            { label: 'นักเรียน/นักศึกษา', value: 'student' },
                            { label: 'ฟรีแลนซ์', value: 'freelance' },
                            { label: 'รับราชการ', value: 'officer' },
                            { label: 'ค้าขาย', value: 'trade' },
                        ]}
                        defaultValue={user.career}
                        dropDownMaxHeight={300}
                        placeholder="โปรดระบุ"
                        containerStyle={{ height: 40, marginBottom: 16 }}
                        style={{
                            backgroundColor: '#fafafa',
                        }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => careerRecord(item.value)}
                        labelStyle={{
                            fontFamily: 'pr-reg',
                            color: '#000'
                        }}
                        selectedLabelStyle={{
                            color: '#000'
                        }}
                    />



                    {user.career == 'student' ?
                        <View>
                            <View style={styles.FormContainer}><Text style={styles.FormFillTitle}>สาขา/คณะที่เรียน</Text></View>
                            <View style={styles.FormContainer}><TextInput value={user.careerDetail} onChangeText={(value) => careerDetailRecord(value)} style={styles.FillFormText}></TextInput></View>
                        </View>
                        :
                        null
                    }
                    {user.career == 'officer' ?
                        <View>
                            <View style={styles.FormContainer}><Text style={styles.FormFillTitle}>สังกัด/หน่วยงาน</Text></View>
                            <View style={styles.FormContainer}><TextInput value={user.careerDetail} onChangeText={(value) => careerDetailRecord(value)} style={styles.FillFormText}></TextInput></View>
                        </View>
                        :
                        null
                    }

                    <View style={styles.FormContainer}><Text style={styles.FormFillTitle}>เบอร์โทรศัพท์</Text></View>
                    <View style={styles.FormContainer}><TextInput value={user.phonenumber} keyboardType='numeric' onChangeText={(value) => phoneNumberRecord(value)} onEndEditing={() => checkPhonenumber()} style={styles.FillFormText}></TextInput></View>
                    {user.isValidPhoneNumber == true ? null : <View><Text style={styles.validText}>*ระบุเบอร์ให้ถูกต้อง</Text></View>}
                    <View style={styles.FormContainer}><Text style={styles.FormFillTitle}>อีเมล</Text></View>
                    <View style={styles.FormContainer}><TextInput value={user.email} onChangeText={(value) => emailRecord(value)} onEndEditing={() => checkEmail()} style={styles.FillFormText}></TextInput></View>
                    {user.isValidEmail == true ? null : <View style={{ marginBottom: 20 }}><Text style={styles.validText}>ระบุอีเมลให้ถูกต้อง</Text></View>}
                    <TouchableOpacity onPress={() => openConsense()} style={styles.TouchReadButton}><Text style={styles.readforSubmit}>อ่านข้อตกลงเพื่อยอมรับ</Text></TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
                        {/* <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => togcheckbox(newValue)}
                        /> */}
                        {/* <Text style={styles.readedText}>ได้อ่านและยอมรับข้อตกลง</Text> */}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 50 }}>
                        {authSubmit == false ?
                            <View style={styles.SubmitContainer}><TouchableOpacity onPress={() => checkBeforeNavigate()}><Text style={styles.submitButton}>ยืนยัน</Text></TouchableOpacity></View>
                            :
                            <View style={styles.CantSubmitContainer}><Text style={styles.cantsubmitButton}>ยืนยัน</Text></View>
                        }
                        <View style={styles.CancelContainer}><TouchableOpacity onPress={() => props.navigation.goBack()}><Text style={styles.CancelButtonText}>ยกเลิก</Text></TouchableOpacity></View>
                    </View>
                </View>
                <Modal transparent={true} visible={conSenseState}>
                    <View style={styles.ModelBackground}>
                        <View style={styles.ModalContainer}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}><Text style={styles.consenseText}>ผู้ลงทะเบียนรับทราบยินยอมให้ผู้พัฒนานำข้อมูลทางสถิติไปใช้วิเคราะห์ในอนาคตได้</Text></View>
                            <View style={{ flexDirection: 'row', marginBottom: 30, flexWrap: 'wrap' }}><Text style={styles.consenseText}>ผู้พัฒนาจะไม่เผยแพร่ข้อมูลส่วนบุคคลในการระบุตัวตนของผู้ใช้งานได้ (พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562)</Text></View>
                            <View style={styles.CloseModalContainer}><TouchableOpacity style={{ width: '100%' }} onPress={() => closeConsense()}><Text style={styles.closeButtonTxt}>ปิด</Text></TouchableOpacity></View>
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', flex: 1, flexDirection: 'column' },
    FormContainerWrap: { flexDirection: 'column', alignSelf: 'center' },

    RegisterTitle: { flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row' },
    TitleText: { fontFamily: 'pr-bold', fontSize: 18, marginLeft: 8, marginVertical: 18 },

    FormContainer: { width: '100%', marginVertical: 8 },
    FormContainerGenderTitle: { width: '100%', marginVertical: 8, flexDirection: 'row' },
    GenderContainer: { width: '100%', marginVertical: 8, flexDirection: 'row' },
    genderBtn: { marginHorizontal: 8 },
    genderTxt: { fontFamily: 'pr-reg', alignItems: 'center', fontSize: 16, color: '#6C6B2B' },

    FormFillTitle: { fontFamily: 'pr-reg', fontSize: 16 },
    FillFormText: { fontFamily: 'pr-reg', color: '#838383', backgroundColor: '#FFFFE3', width: 220, paddingVertical: 5, paddingHorizontal: 18, borderRadius: 15, fontSize: 16 },
    FormContainerAgeTitle: { width: '100%', marginVertical: 6, flexDirection: 'row' },
    AgeFillInput: { fontFamily: 'pr-reg', color: '#838383', backgroundColor: '#FFFFE3', width: 100, paddingVertical: 5, paddingHorizontal: 18, borderRadius: 15, fontSize: 16 },
    AgeText: { fontFamily: 'pr-reg', alignItems: 'center', fontSize: 16, color: '#6C6B2B' },
    FormFillTitleGen: { fontFamily: 'pr-reg', fontSize: 16, marginRight: 5 },

    validText: { fontFamily: 'pr-reg', fontSize: 12, color: 'red', marginVertical: 8, marginLeft: 8 },

    ModalContainer: { alignSelf: 'center', width: '80%', backgroundColor: '#fff', margin: 30, padding: 40, borderRadius: 16, justifyContent: 'center', height: Dimensions.get('window').height > Dimensions.get('window').width ? '50%' : '60%', marginTop: Dimensions.get('window').height > Dimensions.get('window').width ? '40%' : '10%' },
    ModelBackground: { backgroundColor: '#000000aa', flex: 1 },
    consenseText: { fontFamily: 'pr-light', color: '#000', fontSize: 16, marginVertical: 10 },
    readedText: { fontFamily: 'pr-light', fontSize: 16 },

    SubmitContainer: { width: 88, borderRadius: 16, backgroundColor: '#FFFC1B', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 },
    CantSubmitContainer: { width: 88, borderRadius: 16, backgroundColor: '#ccc' },
    submitButton: { textAlign: 'center', fontFamily: 'pr-reg', padding: 8, color: '#000', alignSelf: 'center', borderRadius: 16, fontSize: 16 },
    cantsubmitButton: { textAlign: 'center', fontFamily: 'pr-reg', padding: 8, color: '#FFF', alignSelf: 'center', borderRadius: 16, fontSize: 16 },
    CancelContainer: { width: 80, borderRadius: 16, backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 },
    CancelButtonText: { textAlign: 'center', fontFamily: 'pr-reg', padding: 8, backgroundColor: '#FFF', color: '#000', alignSelf: 'center', borderRadius: 16, fontSize: 14 },


    TouchReadButton: { marginBottom: 8 },
    readforSubmit: { fontFamily: 'pr-bold', textAlign: 'center', fontSize: 18, marginTop: 18 },
    CloseModalContainer: { flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', borderRadius: 16, width: 96, backgroundColor: '#EBEBEB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 },
    closeButtonTxt: { textAlign: 'center', fontFamily: 'pr-reg', fontSize: 16, padding: 8 },

});



export default RegisterForCustomer