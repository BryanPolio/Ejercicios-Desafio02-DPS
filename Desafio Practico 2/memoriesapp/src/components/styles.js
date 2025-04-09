import { StyleSheet } from 'react-native';  

export const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center',  
  },  
  resultContainer: {  
    width: '100%',  
    padding: 20,  
  },  
  captureView: {  
    marginBottom: 20,  
    alignItems: 'center',  
  },  
  image: {  
    width: 200,  
    height: 200,  
    marginBottom: 10,  
  },  
  input: {  
    height: 40,  
    borderColor: 'gray',  
    borderWidth: 1,  
    width: '100%',  
    paddingHorizontal: 10,  
    marginBottom: 10,  
  },  
  modalView: {  
    margin: 20,  
    backgroundColor: 'white',  
    borderRadius: 20,  
    padding: 35,  
    alignItems: 'center',  
    shadowColor: '#000',  
    shadowOffset: {  
      width: 0,  
      height: 2,  
    },  
    shadowOpacity: 0.25,  
    shadowRadius: 4,  
    elevation: 5,  
  },  
  modalInput: {  
    height: 40,  
    borderColor: 'gray',  
    borderWidth: 1,  
    width: '100%',  
    paddingHorizontal: 10,  
    marginBottom: 10,  
  },  
  annotation: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  mediaItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  mediaThumbnail: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  videoPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    textAlign: 'center',
    lineHeight: 100,
    color: 'white',
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  dynamicButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue', // Default background color
  },
  dynamicButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // Default text color
  },
  superDynamicButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // Can be overridden dynamically
    borderWidth: 2, // Default border width
    borderColor: 'black', // Default border color
  },
  superDynamicButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Default text color
    textTransform: 'uppercase', // Default text transformation
  },
});