import { ViewStyle } from "react-native";


type Buttons = "cam";

export const buttons: Record<Buttons, ViewStyle> ={
    cam: {
        height: 80,
        width: 80,
        borderRadius: 40,
        //ADD backgroundColor COLOR GREY
        backgroundColor: 'black',
    
        alignSelf: 'center',
        borderWidth: 4,
        borderColor: 'white',
      }
}