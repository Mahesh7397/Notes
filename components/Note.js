import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors';

export default function Note({items}){
    const {title,desc} = items;
  return (
    <View style={styles.container}>
      <Text numberOfLines={2} style={styles.title}>{title}</Text>
      <Text numberOfLines={3}>{desc}</Text>
    </View>
  )
}

const width=Dimensions.get('window').width-40;


const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.PRIMARY,
        width:width/2 - 10,
        padding:8,
        marginVertical:8,
        borderRadius:10,
    },
    title:{
         fontWeight:'bold',
         fontSize:16,
         color:Colors.LIGHT,
    }
})