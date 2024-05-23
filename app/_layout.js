import { Stack } from "expo-router";
//import Intro from "./Screen/Intro";
import { View } from "react-native";
import { Intro } from "./Screen/Intro";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Notes from "./Screen/Notes";

export default function RootLayout() {
  const [User,setUser] = useState({})
  const finduser=async()=>{
    const result=await AsyncStorage.getItem('user');
     console.log(result)
     setUser(JSON.parse(result));
     console.log(User)
  }

  useEffect(()=>{
    finduser()
  },[])
  return (
    <View style={{flex:1}}>
      <Notes User={User.name}/>
    </View>
  );
}
