import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Modal, Animated, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

const ModalPopUp = ({visible, children}) => {
  // Käyttöohje pop up screenille react nativella: 
  // 1. Lisää tää tiedosto projektiisi
  // 2. Importtaa tää tiedosto haluttuun filuun, esim app.js
  // 3. Lisää muuttuja valitsemaasi filuun: const [visible, setVisible] = useState(false);
  // 4. Lisää <ModalPoup visible={visible}> *Tänne modalin viewit ja tekstit yms* </ModalPoup visible={visible}>
  // 5. Sit halutussa buttonissa vaan: onPress={ () => setVisible(true)} niin modal pop up pomppaa näytölle.
  
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;
  
    useEffect(()=> {
      toggleModal();
    }, [visible]);
    
    const toggleModal = () =>{
      if(visible){
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }else{
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
    return( 
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <Animated.View 
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {/*Tää children jostain syyst saa daycomponentissa olevat napit yms näkymään, jos tän poistaa ne ei näy siellä????*/}
          {children}
        </Animated.View>
      </View>
    </Modal>
    );
  };

  export default ModalPopUp

  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: width / 1.1,
      height: height / 1.1,
      backgroundColor: 'white',
      borderRadius: 15,
      shadowRadius: 5,
      elevation: 20,
      alignItems: 'center',
      padding: 10,
  
    }
  });