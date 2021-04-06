import React, { useState,useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Modal, TextInput, FlatList ,Alert} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native"
const IngredientList = props => {
    const [ingredients , setIngredients] = useState([]);
    const [label, setLabel] = useState('');
    const [value,setValue] = useState('');
    const [token, setToken] = useState();
    const [state, setState] = useState({
        ingredientViewState: false,
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
                        setIngredients(menuRes.data)

                    })
                })
                .catch((error) => console.log(error))

            return () => {
                setIngredients([]);
            }

        },
        [],
    )))
    const addItem = () => {
        console.log(value);
        if(label != "" && value != ""){
            const vara = {
                id:resId,
                label:label,
                value:value

            }
            console.log(vara);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            axios
                .post(`${baseURL}restaurant/ingredients`, vara, config)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "New Menu added",
                            text2: ""
                        });
                        setTimeout(() => {
                            props.navigation.navigate("IngredientList");
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
                <TouchableOpacity onPress={() => props.navigation.navigate('VariationList',{restId:restId})}><Text style={styles.pageButtonUnselect}>ปริมาณ</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('IngredientList',{restId:restId})}><Text style={styles.pageButton}>วัตถุดิบ</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('OptionList',{restId:restId})}><Text style={styles.pageButtonUnselect}>ท็อปปิ้ง</Text></TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 8 }}>
                <TouchableOpacity onPress={() => { setState({ ...state, ingredientViewState: true }) }} style={styles.AddFoodContainerTouch}><Text style={styles.AddFoodText}>+ เพิ่มวัตถุดิบ</Text></TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={[{ flex: .2, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>#</Text>
                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>รายการวัตถุดิบ</Text>
                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>ราคา(฿)</Text>
                <Text style={[{ flex: .2, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>แก้ไข</Text>
            </View>
            <ScrollView>

                <FlatList
                    data={ingredients.ingredient}

                    renderItem={({ item }) =>
                        <>
                            <View style={[{ flexDirection: 'row' }]}>
                                <Text style={[{ flex: .2, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>{(item._id.substring(21, 24))}</Text>
                                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>{item.label}</Text>
                                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>{item.value}</Text>
                                <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 10, borderRadius: 15, flex: .2 }}>
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

            <Modal transparent={true} visible={state.ingredientViewState}>
                <View style={styles.ModelBackground}>
                    <View style={styles.ModalContainer}>
                        <View>
                            <Text style={styles.titleText}>ชื่อวัตถุดิบ</Text>
                            <TextInput style={styles.TextInputVal} onChangeText={(val) => setLabel(val)}></TextInput>
                        </View>
                        <View style={{ marginBottom: 40 }}>
                            <Text style={styles.titleText}>ราคา</Text>
                            <TextInput keyboardType='numeric' style={styles.TextInputValPrices} onChangeText={(val) => setValue(val)}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                            <TouchableOpacity style={styles.touchContainer} onPress={() => { addItem(),setState({ ...state, ingredientViewState: false }) }}><Text style={styles.submitModalBtn}>เพิ่ม</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.touchBackContainer} onPress={() => { setState({ ...state, ingredientViewState: false }) }}><Text style={styles.cancelModalBtn}>ยกเลิก</Text></TouchableOpacity></View>
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

export default IngredientList