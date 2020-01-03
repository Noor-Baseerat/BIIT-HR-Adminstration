import * as React from 'react';
import DatePicker from 'react-native-datepicker'
import { Picker, Button, Text, TextInput, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, KeyboardAvoidingView, AsyncStorage } from 'react-native';


export default class applyleaveScreen extends React.Component {
    state = { render: false }

    renderButton() {
        if (this.state.render === true) {
            return (
                <View style={styles.bottomButton}>
                    <Button
                        title="Add Employee"
                        color="green"

                        onPress={() => this.props.navigation.navigate('addEmployeeScreen')}
                    >
                        <Text style={{ color: 'grey', fontSize: 12 }}>Reached</Text>
                    </Button>
                    <Button
                        title="Add Employee"
                        color="green"

                        onPress={() => this.props.navigation.navigate('addEmployeeScreen')}
                    >
                        <Text style={{ color: 'grey', fontSize: 12 }}>Reached</Text>
                    </Button>
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
                            <Text style={styles.header}>Conditional Rendering</Text>
                        </View>


                        <Text>hello</Text>
                        <TouchableOpacity onPress={() => {
                            if (this.state.render == false) {
                                 this.setState({ render: true }) 
                            }
                            else if (this.state.render == true) {
                                 this.setState({ render: false }) 
                            }
                        }
                        }>
                            <Text style={styles.text}>Render</Text>
                        </TouchableOpacity>
                        {this.renderButton()}





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

    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: 'lightgrey',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: '80%',
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    buttonContainer: {
        marginTop: 30,
        marginBottom: 5,
        marginLeft: 15,
        height: 25,
        flexDirection: 'row',
        width: '40%',
        borderRadius: 30,
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E0E1E1',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#E0E1E1',
    },
    detailContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '40%'
    },
    displayPicStyle: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    modalStyle: {
        borderRadius: 10,
        marginTop: Dimensions.get('screen').height * .30,
        width: '100%',
        marginLeft: 0,
        backgroundColor: 'white',
        height: '100%',
    },
    buttonContainer: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        borderRadius: 5,
        position: 'relative',
    },
    bottomButton: {
        position: 'absolute',
        top: '75%',
        left: 25,
        bottom: 10,
        right: 25,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 7
    }



});


