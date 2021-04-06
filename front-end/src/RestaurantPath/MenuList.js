import React, { useState, useCallback, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Image, FlatList } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
const MenuList = props => {
    
    const restId = props.route.params.resId;
    const [menuRest, setMenuRest] = useState([])
    const [token, setToken] = useState();
    useFocusEffect((useCallback(
        () => {
            AsyncStorage.getItem("jwt")
                .then((res) => {
                    setToken(res)
                    axios.get(`${baseURL}restaurant/menus/${restId}`, {
                        headers: { Authorization: `Bearer ${res}` }
                    }).then((menuRes) => {
                        setMenuRest(menuRes.data)

                    })
                })
                .catch((error) => console.log(error))

            return () => {
                setMenuRest([]);
            }

        },
        [],
    )))

    ;
    return (
        <View style={styles.Tablecontainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 30 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('MenuList')}><Text style={styles.pageButton}>เมนู</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('VariationList',{restId:restId})}><Text style={styles.pageButtonUnselect}>ปริมาณ</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('IngredientList',{restId:restId})}><Text style={styles.pageButtonUnselect}>วัตถุดิบ</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('OptionList',{restId:restId})}><Text style={styles.pageButtonUnselect}>ท็อปปิ้ง</Text></TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => props.navigation.navigate('MenuAdd',{resId : restId})} style={[styles.AddFoodContainerTouch, { alignSelf: 'center', marginVertical: 8 }]}><Text style={styles.AddFoodText}>+ เพิ่มเมนู</Text></TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={[{ flex: .2, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>#</Text>
                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>เมนู</Text>
                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>ประเภท</Text>
                <Text style={[{ flex: .3, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>ราคา(฿)</Text>
                <Text style={[{ flex: .2, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>แก้ไข</Text>

            </View>


            <ScrollView showsVerticalScrollIndicator={false}>


                <FlatList
                    data={menuRest.menus}

                    renderItem={({ item }) =>
                        <>
                            <View style={[{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }]}>
                                <Text style={[{ flex: .2, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>{(item._id).substring(21, 24)}</Text>
                                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>{item.menu_name}</Text>
                                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>{item.type_menu}</Text>
                                <Text style={[{ flex: .3, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>{item.price} ฿</Text>
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
        </View>
    );
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
    pageButtonUnselect: { fontFamily: 'pr-reg', fontSize: 16, color: '#ccc' }
});


export default MenuList