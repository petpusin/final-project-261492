import React, { useEffect, useState, useContext, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image, FlatList, RefreshControl } from 'react-native';
import baseUrl from '../../assets/common/baseUrl';
import axios from "axios";
import AuthGlobal from '../Context/Store/AuthGlobal'
import { useFocusEffect } from '@react-navigation/native'
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const RestaurantList = (props) => {
    const [restaurants, setRestaurants] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const context = useContext(AuthGlobal);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    useFocusEffect((
        useCallback(
            () => {
                axios
                    .get(`${baseUrl}home`)
                    .then((res) => {
                        setRestaurants(res.data);
                        setLoading(false);
                    })
            },
            [],
        )
    ))

    return (

        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>

                <FlatList
                    data={restaurants}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={styles.touchContainer}>
                            <View style={styles.restaurantContainer}>
                                <View style={styles.containImage}>
                                    {item.res_image ? <Image style={styles.imgBorder} source={{ uri: item.res_image }}></Image> : null}
                                </View>
                                <View style={styles.containText}><Text style={styles.restText}>{item.restaurant_name}</Text></View>
                            </View>
                        </TouchableOpacity>
                    }
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />

            </ScrollView>
        </View >

    );

}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },

    restaurantContainer: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 16, padding: 24 },
    containImage: { width: 112, height: 112, backgroundColor: '#ccc', borderRadius: 16 },
    touchContainer: { backgroundColor: '#FFF', marginHorizontal: 20, marginVertical: 16, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 },
    containText: { alignSelf: 'center', marginLeft: 20 },
    restText: { fontFamily: 'pr-reg', fontSize: 16 }
});


export default RestaurantList