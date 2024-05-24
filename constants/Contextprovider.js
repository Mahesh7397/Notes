
import React, { createContext, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState ,useEffect } from 'react';


const Notecontext=createContext()
export default function Contextprovider({children}){
    const [notes,setnotes]=useState([])

    const findnote =async()=>{
        const result=await AsyncStorage.getItem('notes');
       // console.log(result)
         if(result!==null) setnotes(JSON.parse(result))
      }
    useEffect(()=>{
        findnote();
    },[]);
  return (
    <Notecontext.Provider value={{notes,setnotes,findnote}}>
           {children}
    </Notecontext.Provider>
  )
}


export const useNotes=()=>useContext(Notecontext)
