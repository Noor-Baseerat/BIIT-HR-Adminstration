import * as React from 'react';
import DatePicker from 'react-native-datepicker'
import { Button, Picker, Text, TextInput, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker'
import { RadioButton } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';



const { width: WIDTH } = Dimensions.get('window')
export default class addEmployeeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            noteArray: [],
            isLoading: true,
            dataSource: [],
            showPass: true,
            press: false,
            image: null,
            checked: 'm',
            base64string:'',
            

        }
    }

    addNote = () => {
        this.state.noteArray.push({
            'efname': this.state.fnameTxt,
            'elname': this.state.lnameTxt,
            'dob': this.state.date,
            'designation': this.state.designation,
            'cnic': this.state.cnicTxt,
            'phone': this.state.phoneTxt,
            'address': this.state.addTxt,
            'email': this.state.emailTxt,
            'password': this.state.paswordTxt,
            'pic': this.state.base64string,
            'gender':this.state.checked,
            'status': 'enable',
        });

        this.setState({ dialogVisible: false });

        fetch('http://'+global.IP+'//fypAPI/api/users/AddEmployee', {
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
        this.props.navigation.navigate('EmployeeScreen')

    }
    showPass = () => {
        if (this.state.press == false)
            this.setState({ showPass: false, press: true })
        else {
            this.setState({ showPass: true, press: false })
        }
    }
    componentDidMount() {
        this.getPermissionAsync();
        console.log('hi');
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, //All,Images,Videos
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        this.setState({ base64string: result.base64 })
        console.log('ye ha' + this.state.base64string);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };
    render() {
        const { checked } = this.state;
        let { image } = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" style={{ height: '100%', width: '100%' }}>
                <ImageBackground
                    source={require('../assets/bglogo.png')}
                    style={styles.container}>


                    <View style={styles.overlayContainer}>
                        <View style={styles.top}>
                            <Text style={styles.header}>ADD EMPLOYEE</Text>
                        </View>

                        <ScrollView>
                            <View style={styles.inputContainer}>
                                <ImageBackground source={require('../assets/addperson.png')} style={{ width: 120, height: 120, alignItems: 'center', justifyContent: 'center', marginBottom: '10%', }}>
                                    <TouchableOpacity onPress={this._pickImage}>
                                        <View style={{
                                            // borderWidth: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 150,
                                            height: 150,
                                            backgroundColor: 'rgba(0,0,0,0.35)',
                                            borderRadius: 80,
                                        }}>

                                            {image &&
                                                <Image source={{ uri: image }} style={{
                                                    borderWidth: 1,
                                                    borderColor: 'rgba(0,0,0,0.2)',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: 150,
                                                    height: 150,
                                                    backgroundColor: '#fff',
                                                    borderRadius: 80,
                                                }} />}
                                        </View>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'First Name'}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    underlineColorAndroid='transparent'
                                    onChangeText={fnameTxt => this.setState({ fnameTxt })}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'Last Name'}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    underlineColorAndroid='transparent'
                                    onChangeText={lnameTxt => this.setState({ lnameTxt })}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'CNIC'}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    underlineColorAndroid='transparent'
                                    onChangeText={cnicTxt => this.setState({ cnicTxt })}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'Phone'}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    underlineColorAndroid='transparent'
                                    onChangeText={phoneTxt => this.setState({ phoneTxt })}
                                />
                            </View>

                            <View style={styles.pickercontainer}>
                                <Picker
                                    style={{ height: 45, width: '100%', fontSize: 16, paddingLeft: 45, color: '#ffffff', }}
                                    selectedValue={this.state.designation}
                                    onValueChange={(item, index) => {
                                        this.setState({ designation: item })
                                        console.warn(item)
                                    }}>
                                    <Picker.Item label="Select Designation" value="0" />
                                    <Picker.Item value='Professor' label='Professor'></Picker.Item>
                                    <Picker.Item value='Assistant Professor' label='Assistant Professor'></Picker.Item>
                                    <Picker.Item value='Deputy Director ' label='Deputy Director'></Picker.Item>
                                    <Picker.Item value='Lecturer' label='Lecturer'></Picker.Item>
                                    <Picker.Item value='Junior Lecturer' label='Junior Lecturer'></Picker.Item>
                                    <Picker.Item value='Admin' label='Admin'></Picker.Item>
                                </Picker>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.addressbox}
                                    placeholder={'Address'}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    underlineColorAndroid='transparent'
                                    // multiline={true}
                                    onChangeText={addTxt => this.setState({ addTxt })}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <DatePicker
                                    style={styles.datetimepicker}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="Date of Birth"
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
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'Email'}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    underlineColorAndroid='transparent'
                                    onChangeText={emailTxt => this.setState({ emailTxt })}
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
                            <View style={styles.inputContainer}>
                                <Icon name={'ios-lock'} size={28} color={'rgba{255,255,255,0.7}'} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder={'Confrm Password'}
                                    secureTextEntry={this.state.showPass}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    underlineColorAndroid='transparent'

                                />
                                <TouchableOpacity style={styles.btnEye}
                                    onPress={this.showPass.bind(this)}>
                                    <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255,255,255,0.7)'} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 16,paddingLeft: 30,color: '#ffffff',marginTop:'3%'}}>Gender:   </Text>
                            <View style={{ alignItems: 'baseline', justifyContent: 'flex-start', flexDirection: 'row',paddingLeft: '14%' }}>

                                <RadioButton.Group
                                    onValueChange={(v) => { this.setState({ checked: v }) },console.warn(this.state.checked)}

                                >

                                    <RadioButton
                                        value="m"
                                        status={checked === 'm' ? 'checked' : 'unchecked'} //or true,false
                                        onPress={() => { this.setState({ checked: 'm' }); }}
                                        uncheckedColor="red"
                                        color="black"
                                    // disabled="false"
                                    />
                                    <Text style={styles.radiobuttontxt}>Male</Text>

                                    <RadioButton
                                        value="f"
                                        status={checked === 'f' ? 'checked' : 'unchecked'}
                                        onPress={() => { this.setState({ checked: 'f' }); }}
                                    />
                                    <Text style={styles.radiobuttontxt}>Female</Text>
                                    <RadioButton
                                        value="u"
                                        status={checked === 'u' ? 'checked' : 'unchecked'}
                                        onPress={() => { this.setState({ checked: 'u' }); }}
                                    />
                                    <Text style={styles.radiobuttontxt}>Undefined</Text>
                                </RadioButton.Group>
                            </View>




                            <TouchableOpacity style={styles.btnLogin}
                                onPress={this.addNote}>
                                <Text style={styles.text}>Add Employee</Text>
                            </TouchableOpacity>


                        </ScrollView>
                    </View>
                </ImageBackground>

            </KeyboardAvoidingView>



        );
    }

}


const styles = StyleSheet.create({
    radiobuttontxt: {
        color: 'rgba(255,255,255,0.7)',

    },
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
    pickercontainer: {
        height: 45,
        borderRadius: 45,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        marginHorizontal: 25,
        marginTop: '5%'
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
    addressbox: {
        width: WIDTH - 55,
        height: 90,
        borderRadius: 20,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: '#ffffff',
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

});


