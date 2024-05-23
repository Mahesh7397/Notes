import { View, Text , StyleSheet, TextInput, StatusBar, Dimensions, Pressable} from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors';
//import Roundiconbtn from '../../components/Roundiconbtn';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Intro() {
    const [Name,setName]=useState('')

    const handleuser = text => setName(text);

    const handlesubmit=async()=>{
        const user={name:Name}
        await AsyncStorage.setItem('user',JSON.stringify(user));
        console.log('Saved successfuly')
    }
    
    //console.log(User);
  return (
    <View style={styles.container}>
    <StatusBar hidden/>
        <View>
           <Text style={styles.inputtitle}>Enter Your Name:</Text>
           <TextInput 
           style={styles.textinput}
           placeholder='Enter name'
           value={Name}
           onChangeText={handleuser}
            />
            <Pressable onPress={handlesubmit}>
            {Name.trim().length>=3? <AntDesign name='arrowright' size={35} color={Colors.LIGHT} style={[styles.arrowbtn,]} />:null}
            </Pressable>
        </View>
    </View>
  );
}

const  width  = Dimensions.get('window').width-50;

const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
    },
    textinput:{
      borderWidth:2,
      borderColor:Colors.PRIMARY,
      width,
      height:40,
      color:Colors.PRIMARY,
      borderRadius:10,
      paddingLeft:15,
      fontSize:20,
      marginBottom:15,
    },
    inputtitle:{
       alignSelf:'flex-start',
       marginBottom:5,
       opacity:0.5,
    },
    arrowbtn:{
        backgroundColor:Colors.PRIMARY,
        alignSelf:'center',
        padding:3,
        borderRadius:50,
    }
})