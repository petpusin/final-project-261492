import React, { useState, useCallback, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Image, RefreshControl, FlatList } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { MaterialIcons } from '@expo/vector-icons';
import AuthGlobal from '../Context/Store/AuthGlobal'
import baseUrl from '../../assets/common/baseUrl';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const HistoryMain = props => {
    const context = useContext(AuthGlobal);
    const [resId, setResId] = useState(props.route.params.resId);
    const [order, setOrder] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const tabledataset = {
        tableHead: ['#ออเดอร์', 'วันที่', 'เวลา(น.)', 'รายละเอียด'],
        tableData: [
            ['152', '18 ม.ค. 64', '11:04', 'รายละเอียด'],
            ['153', '18 ม.ค. 64', '11:08', 'รายละเอียด']
        ]
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === undefined || context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("LoginHome")
        } else {
            AsyncStorage.getItem("jwt").then((res) => {
                axios.get(`${baseUrl}restaurant/orders/${resId}`, {
                    headers: { Authorization: `Bearer ${res}` }
                }).then((op) => {
                    setOrder(op.data)
                }).catch((error) => { console.log(error); })
            })

        }
        return () => {
            setOrder([])
        }
    }, [resId])
    return (
        <View style={styles.Tablecontainer}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={[{ flex: .2, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>#</Text>
                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>วันที่</Text>
                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>เวลา</Text>
                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>รายละเอียด</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>

                <FlatList
                    data={order}

                    renderItem={({ item }) =>
                        <>
                            <View style={[{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }]}>
                                <Text style={[{ flex: .2, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>{item._id.substring(21,24)}</Text>
                                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>{item.dateOrderStart.split("T")[0]}</Text>
                                <Text style={[{ flex: .4, padding: 8, fontFamily: 'pr-light', fontSize: 16, textAlign: 'center' }]}>{item.dateOrderStart.substring(11,16)}น.</Text>
                                <TouchableOpacity style={{ alignItems: 'center', padding: 8, borderRadius: 16, flex: .4 }} onPress={() => props.navigation.navigate('HistoryList', {item:item})}>
                                    <MaterialIcons name="more-horiz" size={24} color="black" />
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


    Tablecontainer: { flex: 1, padding: 16, paddingTop: Dimensions.get('window').height * 0.05, backgroundColor: '#FFF', },
    head: { height: Dimensions.get('window').height * 0.15, backgroundColor: '#FFF' },
    text: { fontFamily: 'pr-reg', marginVertical: 15, fontSize: Dimensions.get('window').height * .018, textAlign: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#FFF', justifyContent: 'center', borderBottomColor: '#000', borderBottomWidth: .5, borderBottomColor: '#D3D2B3' },
});


export default HistoryMain