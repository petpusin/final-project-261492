import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Image, TextInput, Modal, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements'

import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-community/async-storage"
import baseURL from "../../assets/common/baseUrl"
import axios from "axios"
import mime from "mime";
import Toast from "react-native-toast-message";


const MenuAdd = props => {
    
    const [image, setImage] = useState(null);
    const [token, setToken] = useState();
    const [typemenu, setTypemenu] = useState([]);
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [describe, setDescribe] = useState();
    const [category, setCategory] = useState();
    const [restId, setResId] = useState(props.route.params.resId)
    const [menu, setMenu] = useState({
        name: '',
        type_menu: 'default',
        price: '',
        description: '',
        status: true
    });

    const [state, setState] = useState({
        edit: false,
        delete: false,
        variationAdd: false,
        ingredientAdd: false,
        optionAdd: false,
    })

    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error))

        axios
            .get(`${baseURL}typemenu`)
            .then((res) => setTypemenu(res.data))
            .catch((error) => alert("Error to load categories"));


        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        });
        return () => {
            setTypemenu([]);
        }
    }, []);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const checkBeforeNavigate = () => {

        if (image != null && name != '' && category != '' && price != '') {
            let formData = new FormData();

            const newImageUri = "file:///" + image.split("file:/").join("");
            formData.append("_id_res", restId)
            formData.append("menu_image", {
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split("/").pop()
            });
            formData.append("menu_name", name);
            formData.append("type_menu",category)
            formData.append("price", price);
            formData.append("describe", describe);
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }
            axios
                .post(`${baseURL}menu`, formData, config)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "New Menu added",
                            text2: ""
                        });
                        setTimeout(() => {
                            props.navigation.navigate("MenuList");
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                    })
                })


        } else {
            Alert.alert(
                //title
                'ไม่สามารถเพิ่มเมนูได้',
                //body
                'โปรดระบุข้อมูลให้ครบถ้วน',
                [
                    { text: 'ปิด' },
                ],
                { cancelable: false },
                //clicking out side of alert will not cancel

            )
        }

    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%', paddingHorizontal: 50 }} showsVerticalScrollIndicator={false}>
                {/* [1] โค้ดปุ่มเพิ่มรูป เมืออัพโหลดรูปรูปจะแสดงด้านใต้ของป่ม */}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.AddImageContainer}><TouchableOpacity style={styles.TouchImageContainer} onPress={pickImage}><Text style={styles.addImageText}>+ เพิ่มรูปเมนู</Text><Icon name="image"></Icon></TouchableOpacity></View>
                    {image && <Image source={{ uri: image }} style={{ width: 150, height: 150, marginTop: 20, borderRadius: 15 }} />}
                </View>
                {image === null ? <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}><Text style={{ fontFamily: 'pr-reg', fontSize: 12, color: 'red' }}>*ต้องการรูปเมนู</Text></View> : null}

                {/* [2] ชื่อเมนู */}
                <View><Text style={styles.MenuTitleText}>ชื่อเมนู</Text></View>
                <View><TextInput style={styles.TextInputVal} onChangeText={(val) => setName(val)}></TextInput></View>
                {name === '' ? <View style={{ width: '100%', marginTop: 10 }}><Text style={{ fontFamily: 'pr-reg', fontSize: 12, color: 'red' }}>*โปรดระบุ</Text></View> : null}

                {/* [3] ประเภทอาหาร เลือกเป็น dropdown */}
                <View><Text style={styles.MenuTitleText}>ประเภทอาหาร</Text></View>
                <DropDownPicker
                    items={typemenu}
                    defaultValue={menu.category}
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
                    onChangeItem={(item) => setCategory(item.value)}
                    labelStyle={{
                        fontFamily: 'pr-reg',
                        color: '#000'
                    }}
                    selectedLabelStyle={{
                        color: '#000'
                    }}
                />
                {category === 'default' ? <View style={{ width: '100%', marginTop: 10 }}><Text style={{ fontFamily: 'pr-reg', fontSize: 12, color: 'red' }}>*โปรดเลือก</Text></View> : null}

                {/* [4] ช่องกรอกราคา */}
                <View><Text style={styles.MenuTitleText}>ราคา (บาท)</Text></View>
                <View><TextInput keyboardType='numeric' onChangeText={(val) => setPrice(val)} style={styles.TextInputValPrices}></TextInput></View>
                {price === '' ? <View style={{ width: '100%', marginTop: 10 }}><Text style={{ fontFamily: 'pr-reg', fontSize: 12, color: 'red' }}>*โปรดระบุ</Text></View> : null}


                {/* เขียนเกี่ยวกับอาหารเพิ่มเติม หรืออาจจะเป็นข้อความแนะนำอาหาร ความพิเศษของเมนูนี้ */}
                <View><Text style={styles.MenuTitleText}>รายละเอียดเพิ่มเติม (อาหาร)</Text></View>
                <View><TextInput onChangeText={(val) => setDescribe(val)} style={{ textAlignVertical: 'top' }} numberOfLines={3} multiline={true} style={styles.TextInputValDesc}></TextInput></View>

                {/* สิ้นสุดการกรอกข้อมูล 1)ยืนยันข้อมูลทั้งหมดจะถูกเก็บเมื่อผ่านเงื่อนไข 2)ยกเลิก จะกลับไปหน้าเดิม */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 50 }}>
                    <View style={styles.submitBtn}><TouchableOpacity onPress={() => checkBeforeNavigate()}><Text style={styles.submitBtnText}>ยืนยัน</Text></TouchableOpacity></View>
                    <View style={styles.cancelBtn}><TouchableOpacity onPress={() => props.navigation.goBack()}><Text style={styles.CancelBtnText}>ยกเลิก</Text></TouchableOpacity></View>
                </View>

                {/* แสดงเมื่อกดปุ่มลบ ถังขยะ */}
                <Modal transparent={true} visible={state.delete}>
                    <View style={styles.ModelBackground}>
                        <View style={styles.ModalContainer}>

                            <View style={{ flexDirection: 'row', marginBottom: 30, justifyContent: 'center' }}><Text style={styles.CancelText}>คุณแน่ใจว่าต้องการลบวัตถุดิบนี้</Text></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={styles.TouchSubmitButton}><TouchableOpacity><Text style={styles.SubmitButtonTxt}>ยืนยัน</Text></TouchableOpacity></View>
                                <View style={styles.TouchCloseButton}><TouchableOpacity><Text style={styles.closeButtonTxt}>ปิด</Text></TouchableOpacity></View>
                            </View>
                        </View>
                    </View>
                </Modal>

            </ScrollView>

        </View >
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', },

    AddImageContainer: { backgroundColor: '#ccc', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1, padding: 10, marginTop: 30, borderRadius: 15, width: 150, height: 150, alignItems: 'center', justifyContent: 'center' },
    addImageText: { fontFamily: 'pr-reg', fontSize: Dimensions.get('window').height < 1000 ? 16 : 18, marginBottom: 5, textAlign: 'center' },
    TouchImageContainer: { width: 150, height: 150, justifyContent: 'center', borderRadius: 15 },

    MenuTitleText: { fontFamily: 'pr-reg', fontSize: Dimensions.get('window').height < 1000 ? 16 : 18, marginBottom: 10, marginTop: 20 },
    TextInputVal: { color: '#767676', backgroundColor: '#FFFFE3', borderRadius: 15, width: 250, fontFamily: 'pr-reg', fontSize: 14, paddingHorizontal: 20, paddingVertical: 10 },
    TextInputValPrices: { color: '#767676', backgroundColor: '#FFFFE3', borderRadius: 15, width: 100, fontFamily: 'pr-reg', fontSize: Dimensions.get('window').height < 1000 ? 14 : 16, padding: 10 },
    TextInputValDesc: { textAlignVertical: 'top', color: '#767676', backgroundColor: '#FFFFE3', borderRadius: 15, width: 300, height: 100, fontFamily: 'pr-reg', fontSize: 14, padding: 10 },

    DropDownContainer: { zIndex: 1, width: Dimensions.get('window').width * .5, marginVertical: 5, backgroundColor: '#FFF' },

    ValueTouchContainer: { width: 40, backgroundColor: '#EBEBEB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1, marginHorizontal: 5, borderRadius: 15 },
    ValueTouchBox: { padding: 5, },
    ingreTitleText: { fontFamily: 'pr-reg', color: '#757575', fontSize: Dimensions.get('window').height < 1000 ? 16 : 18, marginLeft: 10 },
    ingrePricesText: { fontFamily: 'pr-reg', color: '#757575', fontSize: Dimensions.get('window').height < 1000 ? 16 : 18, marginLeft: 30 },
    EditTouchContainer: { width: 50, backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1, borderRadius: 15, marginLeft: 'auto', marginRight: 16 },
    DeleteTouchContainer: { width: 50, backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1, borderRadius: 15 },

    AddTouchContainer: { width: 40, backgroundColor: '#EBEBEB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1, marginHorizontal: 5, borderRadius: 15, marginBottom: 20 },

    submitBtn: { width: 100, marginLeft: 50, backgroundColor: '#FFFC1B', padding: 10, width: 100, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1, borderRadius: 15 },
    submitBtnText: { textAlign: 'center', fontFamily: 'pr-reg', fontSize: Dimensions.get('window').height < 1000 ? 14 : 18, textAlign: 'center' },
    cancelBtn: { width: 80, marginRight: 50, backgroundColor: '#FFF', padding: 10, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 },
    CancelBtnText: { textAlign: 'center', fontFamily: 'pr-reg', fontSize: Dimensions.get('window').height < 1000 ? 14 : 16 },

    ModalContainer: { alignSelf: 'center', backgroundColor: '#fff', width: 350, padding: 40, borderRadius: 15, justifyContent: 'center', height: 220, marginTop: Dimensions.get('window').height > Dimensions.get('window').width ? '40%' : '10%' },
    ModelBackground: { backgroundColor: '#000000aa', flex: 1 },
    CancelText: { textAlign: 'center', fontFamily: 'pr-light', color: '#000', fontSize: Dimensions.get('window').height < 1000 ? 16 : 18, marginVertical: 10 },
    TouchBackButton: { borderRadius: 15, marginTop: 10, padding: 10, width: 80, alignSelf: 'center' },
    closeButtonTxt: { fontFamily: 'pr-reg', textAlign: 'center', fontSize: Dimensions.get('window').height < 1000 ? 14 : 16 },

    TouchSubmitButton: { backgroundColor: '#FFFC1B', borderRadius: 15, marginTop: 10, padding: 10, width: 100, alignSelf: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 },
    SubmitButtonTxt: { fontFamily: 'pr-reg', textAlign: 'center', fontSize: Dimensions.get('window').height < 1000 ? 14 : 16 },
    TouchCloseButton: { backgroundColor: '#FFF', borderRadius: 15, marginTop: 10, padding: 10, width: 80, alignSelf: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 }
});


export default MenuAdd