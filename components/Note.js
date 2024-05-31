import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors';

export default function Note({items ,onpress}){
    const {title,desc} = items;
  return (
    <TouchableOpacity onPress={onpress} style={styles.container}>
      <View style={styles.titcon}><Text numberOfLines={2} style={styles.title}>{title}</Text></View>
      <View style={styles.txtcon}><Text numberOfLines={3}>{desc}</Text></View>
    </TouchableOpacity>
  )
}

const width=Dimensions.get('window').width-40;


const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.LIGHT,
        width:width/2 - 10,
        padding:8,
        marginVertical:8,
        borderRadius:10,

    },
    txtcon:{
        borderWidth:1,
        padding:8,
        borderColor:Colors.BORDER,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15
    },
    titcon:{
        backgroundColor:Colors.PRIMARY,
        padding:10,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        height:80,
    },
    title:{
         fontWeight:'bold',
         fontSize:20,
         color:Colors.LIGHT,
    }
})