import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { FlatList } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

export default function AnalyticMain() {

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: '24 ชม.' },
        { key: 'second', title: 'วันในสัปดาห์' },
        { key: 'third', title: 'เดือน' },
    ]);

    const renderScene = SceneMap({
        first: DayRoute,
        second: WeekRoute,
        third: MonthRoute,
    });

    return (
        <TabView
            swipeEnabled={false}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}

        />

    );
}

const DayRoute = (props) => {

    const labellist = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
    const datalist = [0, 0, 0, 0, 0, 0, 0, 0, 90, 535, 225, 635, 1130, 295, 195, 165, 125, 0, 0, 0, 0, 0, 0, 0,]
    const dayofweeklist = ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"]
    const todayindex = 4

    const [maxtotal, setmaxtotal] = useState()
    const [maxtimeindex, setmaxtimeindex] = useState()
    const [yesterdaytotal, setyesterdaytotal] = useState(2965)
    const [todaytotal, settodaytotal] = useState()

    function findMaxTotal(arrlist) {
        setmaxtotal(Math.max.apply(null, arrlist))
        settodaytotal(datalist.reduce(function (acc, val) { return acc + val; }, 0))
    }

    // function findMaxIndex(maxval) {
    //     setmaxattime(datalist.findIndex(maxval))
    // }

    useEffect(() => {
        findMaxTotal(datalist)
        let tempindex = datalist.indexOf(maxtotal)
        setmaxtimeindex(tempindex)
    }, [maxtotal])


    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ backgroundColor: '#FFF' }}>
            <View style={styles.container}>
                <View style={styles.CardContainer}>
                    <View><Text style={styles.TotalText}>ยอดรวมของร้านอาหาร</Text></View>
                    <View><Text style={styles.TextTitleHeader}>ภาพรวม (24 ชม.)</Text></View>
                    <View><Text style={[styles.TextTitleHeader, { fontSize: 16, fontFamily: 'pr-light', marginTop: 16 }]}>วัน{dayofweeklist[todayindex]} 19-03-64</Text></View>
                    <View style={styles.LineChartContainer}>
                        <LineChart
                            data={{
                                datasets: [
                                    {
                                        data: datalist
                                    }
                                ]
                            }}
                            width={windowWidth}// from react-native
                            height={280}

                            yAxisSuffix=" ฿"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#FFFFEF",
                                backgroundGradientTo: "#F1F1E7",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(87, 195, 192, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {

                                    borderRadius: 16,

                                },
                                propsForDots: {
                                    r: "2",
                                    strokeWidth: "2",
                                    stroke: "#378885"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}

                        />
                    </View>

                    <View style={styles.dataContainer}>

                        <View style={styles.column1}>
                            <Text style={styles.changeFont}>ยอดสูงสุดที่ช่วง</Text>
                            <Text style={styles.changeFont}>เป็นจำนวน</Text>
                            <Text style={[styles.changeFont, { fontFamily: 'pr-bold', marginVertical: 8 }]}>ยอดรวมตอนนี้</Text>
                            <Text style={styles.changeFont}>เทียบกับเมื่อวาน</Text>
                        </View>
                        <View style={styles.column2}>
                            <Text style={styles.changeFont}>{maxtimeindex == undefined ? <Text>กำลังโหลด...</Text> : labellist[maxtimeindex]}</Text>
                            <Text style={styles.changeFont}>{maxtotal == undefined ? <Text>กำลังโหลด...</Text> : maxtotal}</Text>
                            <Text style={[styles.changeFont, { marginVertical: 8, fontFamily: 'pr-bold' }]}>{todaytotal == undefined ? <Text>กำลังคำนวณ...</Text> : todaytotal} </Text>
                            <Text style={styles.changeFont}>{yesterdaytotal == undefined ? <Text>กำลังโหลด...</Text> : (todaytotal > yesterdaytotal ? <Text style={{ color: 'green' }}>+{todaytotal - yesterdaytotal}</Text> : <Text style={{ color: 'red' }}>{todaytotal - yesterdaytotal}</Text>)}</Text>

                        </View>
                        <View>
                            <Text style={styles.changeFont}>น.</Text>
                            <Text style={styles.changeFont}>บาท</Text>
                            <Text style={[styles.changeFont, { marginVertical: 8, fontFamily: 'pr-bold' }]}>บาท</Text>
                            <Text style={styles.changeFont}>บาท</Text>

                        </View>
                    </View>

                </View>
            </View>

            <View style={{ marginBottom: 24 }}><Text style={[styles.TextTitleHeader, { textAlign: 'center' }]}>กราฟละเอียด</Text></View >
            <View style={{ marginLeft: 20 }}><Text style={styles.TextSubTitleHeader}>Tip : กราฟสามารถเลื่อนซ้ายขวา</Text></View>


            <ScrollView style={{ backgroundColor: '#FFF' }} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.LineChartContainer2}>

                    <LineChart
                        data={{
                            labels: labellist,
                            datasets: [
                                {
                                    data: datalist
                                }
                            ]
                        }}
                        width={1000}// from react-native
                        height={280}

                        yAxisSuffix=" ฿"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#FFFFEF",
                            backgroundGradientTo: "#F1F1E7",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(87, 195, 192, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {

                                borderRadius: 16,

                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#378885"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}

                    />

                </View>

            </ScrollView>
        </ScrollView >
    );

}

