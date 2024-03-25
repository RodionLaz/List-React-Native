import * as firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { ListItem, TheListProps } from './Components/Types'
import { updateList } from './Components/ListFunctions';
import List from './Components/List';

const collection = firestore().collection('ListCollection');

export const AddToList = async (title:string , mainText:string) => {
    await collection.add({
        title:title,
        mainText:mainText
    })
    .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
    .catch((error) => {
        console.error('Error adding document: ', error);
      });
}

export const RemoveLast = async () => {
    try{ 
        const LastDocumentSnap  = await collection.orderBy('createdAt','desc') .limit(1).get();
        if(LastDocumentSnap.empty){
            console.log("Collection is Empty");
            return;
        }
        const LastDocument = LastDocumentSnap.docs[0];
        await collection.doc(LastDocument.id).delete();
        console.log("Last document deleted");
    }catch(error){
        console.error("Error : " + error)
    }
}

export const UpdateList = async (newList:ListItem[]) => {
    try{
        newList.forEach(async (item) => {
            if(item._id.length < 2){
                await AddToList(item.title,item.mainText);
            }else{
                await collection.doc(item._id).update({
                    title: item.title,
                    mainText: item.mainText,
                });
            }

        });
    }catch(error){
        console.error("Error : " + error);
    }
}
export const GetList = async () => {
    try {
        const ListSnap = await collection.get();
        const List = ListSnap.docs.map(doc => doc.data()); 
        return List;
    } catch (error) {
        console.error("Error: ", error);
        throw error; 
    }
};