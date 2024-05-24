import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNotes } from '../constants/Contextprovider';
import { Noteinputmodul } from './Noteinputmodul'



export default function NoteDetails({data,seton}){

  const [showmodual,setshoemodual]=useState(false)
  const [note,setNote]=useState(data)
  const [isEdit,setisEdit]=useState(false)

  const foramtDate=ms=>{
     const date=new Date(ms)
     const day=date.getDate()
     const month=date.getMonth()
     const year=date.getFullYear()
     const hrs=date.getHours()
     const min=date.getMinutes()
     const sec=date.getSeconds()

     return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`
  }
  const {setnotes}=useNotes()

  const deletenote=async()=>{
      const result=await AsyncStorage.getItem('notes')
     let notes=[]
     if(result !==null) notes=JSON.parse(result)
    
    const newnotes=notes.filter(n=>n.id!==note.id)
    console.log(newnotes)
    setnotes(newnotes)
    await AsyncStorage.setItem('notes',JSON.stringify(newnotes))
    seton(false)
  }

  const DisplayDeletealert=(data)=>{
    Alert.alert('Are you sure?','This action will delete our note permanently!',[
      {
        text:'Delete',
        onPress:()=>deletenote(data)
      },
      {
        text:'No Thanks',
        onPress:()=>console.log('no thanks')
      }
    ],
  {
    cancelable:true,
  })
  }

  const handleupdate=async(title,desc,time)=>{
      const result= await AsyncStorage.getItem('notes');
      let notes=[]
      if(result!==null) notes=JSON.parse(result)

      const editnote=notes.filter(n=>{
         if(n.id===note.id){
           n.title=title
           n.desc=desc
           n.isupdate=true
           n.time=time
           setNote(n)
         }
         return n;
      })
      setnotes(editnote)
      await AsyncStorage.setItem('notes',JSON.stringify(editnote))
  };

  const openeditmodul=()=>{
    setisEdit(true) 
    setshoemodual(true)
  }

  return (
    <View style={{flex:1,position:'relative'}}>
      <View style={{padding:10,height:50,backgroundColor:'transparent'}}>
        <Pressable onPress={()=>seton(false)}>
        <AntDesign name='arrowleft' size={35} color={Colors.DARK}/>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.time}>{note.isupdate ?`Edited At ${foramtDate(note.time)}`:`create At ${foramtDate(note.time)}`}</Text>
         <Text style={styles.title}>{note.title}</Text>
         <Text style={styles.desc}>{note.desc}</Text>
      </View>
      </ScrollView> 
      <Pressable 
      onPress={()=>DisplayDeletealert(note)}
      style={[styles.btn,{backgroundColor:Colors.ERROR, right:20,
    bottom:120,}]}>
        <AntDesign name='delete' style={{alignSelf:'center',paddingTop:13}} size={25} color={Colors.DARK} />
      </Pressable>
      <Pressable
      onPress={openeditmodul}
      style={[styles.btn,{right:20,bottom:50}]}>
        <AntDesign name='edit' style={{alignSelf:'center',paddingTop:13}} size={25} color={Colors.DARK} />
      </Pressable>
      <Noteinputmodul visible={showmodual} Setadd={setshoemodual} onSubmit={handleupdate} isEdit={isEdit} note={note}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    //flex:1,
    paddingHorizontal:15,
    marginVertical:20,
  },
  title:{
    fontSize:30,
    color:Colors.PRIMARY,
    fontWeight:'bold',
  },
  desc:{
    fontSize:20,
    opacity:0.6,
  },
  time:{
    textAlign:'right',
    fontSize:12,
    opacity:0.5,
  },
  btn:{
    backgroundColor:Colors.PRIMARY,
    padding:3,
    borderRadius:50,
    opacity:0.6,
    height:60,
    width:60,
    position:'absolute',
  }
})