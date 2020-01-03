import * as React from 'react';
import DatePicker from 'react-native-datepicker'
import { Button, Picker, Text, TextInput, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';


const { width: WIDTH } = Dimensions.get('window')
export default class testDate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
             
        }
    }
    componentWillMount(){
        var mydate = "2017-06-28T00:00:00";
     weekDayName =  moment(mydate).format('dddd');
     console.warn("state "+weekDayName)
    }


    render() {
        // const { navigation } = this.props;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var fulldate = date + ":" + month + ":" + year

        var d = '2019-11-24';
        var stdate = moment(d);
        var enddate = moment('2022-11-30T12:09:09');
        var daysingivenmonth = moment("2012-02", "YYYY-MM").daysInMonth() // 29
        
        var mydate = "2017-06-28T00:00:00";
        var weekDayName =  moment(mydate).format('dddd');
        console.warn(weekDayName)
        var monthDayName =  moment(mydate).format('MMMM'); 
        console.warn(monthDayName)

        // moment('2010-10-20').isSame('2009-12-31', 'year');  // false
        // moment('2010-10-20').isSame('2010-01-01', 'year');  // true
        // moment('2010-10-20').isSame('2010-12-31', 'year');  // true
        // moment('2010-10-20').isSame('2011-01-01', 'year');  // false

        // var stdate = moment('2019-11-24 10:29:23'); with time moment
        // var enddate = moment('2019-11-30 11:06:55');
        return (

            <KeyboardAvoidingView behavior="padding" style={{ height: '100%', width: '100%' }}>
                <ImageBackground
                    source={require('../assets/bglogo.png')}
                    style={styles.container}>


                    <View style={styles.overlayContainer}>

                        <View style={styles.top}>
                            <Text style={styles.header}>Test Date</Text>
                            <Text>date: {date}</Text>
                            <Text>month: {month}</Text>
                            <Text>year: {year}</Text>
                            <Text>hours: {hours}</Text>
                            <Text>Mins: {min}</Text>
                            <Text>Secs: {sec}</Text>
                            <Text>fulldate: {fulldate}</Text>
                            <Text>TIME DIFFERNCE</Text>
                            <Text>diff in hours: {enddate.diff(stdate, 'hours')}</Text>
                            <Text>diff in mins: {enddate.diff(stdate, "minutes")}</Text>
                            <Text>diff in mins: {enddate.diff(stdate, "seconds")}</Text>
                            <Text>diff in milisecs: {enddate.diff(stdate)}</Text>
                            <Text>diff in days: {enddate.diff(stdate, 'days')}</Text>
                            <Text>diff in months: {enddate.diff(stdate, 'months')}</Text>
                            <Text>diff in years: {enddate.diff(stdate, 'years')}</Text>
                            <Text>Days in given month: {daysingivenmonth}</Text>
                    

                         

                    

                            <View style={styles.infoView}>

                            </View>
                        </View>
                    </View>



                </ImageBackground>

            </KeyboardAvoidingView>



        );
    }

}


const styles = StyleSheet.create({

    header: {
        marginTop: 30,
        color: '#fff',
        fontSize: 24,
        borderColor: '#fff',
        borderWidth: 2,
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: 'rgba(255,255,255,.1)'

    },

    container: {
        flex: 1,
        flex: 1,
        width: '100%',
        height: '100%',

    },
    overlayContainer: {
        flex: 1,
        backgroundColor: 'rgba(47,163,218,.7)',
    },
    top: {
        marginTop: "2%",
        alignItems: 'center',
        justifyContent: 'center',
    },


    info: {
        color: '#fff',
        fontSize: 18,



    },
    infoView: {
        flexDirection: 'row',
        flexWrap: 'wrap',

    },

    MainContainer:
    {
        flex: 1,
        width: null,
        height: 1000,
        justifyContent: 'center',
        alignItems: 'center',

        // Set hex color code here.
        backgroundColor: '#B6D2E6',
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: '#ffffff',
        marginHorizontal: 25
    },
    pickercontainer: {
        height: 45,
        borderRadius: 45,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        marginHorizontal: 25,
        marginTop: '5%'
    },

    dataContainer:
    {
        marginLeft: '4%',
        marginTop: 10
    },

    btn: {
        width: '30%',
        height: 45,
        borderRadius: 25,
        backgroundColor: '#432577',
        justifyContent: 'center',
        marginLeft: 50,
    },
    text: {
        color: 'rgba(255,255,2550,0.7)',
        fontSize: 16,
        textAlign: 'center'
    },


    inputIcon: {
        position: 'absolute',
        top: 10,
        left: 37
    },
    container: {
        flex: 1,
        flex: 1,
        width: '100%',
        height: '100%',

    },
    resondec: {
        color: '#fff',
        fontSize: 18,
        width: '90%',
        height: '28%',
        borderWidth: 1,
        borderColor: '#ffffff',
        margin: '4%',
        padding: '4%'
    },

});