const WeekRoute = (props) => {

    const labellist = ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"]
    const datalist = [3625, 3420, 2184, 3158, 3395, 0, 0]


    const [maxtotal, setmaxtotal] = useState()
    const [maxtimeindex, setmaxtimeindex] = useState()
    const [weektotal, setweektotal] = useState()


    function findMaxTotal(arrlist) {
        setmaxtotal(Math.max.apply(null, arrlist))
        setweektotal(datalist.reduce(function (acc, val) { return acc + val; }, 0))
    }

    // function findMaxIndex(maxval) {
    //     setmaxattime(datalist.findIndex(maxval))
    // }

    useEffect(() => {
        findMaxTotal(datalist)
        let tempindex = datalist.indexOf(maxtotal)
        setmaxtimeindex(tempindex)
    }, [maxtotal])


    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ backgroundColor: '#FFF' }}>
            <View style={styles.container}>
                <View style={styles.CardContainer}>
                    <View><Text style={styles.TotalText}>ยอดรวมของร้านอาหาร</Text></View>
                    <View><Text style={styles.TextTitleHeader}>ในสัปดาห์นี้ (7วัน)</Text></View>
                    <View><Text style={[styles.TextTitleHeader, { fontSize: 16, fontFamily: 'pr-light', marginTop: 16 }]}>สัปดาห์ที่ 3 </Text></View>

                    <View style={styles.LineChartContainer}>
                        <LineChart
                            data={{
                                labels: labellist,
                                datasets: [
                                    {
                                        data: datalist
                                    }
                                ]
                            }}
                            width={windowWidth}// from react-native
                            height={280}

                            yAxisSuffix=" ฿"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#FFFFEF",
                                backgroundGradientTo: "#F1F1E7",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(87, 195, 192, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {

                                    borderRadius: 16,

                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#378885"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}

                        />
                    </View>

                    <View style={styles.dataContainer}>

                        <View style={styles.column1}>
                            <Text style={styles.changeFont}>ยอดสูงสุดคือวัน</Text>
                            <Text style={styles.changeFont}>เป็นจำนวน</Text>
                            <Text style={[styles.changeFont, { fontFamily: 'pr-bold', marginVertical: 8 }]}>ยอดรวมสัปดาห์นี้</Text>


                        </View>
                        <View style={styles.column2}>
                            <Text style={styles.changeFont}>{maxtimeindex == undefined ? <Text>กำลังโหลด...</Text> : labellist[maxtimeindex]}</Text>
                            <Text style={styles.changeFont}>{maxtotal == undefined ? <Text>กำลังโหลด...</Text> : maxtotal}</Text>
                            <Text style={[styles.changeFont, { fontFamily: 'pr-bold', marginVertical: 8 }]}>{weektotal}</Text>
                        </View>
                        <View>
                            <Text style={styles.changeFont}></Text>
                            <Text style={styles.changeFont}>บาท</Text>
                            <Text style={[styles.changeFont, { fontFamily: 'pr-bold', marginVertical: 8 }]}>บาท</Text>
                        </View>


                    </View>

                    <View style={{ width: '100%', backgroundColor: '#FFF', padding: 16, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, }}>
                        <View style={{ marginBottom: 16 }}><Text style={[styles.TextTitleHeader, { textAlign: 'center' }]}>(แสดงยอดรายวัน)</Text></View>
                        <View style={styles.dayverticallist}><Text style={[styles.generalfont, { flex: .4 }]}>จันทร์</Text><Text style={[styles.generalfont, { flex: .6, color: 'grey' }]}>{datalist[0]} ฿</Text></View>
                        <View style={styles.dayverticallist}><Text style={[styles.generalfont, { flex: .4 }]}>อังคาร</Text><Text style={[styles.generalfont, { flex: .6, color: 'grey' }]}>{datalist[1]} ฿</Text></View>
                        <View style={styles.dayverticallist}><Text style={[styles.generalfont, { flex: .4 }]}>พุธ</Text><Text style={[styles.generalfont, { flex: .6, color: 'grey' }]}>{datalist[2]} ฿</Text></View>
                        <View style={styles.dayverticallist}><Text style={[styles.generalfont, { flex: .4 }]}>พฤหัสบดี</Text><Text style={[styles.generalfont, { flex: .6, color: 'grey' }]}>{datalist[3]} ฿</Text></View>
                        <View style={styles.dayverticallist}><Text style={[styles.generalfont, { flex: .4 }]}>ศุกร์</Text><Text style={[styles.generalfont, { flex: .6, color: 'grey' }]}>{datalist[4]} ฿</Text></View>
                        <View style={styles.dayverticallist}><Text style={[styles.generalfont, { flex: .4 }]}>เสาร์</Text><Text style={[styles.generalfont, { flex: .6, color: 'grey' }]}>{datalist[5]} ฿</Text></View>
                        <View style={styles.dayverticallist}><Text style={[styles.generalfont, { flex: .4 }]}>อาทิตย์</Text><Text style={[styles.generalfont, { flex: .6, color: 'grey' }]}>{datalist[6]} ฿</Text></View>

                    </View>

                </View>
            </View>


        </ScrollView >
    );

}

