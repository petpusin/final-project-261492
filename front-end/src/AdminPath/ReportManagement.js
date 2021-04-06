import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { MaterialIcons } from '@expo/vector-icons';

const ReportManagement = props => {
    const tabledataset = {
        tableHead: ['#', 'หัวข้อ', 'จากผู้ใช้', 'บทบาท', 'รายละเอียด'],
        tableData: [
            ['1', 'ได้อาหารไม่ตรง', 'cust01', 'Customer', 'รายละเอียด'],
            ['2', 'ลูกค้าไม่มารับอาหาร', 'rest01', 'Restaurant', 'รายละเอียด'],
        ]
    }

    const element = (data, index) => (
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => props.navigation.navigate('ReportingDetail')}>
            <MaterialIcons name="more-horiz" size={24} color="black" />
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
                                        <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text} />
                                    ))
                                }
                            </TableWrapper>
                        ))
                    }
                </Table>

            </ScrollView>

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
    btnText: { textAlign: 'center', color: '#000', fontFamily: 'pr-reg', fontSize: Dimensions.get('window').height * .016 }

});


export default ReportManagement