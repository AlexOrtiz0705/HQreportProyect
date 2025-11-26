import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalScreen({ visible, onClose }: ModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Modal</Text>
        <Text style={styles.text}>This is a modal screen</Text>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#050505',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: '#ccc',
  },
  button: {
    backgroundColor: '#EE4E34',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
