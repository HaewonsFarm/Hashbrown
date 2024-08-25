import React from "react";
import { View, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

type PdfViewerProps = {
  filePath: string;
};

const PdfViewer: React.FC<PdfViewerProps> = ({ filePath }) => {
  return (
    <View style={{ flex: 1 }}>
      <Pdf 
        source={{ uri: filePath, cache: true }}
        style={{ flex: 1, width: Dimensions.get('window').width }}
        />
    </View>
  );
};

export default PdfViewer;
