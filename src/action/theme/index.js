import Types from '../types'
export default function onThemeChange(theme){
     return {
            type:Types.THEME_CHANCE,
            theme
     }
}