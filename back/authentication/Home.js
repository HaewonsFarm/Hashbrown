import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import * as authentication from "./bioAuthentication";

function Home(props){
    registerBiometrics = async() => {
        const token = await messaging().getToken();
        const keyCreate = await authentication.creatKey();
        if (keyCreate?.result){
            const biometricsCheck = await authentication.booleanBiometricsCheck();
            if (biometricsCheck?.result){
                const bioKey=await authentication.biomericsLogin( 'user ID'+token, 'register');

                if (bioKey?.key){
                    Alert.alert('notice', 'Success');
                    console.log('bioKey Success');
                } else {
                    Alert.alert('notice', 'Authentication Failed');
                }
            }
            else{ Alert.alert('notice', 'Biometric Authentication is unavailable.')}
        }
    };
}