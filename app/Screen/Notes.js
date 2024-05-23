import { View, Text, StatusBar ,StyleSheet, SafeAreaView, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import Searchbar from '../../components/Searchbar'
import { AntDesign } from '@expo/vector-icons'

export default function Notes({User}){
    const [Greek,setGreek]=useState('')
    const findgreek=()=>{
      const hrs=new Date().getHours();
      if(hrs===0||hrs<12) return setGreek('Morning')
      if(hrs===1||hrs<17) return setGreek('Afternoon')
      setGreek('Evening')
    }
    useEffect(()=>{
      findgreek()
    },[])
  return (
    <View style={{flex:1}}>
    <StatusBar barStyle='dark-content' backgroundColor={Colors.LIGHT}/>
    <SafeAreaView style={styles.Header}>
      <Text style={styles.text}>Good {Greek} {User}</Text>
      <Searchbar/>
      <View style={[styles.Addbox,StyleSheet.absoluteFillObject]}>
        <Text style={styles.Addtext}>Add Notes</Text>
        <Pressable style={styles.addpress} onPress={()=>console.log('opening model')}>
        <AntDesign name='plus' style={styles.btn} size={35}/>
        </Pressable>
      </View>
    </SafeAreaView>
    </View>
  );
}


const styles=StyleSheet.create({
  Header:{
    padding:10,
    margin:20,
    flex:1,
  },
  text:{
    fontSize:25,
    fontWeight:'bold',
    marginVertical:20,
  },
  Addtext:{
    fontSize:30,
    textTransform:"uppercase",
    fontWeight:'bold',
    opacity:0.2,
  },
  Addbox:{
   justifyContent:'center',
   alignItems:'center',
   flex:1,
   zIndex:-1,
  },
  btn:{
    backgroundColor:Colors.PRIMARY,
    //alignSelf:'center',
    padding:3,
    borderRadius:50,
  },
  addpress:{
    position:'absolute',
    right:15,
    bottom:50,
  },
})