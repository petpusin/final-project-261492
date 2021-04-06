import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image, FlatList } from 'react-native';

import FoodMenuItem from './FoodMenuItem'
import baseUrl from '../../assets/common/baseUrl';
import axios from "axios";
const FoodMenuMain = props => {

    const { resId } = props.route.params;
    const [oneres, setOneres] = useState([]);
    
    console.log(`${baseUrl}home/${resId}`);
    useEffect(() => {
        axios
            .get(`${baseUrl}home/${resId}`)
            .then((res) => {
                setOneres(res.data);
            })
        return () => {
            setOneres([]);
        }
    }, []);
    return (

        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.CardContainer}>
                    <View style={styles.RestImageContainer}><Image style={styles.RestImage} source={{ uri: oneres.res_image }}></Image></View>
                    <View style={styles.RestNameContainer}><Text style={styles.RestNameText}>ร้าน{oneres.restaurant_name}</Text></View>

                    <FlatList
                        data={oneres.menus}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => props.navigation.navigate('FoodMenuCustom', { item: item , resId : resId})} style={styles.MenuTouchContainer}><FoodMenuItem menuTitle={item.menu_name} imageUri={item.menu_image} />
                            </TouchableOpacity>

                        }

                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />

                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', paddingHorizontal: 16, marginTop: 48, alignItems: 'center' }}>
                        <View style={styles.nextBTNBackground}><TouchableOpacity onPress={() => props.navigation.navigate('FoodMenuConfirm', {resId:resId})}><Text style={styles.nextBTNText}>ดำเนินต่อ</Text></TouchableOpacity></View>
                        <View style={styles.CancelBTNBackground}><TouchableOpacity onPress={() => props.navigation.navigate('Homescreen')}><Text style={styles.cancelBTNText}>ยกเลิก</Text></TouchableOpacity></View>
                    </View>

                </View>


            </ScrollView>
        </View >

    );

}

const styles = StyleSheet.create({
    container: { backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
    CardContainer: { flexDirection: 'column', alignItems: 'center', alignSelf: 'center', margin: 16, width: 376, backgroundColor: "#FFF", shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, paddingVertical: 48, borderRadius: 16 },

    RestNameContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16, marginBottom: 16 },
    RestNameText: { fontFamily: 'pr-bold', fontSize: 18 },
    RestImageContainer: { borderRadius: 16, marginTop: 16, padding: 1, backgroundColor: "#FFF", shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26 },
    RestImage: { width: 200, height: 200, borderRadius: 16 },

    MenuTouchContainer: { borderRadius: 16, marginVertical: 8, marginHorizontal: 8, width: 296, backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowRadius: 1, elevation: 3, shadowOpacity: 0.26 },
    nextBTNText: { fontFamily: 'pr-reg', color: '#000', textAlign: 'center', fontSize: 16 },
    nextBTNBackground: { backgroundColor: '#FFFC1B', padding: 8, shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.13, borderRadius: 15, width: 104 },
    CancelBTNBackground: { backgroundColor: '#FFF', padding: 8, shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.13, borderRadius: 15, width: 80 },
    cancelBTNText: { fontFamily: 'pr-reg', color: '#000', textAlign: 'center', fontSize: 16 }

});


export default FoodMenuMain