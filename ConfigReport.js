import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Button,
} from 'react-native';

import CustomHeader from './components/CustomHeader';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// Aquí va tu componente de Header
// <Header />


const ConfigReport = ({navigation}) => {
  const [theme, setTheme] = useState('claro');
  const [color, setColor] = useState('orange');

  const colorOptions = ['orange', 'red', 'blue', 'cyan', 'black'];

  return (
    <SafeAreaView style={styles.fullScreen} edges={["top", "left", "right", "bottom"]}>
       <StatusBar barStyle="light-content" backgroundColor="#000" />
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

        {/* Mapa */}
        <Image
            source={ require("./assets/location-map.webp") } 
            style={styles.mapImage}
        />

        {/* Fotos Presuntos */}
        <View style={styles.photoRow}>
            <View style={styles.uploadBox}>
            <Text style={styles.uploadLabel}>Foto Reparación #1</Text>
            <Image 
                source={require("./assets/instalacion-aire-acondicionado.jpeg")} 
                style={styles.photoImage}
            />
            </View>

            <View style={styles.uploadBox}>
            <Text style={styles.uploadLabel}>Foto Reparación #2</Text>
            <Image 
                source={require("./assets/instalacion-electrica.jpg")} 
                style={styles.photoImage}
            />
            </View>
        </View>

        {/* Foto del Sitio */}
        <View style={styles.uploadBox}>
            <Text style={styles.uploadLabel}>Foto del Sitio Antes del Evento</Text>
            <Image 
            source={require("./assets/imagen-sitio.jpg")} 
            style={styles.photoImage}
            />
        </View>
        </View>

        {/* Reporte amigable */}
      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Reporte de Evento</Text>
        <Text style={styles.reportItem}>📍 Ubicación: Colonia Kennedy, Tegucigalpa</Text>
        <Text style={styles.reportItem}>📅 Fecha: 25 Noviembre 2025</Text>
        <Text style={styles.reportItem}>🕒 Hora: 21:45</Text>
        <Text style={styles.reportItem}>👤 Técnico #1: Juan Pérez</Text>
        <Text style={styles.reportItem}>👤 Técnico #2: Luis Gómez</Text>
        <Text style={styles.reportItem}>📷 Sitio Antes del Evento: Foto adjunta</Text>
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Ver Detalles</Text>
        </TouchableOpacity>

      {/* Botón Guardar */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      
      </View>
    </ScrollView>
    </SafeAreaView>
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
  fullScreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  mapImage: {
  width: "100%",
  height: 120,
  borderRadius: 8,
  marginBottom: 12,
},

photoImage: {
  width: "100%",
  height: 120,
  borderRadius: 8,
  marginTop: 6,
  backgroundColor: "#ddd",
}

});

export default ConfigReport;