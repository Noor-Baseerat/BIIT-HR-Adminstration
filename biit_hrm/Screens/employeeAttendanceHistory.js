import * as React from 'react';
import DatePicker from 'react-native-datepicker'
import { Button, Picker, Text, TextInput, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, KeyboardAvoidingView,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';


const { width: WIDTH } = Dimensions.get('window')
export default class employeeAttendanceHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            eid: this.props.navigation.getParam('Tid', -1),
            DataSource:[],
            firstname:'',
            lastname:'',
            Designation:'',

        }
    }
    GetData = () => {
        //10.0.2.2
        
        dat=this.state.date;
        fetch('http://10.0.2.2/fypAPI/api/users/EmployeeAttendanceHistory?attid='+this.state.eid+'')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ DataSource: responseData })
                console.warn(this.state.DataSource)
                this.setState({ firstname: this.state.DataSource[0].efname })
                this.setState({ lastname: this.state.DataSource[0].elname })
                this.setState({ Designation: this.state.DataSource[0].designation })
            }).catch((err) => {
                console.warn(err)
            });
    }
    componentDidMount = () => {
        this.GetData()
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

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
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
                            <Text style={styles.header}>EMPLOYEE ATTENDANCE HISTORY</Text>
                            <View style={styles.infoView}>

                                <Text style={styles.info}>Name:</Text>
                                <Text style={styles.info}>  {this.Capitalize(this.state.firstname)} {this.Capitalize(this.state.lastname)}</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.info}>Designation:</Text>
                                <Text style={styles.info}>  {this.state.Designation.toUpperCase()}</Text>
                            </View>

                        </View>

                        <View style={styles.flatHeader}>
                            <Text style={{ width: '45%', fontSize: 16, height: 50, color: '#fff', textAlign: "center" }}>DATE</Text>
                            <Text style={{ width: '26%', fontSize: 16, height: 50, color: '#fff', textAlign: "center" }}>STATUS</Text>

                        </View>
                        <FlatList
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            ListHeaderComponent={this.renderHeader}
                            data={this.state.DataSource}
                            // renderItem={({ item }) => <Text style={styles.item}>{item.id}{item.name}{item.designation}     {item.status}</Text>
                            // }
                            renderItem={({ item }) =>
                                    < View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                        <Text style={{ width: '45%', fontSize: 16, height: 50, color: '#fff', textAlign: "center" }}>{item.date}</Text>
                                        <Text style={{ width: '18%', fontSize: 16, height: 50, color: '#fff', textAlign: "center" }}>{item.status}</Text>

                                    </View>
                               
                            }
                        // keyExtractor={item => item.id}
                        />

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
        backgroundColor: 'rgba(255,255,255,.1)',
        textAlign: 'center'

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
});


