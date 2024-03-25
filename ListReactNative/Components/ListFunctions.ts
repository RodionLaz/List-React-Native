import axios,{AxiosError, AxiosResponse} from 'axios';
import {ListItem} from './Types';
import { UpdateList,GetList } from '../DBFunctions';

export const getList = async () => {
    try {
        const List = await GetList(); 
        console.log('data: ', List);
       // const parsedData = response.data.map((item: string) => JSON.parse(item));
        //return parsedData;
        //setData(parsedData);
        return List;

    } catch (error) {
        console.error('Error:', error);
    }
};
export const updateList = async (data:ListItem[]) => {
    try {
        console.log("send update", data);
        const response: AxiosResponse = await axios.post("http://localhost:8080/UpdateList", data);
        console.log('Response data:', response);
        getList();
    } catch (error) {
        console.error('Error:', error);
    }
};
export const deleteLast = async () =>{
    try{
        const response:AxiosResponse = await axios.delete("http://localhost:8080/DeleteLast");
        console.log(response);
    }catch(error){
        console.error(error);
    }
} 

