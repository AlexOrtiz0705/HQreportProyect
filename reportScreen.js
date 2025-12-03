// reportScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
  StatusBar,
  Modal,
} from "react-native";

import * as Location from "expo-location";
import CustomHeader from './components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from '@expo/vector-icons';

// =========================
// CONFIGURAR AQUI TU BACKEND
// =========================
const BACKEND_URL = "http://10.126.113.101:4000";

export default function ReportScreen({ navigation }) {
  const { control, handleSubmit } = useForm();

  const [fechaHora, setFechaHora] = useState("");
  const [gpsCoords, setGpsCoords] = useState(null);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [currentSectionKey, setCurrentSectionKey] = useState(null);
  const [tempPhotoUri, setTempPhotoUri] = useState(null);
  const [validationAttempts, setValidationAttempts] = useState({});

  const [photoSections, setPhotoSections] = useState({
    FachadaFrontal: null,
    FachadaLateral: null,
    Interior1: null,
    Interior2: null,
    Danio1: null,
    Danio2: null,
  });

  const sectionTitles = {
    FachadaFrontal: "Fachada Frontal",
    FachadaLateral: "Fachada Lateral",
    Interior1: "Interior Área 1",
    Interior2: "Interior Área 2",
    Danio1: "Daño 1",
    Danio2: "Daño 2",
  };

  // ============================
  // FECHA
  // ============================
  useEffect(() => {
    const now = new Date();
    setFechaHora(
      `${now.toLocaleDateString()} ${now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    );
  }, []);

  // ============================
  // GPS
  // ============================
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Necesitamos permisos de ubicación.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setGpsCoords({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
    })();
  }, []);

  // ============================
  // TOMAR FOTO
  // ============================
  const takePhoto = async (sectionKey) => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        base64: true,
      });

      if (result.canceled) return;

      const photo = result.assets[0];
      
      // Guardar la foto temporal y mostrar modal de validación
      setTempPhotoUri(photo.uri);
      setCurrentSectionKey(sectionKey);
      
      // Simular validación de IA (primera vez falla, segunda vez pasa)
      const attempts = validationAttempts[sectionKey] || 0;
      
      if (attempts === 0) {
        // Primera vez: mostrar modal de error
        setShowValidationModal(true);
        setValidationAttempts(prev => ({
          ...prev,
          [sectionKey]: 1
        }));
      } else {
        // Segunda vez: aceptar la foto
        acceptPhoto(sectionKey, photo);
      }
      
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "No se pudo tomar la foto.");
    }
  };

  // ============================
  // ACEPTAR FOTO DESPUÉS DE SEGUNDO INTENTO
  // ============================
  const acceptPhoto = async (sectionKey, photo) => {
    try {
      const loc = await Location.getCurrentPositionAsync({});
      
      // Simular datos de validación exitosa
      const validacion = {
        coincide: true,
        confianza: 95,
        motivo: "Imagen válida - Coincide con la categoría",
        descripcionDetectada: sectionTitles[sectionKey],
      };

      setPhotoSections((prev) => ({
        ...prev,
        [sectionKey]: {
          uri: photo.uri,
          base64: photo.base64,
          gps: {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          },
          validacion,
        },
      }));

      Alert.alert("✅ Imagen Validada", `Confianza: ${validacion.confianza}%`);
      
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "No se pudo procesar la imagen.");
    }
  };

  // ============================
  // REINTENTAR DESPUÉS DE VER EL MODAL
  // ============================
  const handleRetry = () => {
    setShowValidationModal(false);
    // Simular que ahora sí se aceptará la foto
    if (currentSectionKey && tempPhotoUri) {
      const photo = { uri: tempPhotoUri, base64: "" };
      acceptPhoto(currentSectionKey, photo);
    }
  };

  // ============================
  // MODAL DE VALIDACIÓN FALLIDA
  // ============================
  const ValidationModal = () => (
    <Modal
      visible={showValidationModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowValidationModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header del modal */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>HOREPORT</Text>
            <TouchableOpacity 
              onPress={() => setShowValidationModal(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.modalSubtitle}>Reporte Fotográfico</Text>
          
          {/* Mensaje de error */}
          <View style={styles.errorMessageContainer}>
            <Ionicons name="warning-outline" size={40} color="#FF6B6B" />
            <Text style={styles.errorMessage}>
              La imagen que intentas ingresar no es correcta, intenta nuevamente.
            </Text>
          </View>
          
          {/* Imagen de referencia */}
          <View style={styles.referenceContainer}>
            <Text style={styles.referenceTitle}>Imagen de referencia</Text>
            <View style={styles.referenceImagePlaceholder}>
              <Ionicons name="image-outline" size={50} color="#666" />
              <Text style={styles.referenceText}>
                {currentSectionKey ? sectionTitles[currentSectionKey] : "Referencia"}
              </Text>
            </View>
          </View>
          
          {/* Recomendaciones */}
          <View style={styles.recommendationsContainer}>
            <Text style={styles.recommendationsTitle}>Recomendaciones:</Text>
            
            <View style={styles.recommendationItem}>
              <Ionicons name="sunny-outline" size={20} color="#4A90E2" />
              <Text style={styles.recommendationText}>
                Asegúrate de tener buena iluminación
              </Text>
            </View>
            
            <View style={styles.recommendationItem}>
              <Ionicons name="camera-outline" size={20} color="#4A90E2" />
              <Text style={styles.recommendationText}>
                Limpia el lente de tu cámara
              </Text>
            </View>
            
            <View style={styles.recommendationItem}>
              <Ionicons name="build-outline" size={20} color="#4A90E2" />
              <Text style={styles.recommendationText}>
                Corrige lo que sea necesario
              </Text>
            </View>
          </View>
          
          {/* Botones */}
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.retryButton]}
              onPress={handleRetry}
            >
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowValidationModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // ==================================
  // ENVIAR REPORTE COMPLETO
  // ==================================
  const onSubmit = async (data) => {
    // Verificar que todas las fotos estén tomadas
    const missingPhotos = Object.keys(photoSections).filter(
      key => !photoSections[key]
    );
    
    if (missingPhotos.length > 0) {
      Alert.alert(
        "Fotos faltantes",
        `Necesitas tomar ${missingPhotos.length} fotos más.`
      );
      return;
    }

    const payload = {
      ...data,
      fechaHora,
      gps_global: gpsCoords,
      fotos: photoSections,
    };

    try {
      const res = await fetch(`${BACKEND_URL}/registrar-reporte`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const r = await res.json();
      Alert.alert("✅ Reporte enviado", r.msg ?? "Éxito");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "No se pudo enviar el reporte.");
    }
  };

  // ============================
  // UI SECCIÓN DE FOTO
  // ============================
  const RenderPhotoSection = ({ title, sectionKey }) => {
    const sec = photoSections[sectionKey];
    const attempts = validationAttempts[sectionKey] || 0;
    
    return (
      <View style={styles.photoSection}>
        <Text style={styles.sectionTitle}>{title}</Text>

        {sec ? (
          <>
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: sec.uri }}
                style={styles.photoImage}
              />
              <View style={styles.validatedBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#27ae60" />
                <Text style={styles.validatedText}>Validada</Text>
              </View>
            </View>
            
            <View style={styles.photoInfo}>
              <Text style={styles.infoText}>
                <Ionicons name="location-outline" size={14} /> GPS: {sec.gps.lat.toFixed(6)}, {sec.gps.lng.toFixed(6)}
              </Text>
              <Text style={[styles.infoText, styles.successText]}>
                <Ionicons name="shield-checkmark-outline" size={14} /> {sec.validacion.motivo}
              </Text>
              <Text style={styles.infoText}>
                <Ionicons name="stats-chart-outline" size={14} /> Confianza: {sec.validacion.confianza}%
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.emptySection}>
            <Ionicons name="camera-outline" size={50} color="#999" />
            <Text style={styles.emptyText}>
              {attempts > 0 ? "Intento fallido, toma la foto nuevamente" : "Sin imagen"}
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => takePhoto(sectionKey)}
          style={styles.takePhotoButton}
        >
          <Ionicons name="camera" size={20} color="white" />
          <Text style={styles.takePhotoText}>Tomar Foto</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.fullScreen} edges={["top", "left", "right", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <CustomHeader navigation={navigation} />
      
      <ValidationModal />
      
      <ScrollView style={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.dateTime}>{fechaHora}</Text>
          <Text style={styles.mainTitle}>Reporte Fotográfico</Text>
        </View>

        {/* GPS */}
        <View style={styles.gpsSection}>
          <Text style={styles.sectionLabel}>
            <Ionicons name="navigate-outline" size={16} /> Ubicación actual:
          </Text>
          
          {gpsCoords?.lat && gpsCoords?.lng ? (
            <>
              <Text style={styles.coordinates}>
                {gpsCoords.lat.toFixed(6)}, {gpsCoords.lng.toFixed(6)}
              </Text>

              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: gpsCoords.lat,
                  longitude: gpsCoords.lng,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: gpsCoords.lat,
                    longitude: gpsCoords.lng,
                  }}
                  title="Ubicación actual"
                />
              </MapView>
            </>
          ) : (
            <Text style={styles.loadingText}>Obteniendo ubicación...</Text>
          )}
        </View>

        {/* FORMULARIO */}
        <View style={styles.formSection}>
          <Text style={styles.formLabel}>Nombre de Sucursal</Text>
          <Controller
            control={control}
            name="sucursal"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder="Ej: Tienda Central"
              />
            )}
          />

          <Text style={styles.formLabel}>Tipo de Reporte</Text>
          <Controller
            control={control}
            name="tipo_reporte"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder="Ej: Mantenimiento preventivo"
              />
            )}
          />

          <Text style={styles.formLabel}>Modelo: Laptop DELL INSPIRON 7460</Text>
        
        </View>

        {/* SECCIONES DE FOTOS */}
        <Text style={styles.photosTitle}> Fotos Requeridas</Text>
        
        <RenderPhotoSection title="Carcasa Superior" sectionKey="Carcasa Superior" />
        <RenderPhotoSection title="Teclado" sectionKey="Teclado" />
        <RenderPhotoSection title="Mousepad" sectionKey="Mousepad" />
        <RenderPhotoSection title="Pantalla" sectionKey="Pantalla" />
        <RenderPhotoSection title="Daño 1" sectionKey="Danio1" />
        <RenderPhotoSection title="Daño 2" sectionKey="Danio2" />

        {/* Botón de enviar */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        >
          <Ionicons name="paper-plane-outline" size={20} color="white" />
          <Text style={styles.submitButtonText}>Enviar Reporte</Text>
        </TouchableOpacity>
        
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  dateTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  gpsSection: {
    marginBottom: 25,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  coordinates: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  loadingText: {
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  formSection: {
    marginBottom: 25,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  photosTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginBottom: 20,
  },
  photoSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  photoImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  validatedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  validatedText: {
    color: '#27ae60',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 4,
  },
  photoInfo: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  successText: {
    color: '#27ae60',
  },
  emptySection: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 12,
  },
  emptyText: {
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
  takePhotoButton: {
    backgroundColor: '#e67e22',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  takePhotoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  spacer: {
    height: 30,
  },
  
  // Estilos del Modal de Validación
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    padding: 0,
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
  },
  modalSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  errorMessageContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFF5F5',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  errorMessage: {
    fontSize: 16,
    color: '#E53E3E',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  referenceContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  referenceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  referenceImagePlaceholder: {
    backgroundColor: '#f0f0f0',
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  referenceText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  recommendationsContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationText: {
    fontSize: 15,
    color: '#444',
    marginLeft: 12,
    flex: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  retryButton: {
    backgroundColor: '#4A90E2',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
});