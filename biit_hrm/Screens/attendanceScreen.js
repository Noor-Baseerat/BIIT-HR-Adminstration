import * as React from 'react';
import DatePicker from 'react-native-datepicker'
import { Button, Text, TextInput, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, FlatList,AsyncStorage,TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';



const { width: WIDTH } = Dimensions.get('window')
export default class attendanceScreen extends React.Component {
    constructor() {
        super()
        this.state = {
        // employeeid:'',
        // fname:'',
        // lname:'',
        // designation:''
        date:''
        }
    }
    // showData = async () => {
    //     let myArray = await AsyncStorage.getItem('myArray')
    //     dat = JSON.parse(myArray)
    //     this.setState({ employeeid: dat.employeeid })
    //     this.setState({ fname: dat.fname })
    //     this.setState({ lname: dat.lname })
    //     this.setState({ designation: dat.designation })

    //     console.warn(this.state.employeeid)
    //     console.warn(this.state.fname)
    //     console.warn(this.state.lname)
    //     console.warn(this.state.designation)
    // }

    componentDidMount = () => {
        this.GetData()
    }

 
    GetData = () => {
        //10.0.2.2
        
        dat=this.state.date;
        fetch('http://10.0.2.2/fypAPI/api/users/AttendanceSearch?date='+dat+'')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ DataSource: responseData })
                console.warn(this.state.DataSource)
            }).catch((err) => {
                console.warn(err)
            });
    }
    navigateWithItemDetails = (id) => {
        this.props.navigation.navigate('employeeAttendanceHistory', {
            Tid:id,

           // otherParam: 'anything you want here',
        });
        //  this.showData()
    }
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                    margin: 5,

                }}
            />
        );
    }


    render() {
        return (

            <ImageBackground
                source={require('../assets/bglogo.png')}
                style={styles.container}>


                <View style={styles.overlayContainer}>
                    <View style={styles.top}>
                        <Text style={styles.header}>ATTENDANCE</Text>
                    </View>
                    <View style={styles.inputContainer}>
                                <DatePicker
                                    style={styles.datetimepicker}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="Select Date"
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
                                            marginLeft: 0,
                                        },
                                        dateInput: {
                                            marginLeft: 36,
                                            borderWidth: 0,
                                        }
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => {
                                         this.setState({ date: date }) 
                                         this.GetData()
                                        }

                                    }
                                  />
                            </View>
                    <View style={styles.flatHeader}>
                        <Text style={{ width:'12%',fontSize: 16,height: 50,color: '#fff',textAlign:"center"}}>ID</Text>
                        <Text style={{ width:'26%',fontSize: 16,height: 50,color: '#fff',textAlign:"center" }}>NAME</Text>
                        <Text style={{ width:'40%',fontSize: 16,height: 50,color: '#fff',textAlign:"center" }}>DESIGNATION</Text>
                        <Text style={{ width:'18%',fontSize: 16,height: 50,color: '#fff',textAlign:"center" }}>STATUS</Text>
                        
                    </View>
                    <FlatList
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        ListHeaderComponent={this.renderHeader}
                        data={this.state.DataSource}
                        // renderItem={({ item }) => <Text style={styles.item}>{item.id}{item.name}{item.designation}     {item.status}</Text>
                        // }
                        renderItem={({ item }) =>
                        <TouchableWithoutFeedback  onPress ={() => this.navigateWithItemDetails(item.eid)}>
                         < View style={{ flexDirection: 'row',justifyContent:"center" }}>
                        <Text style={{ width:'12%',fontSize: 16,height: 50,color: '#fff' ,textAlign:"center"}}>{item.eid}</Text>
                        <Text style={{ width:'26%',fontSize: 16,height: 50,color: '#fff',textAlign:"center"}}>{item.efname} {item.elname}</Text>
                        <Text style={{ width:'40%',fontSize: 16,height: 50,color: '#fff',textAlign:"center" }}>{item.designation}</Text>
                        <Text style={{width:'18%',fontSize: 16,height: 50,color: '#fff',textAlign:"center" }}>{item.status}</Text>
                      
                    </View>
                    </TouchableWithoutFeedback>
                    }
                    // keyExtractor={item => item.id}
                    />


                </View>
            </ImageBackground>





        );
    }

}


const styles = StyleSheet.create({

    header: {
        color: '#fff',
        fontSize: 24,
        borderColor: '#fff',
        borderWidth: 2,
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: 'rgba(255,255,255,.1)'

    },
    inputContainer:
    {
        alignItems: 'center',
        marginBottom:3
    },
    datetimepicker: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 35,
        fontSize: 16,
        paddingLeft: 45,
        paddingRight: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    flatHeader:{
        flexDirection:"row",
         width: '100%',
         height:"8%", 
         justifyContent:"center",
          alignItems: "center",
          backgroundColor: 'rgba(255,255,255,.2)',
          paddingTop: 35,
          marginBottom:"4%"
    },
    container: {
        flex: 1,
        flex: 1,
        width: '100%',
        height: '100%',

    },
    overlayContainer: {
        flex: 1,
        backgroundColor: 'rgba(47,163,218,.6)'
    },
    top: {
        marginTop: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    menuContainer: {
        height: '40%',
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    info: {
        color: '#fff',
        fontSize: 18,



    },
    infoView: {
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    item: {
        fontSize: 20,
        height: 50,
        paddingLeft: 15,
        color: '#fff',
        //  borderColor: '#fff',
        //  borderBottomWidth: 2,

        //flexDirection:"row",
    },
});


