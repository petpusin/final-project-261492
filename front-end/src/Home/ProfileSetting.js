import React, { useContext, useState ,useCallback ,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppContext from '../Context/AppContext'
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../Context/Store/AuthGlobal"
import { logoutUser } from "../Context/Action/Auth.action"


const ProfileSetting = props => {

    
    const context = useContext(AuthGlobal);
    const [userProfile, setUserProfile] = useState()
    
    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false || 
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("LoginHome")
        }

        AsyncStorage.getItem("jwt")
            .then((res) => {
                console.log("token",res);
                axios
                    .get(`${baseURL}customer/${context.stateUser.user.userId}`, {
                        headers: { Authorization: `Bearer ${res}` },
                    })
                    .then((user) => setUserProfile(user.data))
            })
            .catch((error) => console.log(error))

        return () => {
            setUserProfile();
        }
    }, [context.stateUser.isAuthenticated])

    
    return (

        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.CardContainer}>
                    <View style={{ backgroundColor: '#F9F9DB', borderRadius: 96, width: 136, height: 136, justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
                        <MaterialCommunityIcons name="account" size={96} />
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 18 }}>
                        <View style={{ width: 104 }}>
                            <Text style={styles.titleH1}>ชื่อผู้ใช้</Text>
                            <Text style={styles.titleH1}>รหัสผ่าน</Text>
                        </View>
                        <View style={{ width: 144 }}>
                            <Text style={styles.valueText}>petpusin</Text>
                        </View>
                        <View style={{ width: 40, marginTop: 40 }} >

                            <TouchableOpacity><MaterialIcons name="mode-edit" size={24} color="black" /></TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: 18 }}>
                        <View style={{ width: 104 }} >
                            <Text style={styles.titleH1}>ชื่อจริง</Text>
                            <Text style={styles.titleH1}>นามสกุล</Text>
                            <Text style={styles.titleH1}>เพศ</Text>
                            <Text style={styles.titleH1}>อายุ</Text>
                            <Text style={styles.titleH1}>อาชีพ</Text>
                            <Text style={styles.titleH1}>คณะ/สาขา</Text> 
                            <Text style={styles.titleH1}>สังกัด</Text>  
                            <Text style={styles.titleH1}>เบอร์โทร</Text>
                            <Text style={styles.titleH1}>อีเมล</Text>
                            <Text style={styles.titleH1}>ไลน์</Text>
                        </View>
                        <View style={{ width: 144 }}>
                            <Text style={styles.valueText}></Text>
                            <Text style={styles.valueText}></Text>
                            <Text style={styles.valueText}>ชาย</Text> 
                            {/* : <Text style={styles.valueText}>หญิง</Text>} */}
                            <Text style={styles.valueText}></Text>
                            <Text style={styles.valueText}></Text> 
                            <Text style={styles.valueText}></Text> 
                            <Text style={styles.valueText}></Text>
                            <Text style={styles.valueText}></Text>
                            <Text style={styles.valueText}></Text>
                            <Text style={styles.valueText}></Text>
                        </View>
                        <View style={{ width: 40 }}>
                            <TouchableOpacity><MaterialIcons name="mode-edit" size={24} color="black" style={{ marginBottom: 12 }} /></TouchableOpacity>
                            <TouchableOpacity><MaterialIcons name="mode-edit" size={24} color="black" style={{ marginBottom: 12 }} /></TouchableOpacity>
                            <TouchableOpacity><MaterialIcons name="mode-edit" size={24} color="black" style={{ marginBottom: 12 }} /></TouchableOpacity>
                            <TouchableOpacity><MaterialIcons name="mode-edit" size={24} color="black" style={{ marginBottom: 12 }} /></TouchableOpacity>
                            <TouchableOpacity><MaterialIcons name="mode-edit" size={24} color="black" style={{ marginBottom: 12 }} /></TouchableOpacity> 
                            <TouchableOpacity><MaterialIcons name="mode-edit" size={24} color="black" style={{ marginBottom: 12 }} /></TouchableOpacity> 
                            {/* : <MaterialIcons name="mode-edit" size={24} color="#ccc" style={{ marginBottom: 12 }} />  */}
                            <TouchableOpacity><MaterialIcons name="mode-edit" size={24} color="black" style={{ marginBottom: 12 }} /></TouchableOpacity> 
                            {/* : <MaterialIcons name="mode-edit" size={24} color="#ccc" style={{ marginBottom: 12 }} /> */}
                            <TouchableOpacity><MaterialIcons name="mode-edit" size={24} color="black" style={{ marginBottom: 12 }} /></TouchableOpacity>
                            <TouchableOpacity><MaterialIcons name="mode-edit" size={24} color="black" style={{ marginBottom: 12 }} /></TouchableOpacity>
                            <TouchableOpacity><MaterialIcons name="mode-edit" size={24} color="black" style={{ marginBottom: 12 }} /></TouchableOpacity> 
                        </View>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', width: 180, justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ backgroundColor: '#FFFC1B', borderRadius: 15, paddingHorizontal: 18, paddingVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1, }}><View style={{ justifyContent: 'center' }}><Text style={{ fontFamily: 'pr-reg', fontSize: 14 }}>บันทึก</Text></View></TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 18, paddingVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1, }} onPress={() => props.navigation.goBack()}><View style={{ justifyContent: 'center' }}><Text style={{ fontFamily: 'pr-reg', fontSize: 14 }}>ยกเลิก</Text></View></TouchableOpacity>
                        </View>
                    </View>
                </View>



            </ScrollView>
        </View >

    );

}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
    CardContainer: { flexDirection: 'column', alignItems: 'center', alignSelf: 'center', margin: 18, width: 376, backgroundColor: "#FFF", shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, paddingVertical: 48, borderRadius: 16 },

    titleH1: { fontFamily: 'pr-reg', fontSize: 18, marginBottom: 10 },
    valueText: { fontFamily: 'pr-reg', fontSize: 16, color: '#838383', marginBottom: 14 }
});


export default ProfileSetting