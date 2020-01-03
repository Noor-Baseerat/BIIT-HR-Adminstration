import * as React from 'react';
import DatePicker from 'react-native-datepicker'
import { Animated, Alert, Button, Text, TextInput, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, FlatList, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';




const { width: WIDTH } = Dimensions.get('window')
export default class leaveRequestList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // employeeid:'',
            // fname:'',
            // lname:'',
            // designation:''
            DataSource: [],
            id: '',
            anim: true
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
        //  this.showData()
    }
    UNSAFE_componentWillUpdate = () => {
        // setTimeout(() => {
        //     this.GetData()
        // }, 9000)

    }

    navigateWithItemDetails = (id, lid) => {
        this.props.navigation.navigate('leaveRequestByDate', {
            Tid: id,
            Tlid: lid,
            // otherParam: 'anything you want here',
        });
        //  this.showData()
    }

    GetData = () => {
        //10.0.2.2
        console.warn(global.IP)
        fetch('http://'+global.IP+'/fypAPI/api/users/LeaveRequest')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ DataSource: responseData })
                console.warn(this.state.DataSource)
            }).catch((err) => {
                console.warn(err)
            });
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
    callfun = (id) => {
        this.setState({ id: id })
        console.warn(this.state.id)
    }
    DeleteLeave = () => {
        //10.0.2.2

        id = this.state.id;
        console.warn(global.IP)
        fetch('http://'+global.IP+'/fypAPI/api/users/DeleteLeave?id=' + id + '')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ DataSource: responseData })
                console.warn(this.state.DataSource)
            }).catch((err) => {
                console.warn(err)
            });
        this.componentDidMount()
        this.render()

    }
    Dialog = () => {
        this.setState({ anim: false })
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
                { text: 'Delete', onPress: () => this.DeleteLeave() },
            ],
            { cancelable: false },
        );
    }

    renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        if (this.state.anim === true) {
            return (
                <Button style={styles.header} title="Delete" onPress={this.Dialog}>
                    <Animated.Text
                        style={[
                            styles.header,
                            {
                                transform: [{ translateX: trans }],
                            },
                        ]}>
                        Archive
            </Animated.Text>
                </Button>
            );
        }
    };

    render() {
        return (

            <ImageBackground
                source={require('../assets/bglogo.png')}
                style={styles.container}>


                <View style={styles.overlayContainer}>
                    <View style={styles.top}>


                        <Text style={styles.header}>Leave Requests</Text>

                    </View>

                    <FlatList
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        ListHeaderComponent={this.renderHeader}
                        extraData={this.state}
                        data={this.state.DataSource}
                        //renderItem={this.GetData()}
                        //onRefresh={this.GetData()}
                        // renderItem={({ item }) => <Text style={styles.item}>{item.id}{item.name}{item.designation}     {item.status}</Text>
                        // }
                        renderItem={({ item }) =>

                            <Swipeable
                                renderRightActions={this.renderRightActions}
                                onSwipeableWillOpen={() => this.callfun(item.id)}
                                onSwipeableClose={() => this.setState({ anim: true })}
                            >

                                <TouchableWithoutFeedback onPress={() => this.navigateWithItemDetails(item.id, item.lid)}>
                                    <View style={{ flexDirection: 'row', justifyContent: "flex-start", }}>
                                        <Image
                                            style={{ width: 60, height: 70, borderWidth: 2, borderColor: "black", marginLeft: '5%', marginTop: '2%' }}
                                            source={require('../assets/person.png')}
                                        />
                                        <Text style={{ width: '26%', height: 70, fontSize: 20, color: '#fff', textAlign: "left", marginLeft: '16%', lineHeight: 35 }}>
                                            {item.efname} {item.elname}{'\n'}{item.designation}
                                        </Text>
                                        <Text style={{ width: '26%', height: 70, fontSize: 20, color: '#fff', textAlign: "left", marginLeft: '4%', marginTop: '3%' }}>
                                            {item.leave_type}
                                        </Text>

                                    </View>
                                </TouchableWithoutFeedback>
                            </Swipeable>
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
        padding: 20,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: 'rgba(255,255,255,.1)',
        marginBottom: '5%'

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


