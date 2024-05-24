import { Stack } from "expo-router";
//import Intro from "./Screen/Intro";
import { Modal, View ,Text} from "react-native";
import  Intro from "./Screen/Intro";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import NoteDetails from "../components/NoteDetails";
//import Notes from "./Screen/Notes";
import Notes from './Screen/Notes.js'
import Note from "../components/Note";
import Contextprovider from "../constants/Contextprovider.js";

//const Stack=createStackNavigator()

export default function RootLayout() {
  const [User,setUser] = useState({})
  const [visiblity,setvisiblity]=useState(false)
  const [note,setnote]=useState({})
  const [appopenatfirsttime,setappopenatfirsttime]=useState(false)
  const finduser=async()=>{
    const result=await AsyncStorage.getItem('user');
     //console.log(result)
     if(result=== null) return appopenatfirsttime(true)
     //console.log(User)
     setappopenatfirsttime(false)
     setUser(JSON.parse(result));
  }

  useEffect(()=>{
    finduser()
    //AsyncStorage.clear();
  },[])

  return (
    <View style={{flex:1}}>
      {appopenatfirsttime?<Intro onFinish={finduser}/>:
      <View style={{flex:1}}>
          <Contextprovider>
          <Notes User={User.name} setvi={setvisiblity} setno={setnote}/>
          <Modal visible={visiblity} animationType="slid" onRequestClose={()=>setvisiblity(false)}>
            <NoteDetails data={note} seton={setvisiblity}/>
          </Modal>
          </Contextprovider>
      </View>
        }
    </View>
  );
}
