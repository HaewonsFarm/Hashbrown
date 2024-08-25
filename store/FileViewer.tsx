import React from 'react';
import { Button, View } from 'react-native';
import FileViewer from 'react-native-file-viewer';

type FilePreviewProps = {
  filePath: string;
};

const FilePreview: React.FC<FilePreviewProps> = ({ filePath }) => {
  const openFile = async () => {
    try {
      await FileViewer.open(filePath);
    } catch (error) {
      console.error('Failed to open file:', error);
    }
  };

  return (
    <View>
      <Button title="Open File" onPress={openFile} />
    </View>
  );
};

export default FilePreview;
