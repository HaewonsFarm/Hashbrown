import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES, FONTS } from "../constants";

type Document = {
  id: number;
  title: string;
};

const DocumentViewer: React.FC = () => {
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([
    // Sample data. Replace with actual data from MySQL database.
    { id: 1, title: "Document 1" },
    { id: 2, title: "Document 2" },
    { id: 3, title: "Document 3" },
  ]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);

  const handleAddDocument = () => {
    router.push("./addDocument");
  };

  const handleSelectDocument = (id: number) => {
    setSelectedDocuments((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((docId) => docId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === documents.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(documents.map((doc) => doc.id));
    }
  };

  const handleDeleteDocuments = () => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((doc) => !selectedDocuments.includes(doc.id))
    );
    setSelectedDocuments([]);
    setIsSelectionMode(false);
  };

  const handleCancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedDocuments([]);
  };

  const renderDocumentItem = ({ item }: { item: Document }) => (
    <TouchableOpacity
      style={styles.documentItem}
      onPress={() => {
        if (isSelectionMode) {
          handleSelectDocument(item.id);
        }
      }}
    >
      <Text
        style={[
          styles.documentTitle,
          selectedDocuments.includes(item.id) && styles.selectedDocumentTitle,
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Documents</Text>
      <FlatList
        data={documents}
        renderItem={renderDocumentItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.documentList}
      />
      <View style={styles.buttonContainer}>
        {isSelectionMode ? (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSelectAll}
            >
              <Text style={styles.buttonText}>
                {selectedDocuments.length === documents.length ? "Deselect All" : "Select All"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={handleDeleteDocuments}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleCancelSelection}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={handleAddDocument}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsSelectionMode(true)}
            >
              <Text style={styles.buttonText}>Select</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding * 2,
    paddingTop: SIZES.padding * 4,
  },
  headerTitle: {
    ...FONTS.h1,
    color: COLORS.black,
    textAlign: "center",
    marginBottom: SIZES.padding * 2,
  },
  documentList: {
    paddingBottom: SIZES.padding * 4,
  },
  documentItem: {
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  documentTitle: {
    ...FONTS.body3,
    color: COLORS.black,
  },
  selectedDocumentTitle: {
    color: COLORS.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: SIZES.padding * 6,
  },
  button: {
    flex: 1,
    marginHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding * 1.5,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    ...FONTS.body3,
    color: COLORS.white,
  },
  deleteButton: {
    backgroundColor: COLORS.red,
  },
});

export default DocumentViewer;
