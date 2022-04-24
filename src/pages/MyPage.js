import React,{Component} from 'react'
import {Button,View,Text,StyleSheet,TextInput} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action'
const styles = StyleSheet.create({
    container:{
       flex:1,
       justifyContent:'center',
       alignItems:"center",
       backgroundColor:"#f5f5f5"
    },
    text:{
      fontSize:30
    }
  })
 class MyPage extends Component {
     render(){
          const {setParams} = this.props.navigation
          return (
              <View style={styles.container}>
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