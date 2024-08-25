import React from 'react';
import { Button, View, Text } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

const FilePicker = () => {
  const handleDocumentSelection = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(result);

      // 선택된 파일을 서버로 업로드
      await uploadFile(result[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        throw err;
      }
    }
  };

  const uploadFile = async (file: DocumentPickerResponse) => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    } as unknown as Blob);  // Blob 으로 타입 캐스팅

    try {
      const response = await fetch('https://my-server-url/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <View>
      <Button title="Select File" onPress={handleDocumentSelection} />
    </View>
  );
};

export default FilePicker;
