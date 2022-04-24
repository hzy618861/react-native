import React, { Component } from 'react';
import {Button,Text,View,TextInput} from 'react-native'
class Fetchdemo extends Component {
    state = {
        res:''
    }
    loadData = async () => {
         const res = await fetch('https://api.github.com/search/repositories?q=java')
         this.setState({
             res
         })
    }
    render() {
        const setValueObj = {
            value:"测试",
            onChangeText:() => {
                alert(1)
            }
        }
        const {res} = this.state
        return (
            <View>
                <Text>fetch使用</Text>
                <Button title="获取数据" onPress={this.loadData}/>
                <TextInput {...setValueObj}/>
                <View>
                    <Text>{JSON.stringify(res)}</Text>
                </View>
            </View>
        );
    }
}

export default Fetchdemo;
