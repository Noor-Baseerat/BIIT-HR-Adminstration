import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {withNavigation} from 'react-navigation';

const Menu = ({navigation, item}) => {
    return (

        <View  style={styles.menuItem} >
            <TouchableOpacity onPress={() => (item.itemText==="Apply for leave") ? navigation.navigate('applyleaveScreen'): (item.itemText==="Attendance") ? navigation.navigate('attendanceScreen'): navigation.navigate('approvalScreen')}>
            {(item.itemText==="Apply for leave") ? <Image
                    source={require('../assets/approval.png')}
                    style={styles.image} /> : (item.itemText==="Attendance") ? 
                    <Image
                    source={require('../assets/attend.png')}
                    style={styles.image} /> : (item.itemText==="Approval") ?
                    <Image
                    source={require('../assets/leave.png')}
                    style={styles.image} /> : {}
            }
            <Text style={styles.text}>{item.itemText}</Text>
            </TouchableOpacity>
        </View>
    );
} 

const styles = StyleSheet.create({
    menuItem: {
        width: '30%',
        height: '50%',
        padding: 5,
        marginLeft: 10,
        borderColor: '#fff',
        //borderWidth:3,
        marginBottom: 10,

    },
    image: {
        width: '100%',
        height: '80%',
        opacity: 0.8,

    },
    text: {
        color: '#fff',
        fontSize: 14,
        textAlign: "center"
    },
})

export default withNavigation(Menu);