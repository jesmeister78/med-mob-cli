import { ViewStyle } from "react-native"


type Containers = "outerSurface" | "spacer" | "divider" | "camButton" | "row" | "cell"

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
    divider: {marginTop: 5},

    camButton: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        bottom: 0,
        padding: 20,
    },
    
    row: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    cell: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        flex: 2,
        //marginRight: 10,
        //justifyContent: 'center'
    }
}