import React, { Component } from 'react'
import BackPressComponent from './backComponet'
import {DeviceInfo,View, Text, Image, Dimensions, StyleSheet, Platform,Share} from "react-native";
import NavigationUtil from '../navigation/NavigationUtil'
import Parallax from 'react-native-parallax-scroll-view'
import ViewUtil from "../../utils/ViewUtil"
import ShareUtil from '../../utils/ShareUtil'
import share from './share.json'
export const FLAG_ABOUT = {flag_about: 'about', flag_about_me: 'about_me'};
const window = Dimensions.get('window');
const AVATAR_SIZE = 90;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: 44
    },
    stickySection: {
        height: 44,
        alignItems: 'center',
        // paddingTop:20
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingTop:20
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        // paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 25,
        marginBottom: 10
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10
    },
});
export default class AbountCommon{
  constructor(props,updateState){
        this.props = props
        this.updateState = updateState;
        this.backPress = new BackPressComponent({backPress: ()=>this.onBackPress()})

  }
  onBackPress(){
    NavigationUtil.goBack(this.props.navigation)
    return true
  }
  componentDidMount(){
    this.backPress.componentDidMount()
    fetch('http://www.devio.org/io/GitHubPopular/json/github_app_config.json')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network Error');
    })
    .then(config => {
        if (config) {
            this.updateState({
                data: config
            })
        }
    })
    .catch(e => {
        console(e);
    })
  }
  componentWillUnmount(){
    this.backPress.componentWillUnmount()
   }
   onShare() {
    let shareApp;
    const {flagAbout} = this.props
    if (flagAbout === FLAG_ABOUT.flag_about_me) {
        shareApp = share.share_app
    } else {
        shareApp = share.share_blog
    }

    // ShareUtil.shareboard(shareApp.content, shareApp.imgUrl, shareApp.url, shareApp.title, [0, 1, 2, 3, 4, 5, 6], (code, message) => {
    //     console.log("result:" + code + message);
    // });
    Share.share({
        message:shareApp.content,
        url:shareApp.url,
        title: shareApp.title
    })
    //第三方登录
    // ShareUtil.auth(0,e=>{
    //     console.log("result:" + e);
    // })
}
  render(contentView,params) {
    let avatar = typeof(params.avatar) === 'string' ? {uri: params.avatar} : params.avatar;
    return (
      <Parallax backgroundColor={'#678'} 
      contentBackgroundColor="#f2f3f4" 
      parallaxHeaderHeight={200}
      stickyHeaderHeight={50}
      backgroundScrollSpeed={10}
      renderFixedHeader={()=>(<View key="fixed-header" style={styles.fixedSection}>
      {ViewUtil.getLeftButton(() => NavigationUtil.goBack(this.props.navigation))}
      {ViewUtil.getShareButton(() => this.onShare())}
  </View>)}
      renderStickyHeader={()=>(<View key="sticky-header" style={styles.stickySection}>
      <Text style={styles.stickySectionText}>{params.name}</Text>
      </View>)}
      renderBackground={()=>(
        <View key="background">
        <Image source={{
            uri: params.backgroundImg,
            width: window.width,
            height: 544
        }}/>
        <View style={{
            position: 'absolute',
            top: 0,
            width: window.width,
            backgroundColor: 'rgba(0,0,0,.4)',
            height: 544
        }}/>
    </View>
      )}
      renderForeground={()=>(
        <View key="parallax-header" style={styles.parallaxHeader}>
        <Image style={styles.avatar}
               source={avatar}/>
        <Text style={styles.sectionSpeakerText}>
            {params.name}
        </Text>
        <Text style={styles.sectionTitleText}>
            {params.description}
        </Text>
       </View>
      )}
      >
            {contentView}
      </Parallax>
    )
  }
}
