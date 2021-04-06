import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { MaterialIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

const RestList = props => {
    const tabledataset = {
        tableHead: ['#', 'ชื่อผู้ใช้', 'สถานะ', 'แก้ไขสถานะ'],
        tableData: [
            ['1', 'rest01', 'ปกติ', 'แก้ไขสถานะ'],
            ['2', 'rest02', 'ปกติ', 'แก้ไขสถานะ'],
        ]
    }
    const [modal, setModal] = useState({
        statusState: false
    })
    const [Rest, setRest] = useState({
        RestStatus: 'normal'
    })
    const [temp, setTemp] = useState({
        tempStatus: ''
    })
    const element = (data, index) => (
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { setModal({ ...modal, statusState: true }) }}>
            <MaterialIcons name="mode-edit" size={24} color="black" />
        </TouchableOpacity>
    );
    return (

        <View style={styles.container}>

            <ScrollView style={{ width: '100%' }}>

                <Table borderStyle={{ borderColor: 'transparent' }}>
                    <Row data={tabledataset.tableHead} style={styles.head} textStyle={styles.text} />
                    {
                        tabledataset.tableData.map((rowData, index) => (
                            <TableWrapper key={index} style={styles.row}>
                                {
                                    rowData.map((cellData, cellIndex) => (
                                        <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                                    ))
                                }
                            </TableWrapper>
                        ))
                    }
                </Table>

            </ScrollView>
            <Modal transparent={true} visible={modal.statusState}>
                <View style={styles.ModelBackground}>
                    <View style={styles.ModalContainer}>
                        <View style={{ flexDirection: 'row' }}><Text style={[styles.titleText, { marginRight: 5 }]}>ชื่อผู้ใช้</Text><Text style={styles.titleTextValue}>rest01</Text></View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}><Text style={[styles.titleText, { marginRight: 5 }]}>สถานะปัจจุบัน</Text>{Rest.RestStatus === 'normal' ? <Text style={[styles.titleTextValue, { color: 'green' }]}>ปกติ</Text> : <Text style={[styles.titleTextValue, { color: 'red' }]}>ระงับการใช้งาน</Text>}</View>
                        <DropDownPicker
                            items={[
                                { label: 'ปกติ', value: 'normal' },
                                { label: 'ระงับการใช้งาน', value: 'banned' },

                            ]}
                            defaultValue={Rest.RestStatus}
                            dropDownMaxHeight={300}
                            placeholder="โปรดระบุ"
                            containerStyle={{ height: 40, marginBottom: 16 }}
                            style={{
                                backgroundColor: '#fafafa',
                                zIndex: 1
                            }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={(item) => setTemp({ ...temp, tempStatus: item.value })}
                            labelStyle={{
                                fontFamily: 'pr-reg',
                                color: '#000'
                            }}
                            selectedLabelStyle={{
                                color: '#000'
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', zIndex: 0 }}>
                            <View style={styles.TouchSubmitButton}><TouchableOpacity onPress={() => { setModal({ ...modal, statusState: false }), setRest({ ...Rest, RestStatus: temp.tempStatus }) }}><Text style={styles.SubmitButtonTxt}>บันทึก</Text></TouchableOpacity></View>
                            <View style={styles.TouchCloseButton}><TouchableOpacity onPress={() => setModal({ ...modal, statusState: false })}><Text style={styles.closeButtonTxt}>ปิด</Text></TouchableOpacity></View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >

    );

}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
    CardContainer: { marginTop: 50, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', margin: 20, width: 500 / Dimensions.get('window').width + 380, backgroundColor: "#FFF", shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, paddingVertical: 50, borderRadius: 15 },
    RestaurantCountingContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', paddingVertical: 5 },
    CountingTxt: { fontFamily: 'pr-reg', marginHorizontal: 5, fontSize: Dimensions.get('window').height * 0.021, color: '#909073' },
    CountingTxtNumber: { fontFamily: 'pr-reg', fontSize: Dimensions.get('window').height * 0.025 },

    Tablecontainer: { flex: 1, padding: 16, paddingTop: Dimensions.get('window').height * 0.05, backgroundColor: '#FFF', },
    head: { height: Dimensions.get('window').height * 0.15, backgroundColor: '#FFF' },
    text: { fontFamily: 'pr-reg', marginVertical: 15, fontSize: 14, textAlign: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#FFF', justifyContent: 'center', borderBottomColor: '#000', borderBottomWidth: .5, borderBottomColor: '#D3D2B3' },
    btn: { width: Dimensions.get('window').width * 0.18, height: Dimensions.get('window').height * 0.045, backgroundColor: '#FFFC1B', borderRadius: 15, justifyContent: 'center', padding: 5 },
    btnText: { textAlign: 'center', color: '#000', fontFamily: 'pr-reg', fontSize: Dimensions.get('window').height * .016 },

    ModalContainer: { alignSelf: 'center', backgroundColor: '#fff', width: 350, padding: 40, borderRadius: 15, justifyContent: 'center', height: 220, marginTop: Dimensions.get('window').height > Dimensions.get('window').width ? '40%' : '10%' },
    ModelBackground: { backgroundColor: '#000000aa', flex: 1 },
    CancelText: { textAlign: 'center', fontFamily: 'pr-light', color: '#000', fontSize: Dimensions.get('window').height < 1000 ? 16 : 18, marginVertical: 10 },
    TouchBackButton: { borderRadius: 15, marginTop: 10, padding: 10, width: 80, alignSelf: 'center' },
    closeButtonTxt: { fontFamily: 'pr-reg', textAlign: 'center', fontSize: Dimensions.get('window').height < 1000 ? 14 : 16 },

    titleText: { fontFamily: 'pr-reg', fontSize: 16 },
    titleTextValue: { fontFamily: 'pr-reg', fontSize: 16, color: 'grey' },


    TouchSubmitButton: { backgroundColor: '#FFFC1B', borderRadius: 15, marginTop: 10, padding: 10, width: 100, alignSelf: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 },
    SubmitButtonTxt: { fontFamily: 'pr-reg', textAlign: 'center', fontSize: Dimensions.get('window').height < 1000 ? 14 : 16 },
    TouchCloseButton: { backgroundColor: '#FFF', borderRadius: 15, marginTop: 10, padding: 10, width: 80, alignSelf: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, elevation: 2, shadowOpacity: 0.1 }
});


export default RestList