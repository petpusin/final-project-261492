import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const CartItem = props => {
    
    var total = 0;
    total += (props.item.menus.price + props.item.varaition.value + props.item.option.value + props.item.ingredient.value) * props.item.quantity;

    return (
        <View style={{ paddingHorizontal: 8, paddingVertical: 32, margin: 8, backgroundColor: '#FFF', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, borderRadius: 16 }}>

            <View style={[styles.menunamecontainer.alignSelf, { alignItems: 'flex-end' }]}>
                <TouchableOpacity style={[styles.btntool, { alignSelf: 'flex-end', marginRight: 16 }]} onPress={props.onRemove}>
                    <MaterialIcons name="close" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.menunamecontainer}>
                <Text style={[styles.MenuTitleText, { flex: 1, fontSize: 24 }]}>{props.item.menus.menu_name}</Text>
                <Text style={[styles.MenuTitleText, { flex: .5, fontSize: 24 }]}>x {props.item.quantity}</Text>
            </View>
            {props.item.varaition.id == 0 ? null : (
                <View style={styles.MenuListContainer}>
                    <Text style={[styles.MenuCustomText, { flex: 1 }]}>{props.item.varaition.id}</Text>
                    <Text style={[styles.PriceCustomText, { flex: .55 }]}>+ {props.item.varaition.value} ฿</Text>
                </View>)}
            {props.item.ingredient.id == 0 ? (
                null
            ) : (
                <View style={styles.MenuListContainer}>
                    <Text style={[styles.MenuCustomText, { flex: 1 }]}>{props.item.ingredient.id}</Text>
                    <Text style={[styles.PriceCustomText, { flex: .55 }]}>+ {props.item.ingredient.value} ฿</Text>
                </View>
            )}

            {props.item.option.id == 0 ? (
                <View style={styles.MenuListContainer}>
                    <Text style={[styles.MenuCustomText, { flex: 1 }]}>ไม่เพิ่มท็อปปิ้ง</Text>
                    <Text style={[styles.PriceCustomText, { flex: .55 }]}>+ {props.item.option.value} ฿</Text>
                </View>
            ) : (
                <View style={styles.MenuListContainer}>
                    <Text style={[styles.MenuCustomText, { flex: 1 }]}>{props.item.option.id}</Text>
                    <Text style={[styles.PriceCustomText, { flex: .55 }]}>+ {props.item.option.value} ฿</Text>
                </View>
            )
            }

            <View style={styles.ETCContainer}><Text style={[styles.ETCText, { flex: 1 }]}>ฝากถึงร้านเพิ่มเติม : </Text></View>
            <View style={styles.CommentContainer}><Text style={[styles.CommentText, { flex: 1 }]}>{props.item.describe}</Text></View>
            <View style={[styles.menunamecontainer, { marginTop: 16 }]}>
                <Text style={{ fontFamily: 'pr-reg', fontSize: 18 }}>รวมยอดเมนู {total} ฿</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
    CardContainer: { flexDirection: 'column', alignItems: 'center', alignSelf: 'center', margin: 24, width: 376, backgroundColor: "#FFF", shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, paddingVertical: 48, borderRadius: 16, marginTop: 54 },

    ConcluContainer: { width: '100%', paddingHorizontal: 32, flexDirection: 'row', alignSelf: 'center', marginBottom: 24 },
    concluText: { fontFamily: 'pr-bold', fontSize: 24 },

    menunamecontainer: { width: '100%', paddingHorizontal: 32, flexDirection: 'row', alignSelf: 'center' },
    MenuTitleText: { marginBottom: 5, fontFamily: 'pr-reg', fontSize: 16 },

    MenuListContainer: { flexWrap: 'wrap', width: '100%', backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 },
    MenuCustomText: { fontFamily: 'pr-reg', color: '#797979', marginLeft: 48, fontSize: 16 },
    PriceCustomText: { fontFamily: 'pr-reg', color: '#979797', marginRight: 80, fontSize: 16 },

    ETCContainer: { width: '100%', paddingHorizontal: 24, marginBottom: 10, marginTop: 32 },
    ETCText: { fontFamily: 'pr-reg', color: '#000', fontSize: 16 },
    CommentContainer: { flex: 1, padding: 16, backgroundColor: '#F6F6F6', borderRadius: 8, marginHorizontal: 48 },
    CommentText: { fontFamily: 'pr-reg', fontSize: 16, color: '#636363' },

    totalpricescontainer: { flexWrap: 'wrap', width: '80%', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FFFEB8', paddingVertical: 16, marginTop: 50, borderTopRightRadius: 48, borderBottomEndRadius: 48, marginRight: 24, alignSelf: 'flex-start', paddingHorizontal: 16 },
    detailTotalTextTitle: { fontFamily: 'pr-reg', fontSize: 24, color: '#3C3C3C', },
    detailTotalPrice: { fontFamily: 'pr-reg', fontSize: 24, color: '#3C3C3C', alignSelf: 'center' },

    btntool: { backgroundColor: '#FFF', alignItems: 'flex-start', alignSelf: 'center', padding: 8, borderRadius: 8, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26 },

    btnSubmit: { backgroundColor: '#FFFC1B', padding: 8, borderRadius: 16, marginRight: 24, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 3, shadowOpacity: 0.26 },
    btnSubmitText: { fontFamily: 'pr-reg', paddingHorizontal: 8, fontSize: 16 },

    btnCancel: { backgroundColor: '#FFF', padding: 8, borderRadius: 16, marginLeft: 24, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26 },
    btnCancelText: { fontFamily: 'pr-reg', paddingHorizontal: 8, fontSize: 16 }
});

export default CartItem;