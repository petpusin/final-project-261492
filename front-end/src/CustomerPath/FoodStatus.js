import React, { useState, useCallback, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, FlatList, RefreshControl } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { normalize } from 'react-native-elements';
import AuthGlobal from '../Context/Store/AuthGlobal'
import baseUrl from '../../assets/common/baseUrl';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const FoodStatus = props => {
    const context = useContext(AuthGlobal);
    const [cusId, setCusId] = useState();
    const [order, setOrder] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [customerstatus, setcustomerstatus] = useState(["รอรับออเดอร์", "กำลังปรุงอาหาร", "วัตถุดิบไม่พอ", "ออเดอร์ถูกปฏิเสธ", "อาหารเสร็จแล้ว"])

    useFocusEffect((useCallback(
        () => {
            if (
                context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === undefined || context.stateUser.isAuthenticated === null
            ) {
                props.navigation.navigate("LoginHome")
            } else {
                setCusId(context.stateUser.user.userId)
                axios.get(`${baseUrl}orders/${cusId}`).then((op) => {
                    setOrder(op.data)
                }).catch((error) => { console.log(error); })
            }
            return () => {
                setOrder([]);
                setCusId('');
            }
        },
        [cusId],
    )))

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    
    return (

        <View style={styles.container}>

            <ScrollView style={{ width: '100%' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>

                <View style={styles.CardContainer}>

                    <View style={{ marginBottom: 32, flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center', paddingVertical: 16, backgroundColor: '#FFFEB8', borderRadius: 16 }}>
                        <MaterialCommunityIcons name="silverware" size={32} color="black" style={{ marginRight: 8 }} />
                        <Text style={styles.StatusHeaderText}>สถานะออเดอร์</Text>
                    </View>
                    <View style={styles.StatusHeaderContainer}>
                        <Text style={[styles.HeaderText, { flex: .4 }]}>#</Text>
                        <Text style={[styles.HeaderText, { flex: .4 }]}>เวลา(น.)</Text>
                        <Text style={[styles.HeaderText, { flex: 1 }]}>ร้านอาหาร</Text>
                        <Text style={[styles.HeaderText, { flex: 1 }]}>สถานะ</Text>
                    </View>

                    <FlatList
                        data={order}

                        renderItem={({ item }) =>
                            <>
                                <View style={[styles.StatusValueContainer, { width: 376 }]}>
                                    <Text style={[styles.HeaderText, { flex: .4 }]}>{item._id.substring(21, 24)}</Text>
                                    <Text style={[styles.HeaderText, { flex: .4 }]}>{item.dateOrderStart.substring(11, 16)}</Text>
                                    <Text style={[styles.HeaderText, { flex: 1 }]}>{item.res_id.restaurant_name}</Text>
                                    <Text style={[styles.HeaderText, { flex: 1 }]}>
                                        {item.status === "Waiting" ? <Text>รอรับออเดอร์</Text> : null}
                                        {item.status === "Cooking" ? <Text>กำลังเตรียมอาหาร</Text> : null}
                                        {item.status === "Finish" ? <Text>อาหารเสร็จแล้ว</Text> : null}
                                        {item.status === "Endtransac" ? <Text>ได้รับอาหารแล้ว</Text> : null}
                                        {item.status === "Lack" ? <Text>วัตถุดิบไม่เพียงพอ</Text> : null}
                                        {item.status === "Cancel" ? <Text>ออเดอร์ถูกปฏิเสธ</Text> : null}
                                    </Text>
                                </View>
                            </>
                        }
                        keyExtractor={item => item._id}

                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />

                    {/* <View style={styles.StatusValueContainer}>
                        <Text style={[styles.HeaderText, { flex: .7 }]}>152</Text>
                        <Text style={[styles.HeaderText, { flex: 1 }]}>12:10</Text>
                        <Text style={[styles.HeaderText, { flex: 2 }]}>ตำยำแหลก</Text>
                        <Text style={[styles.HeaderText, { flex: 2 }]}>กำลังปรุงอาหาร</Text>
                    </View>
                    <View style={styles.StatusValueContainer}>
                        <Text style={[styles.HeaderText, { flex: .7 }]}>152</Text>
                        <Text style={[styles.HeaderText, { flex: 1 }]}>12:34</Text>
                        <Text style={[styles.HeaderText, { flex: 2 }]}>ข้าวมันไก่หลังมอ</Text>
                        <Text style={[styles.HeaderText, { flex: 2 }]}>รอรับออเดอร์</Text>
                    </View> */}
                </View>

            </ScrollView>

        </View >

    );

}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
    CardContainer: { marginTop: 56, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', margin: 24, width: 376, backgroundColor: "#FFF", shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, borderRadius: 16, paddingBottom: 24 },

    StatusHeaderText: { fontFamily: 'pr-bold', fontSize: 18 },

    StatusHeaderContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 },
    HeaderText: { fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' },


    StatusValueContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16, flexWrap: 'wrap' },
    ValueTextLeft: { fontFamily: 'pr-reg', fontSize: 16, marginLeft: 40, color: '#888888' },
    ValueTextCenter: { fontFamily: 'pr-reg', fontSize: 16, color: '#888888', alignItems: 'center', },
    ValueTextRight: { fontFamily: 'pr-reg', fontSize: 16, marginRight: 32, color: '#000' }

});


export default FoodStatus