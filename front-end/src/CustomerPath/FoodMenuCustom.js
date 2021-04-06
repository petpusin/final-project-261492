import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image, TextInput } from 'react-native';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import baseUrl from '../../assets/common/baseUrl';
import axios from "axios";

import { connect } from "react-redux";
import * as action from "../../store/action/cartAction";
import FoodMenuConfirm from './FoodMenuConfirm';
import { TouchableRipple } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthGlobal from "../Context/Store/AuthGlobal"
import AsyncStorage from "@react-native-community/async-storage";
const FoodMenuCustom = props => {

    const context = useContext(AuthGlobal);
    const [item, setItem] = useState(props.route.params);
    const [options, setOptions] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [varaitions, setVaraitions] = useState([]);
    const [restaurantid ,setRestaurantId] = useState();
    const [op , setOp] = useState([]);
    const [checkoptions, setCheckoptions] = useState(false);
    const [checkingredients, setCheckingredients] = useState(false)
    const [checkvaraitions, setCheckvaraitions] = useState(false)


    const [selectvaraitions, setselectvaraitions] = useState({ id: 0, value: 0 });
    const [selectingredients, setselectingredients] = useState({ id: 0, value: 0 });
    const [selectoptions, setselectoptions] = useState({ id: 0, value: 0 });
    const [describe, setDescribe] = useState('');

    const [totalprices, settotalprices] = useState(0)

    const [variationView, setvariationView] = useState(false)
    const [ingredientsView, setingredientsView] = useState(false)
    const [optionView, setoptionView] = useState(false)

    const [qtymenu, setqtymenu] = useState(1)
    const restaurantId = props.route.params.resId;
    
    
    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === undefined || context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("LoginHome")
        } else{
            AsyncStorage.getItem("jwt").then((res) => {
                setRestaurantId(restaurantId);
                axios
                    .get(`${baseUrl}restaurant/options/${item.item._id}`, {
                        headers: { Authorization: `Bearer ${res}` },
                    })
                    .then((op) => {
                        setOptions(op.data);
    
                    })
                    .catch((error) => { console.log(error); })
    
                axios
                    .get(`${baseUrl}restaurant/ingredients/${item.item._id}`, {
                        headers: { Authorization: `Bearer ${res}` },
                    })
                    .then((ing) => {
                        setIngredients(ing.data);
    
    
                    })
                    .catch((error) => { console.log(error) })
                axios
                    .get(`${baseUrl}restaurant/varaitions/${item.item._id}`, {
                        headers: { Authorization: `Bearer ${res}` },
                    })
                    .then((vara) => {
                        setVaraitions(vara.data);
    
                    })
            }) 
        }

        



        return () => {
            setOptions([]);
            setIngredients([]);
            setVaraitions([]);
            setOp([]);
            setRestaurantId();
        }
    }, [])

    useEffect(() => {


        if (Object.keys(varaitions)[0] == undefined) {
        } else {
            Object.keys(varaitions.varaition).length > 1 ?
                setvariationView(true)
                :
                setvariationView(false)
        }


        if (Object.keys(ingredients)[0] == undefined) {
        } else {
            Object.keys(ingredients.ingredient).length > 1 ?
                setingredientsView(true)
                :
                setingredientsView(false)
        }

        if (Object.keys(options)[0] == undefined) {
            
        } else {
            Object.keys(options.option).length > 1 ?
                setoptionView(true)
                :
                setoptionView(false)
        }
        

    }, [varaitions, ingredients, options, variationView, ingredientsView, optionView])    
    return (

        <View style={styles.container} >

            <ScrollView style={{ width: '100%' }}>
                <View style={styles.CardContainer}>

                    <View ><Image style={styles.imageTag} source={{ uri: item.item.menu_image }}></Image></View>
                    <View style={{ marginTop: 16 }}><Text style={styles.MenuTitleText}>ชื่อเมนู {item.item.menu_name}</Text></View>
                    <View style={{ marginBottom: 8 }}><Text style={{ fontFamily: 'pr-reg', fontSize: 16 }}>( ราคาเริ่มต้น {item.item.price} ฿ )</Text></View>
                    {/* {checkvaraitions == true ? ( */}
                    <View style={{ width: 376, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 }}>
                        <View style={{ flexDirection: 'column', marginBottom: 16, width: 376 }}>

                            {variationView === true ?
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 }}>
                                    <View style={{ flexDirection: 'column', marginLeft: 56, marginBottom: 16 }}>
                                        <RadioForm

                                            radio_props={varaitions.varaition}
                                            initial={0}
                                            animationion={true}
                                            onPress={(value, index) => { setselectvaraitions({ ...selectvaraitions, id: varaitions.varaition[index].label, value: value }) }}
                                            buttonColor={'#E4E4E4'}
                                            selectedButtonColor={'#908F7D'}

                                            labelStyle={{ fontSize: 16, color: '#4F4F4F', fontFamily: 'pr-reg', marginBottom: 8, justifyContent: 'space-between' }}
                                            buttonSize={10}
                                        />
                                        <Text style={styles.detailTextPrice}>ราคาปริมาณ +{selectvaraitions.value} ฿</Text>

                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginRight: 80 }}>
                                    </View>

                                </View>


                                : null
                            }

                            {ingredientsView === true ?
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                                    <View style={{ flexDirection: 'column', marginLeft: 56, marginBottom: 16 }}>
                                        <RadioForm
                                            radio_props={ingredients.ingredient}
                                            initial={0}
                                            animationion={true}
                                            onPress={(value, index) => { setselectingredients({ ...selectingredients, id: ingredients.ingredient[index].label, value: value }) }}
                                            buttonColor={'#E4E4E4'}
                                            selectedButtonColor={'#908F7D'}

                                            labelStyle={{ fontSize: 16, color: '#4F4F4F', fontFamily: 'pr-reg', marginBottom: 8, justifyContent: 'space-between' }}
                                            buttonSize={10}
                                        />
                                        <Text style={styles.detailTextPrice}>ราคาวัตถุดิบ +{selectingredients.value} ฿</Text>
                                    </View>



                                </View>
                                :
                                null
                            }

                            {optionView === true ?
                                <View style={{ width: 376, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 }}>
                                    <View style={{ flexDirection: 'column', marginLeft: 56 }}>
                                        <RadioForm
                                            radio_props={options.option}
                                            initial={0}
                                            animationion={true}
                                            onPress={(value, index) => { setselectoptions({ ...selectoptions, id: options.option[index].label, value: value }) }}
                                            buttonColor={'#E4E4E4'}
                                            selectedButtonColor={'#908F7D'}
                                            labelStyle={{ fontSize: 16, color: '#4F4F4F', fontFamily: 'pr-reg', marginBottom: 8, justifyContent: 'space-between' }}
                                            buttonSize={10}
                                        />
                                        <Text style={styles.detailTextPrice}>ราคาท็อปปิ้ง +{selectoptions.value} ฿</Text>
                                    </View>

                                </View>
                                :
                                null
                            }
                            <></>
                            <View style={{ width: 376, marginVertical: 20, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'pr-reg', alignSelf: 'flex-start', marginBottom: 24, marginLeft: 54 }}>ฝากถึงร้านเพิ่มเติม (ถ้ามี)</Text>
                                <TextInput style={{ justifyContent: 'center' }} multiline={true} numberOfLines={3} style={styles.TextInputBox} onChangeText={(value) => {
                                    setDescribe(value)
                                }}></TextInput>
                            </View>


                            <View style={[styles.menunamecontainer, { paddingHorizontal: 24, marginBottom: 16, width: 248, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                <TouchableOpacity onPress={() => { qtymenu > 1 ? setqtymenu(qtymenu - 1) : null }} style={[styles.MenuTitleText, styles.btntool, {}]}><MaterialCommunityIcons name="minus" size={24} color="black" /></TouchableOpacity>
                                <Text style={{ fontFamily: 'pr-reg', fontSize: 18 }}>{qtymenu}</Text>
                                <TouchableOpacity onPress={() => { setqtymenu(qtymenu + 1) }} style={[styles.MenuTitleText, styles.btntool, {}]}><MaterialIcons name="add" size={24} color="black" /></TouchableOpacity>
                            </View>

                            <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginTop: 32, paddingHorizontal: 24, }}>
                                <TouchableOpacity style={styles.btnsubmit} onPress={() => { props.addItemcart(item.item, selectvaraitions, selectingredients, selectoptions, describe, qtymenu ), props.navigation.navigate('FoodMenuConfirm', {resId : restaurantid }) }}><Text style={styles.btnSubmitText}>ยืนยัน</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.btnCancel} onPress={() => props.navigation.navigate('FoodMenuMain')} ><Text style={styles.btnCancelText}>ย้อนกลับ</Text></TouchableOpacity>
                            </View>
                        </View>

                    </View >
                </View>
            </ScrollView>
        </View>

    );

}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemcart: (menus, vaId, ingreId, optionId, describe, qtymenu ,resId) => { dispatch(action.addToCart({ quantity: qtymenu, menus:menus, varaition: vaId, ingredient: ingreId, option: optionId, describe:describe})) }
    }
}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },

    CardContainer: { flexDirection: 'column', alignItems: 'center', alignSelf: 'center', margin: 20, width: 376, backgroundColor: "#FFF", shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, paddingVertical: 48, borderRadius: 16 },
    imageTag: { width: 248, height: 248, borderRadius: 16 },
    MenuTitleText: { fontFamily: 'pr-bold', color: '#000', fontSize: 18 },
    detailTextTitle: { fontFamily: 'pr-reg', color: '#6F6F6F' },
    detailTextPrice: { flex: 1, flexWrap: 'wrap', fontFamily: 'pr-reg', color: '#000', fontSize: 16, backgroundColor: '#FFFEB8', justifyContent: 'center', alignItems: 'center', padding: 8, },
    detailTotalTextTitle: { fontFamily: 'pr-bold', fontSize: 24, color: '#000' },
    detailTotalPrice: { fontFamily: 'pr-bold', fontSize: 24, color: '#000' },

    menunamecontainer: { width: '100%', paddingHorizontal: 32, flexDirection: 'row', alignSelf: 'center' },
    TextInputBox: { width: 248, alignItems: 'center', textAlignVertical: 'top', height: 80, borderColor: 'gray', borderWidth: 1, padding: 8, marginBottom: 32, borderRadius: 16, fontFamily: 'pr-reg' },
    btntool: { backgroundColor: '#FFF', alignItems: 'flex-start', alignSelf: 'center', padding: 8, borderRadius: 8, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26 },


    btnsubmit: { backgroundColor: '#FFFC1B', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 16, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26 },
    btnSubmitText: { fontFamily: 'pr-reg', fontSize: 16 },

    btnCancel: { backgroundColor: '#FFF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 16, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26 },
    btnCancelText: { fontFamily: 'pr-reg', fontSize: 16 }
});


export default connect(null, mapDispatchToProps)(FoodMenuCustom);