import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,Animated, Button, Alert, TextInput, TouchableOpacity,FlatList
} from 'react-native';
import React,{ useEffect, useRef, useState } from 'react';
import {ListItem,TheListProps} from './Types';


export const TheList:React.FC<TheListProps> = ({data}) =>{
    
    
    return(

        <View>
            <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 40 }}>{`\u2022 ${item.title}`}</Text>
                <Text style={{ fontSize: 30 }}>{item.mainText}</Text>
              </View>
            );
          }}
        />
        </View>
    )
}

export const EditableList:React.FC<TheListProps> = ({data,setData}:TheListProps) =>{

    return(
    
        <View style={{flex:1}}>
            <FlatList style={{flex:1}}
          data={data}
          renderItem={({ item,index }) => {
            return (
              <View style={{ marginBottom: 5 }}>
                <TextInput
                    style={{fontSize: 40,flex:1}}
                    onChangeText={(newText:string) => {
                      const NewData = [...data];
                      NewData[index].title = newText;
                      setData(NewData);
                    }}
                    value={`${item.title}`}
                    placeholder="Title"
                />
                <TextInput
                    style={{fontSize: 30,flex:1}}
                    onChangeText={(newText:string) => {
                      const NewData = [...data];
                      NewData[index].mainText = newText;
                      setData(NewData);
                    }}
                    value={`${item.mainText}`}
                    placeholder="Main Text"
                />
              </View>
            );
          }}
        />
        </View>
    );
}        