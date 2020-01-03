import * as React from 'react';
import DatePicker from 'react-native-datepicker'
import { Button, Text, TextInput, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import mainScreen from './mainScreen';



const { width: WIDTH } = Dimensions.get('window')
export default class loginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPass: true,
            press: false,
            DataAdpater: [],
            employeeid: "",
            fname: "",
            lname: "",
            email: "",
            password: "",
            designation: "",
        }
    }
    saveData = () => {
        const { email, password, fname, lname, designation, employeeid } = this.state;
        //savedata with asyncStorage 
        let myArray = {
            employeeid: employeeid,
            email: email,
            password: password,
            fname: fname,
            lname: lname,
            designation: designation,
        }
        AsyncStorage.setItem('myArray',
            JSON.stringify(myArray));
    }



    GetData = () => {
        name = this.state.usernameTxt,
            pas = this.state.paswordTxt,
            //10.0.2.2
            fetch('http://'+global.IP+'/fypAPI/api/users/LoginUser?email=' + name + '&password=' + pas + '')
                .then((response) => response.json())
                .then((responseData) => {
                    this.setState({ DataAdpater: responseData })
                    console.warn(this.state.DataAdpater)
                    if (this.state.DataAdpater != "false") {
                        this.setState({ temp: this.state.DataAdpater[0].efname })
                        this.setState({ email: this.state.DataAdpater[0].email })
                        this.setState({ password: this.state.DataAdpater[0].password })
                        this.setState({ fname: this.state.DataAdpater[0].efname })
                        this.setState({ lname: this.state.DataAdpater[0].elname })
                        this.setState({ designation: this.state.DataAdpater[0].designation })
                        this.setState({ employeeid: this.state.DataAdpater[0].eid })

                        console.warn(this.state.email)


                        if (this.state.designation == "Admin") {
                            this.saveData();
                            this.props.navigation.navigate('mainScreenAdmin');

                        }
                        else {
                            this.saveData();
                            this.props.navigation.navigate('mainScreen');

                        }

                    }
                    else {
                        alert("False is return")
                    }
                }).catch((err) => {
                    console.warn(err)
                });
    }

    showPass = () => {
        if (this.state.press == false)
            this.setState({ showPass: false, press: true })
        else {
            this.setState({ showPass: true, press: false })
        }
    }
    // check = () => {
    //     this.GetData()
    //     if(this.state.status=="true"){
    //             console.warn("Work")
    //     }
    //             else{
    //             console.warn("NotWork")
    //             }

    // }
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={{ height: '100%', width: '100%' }}>

                <ImageBackground
                    source={require('../assets/bglogo.png')}
                    style={styles.container}>


                    <View style={styles.overlayContainer}>
                        <View style={styles.top}>
                            <Text style={styles.header}>Login</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name={'ios-person'} size={28} color={'rgba{255,255,255,0.7}'} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder={'Username'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent'
                                onChangeText={usernameTxt => this.setState({ usernameTxt })}   ///textinput ki value usernameTxt me hogi
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name={'ios-lock'} size={28} color={'rgba{255,255,255,0.7}'} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder={'Password'}
                                secureTextEntry={this.state.showPass} z
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent'
                                onChangeText={paswordTxt => this.setState({ paswordTxt })}  //////////////////////
                            />
                            <TouchableOpacity style={styles.btnEye}
                                onPress={this.showPass.bind(this)}>
                                <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255,255,255,0.7)'} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.btnLogin}
                            onPress={this.GetData}
                        >
                            <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>


                    </View>
                </ImageBackground>

            </KeyboardAvoidingView>



        );
    }

}


const styles = StyleSheet.create({

    header: {
        marginTop: 20,
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
        backgroundColor: 'rgba(47,163,218,.5)',
        paddingTop: '30%'
    },
    top: {
        marginBottom: "10%",
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
        color: 'rgba(255,255,2550,0.7)',
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
        color: 'rgba(255,255,2550,0.7)',
        marginHorizontal: 25
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

});


