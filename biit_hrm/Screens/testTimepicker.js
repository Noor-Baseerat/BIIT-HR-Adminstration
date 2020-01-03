import * as React from 'react';
import DatePicker from 'react-native-datepicker'
import { Picker, Button, Text, TextInput, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, KeyboardAvoidingView, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';



const { width: WIDTH } = Dimensions.get('window')
export default class applyleaveScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           

        }
    }
   

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={{ height: '100%', width: '100%' }}>
                <ImageBackground
                    source={require('../assets/bglogo.png')}
                    style={styles.container}>


                    <View style={styles.overlayContainer}>
                        <View style={styles.top}>
                            <Text style={styles.header}>Date Time Picker</Text>
                        </View>

                        <ScrollView>
                            <View style={styles.inputContainer}>
                        <DatePicker
                            style={styles.datetimepicker}
                            date={this.state.date}
                            mode="date"
                            placeholder="Date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2022-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    borderWidth: 0,

                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}

                        />
                         <View style={styles.inputContainer}>
                             <DatePicker
                            style={styles.datetimepicker}
                            date={this.state.date1}
                            mode="time"
                            placeholder="Time"
                            format="hh:mm:ss a"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                
                                dateInput: {
                                    marginLeft: 36,
                                    borderWidth: 0,
                                    

                                }
                                // ... You can check the source to find the other keys.
                            }}
                            iconComponent={
                                <Icon 
                                style={{ position: 'absolute',left: 0,top: 8,marginLeft: 0}}
                                size={30}
                                color='#fff' 
                                name='ios-time' 
                                /> 
                             }
                            onDateChange={(date) => { this.setState({ date1: date }) }}

                        />
                        </View>
                        <View style={styles.inputContainer}>
                             <DatePicker
                            style={styles.datetimepicker}
                            date={this.state.date2}
                            mode="datetime"
                            placeholder="Date Time"
                            format="YYYY-MM-DD-hh-mm-ss a"
                            minDate="2016-05-01"
                            maxDate="2022-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    borderWidth: 0,

                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date2: date }) }}

                        />
                        </View>
                    </View>
                    

                        </ScrollView>
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
        backgroundColor: 'rgba(47,163,218,.7)'
    },
    top: {
        marginTop: "2%",
        alignItems: 'center',
        justifyContent: 'center'
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
    textdb: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: '#ffffff',
        marginHorizontal: 25,
        paddingTop: '3%'
    },

    inputContainer:
    {
        alignItems: 'center',
        marginTop: 20
    },

    btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#432577',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 30,
        marginBottom: 30
    },
    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
    datetimepicker: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        paddingRight: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    descript: {
        width: WIDTH - 55,
        height: 90,
        borderRadius: 20,
        fontSize: 16,
        paddingLeft: 45,
        paddingRight: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: '#ffffff',
        marginHorizontal: 25,

    },

    inputIcon: {
        position: 'absolute',
        top: 10,
        left: 37
    },
    btnEye: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    container: {
        flex: 1,
        flex: 1,
        width: '100%',
        height: '100%',

    },
    pickercontainer: {
        height: 45,
        borderRadius: 45,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        marginHorizontal: 25,
        marginTop: '5%'
    },

});


