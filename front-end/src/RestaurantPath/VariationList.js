import React, { useState, useCallback, useContext, useEffect }from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Modal, TextInput, FlatList ,Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native"
const VariationList = props => {
    const [variation , setVariation] = useState([]);
    const [label, setLabel] = useState('');
    const [value,setValue] = useState('');
    const [token, setToken] = useState();
    const [state, setState] = useState({
        variationViewState: false,
    })
    const restId = props.route.params.restId;
    const [resId ,setResId] = useState(props.route.params.restId);
    
    useFocusEffect((useCallback(
        () => {
            AsyncStorage.getItem("jwt")
                .then((res) => {
                    setToken(res)
                    axios.get(`${baseURL}restaurant/menus/${restId}`, {
                        headers: { Authorization: `Bearer ${res}` }
                    }).then((menuRes) => {
                        setVariation(menuRes.data)

                    })
                })
                .catch((error) => console.log(error))

            return () => {
                setVariation([]);
            }

        },
        [],
    )))
    const addItem = () => {
       
        if(label != "" && value != ""){
           
            const vara = {
                id:resId,
                label:label,
                value:value

            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            axios
                .post(`${baseURL}restaurant/varaitions`, vara, config)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "New Menu added",
                            text2: ""
                        });
                        setTimeout(() => {
                            props.navigation.navigate("VariationList");
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
            
        } else{
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
        <View style={styles.Tablecontainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 30 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('MenuList',{restId:restId})}><Text style={styles.pageButtonUnselect}>เมนู</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('VariationList',{restId:restId})}><Text style={styles.pageButton}>ปริมาณ</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('IngredientList',{restId:restId})}><Text style={styles.pageButtonUnselect}>วัตถุดิบ</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('OptionList',{restId:restId})}><Text style={styles.pageButtonUnselect}>ท็อปปิ้ง</Text></TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => setState({ ...state, variationViewState: true })} style={[styles.AddFoodContainerTouch, { alignSelf: 'center', marginVertical: 8 }]}><Text style={[styles.AddFoodText, { fontSize: 16 }]}>+ เพิ่ม</Text></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[{ flex: .2, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>#</Text>
                    <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>รายการปริมาณ</Text>
                    <Text style={[{ flex: .3, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>ราคา(฿)</Text>
                    <Text style={[{ flex: .2, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>แก้ไข</Text>
                </View>

                <FlatList
                    data={variation.varaition}

                    renderItem={({ item }) =>
                        <>
                            <View style={[{ width: '100%', flexDirection: 'row' }]}>
                                <Text style={[{ flex: .2, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>{(item._id).substring(21, 24)}</Text>
                                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>{item.label}</Text>
                                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>{item.value}</Text>
                                <TouchableOpacity style={{ alignItems: 'center', padding: 8, borderRadius: 16, flex: .2 }}>
                                    <MaterialIcons name="edit" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                    keyExtractor={item => item._id}

                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </ScrollView>

            {/* กล่องนี้จะแสดงหากมีการกดปุ่มเพิ่ม...เพื่อแอดค่า */}

            <Modal transparent={true} visible={state.variationViewState}>
                <View style={styles.ModelBackground}>
                    <View style={styles.ModalContainer}>
                        <View>
                            <Text style={styles.titleText}>ปริมาณ</Text>
                            <TextInput style={styles.TextInputVal} onChangeText={(val) => setLabel(val)}></TextInput>
                        </View>
                        <View style={{ marginBottom: 40 }}>
                            <Text style={styles.titleText}>ราคา</Text>
                            <TextInput keyboardType='numeric' style={styles.TextInputValPrices} onChangeText={(val) => setValue(val)}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                            <TouchableOpacity style={styles.touchContainer} onPress={() => { setState({ ...state, variationViewState: false }) ,addItem()}}><Text style={styles.submitModalBtn}>เพิ่ม</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.touchBackContainer} onPress={() => { setState({ ...state, variationViewState: false }) }}><Text style={styles.cancelModalBtn}>ยกเลิก</Text></TouchableOpacity></View>
                    </View>
                </View>
            </Modal>

        </View>
    )

}

const styles = StyleSheet.create({
    container: { flex: 1, height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', },

    AddFoodContainerTouch: { backgroundColor: '#F5F5F5', padding: 5, borderRadius: 15, width: Dimensions.get('window').width * 0.25 },
    AddFoodText: { fontFamily: 'pr-reg', textAlign: 'center' },

    Tablecontainer: { flex: 1, padding: 16, paddingTop: Dimensions.get('window').height * 0.05, backgroundColor: '#FFF', },
    head: { height: Dimensions.get('window').height * 0.15, backgroundColor: '#FFF' },
    text: { fontFamily: 'pr-reg', marginVertical: 15, fontSize: Dimensions.get('window').height * .018, textAlign: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#FFF', justifyContent: 'center', borderBottomColor: '#000', borderBottomWidth: .5, borderBottomColor: '#D3D2B3' },
    btn: { flexDirection: 'row', width: Dimensions.get('window').width * 0.18, height: Dimensions.get('window').height * 0.054, backgroundColor: '#F8F8D9', borderRadius: 15, justifyContent: 'center', padding: 5 },
    btnEdit: { width: 20, height: 20 },

    pageButton: { fontFamily: 'pr-reg', fontSize: 16 },
    pageButtonUnselect: { fontFamily: 'pr-reg', fontSize: 16, color: '#ccc' },

    titleText: { fontFamily: 'pr-reg', fontSize: 16, marginBottom: 10, marginTop: 20 },
    TextInputVal: { color: '#767676', backgroundColor: '#FFFFE3', borderRadius: 15, width: 250, fontFamily: 'pr-reg', fontSize: 14, paddingHorizontal: 20, paddingVertical: 10 },
    TextInputValPrices: { color: '#767676', backgroundColor: '#FFFFE3', borderRadius: 15, width: 100, fontFamily: 'pr-reg', fontSize: Dimensions.get('window').height < 1000 ? 14 : 16, padding: 10 },

    ModalContainer: { alignSelf: 'center', width: '80%', backgroundColor: '#fff', paddingHorizontal: 40, borderRadius: 15, justifyContent: 'center', height: 380, marginTop: 120 },
    ModelBackground: { backgroundColor: '#000000aa', flex: 1 },
    touchContainer: { backgroundColor: '#FFF', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 15, backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 },
    touchBackContainer: { backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 },
    submitModalBtn: { fontFamily: 'pr-reg', fontSize: 16 },
    cancelModalBtn: { fontFamily: 'pr-reg', fontSize: 16, color: 'grey' },

})

export default VariationList