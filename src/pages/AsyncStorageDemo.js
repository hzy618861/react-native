import React, { Component } from 'react';
import {Button,Text,View,TextInput,AsyncStorage} from 'react-native'
import DataStore from '../utils/index'
const key = 'save-key'
class AsyncStorageDemo extends Component {
    constructor(props){
        super(props)
        this.state = {
            showText:""
        }
        this.dataStore = new DataStore()
    }
    save = () => {
         AsyncStorage.setItem(key,this.value).catch(err=>{
            console.log(err)
         })
    }
    remove(){
        AsyncStorage.removeItem(key)
    }
    getData =  () =>  {
        const url =  `https://api.github.com/search/repositories?q=${this.value}`
        this.dataStore.fetchData(url).then(res=>{
            alert(res)
             let showDate = `时间戳：${res.timestamp}\n${JSON.stringify(res.data)}`
             this.setState({
                 showText:showDate
             })
        }).catch(e=>{
            alert(e)
            console.log(e)
        })
        //  AsyncStorage.getItem(key).then(res=>{
        //      alert(res)
        //  }).catch(err=>{
        //     console.log(err)
        //  })
    }
    render() {
        const {showText} = this.state
        return (
            <View>
                <Text>AsyncStorageDemo1</Text>
                 <View>
                    <TextInput  onChangeText={text => this.value = text}/>
                 </View>
                 <View>
                      <Text>{showText}</Text>
                 </View>
                 <View>
                    <Button onPress={this.save}  title={'存储'}/>
                    <Button onPress={this.remove} title={'删除'}/>
                    <Button onPress={this.getData} title={'获取'}/>
                 </View>
            </View>
        );
    }
}

export default AsyncStorageDemo;
