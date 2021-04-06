import React, { useState ,useEffect } from 'react';
import { StyleSheet, ScrollView, View, Dimensions, TouchableOpacity, Text, Modal, TextInput ,FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import Toast from "react-native-toast-message";
const OrderList = props => {
    var total = 0;
    const [token ,setToken] = useState();
    const [orderstatus, setorderstatus] = useState(props.status)
    const [orderstate, setOrderstate] = useState({
        submit: false,
        fooddemand: false,
        cancel: false,
        submitBox: false,
        fooddemandBox: false,
        cancelBox: false,
        cooked: false,
        receivedBox: false,
    });
    useEffect(() => {
        AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

        setorderstatus(props.status)
        return () => {
            
        }
    }, [])
    
    const updataOrderCooking = () => {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          var order = {};
          
          const stat ="Cooking";
        if (stat == "Waiting" || stat == "Cooking" || stat == "Finish") {
            order = {
                status : stat
            };
        }else{
            order = {
                status : stat,
                dateOrderFinish: Date.now()
            }
        }

        axios.put(`${baseURL}restaurant/orders/${props.idx}`,order ,config).then((res) =>{
            if (res.status == 200 || res.status == 201) {
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: "Order Edited",
                  text2: "",
                });
                setTimeout(() => {
                    
                }, 500);
              }
            })
            .catch((error) => {
              Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Something went wrong",
                text2: "Please try again",
              });
        })
    }
    const updataOrderFinish = () => {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          var order = {};
          
          const stat = "Finish";
        if (stat == "Waiting" || stat == "Cooking" || stat == "Finish") {
            order = {
                status : stat
            };
        
        }

        axios.put(`${baseURL}restaurant/orders/${props.idx}`,order ,config).then((res) =>{
            if (res.status == 200 || res.status == 201) {
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: "Order Edited",
                  text2: "",
                });
                setTimeout(() => {
                    
                }, 500);
              }
            })
            .catch((error) => {
              Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Something went wrong",
                text2: "Please try again",
              });
        })
    }
    const updataOrderEntran = () => {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          
          
          const stat = "Endtransac";
        
            var order = {
                status : stat,
                dateOrderFinish: Date.now()
            }
        

        axios.put(`${baseURL}restaurant/orders/${props.idx}`,order ,config).then((res) =>{
            if (res.status == 200 || res.status == 201) {
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: "Order Edited",
                  text2: "",
                });
                setTimeout(() => {
                    
                }, 500);
              }
            })
            .catch((error) => {
              Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Something went wrong",
                text2: "Please try again",
              });
        })
    }
    const updataOrderCancel = () => {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          var order = {};
          
          const stat = "Cancel";
        if (stat == "Waiting" || stat == "Cooking" || stat == "Finish") {
            order = {
                status : stat
            };
        }else{
            order = {
                status : stat,
                dateOrderFinish: Date.now()
            }
        }

        axios.put(`${baseURL}restaurant/orders/${props.idx}`,order ,config).then((res) =>{
            if (res.status == 200 || res.status == 201) {
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: "Order Edited",
                  text2: "",
                });
                setTimeout(() => {
                    
                }, 500);
              }
            })
            .catch((error) => {
              Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Something went wrong",
                text2: "Please try again",
              });
        })
    }
    const updataOrderLack = () => {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          var order = {};
          
          const stat = "Lack";
        if (stat == "Waiting" || stat == "Cooking" || stat == "Finish") {
            order = {
                status : stat
            };
        }else{
            order = {
                status : stat,
                dateOrderFinish: Date.now()
            }
        }

        axios.put(`${baseURL}restaurant/orders/${props.idx}`,order ,config).then((res) =>{
            if (res.status == 200 || res.status == 201) {
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: "Order Edited",
                  text2: "",
                });
                setTimeout(() => {
                    
                }, 500);
              }
            })
            .catch((error) => {
              Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Something went wrong",
                text2: "Please try again",
              });
        })
    }
    


    

    

    return (
        <View style={styles.container}>
            <View style={styles.cardcontainer}>
                <View style={styles.YellowBar}></View>

                <View style={styles.FirstRow}>

                    <View><Text style={[styles.OrderNumberTextTitle, { backgroundColor: '#ECE6DA', padding: 8 }]}>ออเดอร์</Text></View>
                    <View><Text style={styles.OrderNumberTextValue}>{props.ordernumber.substring(21, 24)}</Text></View>

                    <View style={{ marginLeft: 'auto' }}><Text style={styles.TimeValueText}>{props.timeclock.substring(11, 16)}</Text></View>
                    <View style={{ marginLeft: 5 }}><Text style={styles.TimeUnitText}>น.</Text></View>
                </View>


                <FlatList
                    data={props.menu}
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

                <View style={styles.TotalCountsRow}>
                    <Text style={styles.TotalCountsText}>ยอดรวม</Text>
                </View>

                <View style={styles.TotalPricesRow}>
                    <Text style={styles.TotalPricesText}>{props.totalPrice} ฿</Text>
                </View>

                <View style={styles.BtnContainer}>
                    {/* <View style={{ backgroundColor: '#DDDDDD', padding: 8, borderRadius: 15 }}><Text style={styles.GetOrderText}>รับออเดอร์แล้ว</Text></View> */}
                    {orderstatus === "Waiting" ? <View><TouchableOpacity style={styles.NotEnContainer} onPress={() => {setOrderstate({ ...orderstate, submitBox: true })}}><AntDesign name="check" size={26} color="#000" /></TouchableOpacity></View>
                        : null}
                    {orderstatus === "Cooking" ? <View><TouchableOpacity style={styles.NotEnContainer} onPress={() => {setOrderstate({ ...orderstate, cookedBox: true })} }><Text style={{ fontFamily: 'pr-reg', fontSize: 16 }}>เตรียมอาหารเสร็จแล้ว</Text></TouchableOpacity></View>
                        : null}
                    {orderstatus === "Waiting" ? <View style={styles.NotEnContainer}><TouchableOpacity onPress={() => {setOrderstate({ ...orderstate, fooddemandBox: true }) }}><Text style={styles.SubmitButtonText}>วัตถุดิบไม่เพียงพอ</Text></TouchableOpacity></View>
                        : null}
                    {orderstatus === "Finish" ? <View style={styles.NotEnContainer}><TouchableOpacity onPress={() => {setOrderstate({ ...orderstate, receivedBox: true })}}><Text style={styles.NotEnBtnText}>ลูกค้าได้รับอาหารแล้ว</Text></TouchableOpacity></View>
                        : null}
                    {orderstatus === "Endtransac" || orderstatus === "Lack" || orderstatus === "Cancel" ? null
                        : <View style={styles.NotEnContainer}><TouchableOpacity onPress={() => {setOrderstate({ ...orderstate, cancelBox: true }) }} ><AntDesign name="close" size={24} color="#FF0A0A" /></TouchableOpacity></View>}


                </View>

            </View >

            <Modal transparent={true} visible={orderstate.submitBox === undefined ? false : orderstate.submitBox}>
                <View style={styles.ModelBackground}>
                    <View style={styles.ModalContainer}>
                        <View ><Text style={styles.SubmitOrderText}>รับออเดอร์นี้ ทำการยืนยัน</Text></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 20, paddingHorizontal: 40 }}>
                            <View style={styles.TouchContainer}><TouchableOpacity onPress={() => { setorderstatus("Cooking") , setOrderstate({ ...orderstate, submitBox: false }), updataOrderCooking() }}><Text style={styles.SubmitButtonText}>ยืนยัน</Text></TouchableOpacity></View>
                            <View style={styles.TouchBackContainer}><TouchableOpacity onPress={() => setOrderstate({ ...orderstate, submitBox: false })}><Text style={styles.closeButtonTxt}>ย้อนกลับ</Text></TouchableOpacity></View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal transparent={true} visible={orderstate.fooddemandBox === undefined ? false : orderstate.fooddemandBox}>
                <View style={styles.ModelBackground}>
                    <View style={styles.ModalContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}><Text style={styles.NotEnText}>ปฏิเสธออเดอร์ เนื่องด้วยวัตถุดิบไม่เพียงพอ</Text></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 20, paddingHorizontal: 40 }}>
                            <View style={styles.TouchContainerRed}><TouchableOpacity onPress={() => { setorderstatus("Lack")  , setOrderstate({ ...orderstate, fooddemandBox: false }), updataOrderLack() }}><Text style={styles.SubmitForCCButtonText}>ยืนยัน</Text></TouchableOpacity></View>
                            <View style={styles.TouchBackContainer}><TouchableOpacity onPress={() => setOrderstate({ ...orderstate, fooddemandBox: false })}><Text style={styles.closeButtonTxt}>ย้อนกลับ</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal transparent={true} visible={orderstate.cancelBox === undefined ? false : orderstate.cancelBox}>
                <View style={styles.ModelBackground}>
                    <View style={styles.ModalContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}><Text style={styles.NotEnText}>ปฏิเสธออเดอร์นี้ ทำการยืนยัน</Text></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 20, paddingHorizontal: 40 }}>
                            <View style={styles.TouchContainerRed}><TouchableOpacity onPress={() => { setorderstatus("Cancel") ,setOrderstate({ ...orderstate, cancelBox: false }),  updataOrderCancel() }}><Text style={styles.SubmitForCCButtonText}>ยืนยัน</Text></TouchableOpacity></View>
                            <View style={styles.TouchBackContainer}><TouchableOpacity onPress={() => setOrderstate({ ...orderstate, cancelBox: false })}><Text style={styles.closeButtonTxt}>ย้อนกลับ</Text></TouchableOpacity></View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal transparent={true} visible={orderstate.cookedBox === undefined ? false : orderstate.cookedBox}>
                <View style={styles.ModelBackground}>
                    <View style={styles.ModalContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}><Text style={styles.SubmitOrderText}>เตรียมอาหารเสร็จแล้ว ทำการยืนยัน</Text></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 20, paddingHorizontal: 40 }}>
                            <View style={styles.TouchContainer}><TouchableOpacity onPress={() => {setorderstatus("Finish")  , setOrderstate({ ...orderstate, cookedBox: false }),  updataOrderFinish() }}><Text style={styles.SubmitButtonText}>ยืนยัน</Text></TouchableOpacity></View>
                            <View style={styles.TouchBackContainer}><TouchableOpacity onPress={() => setOrderstate({ ...orderstate, cookedBox: false })}><Text style={styles.closeButtonTxt}>ย้อนกลับ</Text></TouchableOpacity></View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal transparent={true} visible={orderstate.receivedBox === undefined ? false : orderstate.receivedBox}>
                <View style={styles.ModelBackground}>
                    <View style={styles.ModalContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}><Text style={styles.SubmitOrderText}>ลูกค้าได้รับอาหารแล้ว ทำการยืนยัน</Text></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 20, paddingHorizontal: 40 }}>
                            <View style={styles.TouchContainer}><TouchableOpacity onPress={() => { setorderstatus("Endtransac")  ,setOrderstate({ ...orderstate, receivedBox: false }),  updataOrderEntran()}}><Text style={styles.SubmitButtonText}>ยืนยัน</Text></TouchableOpacity></View>
                            <View style={styles.TouchBackContainer}><TouchableOpacity onPress={() => setOrderstate({ ...orderstate, receivedBox: false })}><Text style={styles.closeButtonTxt}>ย้อนกลับ</Text></TouchableOpacity></View>
                        </View>
                    </View>
                </View>
            </Modal>



        </View >
    )


}

