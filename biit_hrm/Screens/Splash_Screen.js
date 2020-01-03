import * as React from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';





export default class Splash_Screen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "First Screen"
        }
    }
    componentWillMount() {
        setTimeout(() => {
            this.props.navigation.navigate('loginScreen');
        }, 1000)
    }
    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require("../assets/logo.png")}
                    />
                </View>

            </View>
        );
    }

}


const styles = StyleSheet.create({

    txt: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#B6D2E6",

    },
    MainContainer:
    {

        flex: 1,

        flexDirection: 'column',

        // Set hex color code here.
        backgroundColor: '#B6D2E6',
    },
    logoContainer:
    {
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        height: 190,
        width: 190,
        margin: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
});


