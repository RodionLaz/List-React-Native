import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Button ,
  StyleSheet
} from 'react-native';
//import { getList, updateList, deleteLast } from './ListFunctions';
import { UpdateList,GetList,RemoveLast } from '../DBFunctions';
import { ListItem, TheListProps } from './Types';
import { TheList, EditableList } from './TheList';
import * as DB from '../DBFunctions';
import { endEvent } from 'react-native/Libraries/Performance/Systrace';
import { update } from 'firebase/database';


const List:React.FC = () => {
  const [editable, setEditable] = useState(false);
  const [data, setData] = useState<ListItem[]>([]);
  const [mainText, setMainText] = useState('');
  const [titleText, setitleText] = useState('');

  const handleDelete = async () => {
    const newData = data.slice(0, -1);
    await setData(newData);
    RemoveLast();
    console.log("deleted")
  };

  const handleUpdate = async () => {
    console.log(data)
    setEditable(!editable);
    await UpdateList(data);
    console.log("updated")
  };

  const handleAddLine = () => {
    const newLine:ListItem = {
      _id:'',
      mainText:"",
      title:""
    } 
    setData([...data,newLine])
    console.log(data)
    console.log("Added Line")
    handleUpdate();
  }
  const handleEdit = () => {
    if(editable){
      handleUpdate();
    }
    setEditable(!editable);
  }

  const handleGetList = async () => {
    try{
      const listNotSorted = await DB.GetList()
      const list = listNotSorted.map((doc:any) => ({
        _id:doc._id,
        title:doc.title,
        mainText:doc.MainText,
      }))
      setData(list);
      console.log("got list")
    }catch(error){
      console.error(error);
    }

  };

  useEffect(() => {
    //handleGetList();
    //console.log("started")
  }, []);

  return (
    <View style={{flex:1,zIndex:1}}>
      <SafeAreaView style={styles.safeArea}>
      <Text style={styles.titleText}>LIST</Text>
      <View style={{zIndex:1,flexDirection:'row'}}>
          <Button title={editable ? 'Finish Editing' : 'Edit'} onPress={handleEdit} ></Button>
          <Button title="GET" onPress={handleGetList} />
          <Button title="ADD Line" onPress={handleAddLine} />
          <Button title="REMOVE Line" onPress={handleDelete} />
        </View>
        <View style={{flex:1}}>
          {editable ? (
            <EditableList
              data={data}
              setData={setData}
            />
          ) : (
            <TheList
              data={data}
              setData={setData}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue',
  },
  listView: {
    flex: 1,
    marginRight: 100,
  },
});

export default List;
