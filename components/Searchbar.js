import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react';
import {Colors} from '../constants/Colors'

export default function Searchbar(){
  return (
    <View style={styles.container}>
        <TextInput style={styles.input} placeholder='Search here....'/>
    </View>
  );
}

const styles=StyleSheet.create({
    container:{

    },
    input:{
        borderWidth:0.5,
        borderColor:Colors.PRIMARY,
        height:40,
        borderRadius:40,
        paddingLeft:15,
        fontSize:20,

    }

})