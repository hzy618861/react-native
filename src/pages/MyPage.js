import React,{Component} from 'react'
import {Button,View,Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Navigationbar from './components/navigationBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import actions from '../action'
const styles = StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:"#f5f5f5"
    },
    text:{
      fontSize:30
    }
  })
 class MyPage extends Component {
   getRightButton(){
      return <View style={{flexDirection:"row"}}>
         <TouchableOpacity style={{padding:8,paddingLeft:12}}>
            <View style={{padding:5,marginRight:8}}>
                <Feather name="search" size={24} style={{color:"white"}}/>
            </View>
        </TouchableOpacity>
      </View>
   }
   getLeftButton(){
      return <TouchableOpacity style={{padding:8,paddingLeft:12}} >
          <Ionicons name={'ios-arrow-back'} size={26} style={{color:"white"}}/>
      </TouchableOpacity>
   }
     render(){
          let navgationBar = <Navigationbar title={'我的'}
          leftButton={this.getLeftButton()}
          rightButton={this.getRightButton()}
          style={{backgroundColor:"#678"}}
          statusBar={{backgroundColor:"#678",barStyle:'light-content'}}/>
          const {setParams} = this.props.navigation
          return (
              <View style={styles.container}>
                  {navgationBar}
                  <Text>MyPage</Text>
                  <Button title={'修改主題'} onPress={() => this.props.onThemeChange('green')}/>
              </View>
          )
     }
}
const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})
export default connect(null,mapDispatchToProps)(MyPage)