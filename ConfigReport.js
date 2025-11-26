import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from 'react-native';

import CustomHeader from './components/CustomHeader';
import { navigate } from 'expo-router/build/global-state/routing';
import { useNavigation } from 'expo-router';
// Aquí va tu componente de Header
// <Header />


const AppearanceScreen = () => {
  const [theme, setTheme] = useState('claro');
  const [color, setColor] = useStionnavigationte('orange');

  const colorOptions = ['orange', 'red', 'blue', 'cyan', 'black'];

  return (
    <>
    <CustomHeader navigation={navigation}/>
    <ScrollView style={styles.container}>
      {/* Aquí va el título "Apariencia" */}
      {/* <Text style={styles.title}>Apariencia</Text> */}

      {/* Tema */}
      <Text style={styles.sectionTitle}>Tema</Text>
      <View style={styles.themeContainer}>
        <TouchableOpacity
          style={[
            styles.themeButton,
            theme === 'claro' && styles.selectedTheme,
          ]}
          onPress={() => setTheme('claro')}
        >
          <Text style={styles.themeText}>Claro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.themeButton,
            theme === 'oscuro' && styles.selectedTheme,
          ]}
          onPress={() => setTheme('oscuro')}
        >
          <Text style={styles.themeText}>Oscuro</Text>
        </TouchableOpacity>
      </View>

      {/* Color */}
      <Text style={styles.sectionTitle}>Color</Text>
      <View style={styles.colorContainer}>
        {colorOptions.map((c) => (
          <TouchableOpacity
            key={c}
            style={[
              styles.colorCircle,
              { backgroundColor: c },
              color === c && styles.selectedColor,
            ]}
            onPress={() => setColor(c)}
          />
        ))}
      </View>

      {/* Vista Previa */}
      <Text style={styles.sectionTitle}>Vista Previa</Text>
      <View style={styles.previewBox}>
        <Text style={styles.previewText}>HQREPORT</Text>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>[Mapa con marcadores]</Text>
        </View>
        <View style={styles.photoRow}>
          <UploadBox label="Foto del Presunto #1" />
          <UploadBox label="Foto del Presunto #2" />
        </View>
        <UploadBox label="Foto del Sitio Antes del Evento" />
      </View>

      {/* Botón Guardar */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      {/* Reporte amigable */}
      <Text style={styles.sectionTitle}>Ejemplo de Reporte</Text>
      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Reporte de Evento</Text>
        <Text style={styles.reportItem}>📍 Ubicación: Colonia Kennedy, Tegucigalpa</Text>
        <Text style={styles.reportItem}>📅 Fecha: 25 Noviembre 2025</Text>
        <Text style={styles.reportItem}>🕒 Hora: 21:45</Text>
        <Text style={styles.reportItem}>👤 Presunto #1: Juan Pérez</Text>
        <Text style={styles.reportItem}>👤 Presunto #2: Luis Gómez</Text>
        <Text style={styles.reportItem}>📷 Sitio Antes del Evento: Foto adjunta</Text>
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Ver Detalles</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </>
  );
};

const UploadBox = ({ label }) => (
  <View style={styles.uploadBox}>
    <Text style={styles.uploadLabel}>{label}</Text>
    <TouchableOpacity style={styles.uploadButton}>
      <Text style={styles.uploadButtonText}>Subir Foto</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12,
  },
  themeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  themeButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  selectedTheme: {
    backgroundColor: '#ccc',
  },
  themeText: {
    fontSize: 16,
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 8,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  selectedColor: {
    borderColor: '#000',
  },
  previewBox: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  previewText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mapPlaceholder: {
    height: 120,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  mapText: {
    color: '#888',
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  uploadBox: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 8,
  },
  uploadLabel: {
    fontSize: 14,
    marginBottom: 6,
  },
  uploadButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 6,
  },
  uploadButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  reportCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reportItem: {
    fontSize: 15,
    marginVertical: 4,
  },
  reportButton: {
    marginTop: 12,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
  },
  reportButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ConfigReport;