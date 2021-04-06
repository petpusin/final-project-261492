import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image, } from 'react-native';


const ForgotPassword = props => {

    return (

        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.CardContainer}>
                    <Text>ทดสอบหน้าลืมรหัสผ่าน</Text>
                </View>

            </ScrollView>
        </View >

    );

}

const styles = StyleSheet.create({
    container: { flex: 1, alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
    CardContainer: { flexDirection: 'column', alignItems: 'center', alignSelf: 'center', margin: 18, width: 376, backgroundColor: "#FFF", shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 3, shadowOpacity: 0.26, paddingVertical: 48, borderRadius: 16 },

});


export default ForgotPassword