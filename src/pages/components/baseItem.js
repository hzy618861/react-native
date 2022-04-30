import React, { Component } from 'react'
import ProTypes from 'prop-types'
import {TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
export default class baseItem extends Component {
    static propTypes = {
        projectModel:ProTypes.object,
        onSelect:ProTypes.func,
        onFavorite:ProTypes.func,
    }
    constructor(props){
        super(props)
        this.state = {
            isFavorite: this.props.projectModel.isFavorite
        }
    }
    static getDerivedStateFromProps(nextProps,presProps){
        const isFavorite =  nextProps.projectModel.isFavorite
        if(presProps.isFavorite!=isFavorite){
            return {isFavorite}
        }
        return null
    }
    setFavoriteState(isFavorite){
        this.props.projectModel.isFavorite = isFavorite
        this.setState({
            isFavorite
        })
    }
    onPressFavorite(){
         this.setFavoriteState(!this.state.isFavorite)
         this.props.onFavorite(this.props.projectModel.item,!this.state.isFavorite)
    }
    favoriteIcon(){
        return  <TouchableOpacity
         style={{padding:6}}
         underlayColor="transparent"
         onPress={()=>this.onPressFavorite()}
        >
            <FontAwesome name={this.state.isFavorite?"star":"star-o"} size={26} style={{color:"#678"}}/>
        </TouchableOpacity>
    }
}
