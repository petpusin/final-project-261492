import React, { useState, useCallback, useContext, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Dimensions, TouchableOpacity, Text, FlatList, RefreshControl } from 'react-native';

import OrderList from './OrderList'
import AuthGlobal from '../Context/Store/AuthGlobal'
import baseUrl from '../../assets/common/baseUrl';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const OrderMain = props => {
    const context = useContext(AuthGlobal);
    const [resId, setResId] = useState(props.route.params.resId);
    const [order, setOrder] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    
    const tempdatabase = {
        menulists: [
            {
                idx: 1,
                ordernumber: 152,
                timeclock: '11:15',
                menu: [['ข้าวผัดหมู', 1, 25]]

            },
            {
                idx: 2,
                ordernumber: 153,
                timeclock: '11:18',
                menu: [['ก๋วยเตี๋ยวต้มยำหมูสับ', 1, 25]]
            }
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
            AsyncStorage.getItem("jwt").then((res) =>{
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
        <View style={styles.container}>

            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                <FlatList
                    data={order}
                    renderItem={({ item }) => <OrderList idx={item._id} ordernumber={item._id} timeclock={item.dateOrderStart} menu={item.orderDetail} totalPrice={item.totalPrice} status={item.status}/>}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </ScrollView>



        </View>
    )
}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF' },
})

export default OrderMain