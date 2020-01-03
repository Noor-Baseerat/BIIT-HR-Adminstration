import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';

const AdminMenu = ({ navigation, item }) => {
    return (

        <View style={styles.menuItem} >
            <TouchableOpacity onPress={() => (item.itemText === "View Leave Requests") ? navigation.navigate('leaveRequestList'): (item.itemText === "View Attendance") ? navigation.navigate('attendanceScreen') : navigation.navigate('EmployeeScreen')}>
                {(item.itemText === "View Leave Requests") ? <Image
                    source={require('../assets/approval.png')}
                    style={styles.image} /> : (item.itemText === "View Attendance") ?
                        <Image
                            source={require('../assets/attend.png')}
                            style={styles.image} /> : (item.itemText === "Manage Employees") ?
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

export default withNavigation(AdminMenu);