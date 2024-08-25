import React from 'react';
import { Button, View, Alert } from 'react-native';
import RNFS from 'react-native-fs';

const DownloadFile = () => {
  const downloadFile = () => {
    const url = 'https://my-server-url/file.pdf';  // 다운로드할 파일의 URL
    const localFile = `${RNFS.DocumentDirectoryPath}/file.pdf`;

    RNFS.downloadFile({
      fromUrl: url,
      toFile: localFile,
    })
      .promise.then((result) => {
        if (result.statusCode === 200) {
          Alert.alert('Download complete', `File saved to: ${localFile}`);
        } else {
          Alert.alert('Download failed', 'Something went wrong');
        }
      })
      .catch ((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <Button title="Download File" onPress={downloadFile} />
    </View>
  );
};

export default DownloadFile;