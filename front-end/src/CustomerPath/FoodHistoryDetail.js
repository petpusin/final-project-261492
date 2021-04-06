import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, FlatList } from 'react-native';


const FoodHistoryDetail = props => {
    var total = 0;
    var qty = 0;
    props.route.params.item.orderDetail.forEach(qt => {
        return (qty += qt.quantity)
    })
    const orders = props.route.params.item;
    return (

        <View style={styles.container}>

            <ScrollView style={{ width: '100%' }}>

                <View style={styles.CardContainer}>

                    <View style={styles.rowcontent}>
                        <Text style={[styles.TitleDetailText, { flex: 1 }]}>หมายเลขออเดอร์</Text>
                        <Text style={[styles.AValueDetailText, { flex: 1.5 }]}>{orders._id.substring(21, 24)}</Text>
                    </View>
                    <View style={styles.rowcontent}>
                        <Text style={[styles.TitleDetailText, { flex: 1 }]}>วันที่</Text>
                        <Text style={[styles.AValueDetailText, { flex: 1.5 }]}>{orders.dateOrderStart.split('T')[0]}</Text>
                    </View>
                    <View style={styles.rowcontent}>
                        <Text style={[styles.TitleDetailText, { flex: 1 }]}>ร้านอาหาร</Text>
                        <Text style={[styles.AValueDetailText, { flex: 1.5 }]}>{orders.res_id.restaurant_name}</Text>
                    </View>
                    <FlatList
                        data={orders.orderDetail}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) =>
                            <>

                                <View style={[styles.MenuRow, { width: '100%' }]}>
                                    <View style={{ flex: .5, alignItems: 'flex-start' }}><Text style={styles.MenuText, { fontFamily: 'pr-bold', fontSize: 18 }}>{item.menus.menu_name}</Text></View>
                                    <View style={{ flex: .2, alignItems: 'center' }}><Text style={styles.CountingText}>x{item.quantity}</Text></View>
                                    <View style={{ flex: .3, alignItems: 'center' }}><Text style={styles.PricesText}>{total = (item.menus.price + item.varaition.value + item.option.value + item.ingredient.value) * item.quantity} ฿</Text></View>
                                </View>
                                <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
                                    {item.varaition.id == 0 ? null : (
                                        <View style={{ marginLeft: 16 }}><Text style={styles.PricesText}>varaition :{item.varaition.id} </Text></View>
                                    )}
                                    {item.ingredient.id == 0 ? null : (
                                        <View style={{ marginLeft: 16 }}><Text style={styles.PricesText}>ingredient :{item.ingredient.id} </Text></View>
                                    )}
                                    {item.option.id == 0 ? null : (
                                        <View style={{ marginLeft: 16 }}><Text style={styles.PricesText}>{item.option.id}</Text></View>
                                    )}
                                    {item.describe == null ? null : (
                                        <View style={{ backgroundColor: '#F3F3E3', marginTop: 16, paddingVertical: 8, borderRadius: 16 }}><Text style={{ fontFamily: 'pr-reg', marginLeft: 16 }}>ข้อความจากผู้สั่ง :</Text><Text style={[styles.PricesText, { marginTop: 8, marginLeft: 40 }]}>{item.describe} </Text></View>
                                    )}

                                </View>
                            </>
                        }


                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />



                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: 18, paddingVertical: 8, paddingLeft: 24 }}>

                        <Text style={[styles.TotalTitleDetailText, { flex: .7 }]}>รวมทั้งหมด</Text>
                        <Text style={[styles.TotalTitleDetailText, { flex: 1 }]}>{orders.totalPrice} ฿</Text>

                    </View>

                </View>

            </ScrollView>

        </View >

    );

}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
    CardContainer: { marginTop: 48, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', margin: 20, width: 500 / Dimensions.get('window').width + 380, backgroundColor: "#FFF", shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, paddingVertical: 48, borderRadius: 16 },

    rowcontent: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 24, marginBottom: 8 },
    TitleDetailText: { fontFamily: 'pr-reg', fontSize: 16, color: '#000', textAlign: 'left' },
    AValueDetailText: { fontFamily: 'pr-reg', fontSize: 16, color: 'gray', textAlign: 'left' },
    menuValueDetailText: { fontFamily: 'pr-reg', fontSize: 16, color: 'gray', width: 148, marginBottom: 4 },
    ValueDetailText: { fontFamily: 'pr-reg', fontSize: 16, color: 'gray' },
    UnitValueText: { fontFamily: 'pr-reg', fontSize: 16, color: 'gray', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: 48 },
    PriceValueDetailText: { fontFamily: 'pr-reg', fontSize: 16, color: 'gray', marginLeft: 8 },
    UnitValueDetailText: { fontFamily: 'pr-reg', fontSize: 16, color: 'gray' },

    TotalValueDetailText: { fontFamily: 'pr-bold', fontSize: 18, color: '#000', marginLeft: 16, width: 256, },
    TotalUnitValueDetailText: { fontFamily: 'pr-reg', fontSize: 18, color: '#000', marginLeft: 8 },
    TotalTitleDetailText: { fontFamily: 'pr-reg', fontSize: 24, color: '#000' }

});


export default FoodHistoryDetail