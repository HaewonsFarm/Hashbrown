import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import axios from "axios"; // Assuming you're using axios for API calls

const AddDocument: React.FC = () => {
  const router = useRouter();
  const [documentName, setDocumentName] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === "success") {
        setSelectedDocument(result);
        setDocumentName(result.name);
      }
    } catch (err) {
      console.log("Error picking document: ", err);
    }
  };

  const handleUpload = async () => {
    if (!selectedDocument) return;

    const formData = new FormData();
    formData.append("document", {
      uri: selectedDocument.uri,
      name: documentName,
      type: selectedDocument.mimeType,
    });

    try {
      const response = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        router.push("/screens/documentViewer");
      } else {
        console.log("Upload failed");
      }
    } catch (err) {
      console.log("Error uploading document: ", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Document</Text>
      <TouchableOpacity style={styles.button} onPress={handleDocumentPick}>
        <Text style={styles.buttonText}>
          {documentName || "Select Document"}
        </Text>
      </TouchableOpacity>
      <Button title="Upload" onPress={handleUpload} disabled={!selectedDocument} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default AddDocument;
