import { Keyboard, Modal, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../constants/Colors'
import { AntDesign } from '@expo/vector-icons'

export function Noteinputmodul({visible,Setadd,onSubmit}){
    const [Title,setTitle]=useState('')
    const [desc,setdesc]=useState('')
    const handleModulclose=()=>{
       Keyboard.dismiss();
    }
    const handleonchange=(text,Valuefrom)=>{
        if(Valuefrom==='title') setTitle(text)
        if(Valuefrom==='desc') setdesc(text)
    }
    //console.log(Title);
    //console.log(desc);

    const handlesubmit=()=>{
        if(!Title.trim() && !desc.trim()) return Setadd(false);
        onSubmit(Title,desc)
        setTitle('')
        setdesc('')
        Setadd(false)
    }

    const closemodul=()=>{
        setTitle('')
        setdesc('')
        Setadd(false)
    }

  return (
    <>
    <Modal visible={visible} 
    animationType='fade'
    onRequestClose={()=>Setadd(false)}
    >
        <View style={styles.container}>
         <TextInput placeholder='Title' style={[styles.input,styles.title]}
         value={Title}
         onChangeText={(text)=>handleonchange(text,'title')}/>
         <TextInput placeholder='Note' multiline style={[styles.input,styles.desc]}
         value={desc}
          onChangeText={(text)=>handleonchange(text,'desc')}/>
          <View style={styles.btnbox}>
          <Pressable style={[styles.submit,styles.btn]} onPress={handlesubmit}>
          <AntDesign name='check' style={styles.btnicon} size={35} color={Colors.LIGHT} />
          </Pressable>
          {Title.trim() || desc.trim()?<Pressable style={[styles.close,styles.btn]} onPress={closemodul}>
          <AntDesign name='close' style={styles.btnicon} size={35} color={Colors.LIGHT} />
          </Pressable>:null}
          </View>
         </View>
    
    <TouchableWithoutFeedback  onPress={handleModulclose}>
        <View style={[styles.modulebg,StyleSheet.absoluteFillObject]}/>
    </TouchableWithoutFeedback>
    </Modal>
    </>
  )
}


const styles = StyleSheet.create({
    input:{
        borderBottomWidth:2,
      borderBottomColor:Colors.PRIMARY,
      fontSize:20,
      color:Colors.DARK,
    },
    title:{
      hright:40,
      marginBottom:15,
      fontWeight:'bold',
    },
    desc:{
      height:100,

    },
    container:{
        paddingHorizontal:20,
        paddingTop:25,
    },
    modulebg:{
        flex:1,
        zIndex:-1,
    },
    btn:{
        backgroundColor:Colors.PRIMARY,
        alignSelf:'center',
        padding:3,
        borderRadius:50,
    },
    submit:{
        marginRight:15
    },
    close:{
       marginLeft:15,
    },
    btnbox:{
        flexDirection:'row',
        justifyContent:'center',
        paddingVertical:20,
    }
})