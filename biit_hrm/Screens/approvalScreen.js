import * as React from 'react';
import DatePicker from 'react-native-datepicker'
import { Button, Picker, Text, TextInput, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';


const { width: WIDTH } = Dimensions.get('window')
export default class approvalScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            DataAdpater: [],
            employeeid: '',
            sdate: '',
            edate: '',
            fname: '',
            lname: '',
            designation: '',
            leavstat: '',
            leavetype: ''

        }
    }
    componentDidMount = () => {
        this.showData()

    }

    GetData = () => {


        lid = this.state.employeeid
        console.warn(this.state.employeeid)

        //10.0.2.2
        fetch('http://' + global.IP + '/fypAPI/api/users/Notification?a=' + lid + '')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ DataAdpater: responseData })
                console.warn(this.state.DataAdpater)
                this.setState({ sdate: this.state.DataAdpater.sdate })
                this.setState({ edate: this.state.DataAdpater.edate })
                this.setState({ leavstat: this.state.DataAdpater.lstatus })
                this.setState({ leavetype: this.state.DataAdpater.leave_type })
                //console.warn(this.state.DataAdpater)
                // console.warn("ye ha"+this.state.firstname)
                // console.warn(this.state.lastname)
                console.warn(this.state.DataAdpater.sdate)
                // console.warn(this.state.enddate)
                // console.warn(this.state.reason) 


                ///////////////////Avail Days


            }).catch((err) => {
                console.warn(err)
            });

    }

    showData = async () => {
        let myArray = await AsyncStorage.getItem('myArray')
        dat = JSON.parse(myArray)
        this.setState({ employeeid: dat.employeeid })
        this.setState({ fname: dat.fname })
        this.setState({ lname: dat.lname })
        this.setState({ designation: dat.designation })
        console.warn(this.state.employeeid)
        this.GetData()
    }

    //  this.setState({ dialogVisible: false });


    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    renderByDate() {
        if ((this.state.leavetype === 'Sick') || (this.state.leavetype === 'Casual') || (this.state.leavetype === 'Earned')) {
            return (
                <View>
                    <View style={styles.dataContainer}>
                        <View style={styles.infoView}>
                            <Text style={styles.info}>Leave From                        :      </Text>
                            <Text style={styles.info}> {moment(this.state.sdate).format("DD-MMM-YY")}</Text>
                        </View>
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.infoView}>
                            <Text style={styles.info}>Leave To                             :      </Text>
                            <Text style={styles.info}> {moment(this.state.edate).format("DD-MMM-YY")}</Text>
                        </View>
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.infoView}>
                            <Text style={styles.info}>Leave Status                      :      </Text>
                            <Text style={styles.info}>{this.Capitalize(this.state.leavstat)}</Text>
                        </View>
                    </View>
                </View>

            )
        }
        else
            return null
    }
    renderByTime() {
        if (this.state.leavetype === 'Hourly') {
            return (
                <View>
                    <View style={styles.dataContainer}>
                        <View style={styles.infoView}>
                            <Text style={styles.info}>Leave From                        :       </Text>
                            <Text style={styles.info}> {moment(this.state.sdate).format("hh:mm a")}</Text>
                        </View>
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.infoView}>
                            <Text style={styles.info}>Leave To                             :       </Text>
                            <Text style={styles.info}> {moment(this.state.sdate).format("hh:mm a")}</Text>
                        </View>
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.infoView}>
                            <Text style={styles.info}>Leave Status                      :        </Text>
                            <Text style={styles.info}>{this.Capitalize(this.state.leavstat)}</Text>
                        </View>
                    </View>
                </View>

            )
        }
        else
            return null
    }
    renderByDateTime() {
        if (this.state.leavetype === 'Short') {
            return (
                <View>
                    <View style={styles.dataContainer}>
                        <View style={styles.infoView}>
                            <Text style={styles.info}>In Date                                :      </Text>
                            <Text style={styles.info}> {moment(this.state.sdate).format("DD-MMM-YY")}</Text>
                        </View>
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.infoView}>
                            <Text style={styles.info}>Leave From                        :      </Text>
                            <Text style={styles.info}> {moment(this.state.sdate).format("hh:mm a")}</Text>
                        </View>
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.infoView}>
                            <Text style={styles.info}>Leave To                             :      </Text>
                            <Text style={styles.info}> {moment(this.state.edate).format("hh:mm a")}</Text>
                        </View>
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.infoView}>
                            <Text style={styles.info}>Leave Status                      :       </Text>
                            <Text style={styles.info}>{this.state.leavstat}</Text>
                        </View>
                    </View>
                </View>

            )
        }
        else
            return null
    }
    render() {
        // const { navigation } = this.props;
        return (

            <KeyboardAvoidingView behavior="padding" style={{ height: '100%', width: '100%' }}>
                <ImageBackground
                    source={require('../assets/bglogo.png')}
                    style={styles.container}>


                    <View style={styles.overlayContainer}>

                        <View style={styles.top}>
                            <Text style={styles.header}>NOTIFICATIONS</Text>
                            <View style={styles.infoView}>

                                <Text style={styles.info}>Name:</Text>
                                <Text style={styles.info}> {this.Capitalize(this.state.fname)} {this.Capitalize(this.state.lname)}</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.info}>Designation:</Text>
                                <Text style={styles.info}> {this.state.designation.toUpperCase()}</Text>
                            </View>


                        </View>

                        {this.renderByDate()}
                        {this.renderByTime()}
                        {this.renderByDateTime()}



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


