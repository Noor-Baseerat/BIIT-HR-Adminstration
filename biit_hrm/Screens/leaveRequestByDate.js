import * as React from 'react';
import DatePicker from 'react-native-datepicker'
import { Button, Picker, Text, TextInput, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const { width: WIDTH } = Dimensions.get('window')
export default class leaveRequestByDate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            DataAdpater: [],
            DataAdpater2: [],
            id: this.props.navigation.getParam('Tid', -1),
            leaveid: this.props.navigation.getParam('Tlid', -1),
            firstname: '',
            lastname: '',
            Designation: '',
            startdate: '',
            enddate: '',
            reason: '',
            totalleave: 8,
            availdays: '',
            remaingdays: '',
            status: '',
            noteArray: [],
            availdays: '',
            leavetype:''

        }
    }
    componentDidMount = () => {
        this.GetData()
    }
    GetDataleavecal = () => {

        lid = this.state.leaveid
        console.warn("lev" + this.state.leaveid)
        //10.0.2.2
        fetch('http://'+global.IP+'/fypAPI/api/users/RemaingHolidays?lid=' + lid + '')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ DataAdpater2: responseData })
                console.warn(this.state.DataAdpater2)
                // var availed
                var s
                var e
                var cd
                var totaldays = 0
                for (let i = 0; i < this.state.DataAdpater2.length; i++) {
                    s = moment(this.state.DataAdpater2[i].sdate);
                    e = moment(this.state.DataAdpater2[i].edate);
                    cd = e.diff(s, 'days')
                    totaldays = totaldays + cd
                }

                rd = 52 - totaldays;
                this.setState({ remaingdays: rd })




            }).catch((err) => {
                console.warn(err)
            });
    }

    GetData = () => {


        id = this.state.id;
        lid = this.state.leaveid
        console.warn("id" + this.state.id)
        console.warn("lev" + this.state.leaveid)
        //10.0.2.2
        fetch('http://'+global.IP+'/fypAPI/api/users/LeaveRequestFeed?id=' + id + '&lid=' + lid + '')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ DataAdpater: responseData })
                console.warn(this.state.DataAdpater)
                this.setState({ firstname: this.state.DataAdpater[0].efname })
                this.setState({ lastname: this.state.DataAdpater[0].elname })
                this.setState({ Designation: this.state.DataAdpater[0].designation })
                this.setState({ startdate: this.state.DataAdpater[0].sdate})
                this.setState({ enddate: this.state.DataAdpater[0].edate })
                this.setState({ leavetype: this.state.DataAdpater[0].leave_type })
                this.setState({ reason: this.state.DataAdpater[0].description })
                // console.warn("ye ha"+this.state.firstname)
                // console.warn(this.state.lastname)
                // console.warn(this.state.startdate)
                // console.warn(this.state.enddate)
                 console.warn(this.state.leavetype) 


                ///////////////////Avail Days
                var s = moment(this.state.startdate);
                var e = moment(this.state.enddate);
                cd = e.diff(s, 'days')
                this.setState({ availdays: cd })
                this.GetDataleavecal()

            }).catch((err) => {
                console.warn(err)
            });
    }

    StatusAddNote = (stat) => {
        this.state.noteArray.push({
            'lstatus': stat,
        });

        //  this.setState({ dialogVisible: false });
        id = this.state.id

        fetch('http://'+global.IP+'//fypAPI/api/users/ModifyLeaveStatus?a=' + id + '', {
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
        this.props.navigation.navigate('leaveRequestList')
        
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    renderByDate() {
        if ((this.state.leavetype === 'Sick')||(this.state.leavetype === 'Casual')||(this.state.leavetype === 'Earned')) {
            return (
                <View>
                   <View style={styles.dataContainer}>
                            <View style={styles.infoView}>
                                <Text style={styles.info}>Leave From                        :      </Text>
                                <Text style={styles.info}>  {moment(this.state.startdate).format("DD-MMM-YY")}</Text>
                            </View>
                        </View>
                        <View style={styles.dataContainer}>
                            <View style={styles.infoView}>
                                <Text style={styles.info}>Leave To                             :       </Text>
                                <Text style={styles.info}> {moment(this.state.enddate).format("DD-MMM-YY")}</Text>
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
                                <Text style={styles.info}>Leave From                        :      </Text>
                                <Text style={styles.info}>  {moment(this.state.startdate).format("hh:mm a")}</Text>
                            </View>
                        </View>
                        <View style={styles.dataContainer}>
                            <View style={styles.infoView}>
                                <Text style={styles.info}>Leave To                             :       </Text>
                                <Text style={styles.info}> {moment(this.state.enddate).format("hh:mm a")}</Text>
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
                                <Text style={styles.info}>In Date                                 :      </Text>
                                <Text style={styles.info}>  {moment(this.state.startdate).format("DD-MMM-YY")}</Text>
                            </View>
                        </View>
                   <View style={styles.dataContainer}>
                            <View style={styles.infoView}>
                                <Text style={styles.info}>Leave From                        :      </Text>
                                <Text style={styles.info}>  {moment(this.state.startdate).format("hh:mm a")}</Text>
                            </View>
                        </View>
                        <View style={styles.dataContainer}>
                            <View style={styles.infoView}>
                                <Text style={styles.info}>Leave To                             :       </Text>
                                <Text style={styles.info}> {moment(this.state.enddate).format("hh:mm a")}</Text>
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
                            <Text style={styles.header}>LEAVE REQUEST</Text>
                            <View style={styles.infoView}>

                                <Text style={styles.info}>Name:</Text>
                                <Text style={styles.info}>  {this.Capitalize(this.state.firstname)} {this.Capitalize(this.state.lastname)}</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.info}>Designation:</Text>
                                <Text style={styles.info}>  {this.state.Designation.toUpperCase()}</Text>
                            </View>


                        </View>

                        <View style={styles.dataContainer}>
                            <View style={styles.infoView}>
                                <Text style={styles.info}>Remaining Holidays         :     </Text>
                                <Text style={styles.info}> {this.state.remaingdays}</Text>
                            </View>
                        </View>

                        <View style={styles.dataContainer}>
                            <View style={styles.infoView}>
                                <Text style={styles.info}>Availed Holidays               :       </Text>
                                <Text style={styles.info}>{this.state.availdays} </Text>
                            </View>
                        </View>
                        {this.renderByDate()}
                        {this.renderByTime()}
                        {this.renderByDateTime()}
                        <View style={styles.dataContainer}>
                            <View style={styles.infoView}>
                                <Text style={styles.info}>Reason:</Text>
                            </View>
                        </View>


                        <Text style={styles.resondec} multiline={true}>{this.state.reason}</Text>




                        <View style={styles.infoView}>
                            <TouchableOpacity style={styles.btn}
                                onPress={() => this.StatusAddNote("Approved")}
                            >
                                <Text style={styles.text}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn}
                                onPress={() => this.StatusAddNote("Not Approved")}>
                                <Text style={styles.text}>Reject</Text>

                            </TouchableOpacity>
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


