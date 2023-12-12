import { ViewStyle } from "react-native"


type Containers = "outerSurface" | "spacer" | "camButton" | "procedureDetailsImage"

export const container: Record<Containers, ViewStyle> = {

    outerSurface: {
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 5,
        marginBottom: 10,
        height: '100%'
    },

    spacer: {
        marginBottom: 10,
    },

    camButton: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        bottom: 0,
        padding: 20,
    },
    
    procedureDetailsImage: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    }
}