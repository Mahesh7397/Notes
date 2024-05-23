import { View, Text, StatusBar ,StyleSheet, SafeAreaView, Pressable, TouchableWithoutFeedback, Keyboard, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import Searchbar from '../../components/Searchbar'
import { AntDesign } from '@expo/vector-icons'
import { Noteinputmodul } from '../../components/Noteinputmodul'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Note from '../../components/Note'

export default function Notes({User}){
    const [Greek,setGreek]=useState('');
    const [add,setadd]=useState(false);
    const [notes,setnotes]=useState([])
    const findgreek=()=>{
      const hrs=new Date().getHours();
      if(hrs===0||hrs<12) return setGreek('Morning')
      if(hrs===1||hrs<17) return setGreek('Afternoon')
      setGreek('Evening')
    }

     const findnote =async()=>{
      const result=await AsyncStorage.getItem('notes');
      console.log(result)
       if(result!==null) setnotes(JSON.parse(result))
    }

    useEffect(()=>{
      findnote()
      findgreek()
    },[])
   
    
    const handleonsubmit=async(title,desc)=>{
      const time=new Date().getTime();
      const note={
        id:Date.now(),
        title,
        desc,
        time};
      const updatenote=[...notes,note];
      setnotes(updatenote);
      await AsyncStorage.setItem('notes',JSON.stringify(updatenote));
    }
  return (
    <View style={{flex:1}}>
    <StatusBar barStyle='dark-content' backgroundColor={Colors.LIGHT}/>
    <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.Header}>
      <Text style={styles.text}>Good {Greek} {User}</Text>
      <Searchbar/>
      <View>
      <FlatList data={notes} numColumns={2} columnWrapperStyle={{justifyContent:'space-between'}} keyExtractor={item=>item.id.toString()}
      renderItem={({item})=><Note items={item}/>} />
      </View>
      {!notes.length ?<View style={[styles.Addbox,StyleSheet.absoluteFillObject]}>
        <Text style={styles.Addtext}>Add Notes</Text>
      </View>:null}
    </SafeAreaView>
    </TouchableWithoutFeedback>
    <Pressable style={styles.addpress} onPress={()=>setadd(true)}>
        <AntDesign name='plus' style={styles.btn} size={35}/>
        </Pressable>
    <Noteinputmodul visible={add} Setadd={setadd} onSubmit={handleonsubmit}/>
    </View>
  );
}


const styles=StyleSheet.create({
  Header:{
   padding:10,
   // margin:20,
   paddingHorizontal:20,
    flex:1,
    zIndex:-1,
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
    color:Colors.LIGHT,
    //opacity:0.5,
  },
  addpress:{
    position:'absolute',
    right:15,
    bottom:50,
  },
})