import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import HextagonIcon from '../Themes/HextagonIcon';
//Context
// import AppContext from "../Context/AppContext";
import AuthGlobal from '../Context/Store/AuthGlobal'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { getActiveChildNavigationOptions } from 'react-navigation';
import Error from './Error';
import { loginUser } from "../Context/Action/Auth.action";

const LoginHome = props => {

  const context = useContext(AuthGlobal);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      console.log("go to navigation");

      if (context.stateUser.user.role === "restaurant") {
        props.navigation.navigate('RestaurantHome')
      } else {
        props.navigation.navigate('Homescreen')
      };

    }

  }, [context.stateUser.isAuthenticated])

  const handleSubmit = () => {
    const user = { username, password };

    if (username === "" || password === "") {
      setError("Please fill in your credentials");
      Alert.alert(
        //title
        'ไม่สามารถเข้าสู่ระบบได้',
        //body
        'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
        [
          { text: 'ปิด' },
        ],
        { cancelable: false },
        //clicking out side of alert will not cancel

      );
    } else {
      

      loginUser(user, context.dispatch)
    }

  };

  
  return (
    <View style={styles.container}>

      <View style={styles.HeaderContainer}>
        <View style={styles.HeaderWithIcon} ><HextagonIcon /><Text style={styles.LoginHeader}>เข้าสู่ระบบ</Text></View>
      </View>

      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} style={styles.KeyboardContainer}>
        <View style={styles.FormContainer}>
          <View style={styles.FormContainer}><View style={{ flexDirection: 'row', alignItems: 'center' }}><MaterialCommunityIcons style={{ marginRight: 8, marginLeft: -8 }} name='account' size={24} /><Text style={styles.LoginForm}>ชื่อผู้ใช้</Text></View></View>

          <View style={styles.TextInputContainer}><TextInput value={username} onChangeText={(val) => setUsername(val.toLowerCase())} style={styles.id_field} /></View>

          <View style={styles.FormContainer}><View style={{ flexDirection: 'row', alignItems: 'center' }}><FontAwesome name="lock" style={{ marginRight: 8 }} size={24} color="black" /><Text style={styles.LoginForm}>รหัสผ่าน</Text></View></View>

          <View style={styles.TextInputContainer}><TextInput value={password} onChangeText={(val) => setPassword(val)} secureTextEntry={true} style={styles.pass_field} /></View>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.TouchLoginContainer}>

        <TouchableOpacity style={styles.LoginButton} onPress={() => handleSubmit()}>
          <Text style={styles.LoginButtonText}>เข้าสู่ระบบ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.TouchRegisterContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('RegisterHome')}><Text style={styles.registerBtn}>สร้างบัญชีใหม่</Text></TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPassword')}><Text style={styles.ForgetAndRegister}>ลืมรหัสผ่าน?</Text></TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', },
  ScrollContainer: { height: '100%', backgroundColor: 'blue' },

  LoginForm: { fontFamily: 'pr-reg', fontSize: 16, marginVertical: 16 },
  HeaderWithIcon: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },

  id_field: { fontFamily: 'pr-reg', color: '#838383', backgroundColor: '#FFFFE3', width: 216, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 16, fontSize: 16 },
  pass_field: { fontFamily: 'pr-reg', color: '#838383', backgroundColor: '#FFFFE3', width: 216, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 16, fontSize: 16 },

  FormContainer: { width: '100%', marginLeft: 200 },
  TextInputContainer: { borderRadius: 16 },
  LoginHeader: { fontFamily: 'pr-bold', fontSize: Dimensions.get('window').height < 1000 ? 20 : 22, color: '#000', marginLeft: 8 },
  HeaderContainer: { marginBottom: 16, textAlign: 'center', backgroundColor: '#FFF' },

  TouchLoginContainer: { marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1, backgroundColor: '#FFFC1B', borderRadius: 16, marginTop: 30 },
  LoginButton: { color: '#000' },
  LoginButtonText: { fontFamily: 'pr-reg', fontSize: Dimensions.get('window').height < 1000 ? 14 : 16, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 16 },

  TouchRegisterContainer: { marginBottom: 8 },
  registerBtn: { fontFamily: 'pr-light', fontSize: 16 },
  ForgetAndRegister: { fontFamily: 'pr-light', fontSize: 14, color: '#6F6F6F', margin: 8 },
  FormContainer: { justifyContent: 'center' },

});

export default LoginHome;
