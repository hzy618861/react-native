import React,{Component} from 'react'
import {Button,View,Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import WebView from 'react-native-webview'
import NavgationBar from './components/navigationBar'
import ViewUtil from '../utils/ViewUtil'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from './navigation/NavigationUtil'
import BackPressComponent from './components/backComponet'
const styles = StyleSheet.create({
    container:{
       flex:1
    }
   
  })
export default  class Detail extends Component {
    constructor(props){
      super(props)
      this.params = this.props.navigation.state.params
      const {projectModel} = this.params
      const url = projectModel.html_url || 'https://github.com/'+projectModel.fullName
      const title = projectModel.full_name ||  projectModel.fullName
      this.backPress = new BackPressComponent({backPress: ()=>this.onBackPress()})
      this.state ={
        title,
        url,
        canGoback:false
      }
    }
      onBackPress(){
        this.onBack()
        return true
      }
      componentDidMount(){
            this.backPress.componentDidMount()
      }
      componentWillUnmount(){
          this.backPress.componentWillUnmount()
      }
      renderRightButton(){
        return (<View style={{flexDirection:"row",alignItems:"center"}}>
            <TouchableOpacity onPress={()=>{}}>
                   <FontAwesome name={'star-o'} size={20} style={{color:"white",marginRight:10}}/>
            </TouchableOpacity>
            {
              ViewUtil.getShareButton(()=>{
                  
              })
            }
        </View>)
    }
    onNavigationStateChange(e){
         this.setState({
           ...this.state,
           canGoback:e.canGoback,
           url:e.url
         })
    }
     onBack(){
       if(this.state.canGoback){
           this.webview.goBack()
       }else{
           NavigationUtil.goBack(this.props.navigation)
       }
     }
     render(){
          const titleLayoutStyle = this.state.title.length>20?{paddingRight:30}:null
          return (
              <View style={styles.container}>
                  <NavgationBar title={this.state.title} 
                   titleLayoutStyle = {titleLayoutStyle}
                   leftButton={ViewUtil.getLeftButton(()=>this.onBack())}
                   rightButton={this.renderRightButton()}
                   style={{backgroundColor:'#678'}}/>
                  <WebView
                  ref={webview=>this.webview = webview }
                  startInLoadingState={true}
                  source={{uri:this.state.url}}
                  onNavigationStateChange={e=>this.onNavigationStateChange(e)}
                  />
              </View>
          )
     }
}