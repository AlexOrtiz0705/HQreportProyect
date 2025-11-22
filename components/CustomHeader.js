import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Logo from '../assets/Logo.png';

export default function CustomHeader({ navigation }) {
    return (
        <View style={styles.header}>
              
              <View style={styles.logoContainer}>
                <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
              </View>
              <View style={styles.navbuttons}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.icon}>{"<"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("Menú")}>
                    <Text style={styles.icon}>{"≡"}</Text>
                </TouchableOpacity>
              </View>
            </View>
    );
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#000",
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    navbuttons:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoContainer: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 144,
        height: 36,
    },
    icon: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 45,
        marginRight: 10,
    }

}); 


