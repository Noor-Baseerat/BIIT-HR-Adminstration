import * as React from 'react';
import DatePicker from 'react-native-datepicker'
import { TouchableWithoutFeedback, ActivityIndicator, Alert, Animated, Button, Text, TextInput, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, FlatList } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';



const { width: WIDTH } = Dimensions.get('window')
export default class EmployeeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            DataAdapter: [],
            eid: '',

            noteArray: [],
        };
    }
    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    navigateWithItemDetails = (eid) => {
        this.props.navigation.navigate('modifyEmployee', {
            Tid: eid,
            // otherParam: 'anything you want here',
        });
        //  this.showData()
    }

    GetData = () => {
        //10.0.2.2
        //  setTimeout(() => {
        fetch('http://' + global.IP + '/fypAPI/api/users/GetEmployees')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ DataAdapter: responseData })
                this.setState({ inSearchData: responseData })
                this.setState({ isLoading: false });

            }).catch((err) => {
                console.warn(err)
            });

        // this.setState({DataAdapter: []});

        //   }, 2000)
    }
    DeleteEmployee = () => {
        //10.0.2.2

        eid = this.state.eid;
        fetch('http://' + global.IP + '/fypAPI/api/users/DeleteEmployee?eid=' + eid + '')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ DataSource: responseData })
                //console.warn(this.state.DataSource)
            }).catch((err) => {
                console.warn(err)
            });
        this.componentDidMount()
    }
    StatusAddNote = (stat, eid) => {
        if (stat == "enable")
            stat = "disable"
        else if (stat == "disable")
            stat = "enable"
        this.state.noteArray.push({
            'status': stat,
        });
        console.warn(this.state.noteArray)
        //  this.setState({ dialogVisible: false });

        fetch('http://' + global.IP + '//fypAPI/api/users/ModifyEmployeeStatus?eid=' + eid + '', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'

            }, body: JSON.stringify(this.state.noteArray[0])
        }).then((Response) => Response.json()).then((responseData) => {
            console.warn(responseData)

            this.setState({ noteArray: [] });
            //this.state.noteArray.length = 0;

        })

        this.componentDidMount()


    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.GetData();
    }
    callfun = (eid) => {

        this.setState({ eid: eid })
        this.Dialog()
        console.warn(this.state.eid)
    }
    Dialog = () => {

        Alert.alert(
            'Confirm Delete',
            'Are You Sure You Want To Delete?',
            [
                //  {text: 'Ask me later', onPress: () => this.DeleteLeave()},
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Delete', onPress: () => this.DeleteEmployee() },
            ],
            { cancelable: false },
        );
    }
    searchEmployee = value => {
        const filteredContacts = this.state.inSearchData.filter(employee => {
            let contactLowercase = (
                employee.efname +
                ' ' +
                employee.elname
            ).toLowerCase();

            let searchTermLowercase = value.toLowerCase();

            return contactLowercase.indexOf(searchTermLowercase) > -1;
        });
        this.setState({ DataAdapter: filteredContacts });
    };

    renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        // console.warn(progress)

        return (

            <Animated.View
                style={[
                    {
                        width: 40,
                        transform: [{ translateX: trans }],
                        marginHorizontal: -19.81
                    },
                ]}>
                <Icon name='ios-trash' size={40} color={'rgba(255, 0, 0, 0.5);'} />
            </Animated.View>

        );




    };

    renderItem = ({ item }) => (
        <Swipeable
            renderRightActions={this.renderRightActions}
            onSwipeableOpen={() => this.callfun(item.eid)}


            extraData={this.state}

        >
            <TouchableWithoutFeedback onPress={() => this.navigateWithItemDetails(item.eid)}>
                < View style={item.status === "enable" ? styles.enable : styles.disable}>
                    <View style={{ width: '26%', height: 75,alignContent:'flex-start'  }}>
                    <Image
                        style={{ width: 60, height: 70, }}
                        source={{uri: `data:image/gif;base64,${item.pic}`}}
                    />
                    </View>
                    <Text style={{ width: '25%', fontSize: 16, height: 50, color: '#fff', textAlign: "left" }}>{this.Capitalize(item.efname + "")} {this.Capitalize(item.elname + "")}</Text>
                    <Text style={{ width: '25%', fontSize: 16, height: 50, color: '#fff', textAlign: "left" }}>{item.designation}</Text>

                    <TouchableOpacity style={styles.btnstat}
                        onPress={() => this.StatusAddNote(item.status, item.eid)}
                    >
                        <Text style={{ color: '#fff', textAlign: "center" }}>{item.status.toUpperCase()}</Text>
                    </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>
        </Swipeable>
    );

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                    margin: 5
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
                        <Text style={styles.header}>Employee</Text>
                        <TouchableOpacity style={styles.addemp}
                            onPress={() => this.props.navigation.navigate('addEmployeeScreen')}
                        >
                            <Icon name='md-person-add' size={50} color={'rgba(255,255,255,0.7)'} />
                        </TouchableOpacity>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={'Search Name'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent'
                                onChangeText={value => this.searchEmployee(value)}   ///textinput ki value usernameTxt me hogi

                            />
                        </View>
                    </View>
                    <View style={styles.flatHeader}>
                        <Text style={{ width: '24%', fontSize: 16, height: 50, color: 'black', textAlign: "left", fontWeight: "500" }}>PICTURE</Text>
                        <Text style={{ width: '20%', fontSize: 16, height: 50, color: 'black', textAlign: "center", fontWeight: "500" }}>NAME</Text>
                        <Text style={{ width: '33%', fontSize: 16, height: 50, color: 'black', textAlign: "left", fontWeight: "500" }}>DESIGNATION</Text>
                        <Text style={{ width: '20%', fontSize: 16, height: 50, color: 'black', textAlign: "left", fontWeight: "500" }}>STATUS</Text>



                    </View>
                    {this.state.isLoading ? (
                        <View
                            style={{
                                ...StyleSheet.absoluteFill,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <ActivityIndicator size="large" color="black" />
                        </View>
                    ) : null}
                    <FlatList
                        data={this.state.DataAdapter}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 50
                                }}

                            >
                                <Text style={{ color: 'black' }}>No Employees Found</Text>
                            </View>
                        )}
                    />

                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    enable: {
        flexDirection: 'row', justifyContent: "center",
    },
    disable: {
        flexDirection: 'row', justifyContent: "center", backgroundColor: 'rgba(255,0,0,.3)'
    },
    btnstat: {
        borderRadius: 2,
        backgroundColor: '#432577',
        justifyContent: 'center',
        width: '20%', fontSize: 16, height: 35, color: '#fff', textAlign: "center",
    },
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
    addemp: {
        position: 'absolute',
        top: -15,
        right: 20
    },
    flatHeader: {
        flexDirection: "row",
        width: '100%',
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,.3)',
        paddingTop: 35,
        marginBottom: "4%"
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
        marginTop: "15%",
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
        padding: 10,
        fontSize: 20,
        height: 50,
        paddingLeft: 30,
        color: '#fff',
        //  borderColor: '#fff',
        //  borderBottomWidth: 2,
        margin: 5
    },
    input: {
        width: WIDTH - 45,
        height: 40,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: '#ffffff',
        marginHorizontal: 25
    },

    inputContainer:
    {
        alignItems: 'center',
        marginTop: 15,
        marginBottom: -10
    },
});