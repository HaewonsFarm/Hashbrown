import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import * as keyStore from './secure-key-store';

const rnBiometrics = new ReactNativeBiometrics();

export const booleanBiometricsCheck = () => {
    return rnBiometrics
        .isSensorAvailable()
        .then(resultObject => {
            const {available, biometryType, error} = resultObject;

            if (!available){
                console.log('isSensorAvailable error', error);
            } else if (available && biometryType === BiometryTypes.TouchID){
                return {result: true, type: biometryType};
            }
            else if (available && biometryType === BiometryTypes.FaceID){
                return {result: true, type: biometryType};
            }else {
                return {result: false, type: biometryType};
            }
        })
        .catch(error => {
            console.log('booleanBiometricsCheck error ',error);
            return {result:false, type:null};
        })
};

export const creatKey = () => {
    return rnBiometrics
        .createKeys()
        .then(resultObject => {
            const {publicKey} = resultObject;
            return {result:true, key: publicKey};
        })
        .catch(error => {
            console.log('createKey error ', error);
            return {result: false, key: null};
        });
};

export const checkKey = () => {
    return rnBiometrics
        .biometricKeysExist()
        .then(resultObject => {
            const {keysExist} = resultObject;
            if (keysExist){
                return true;
            } else {return false;}
        })
        .catch (error => {
            console.log('checkKey error ', error);
            return false;
        })
}

export const deleteKey = () => {
    return rnBiometrics
        .deleteKeys()
        .then (resultObject => {
            const {keysDeleted} = resultObject;
            if (keysDeleted){ return true; }
            else {return false;}
        })
        .catch(error => {
            console.log('deleteKey error ', error);
            return false;
        });
};

export const biometricsLogin = (
    userID = '',
    msg = 'log in',
) => {
    return rnBiometrics
        .createSignature({
            promptMessage: msg,
            payload: userID,
        })
        .then(resultObject => {
            const {success, signature} =resultObject;
            if (success) {
                keyStore.setItem('biometricsKey', signature);
                return {result: true, key: signature};
            } else { return {result:false, key: null}; }
        })
        .catch(error => {
            console.log('biometricsLogin error ', error);
            return {result: false, key: null, msg: error};
        });
};