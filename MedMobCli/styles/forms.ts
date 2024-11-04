import { ViewStyle } from "react-native"


type Inputs = "text" | "ddl" | "datePicker"

export const form: Record<Inputs, ViewStyle> ={
    text: {
        marginVertical: 8,

    },
    ddl: {},
    datePicker: {}
}