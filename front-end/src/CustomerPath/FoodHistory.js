import React, { useState, useCallback, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, RefreshControl, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AuthGlobal from '../Context/Store/AuthGlobal'
import baseUrl from '../../assets/common/baseUrl';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const FoodHistory = props => {
    const datatemp =
        [
            {
                "_id": 1,
                "date": "19-03-54",
                "resname": "ตามสั่งนายวรัญ",
            },
        ]

        const context = useContext(AuthGlobal);
        const [cusId, setCusId] = useState();
        const [order, setOrder] = useState([]);
        const [refreshing, setRefreshing] = useState(false);

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
                        <MaterialCommunityIcons name="history" color={'#000'} size={32} style={{ marginRight: 8 }} />
                        <Text style={styles.StatusHeaderText}>ประวัติสั่งออเดอร์</Text>
                    </View>



                    <View style={styles.StatusHeaderContainer}>
                        <Text style={[styles.celltext, { flex: .7 }]}>#</Text>
                        <Text style={[styles.celltext, { flex: 1 }]}>วันที่</Text>
                        <Text style={[styles.celltext, { flex: 2 }]}>ร้านอาหาร</Text>
                        <Text style={[styles.celltext, { flex: 1 }]}>รายการ</Text>
                    </View>

                    <FlatList
                        data={order}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) =>
                            <>
                                <View style={[styles.StatusValueContainer, { marginBottom: 8, width: 376 }]}>
                                    <View style={[styles.celltext, { flex: .7 }]}><Text style={styles.celltext}>{item._id.substring(21, 24)}</Text></View>
                                    <Text style={[styles.celltext, { flex: 1 }]}>{item.dateOrderStart.substring(11, 16)}</Text>
                                    <Text style={[styles.celltext, { flex: 2 }]}>{item.res_id.restaurant_name}</Text>
                                    <View style={{ flex: 1 }}><TouchableOpacity onPress={() => props.navigation.navigate('FoodHistoryDetail',{item:item})} style={styles.TouchDetailBtn}><MaterialIcons name="more-vert" size={24} color="black" /></TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        }

                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />






                </View>

            </ScrollView >

        </View >

    );

}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
    CardContainer: { marginTop: 56, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', margin: 16, width: 376, backgroundColor: "#FFF", shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, borderRadius: 16, paddingBottom: 24 },

    StatusHeaderText: { fontFamily: 'pr-bold', fontSize: 18 },

    StatusHeaderContainer: { width: '100%', flexDirection: 'row', marginBottom: 18, justifyContent: 'space-around' },
    HeaderTextLeft: { fontFamily: 'pr-reg', fontSize: 16, marginLeft: 18 },
    HeaderTextCenter: { fontFamily: 'pr-reg', fontSize: 16 },
    HeaderTextRight: { fontFamily: 'pr-reg', fontSize: 16, marginRight: 48 },

    dataincell: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', alignSelf: 'center', paddingHorizontal: 4 },
    celltext: { fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' },
    StatusValueContainer: { width: '100%', flexDirection: 'row', marginVertical: 8, justifyContent: 'space-around' },
    ValueTextLeft: { fontFamily: 'pr-reg', fontSize: 16, color: '#888888', alignItems: 'center', alignSelf: 'center' },
    ValueTextCenter: { fontFamily: 'pr-reg', fontSize: 16, color: '#888888', alignItems: 'center', marginTop: 5 },
    ValueTextRight: { fontFamily: 'pr-reg', fontSize: 16, color: '#888888', marginRight: 32, alignItems: 'center', marginTop: 5 },
    ValueTextRightBtn: { fontFamily: 'pr-reg', fontSize: 16, color: '#000' },
    TouchDetailBtn: { alignItems: 'center' }
});


export default FoodHistory