const styles = StyleSheet.create({
    container: { width: '100%', alignSelf: 'stretch', backgroundColor: '#fff', alignItems: 'center', backgroundColor: '#FFF' },
    cardcontainer: { borderRadius: 15, width: 500 / Dimensions.get('window').width + 350, backgroundColor: '#fff', alignSelf: 'center', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 5, shadowOpacity: 0.26, marginTop: 20 },

    YellowBar: { borderTopLeftRadius: 15, borderTopEndRadius: 15, width: '100%', backgroundColor: 'yellow', height: 10 },

    FirstRow: { flexDirection: 'row', padding: 20, alignItems: 'center' },
    IndexText: { fontFamily: 'pr-bold', marginRight: 10, fontSize: 16 },
    OrderNumberTextTitle: { fontFamily: 'pr-bold', marginRight: 5, fontSize: 16 },
    OrderNumberTextValue: { fontFamily: 'pr-bold', color: '#000', fontSize: 16 },

    TimeValueText: { fontFamily: 'pr-reg', color: '#8B8B8B', fontSize: 16 },
    TimeUnitText: { fontFamily: 'pr-reg', fontSize: 16, color: '#8B8B8B', },

    SecondRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, alignItems: 'center' },
    CustomerNameText: { fontFamily: 'pr-light', color: '#8B8B8B', marginTop: -10, fontSize: 16 },

    MenuRow: { flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', backgroundColor: '#FCFCFC' },
    MenuText: { fontFamily: 'pr-reg', fontSize: 16 },
    CountingText: { fontFamily: 'pr-reg', fontSize: 16 },
    PricesText: { fontFamily: 'pr-reg', color: '#8B8B8B', fontSize: 16 },

    TotalCountsRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 5 },
    TotalCountsText: { fontFamily: 'pr-reg', marginLeft: 'auto', fontSize: 20 },

    TotalPricesRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16 },
    TotalPricesText: { fontFamily: 'pr-bold', color: '#000', marginLeft: 'auto', fontSize: Dimensions.get('window').height * .03, fontSize: 20 },

    GetOrderText: { fontFamily: 'pr-reg', color: '#FFF', fontSize: Dimensions.get('window').height < 1000 ? 12 : 14 },
    BtnContainer: { flexDirection: 'row', justifyContent: 'space-between', margin: 20, alignItems: 'center' },
    SubmitContainer: { backgroundColor: '#FFFC1B', padding: 8, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1, },
    SubmitBtnText: { fontFamily: 'pr-reg', color: '#000', fontSize: Dimensions.get('window').height < 1000 ? 14 : 16 },
    SubmitForCCButtonText: { fontFamily: 'pr-reg', color: '#FF0A0A', fontSize: Dimensions.get('window').height < 1000 ? 14 : 16, textAlign: 'center' },
    NotEnContainer: { backgroundColor: '#FFF', padding: 10, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1, paddingHorizontal: 10 },
    NotEnBtnText: { fontFamily: 'pr-reg', color: '#000', fontSize: 16 },
    CancelContainer: { backgroundColor: '#FFF', padding: 8, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1, },
    CancelBtnText: { fontFamily: 'pr-reg', color: '#000', fontSize: Dimensions.get('window').height < 1000 ? 14 : 16 },
    TouchBtnAccept: { backgroundColor: '#FFF', padding: 5, borderRadius: 15, borderWidth: 3, borderColor: '#FFFC1B' },
    TouchBtnCancel: { backgroundColor: '#FFF', padding: 5, borderRadius: 15, borderWidth: 3, borderColor: '#FF0A0A' },


    ModalContainer: { alignSelf: 'center', width: 350, backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 30, borderRadius: 15, justifyContent: 'center', marginTop: Dimensions.get('window').height > Dimensions.get('window').width ? '40%' : '10%' },
    ModelBackground: { backgroundColor: '#000000aa', flex: 1 },
    SubmitOrderText: { fontFamily: 'pr-light', color: '#000', fontSize: 16, marginVertical: 10, textAlign: 'center' },
    NotEnText: { fontFamily: 'pr-light', color: '#000', fontSize: 16, marginVertical: 10, textAlign: 'center' },

    TouchContainer: { backgroundColor: '#FFFC1B', borderRadius: 15, marginTop: 10, padding: 8, width: 80, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 },
    TouchContainerGray: { backgroundColor: '#F5F5F5', borderRadius: 15, marginTop: 10, padding: 8, width: 80, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 },
    TouchContainerRed: { backgroundColor: '#FFF', borderColor: 'red', borderWidth: 1, borderRadius: 15, marginTop: 10, padding: 8, width: 80, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 },
    SubmitButtonText: { fontFamily: 'pr-reg', textAlign: 'center', fontSize: 16 },
    TouchBackContainer: { backgroundColor: '#FFF', borderRadius: 15, marginTop: 10, padding: 8, width: 80, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 },
    closeButtonTxt: { fontFamily: 'pr-reg', textAlign: 'center', fontSize: Dimensions.get('window').height < 1000 ? 14 : 16, color: '#000' },

})


export default OrderList;

