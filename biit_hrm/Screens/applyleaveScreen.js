import * as React from 'react';
import DatePicker from 'react-native-datepicker'
import { Picker, Button, Text, TextInput, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, KeyboardAvoidingView, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';



const { width: WIDTH } = Dimensions.get('window')
export default class applyleaveScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "Second Screen",
            noteArray: [],
            isLoading: true,
            dataSource: [],
            employeeid: '',
            fname: '',
            lname: '',
            designation: '',
            status: 'pending',
            leavetype: 'Select Leave Type',
            render:''

        }
    }
    componentDidMount = () => {
        this.showData()

    }
    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    showData = async () => {
        let myArray = await AsyncStorage.getItem('myArray')
        dat = JSON.parse(myArray)
        this.setState({ employeeid: dat.employeeid })
        this.setState({ fname: dat.fname })
        this.setState({ lname: dat.lname })
        this.setState({ designation: dat.designation })
        console.warn(this.state.employeeid)
    }
    addNote = () => {
        this.state.noteArray.push({
            'lid': this.state.employeeid,
            // 'name': this.state.nameTxt,
            // 'designation': this.state.designTxt,
            'sdate': this.state.date,
            'edate': this.state.date1,
            'leave_type': this.state.leavetype,
            'description': this.state.desTxt,
            'lstatus': this.state.status
        });

        //this.setState({ dialogVisible: false });

        fetch('http://'+global.IP+'/fypAPI/api/users/ApplyLeave', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'

            }, body: JSON.stringify(this.state.noteArray[0])
        }).then((Response) => Response.json()).then((responseData) => {
            alert(responseData)
            this.componentDidMount()
        })
        //this.showAlertDialog()

    }
    renderDate() {
        if (this.state.render === 'Sick') {
            return (
                <View>
                    <View style={styles.inputContainer}>
                        <DatePicker
                            style={styles.datetimepicker}
                            date={this.state.date}
                            mode="date"
                            placeholder="Date From"
                            format="YYYY-MM-DDThh:mm"   //'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'' or if small 'hh' then 12 hour format else for 'HH' 24 hour format
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
                    </View>
                    <View style={styles.inputContainer}>
                        <DatePicker
                            style={styles.datetimepicker}
                            date={this.state.date1}
                            mode="date"
                            placeholder="Date To"
                            format="YYYY-MM-DDThh:mm"
                            minDate="2016-05-01"
                            maxDate="2022-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    borderWidth: 0,
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date1) => { this.setState({ date1: date1 }) }}

                        />
                    </View>
                </View>

            )
        }
        else
            return null
    }
    renderTime() {
        if (this.state.render === 'Hourly') {
            return (
                <View>
                    <View style={styles.inputContainer}>
                    <DatePicker
                            style={styles.datetimepicker}
                            date={this.state.date}
                            mode="time"
                            placeholder="Time From"
                            format="YYYY-MM-DDThh:mm"
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
                            onDateChange={(date) => { this.setState({ date: date }) }}

                        />
                    </View>
                    <View style={styles.inputContainer}>
                    <DatePicker
                            style={styles.datetimepicker}
                            date={this.state.date1}
                            mode="time"
                            placeholder="Time To"
                            format="YYYY-MM-DDThh:mm"
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
                            onDateChange={(date1) => { this.setState({ date1: date1 }) }}

                        />
                    </View>
                </View>

            )
        }
        else
            return null
    }
    renderDateTime() {
        if (this.state.render === 'Short Leave') {
            return (
                <View>
                    <View style={styles.inputContainer}>
                    <DatePicker
                            style={styles.datetimepicker}
                            date={this.state.date}
                            mode="datetime"
                            placeholder="Date Time From"
                            format="YYYY-MM-DDThh:mm"
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
                    </View>
                    <View style={styles.inputContainer}>
                    <DatePicker
                            style={styles.datetimepicker}
                            date={this.state.date1}
                            mode="time"
                            placeholder="Date Time To"
                            format="YYYY-MM-DDThh:mm"
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
                            onDateChange={(date1) => { this.setState({ date1: date1 }) }}

                        />
                    </View>
                </View>

            )
        }
        else
            return null
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={{ height: '100%', width: '100%' }}>
                <ImageBackground
                    source={require('../assets/bglogo.png')}
                    style={styles.container}>


                    <View style={styles.overlayContainer}>
                        <View style={styles.top}>
                            <Text style={styles.header}>APPLY FOR LEAVE</Text>
                        </View>

                        <ScrollView>
                            <View style={styles.inputContainer}>
                                <Text
                                    style={styles.textdb}
                                    placeholder={'Name'}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    // onChangeText={nameTxt => this.setState({nameTxt})}
                                    underlineColorAndroid='transparent'>{this.Capitalize(this.state.fname)} {this.Capitalize(this.state.lname)}</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text
                                    style={styles.textdb}
                                    placeholder={'Designation'}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    //onChangeText={designTxt => this.setState({designTxt})}
                                    underlineColorAndroid='transparent'>{this.state.designation.toUpperCase()}</Text>
                            </View>
                            <View style={styles.pickercontainer}>
                                <Picker
                                    style={{ height: 45, width: '100%', fontSize: 16, paddingLeft: 45, color: '#ffffff', }}
                                    selectedValue={this.state.leavetype}
                                    onValueChange={(item, index) => {
                                        this.setState({ leavetype: item })
                                        this.setState({ date: '' })
                                        this.setState({ date1: '' })
                                        {
                                            if ((item == 'Sick')||(item == 'Casual')||(item == 'Earned')) {
                                                this.setState({ render: 'Sick' })
                                            }
                                            else if(item=='Hourly'){
                                                this.setState({ render: 'Hourly' })
                                            }
                                            else if(item=='Short Leave'){
                                                this.setState({ render: 'Short Leave' })
                                            }
                                            else{
                                                this.setState({ render: 'false' })
                                            }
                                        }
                                        console.warn(item)
                                    }}>
                                    <Picker.Item label="Select Leave Type" value="0" />
                                    <Picker.Item value="Sick" label="Sick"></Picker.Item>
                                    <Picker.Item value='Casual' label='Casual'></Picker.Item>
                                    <Picker.Item value='Short Leave' label='Short Leave'></Picker.Item>
                                    <Picker.Item value='Earned' label='Earned'></Picker.Item>
                                    <Picker.Item value='Hourly' label='Hourly'></Picker.Item>
                                </Picker>
                            </View>
                            <View>
                                {this.renderDate()}
                                {this.renderTime()}
                                {this.renderDateTime()}
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.descript}
                                    placeholder={'Description'}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    underlineColorAndroid='transparent'
                                    // multiline={true}
                                    onChangeText={desTxt => this.setState({ desTxt })}
                                />
                            </View>


                            <TouchableOpacity style={styles.btnLogin} onPress={this.addNote}>
                                <Text style={styles.text}>Submit</Text>
                            </TouchableOpacity>

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


