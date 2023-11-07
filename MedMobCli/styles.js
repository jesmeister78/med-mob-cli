
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  container: {
    flexDirection: 'row',
    marginVertical: 10
  },
  dataContainer: {
    flexDirection: 'row'
  },
    // container: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    button: {
      backgroundColor: 'gray',
    },
    backButtonContainer: {
      border: '5px solid red',
      backgroundColor: 'red',
      position: 'absolute',
      justifyContent: 'center',
      width: '100%',
      top: 10,
      padding: 20,
    },
    backButton: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        width: 100,
    },
    retakeButton: {
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#77c3ec',
    },
    usePhotoButton: {
        backgroundColor: '#77c3ec',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
    },
    buttonContainer: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      bottom: 0,
      padding: 20,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    camButton: {
      height: 80,
      width: 80,
      borderRadius: 40,
      //ADD backgroundColor COLOR GREY
      backgroundColor: 'black',
  
      alignSelf: 'center',
      borderWidth: 4,
      borderColor: 'white',
    },
    image: {
      width: '100%',
      height: '100%',
      aspectRatio: 9 / 16,
      resizeMode:'contain'
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });

  export default styles;