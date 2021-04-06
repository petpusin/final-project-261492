import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Dimensions, TouchableOpacity, Text, FlatList } from 'react-native';

const HistoryList = props => {
    var total = 0;
    var qty = 0;
    props.route.params.item.orderDetail.forEach(qt => {
        return (qty += qt.quantity)
    })
    const orders = props.route.params.item;
    return (
        <View style={styles.container}>
            <View style={styles.cardcontainer}>
                <View style={styles.YellowBar}></View>

                <View style={styles.FirstRow}>
                    <View><Text style={[styles.OrderNumberTextTitle, { fontSize: 16 }]}>ออเดอร์</Text></View>
                    <View><Text style={[styles.OrderNumberTextValue, { fontSize: 16 }]}>{orders._id.substring(21, 24)}</Text></View>

                    <View style={{ marginLeft: 'auto' }}><Text style={[styles.TimeValueText, { fontSize: 16 }]}>{orders.dateOrderStart.substring(11, 16)}</Text></View>
                    <View style={{ marginLeft: 5 }}><Text style={[styles.TimeUnitText, { fontSize: 16 }]}>น.</Text></View>
                </View>


                <FlatList
                    data={orders.orderDetail}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) =>
                        <>

                            <View style={[styles.MenuRow, { width: '100%' }]}>
                                <View style={{ flex: .5, alignItems: 'flex-start' }}><Text style={styles.MenuText, { fontFamily: 'pr-bold', fontSize: 18 }}>{item.menus.menu_name}</Text></View>
                                <View style={{ flex: .2, alignItems: 'center' }}><Text style={styles.CountingText}>x{item.quantity}</Text></View>
                                <View style={{ flex: .3, alignItems: 'center' }}><Text style={[styles.PricesText, { fontSize: 16 }]}>{total = (item.menus.price + item.varaition.value + item.option.value + item.ingredient.value) * item.quantity} ฿</Text></View>
                            </View>
                            <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
                                {item.varaition.id == 0 ? null : (
                                    <View style={{ marginLeft: 16 }}><Text style={[styles.PricesText, { fontSize: 16 }]}>varaition :{item.varaition.id} </Text></View>
                                )}
                                {item.ingredient.id == 0 ? null : (
                                    <View style={{ marginLeft: 16 }}><Text style={[styles.PricesText, { fontSize: 16 }]}>ingredient :{item.ingredient.id} </Text></View>
                                )}
                                {item.option.id == 0 ? null : (
                                    <View style={{ marginLeft: 16 }}><Text style={[styles.PricesText, { fontSize: 16 }]}>{item.option.id}</Text></View>
                                )}
                                {item.describe == null ? null : (
                                    <View style={{ backgroundColor: '#F3F3E3', marginTop: 16, paddingVertical: 8, borderRadius: 16 }}><Text style={{ fontFamily: 'pr-reg', marginLeft: 16, fontSize: 16 }}>ข้อความจากผู้สั่ง :</Text><Text style={[styles.PricesText, { marginTop: 8, marginLeft: 40, fontSize: 16 }]}>{item.describe}</Text></View>
                                )}

                            </View>
                        </>
                    }


                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />



                <View style={styles.TotalCountsRow}>
                    <Text style={[styles.TotalCountsText, { fontSize: 18 }]}>รวม {qty} รายการ</Text>
                </View>

                <View style={styles.TotalPricesRow}>
                    <Text style={styles.TotalPricesText}>{orders.totalPrice} ฿</Text>
                </View>


            </View >
        </View>
    )

}



const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#fff', alignItems: 'center', backgroundColor: '#FFF' },
    cardcontainer: { width: 500 / Dimensions.get('window').width + 350, backgroundColor: '#fff', alignSelf: 'center', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 5, shadowOpacity: 0.26, marginTop: 20, borderRadius: 16 },

    YellowBar: { width: '100%', backgroundColor: 'yellow', height: 10, borderTopLeftRadius: 16, borderTopEndRadius: 16 },

    FirstRow: { flexDirection: 'row', padding: 20, alignItems: 'center' },
    IndexText: { fontFamily: 'pr-reg', marginRight: 15 },
    OrderNumberTextTitle: { fontFamily: 'pr-reg', marginRight: 8 },
    OrderNumberTextValue: { fontFamily: 'pr-reg', color: '#8B8B8B' },

    TimeValueText: { fontFamily: 'pr-reg', color: '#8B8B8B' },
    TimeUnitText: { fontFamily: 'pr-reg' },

    SecondRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, alignItems: 'center' },
    CustomerNameText: { fontFamily: 'pr-reg', color: '#8B8B8B', marginTop: -10 },

    MenuRow: { flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' },
    MenuText: { fontFamily: 'pr-reg' },
    CountingText: { fontFamily: 'pr-reg' },
    PricesText: { fontFamily: 'pr-reg', color: '#CECEB7' },

    TotalCountsRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 5 },
    TotalCountsText: { fontFamily: 'pr-bold', marginLeft: 'auto' },

    TotalPricesRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16 },
    TotalPricesText: { fontFamily: 'pr-bold', color: '#A7A799', marginLeft: 'auto', fontSize: Dimensions.get('window').height * .03 },

})

export default HistoryList