const MonthRoute = (props) => {

    const labellist = ["สัปดาห์ที่ 1", "สัปดาห์ที่ 2", "สัปดาห์ที่ 3", "สัปดาห์ที่ 4", "สัปดาที่เหลือ"]
    const datalist = [14735, 16230, 15782, 0, 0]

    const [maxtotal, setmaxtotal] = useState()
    const [maxtimeindex, setmaxtimeindex] = useState()
    const [monthtotal, setmonthtotal] = useState()


    function findMaxTotal(arrlist) {
        setmaxtotal(Math.max.apply(null, arrlist))
        setmonthtotal(datalist.reduce(function (acc, val) { return acc + val; }, 0))

    }

    useEffect(() => {
        findMaxTotal(datalist)
        let tempindex = datalist.indexOf(maxtotal)
        setmaxtimeindex(tempindex)
    }, [maxtotal])


    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ backgroundColor: '#FFF', margin: 0 }}>
            <View style={styles.container}>
                <View style={styles.CardContainer}>
                    <View><Text style={styles.TotalText}>ยอดรวมของร้านอาหาร</Text></View>
                    <View><Text style={styles.TextTitleHeader}>ในเดือนนี้ (4 สัปดาห์ 3 วัน)</Text></View>
                    <View><Text style={[styles.TextTitleHeader, { fontSize: 16, fontFamily: 'pr-light', marginTop: 16 }]}>สัปดาห์ที่ 3 </Text></View>
                    <View style={styles.LineChartContainer}>
                        <LineChart
                            data={{
                                labels: labellist,
                                datasets: [
                                    {
                                        data: datalist
                                    }
                                ]
                            }}
                            width={windowWidth}// from react-native
                            height={280}
                            yAxisSuffix=" ฿"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#FFFFEF",
                                backgroundGradientTo: "#F1F1E7",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(87, 195, 192, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {

                                    borderRadius: 16,

                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#378885"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,

                            }}

                        />
                    </View>

                    <View style={styles.dataContainer}>

                        <View style={styles.column1}>
                            <Text style={styles.changeFont}>ยอดสูงสุดอยู่ใน</Text>
                            <Text style={styles.changeFont}>เป็นจำนวน</Text>
                            <Text style={[styles.changeFont, { fontFamily: 'pr-bold', marginVertical: 8 }]}>ยอดรวมเดือนนี้</Text>


                        </View>
                        <View style={styles.column2}>
                            <Text style={styles.changeFont}>{maxtimeindex == undefined ? <Text>กำลังโหลด...</Text> : labellist[maxtimeindex]}</Text>
                            <Text style={styles.changeFont}>{maxtotal == undefined ? <Text>กำลังโหลด...</Text> : maxtotal}</Text>
                            <Text style={[styles.changeFont, { fontFamily: 'pr-bold', marginVertical: 8 }]}>{monthtotal == undefined ? <Text>กำลังโหลด...</Text> : monthtotal}</Text>

                        </View>
                        <View>
                            <Text style={styles.changeFont}></Text>
                            <Text style={styles.changeFont}>บาท</Text>
                            <Text style={[styles.changeFont, { fontFamily: 'pr-bold', marginVertical: 8 }]}>บาท</Text>

                        </View>

                    </View>
                    <View style={{ width: '100%', backgroundColor: '#FFF', padding: 16, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, shadowOpacity: 0.26, }}>
                        <View style={{ marginBottom: 16 }}><Text style={[styles.TextTitleHeader, { textAlign: 'center' }]}>(ยอดรายสัปดาห์)</Text></View>
                        <View style={styles.dayverticallist}><Text style={[styles.generalfont, { flex: .4 }]}>สัปดาห์ที่ 1</Text><Text style={[styles.generalfont, { flex: .6, color: 'grey' }]}>{datalist[0]} ฿</Text></View>
                        <View style={styles.dayverticallist}><Text style={[styles.generalfont, { flex: .4 }]}>สัปดาห์ที่ 2</Text><Text style={[styles.generalfont, { flex: .6, color: 'grey' }]}>{datalist[1]} ฿</Text></View>
                        <View style={styles.dayverticallist}><Text style={[styles.generalfont, { flex: .4 }]}>สัปดาห์ที่ 3</Text><Text style={[styles.generalfont, { flex: .6, color: 'grey' }]}>{datalist[2]} ฿</Text></View>
                        <View style={styles.dayverticallist}><Text style={[styles.generalfont, { flex: .4 }]}>สัปดาห์ที่ 4</Text><Text style={[styles.generalfont, { flex: .6, color: 'grey' }]}>{datalist[3]} ฿</Text></View>
                        <View style={styles.dayverticallist}><Text style={[styles.generalfont, { flex: .4 }]}>ที่เหลือ</Text><Text style={[styles.generalfont, { flex: .6, color: 'grey' }]}>{datalist[4]} ฿</Text></View>

                    </View>

                </View>
            </View>



        </ScrollView >
    );

}



const styles = StyleSheet.create({
    container: { flex: 1, height: '100%', width: '100%', alignSelf: 'stretch', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', },
    TextTitleHeader: { fontFamily: 'pr-reg', fontSize: 18 },
    TextSubTitleHeader: { fontFamily: 'pr-light', fontSize: 16, marginBottom: 15 },
    TotalText: { fontFamily: 'pr-bold', fontSize: 20, marginBottom: 16 },
    CardContainer: { flex: 1, height: '100%', width: '100%', alignItems: 'center', padding: 20, alignContent: 'center', backgroundColor: '#FFF' },
    dataContainer: { flex: 1, flexDirection: 'row', width: '100%', marginBottom: 25 },
    column1: { marginRight: 20 },
    column2: { marginRight: 10 },
    changeFont: { fontFamily: 'pr-reg', fontSize: 16 },
    LineChartContainer: { marginBottom: '5%' },
    LineChartContainer2: { backgroundColor: '#FFF', flexDirection: 'row', marginBottom: '5%', marginLeft: 20, marginRight: 20 },

    dayverticallist: { width: '100%', flex: 1, flexWrap: 'wrap', flexDirection: 'row', marginBottom: 8 },
    generalfont: { fontFamily: 'pr-reg', fontSize: 16 }
});


