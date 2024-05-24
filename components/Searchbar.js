import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react';
import {Colors} from '../constants/Colors'
import { AntDesign } from '@expo/vector-icons';

export default function Searchbar({value,onChangeText,onclear}){
  return (
    <View style={styles.container}>
        <TextInput value={value}
         onChangeText={onChangeText}
         style={styles.input} 
         placeholder='Search here....'/>
         {value?<AntDesign name='close' size={20} onPress={onclear} color={Colors.PRIMARY} style={styles.icon}/>:null}
    </View>
  );
}

const styles=StyleSheet.create({
    icon:{
      position:'absolute',
      right:10,
    },
    input:{
        borderWidth:0.5,
        borderColor:Colors.PRIMARY,
        height:40,
        borderRadius:40,
        paddingLeft:15,
        fontSize:20,
    },
    container:{
      justifyContent:'center',
    }

})