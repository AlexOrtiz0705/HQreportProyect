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

// Imágenes de referencia para cada sección (puedes usar URLs o imágenes locales)
const REFERENCE_IMAGES = {
  'carcasa-superior': require('./assets/2.jpg'), // Cambia estas rutas
  'teclado': require('./assets/1.jpg'),
  'mousepad': require('./assets/4.jpg'),
  'pantalla': require('./assets/3.jpg'),
};

export default function ReportScreen({ navigation }) {
  const { control, handleSubmit } = useForm();

  const [fechaHora, setFechaHora] = useState("");
  const [gpsCoords, setGpsCoords] = useState(null);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [tempPhotoUri, setTempPhotoUri] = useState(null);
  const [validationAttempts, setValidationAttempts] = useState({});

  // Definir las secciones de fotos de manera estructurada
  const photoSectionsConfig = [
    {
      key: 'carcasa-superior',
      title: 'Carcasa Superior',
      referenceImage: REFERENCE_IMAGES['carcasa-superior'],
      description: 'Foto de la parte superior de la laptop'
    },
    {
      key: 'teclado',
      title: 'Teclado',
      referenceImage: REFERENCE_IMAGES['teclado'],
      description: 'Foto completa del teclado'
    },
    {
      key: 'mousepad',
      title: 'Mousepad',
      referenceImage: REFERENCE_IMAGES['mousepad'],
      description: 'Foto del área del touchpad'
    },
    {
      key: 'pantalla',
      title: 'Pantalla',
      referenceImage: REFERENCE_IMAGES['pantalla'],
      description: 'Foto de la pantalla encendida'
    },
    {
      key: 'danio1',
      title: 'Daño 1',
      description: 'Primer daño identificado'
    },
    {
      key: 'danio2',
      title: 'Daño 2',
      description: 'Segundo daño identificado'
    },
  ];

  // Estado para almacenar las fotos tomadas
  const [photoSections, setPhotoSections] = useState(
    photoSectionsConfig.reduce((acc, section) => {
      acc[section.key] = null;
      return acc;
    }, {})
  );

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
  const takePhoto = async (section) => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        base64: true,
      });

      if (result.canceled) return;

      const photo = result.assets[0];
      
      // Guardar la foto temporal
      setTempPhotoUri(photo.uri);
      setCurrentSection(section);
      
      // Simular validación de IA (primera vez falla, segunda vez pasa)
      const attempts = validationAttempts[section.key] || 0;
      
      if (attempts === 0) {
        // Primera vez: mostrar modal de error con imagen de referencia
        setShowValidationModal(true);
        setValidationAttempts(prev => ({
          ...prev,
          [section.key]: 1
        }));
      } else {
        // Segunda vez: aceptar la foto directamente
        acceptPhoto(section, photo);
      }
      
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "No se pudo tomar la foto.");
    }
  };

  // ============================
  // ACEPTAR FOTO
  // ============================
  const acceptPhoto = async (section, photo) => {
    try {
      const loc = await Location.getCurrentPositionAsync({});
      
      // Simular datos de validación exitosa de IA
      const validacion = {
        coincide: true,
        confianza: 95,
        motivo: "Imagen válida - Coincide con la categoría",
        descripcionDetectada: section.title,
      };

      setPhotoSections((prev) => ({
        ...prev,
        [section.key]: {
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
  // REINTENTAR DESPUÉS DEL MODAL
  // ============================
  const handleRetry = () => {
    setShowValidationModal(false);
    // Simular que ahora sí se aceptará la foto
    if (currentSection && tempPhotoUri) {
      const photo = { uri: tempPhotoUri, base64: "" };
      acceptPhoto(currentSection, photo);
    }
  };

  // ============================
  // MODAL DE VALIDACIÓN FALLIDA CON IMAGEN DE REFERENCIA
  // ============================
  const ValidationModal = () => {
    if (!currentSection) return null;

    return (
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
              <Text style={styles.modalTitle}>VALIDACIÓN DE IMAGEN</Text>
              <TouchableOpacity 
                onPress={() => setShowValidationModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>Revisa la imagen de referencia</Text>
            
            {/* Mensaje de error */}
            <View style={styles.errorMessageContainer}>
              <Ionicons name="warning-outline" size={40} color="#FF6B6B" />
              <Text style={styles.errorMessage}>
                La imagen tomada no coincide con lo esperado para:
              </Text>
              <Text style={styles.sectionName}>{currentSection.title}</Text>
            </View>
            
            {/* Imagen de referencia */}
            <View style={styles.referenceContainer}>
              <Text style={styles.referenceTitle}>Imagen de referencia esperada:</Text>
              <Text style={styles.referenceDescription}>
                {currentSection.description}
              </Text>
              
              <View style={styles.referenceImageContainer}>
                {currentSection.referenceImage ? (
                  <Image 
                    source={currentSection.referenceImage} 
                    style={styles.referenceImage}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={styles.referenceImagePlaceholder}>
                    <Ionicons name="image-outline" size={50} color="#666" />
                    <Text style={styles.referenceText}>
                      Referencia: {currentSection.title}
                    </Text>
                    <Text style={styles.referenceSubtext}>
                      {currentSection.description}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            
            {/* Recomendaciones específicas */}
            <View style={styles.recommendationsContainer}>
              <Text style={styles.recommendationsTitle}>Recomendaciones para esta foto:</Text>
              
              <View style={styles.recommendationItem}>
                <Ionicons name="camera-outline" size={20} color="#175cacff" />
                <Text style={styles.recommendationText}>
                  Enfoca completamente el área: {currentSection.title.toLowerCase()}
                </Text>
              </View>
              
              <View style={styles.recommendationItem}>
                <Ionicons name="sunny-outline" size={20} color="#4A90E2" />
                <Text style={styles.recommendationText}>
                  Asegura buena iluminación sin reflejos
                </Text>
              </View>
              
              <View style={styles.recommendationItem}>
                <Ionicons name="scan-outline" size={20} color="#4A90E2" />
                <Text style={styles.recommendationText}>
                  Toma la foto desde el ángulo correcto
                </Text>
              </View>
            </View>
            
            {/* Botones */}
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.retryButton]}
                onPress={handleRetry}
              >
                <Ionicons name="camera" size={20} color="white" />
                <Text style={styles.retryButtonText}>Tomar Nueva Foto</Text>
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
  };

  // ==================================
  // ENVIAR REPORTE COMPLETO
  // ==================================
  const onSubmit = async (data) => {
    // Verificar que todas las fotos estén tomadas
    const missingPhotos = photoSectionsConfig.filter(
      section => !photoSections[section.key]
    );
    
    if (missingPhotos.length > 0) {
      Alert.alert(
        "Fotos faltantes",
        `Necesitas tomar ${missingPhotos.length} fotos más: ${missingPhotos.map(s => s.title).join(', ')}`
      );
      return;
    }

    const payload = {
      ...data,
      fechaHora,
      gps_global: gpsCoords,
      fotos: photoSections,
      modelo: "Laptop DELL INSPIRON 7460"
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
  // COMPONENTE DE SECCIÓN DE FOTO
  // ============================
  const RenderPhotoSection = ({ section }) => {
    const sec = photoSections[section.key];
    const attempts = validationAttempts[section.key] || 0;
    
    return (
      <View style={styles.photoSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {sec && (
            <View style={styles.validatedIndicator}>
              <Ionicons name="checkmark-circle" size={16} color="#27ae60" />
              <Text style={styles.validatedIndicatorText}>Validada</Text>
            </View>
          )}
        </View>

        {sec ? (
          <>
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: sec.uri }}
                style={styles.photoImage}
              />
            </View>
            
            <View style={styles.photoInfo}>
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.infoText}>
                  GPS: {sec.gps.lat.toFixed(6)}, {sec.gps.lng.toFixed(6)}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Ionicons name="shield-checkmark-outline" size={14} color="#27ae60" />
                <Text style={[styles.infoText, styles.successText]}>
                  {sec.validacion.motivo}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Ionicons name="stats-chart-outline" size={14} color="#4A90E2" />
                <Text style={styles.infoText}>
                  Confianza IA: {sec.validacion.confianza}%
                </Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.emptySection}>
            <Ionicons name="camera-outline" size={40} color="#999" />
            <Text style={styles.emptyText}>
              {attempts > 0 ? "Intento fallido - Tomar nueva foto" : "Sin foto tomada"}
            </Text>
            {attempts > 0 && (
              <Text style={styles.attemptText}>
                {attempts} intento(s) realizado(s)
              </Text>
            )}
          </View>
        )}

        <TouchableOpacity
          onPress={() => takePhoto(section)}
          style={[
            styles.takePhotoButton,
            sec && styles.retakeButton
          ]}
        >
          <Ionicons 
            name={sec ? "refresh" : "camera"} 
            size={20} 
            color="white" 
          />
          <Text style={styles.takePhotoText}>
            {sec ? "Tomar Otra Foto" : "Tomar Foto"}
          </Text>
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
      {/* Encabezado principal con recuadro */}
      <View style={styles.headerCard}>
        <View style={styles.headerTitleRow}>
          <Ionicons name="document-text-outline" size={24} color="#4A90E2" />
          <Text style={styles.mainTitle}>Reporte Fotográfico</Text>
        </View>
        
        <View style={styles.headerInfoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.headerInfoContainer}>
              <View style={styles.infoColumn}>
                <View style={styles.infoItem}>
                  <View style={styles.infoIconContainer}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Fecha y Hora</Text>
                    <Text style={styles.infoValue}>{fechaHora}</Text>
                  </View>
                </View>
                
                <View style={styles.infoItem}>
                  <View style={styles.infoIconContainer}>
                    <Ionicons name="laptop-outline" size={16} color="#666" />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Modelo</Text>
                    <Text style={styles.infoValue}>DELL INSPIRON 7460</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Sección de Ubicación con recuadro */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="navigate" size={22} color="#4A90E2" />
          <Text style={styles.sectionTitle}>Ubicación del Reporte</Text>
        </View>
        
        <View style={styles.sectionContent}>
          {gpsCoords?.lat && gpsCoords?.lng ? (
            <>
              <View style={styles.coordinatesContainer}>
                <Ionicons name="location" size={16} color="#d60e0eff" />
                <Text style={styles.coordinatesLabel}>Coordenadas GPS:</Text>
                <Text style={styles.sectionHeaderRow}>
                  {gpsCoords.lat.toFixed(6)}, {gpsCoords.lng.toFixed(6)}
                </Text>
              </View>
              
              <View style={styles.mapContainer}>
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
                  >
                    <View style={styles.markerContainer}>
                      <Ionicons name="location" size={24} color="#E53E3E" />
                    </View>
                  </Marker>
                </MapView>
               
              </View>
            </>
          ) : (
            <View style={styles.loadingContainer}>
              <Ionicons name="locate" size={30} color="#999" />
              <Text style={styles.loadingText}>Obteniendo ubicación GPS...</Text>
              <Text style={styles.loadingSubtext}>Por favor espera</Text>
            </View>
          )}
        </View>
      </View>

        {/* FORMULARIO */}
        <View style={styles.formSection}>
          <Text style={styles.formLabel}>Información del Reporte</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nombre de Sucursal</Text>
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
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Tipo de Reporte</Text>
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
          </View>
        </View>

        {/* SECCIONES DE FOTOS */}
        <View style={styles.photosHeader}>
          <Ionicons name="images-outline" size={24} color="#000" />
          <Text style={styles.photosTitle}>Fotos Requeridas</Text>
        </View>
        
        {photoSectionsConfig.map((section) => (
          <RenderPhotoSection 
            key={section.key} 
            section={section} 
          />
        ))}

        {/* Contador de fotos */}
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            📊 {Object.values(photoSections).filter(Boolean).length} de {photoSectionsConfig.length} fotos completadas
          </Text>
        </View>

        {/* Botón de enviar */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        >
          <Ionicons name="paper-plane-outline" size={22} color="white" />
          <Text style={styles.submitButtonText}>Enviar Reporte Completo</Text>
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
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateTime: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  gpsSection: {
    marginBottom: 25,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  coordinates: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  map: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#999',
    fontStyle: 'italic',
    marginLeft: 8,
  },
  formSection: {
    marginBottom: 25,
  },
  formLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
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
  photosHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  photosTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  validatedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  validatedIndicatorText: {
    color: '#27ae60',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 4,
  },
  photoContainer: {
    marginBottom: 12,
  },
  photoImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  photoInfo: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 8,
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
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  attemptText: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  takePhotoButton: {
    backgroundColor: '#e09c08ff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
  },
  retakeButton: {
    backgroundColor: '#e67e22',
  },
  takePhotoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  counterContainer: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  counterText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#5582b6ff',
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
    backgroundColor: '#2C3E50',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  errorMessageContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF5F5',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  errorMessage: {
    fontSize: 14,
    color: '#E53E3E',
    textAlign: 'center',
    marginTop: 8,
  },
  sectionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 5,
    textAlign: 'center',
  },
  referenceContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  referenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  referenceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  referenceImageContainer: {
    backgroundColor: '#f8f9fa',
    height: 200,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  referenceImage: {
    width: '100%',
    height: '100%',
  },
  referenceImagePlaceholder: {
    alignItems: 'center',
    padding: 20,
  },
  referenceText: {
    marginTop: 10,
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  referenceSubtext: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  recommendationsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 14,
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  retryButton: {
    backgroundColor: '#b66904ff',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  // Encabezado principal
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: 12,
  },
  headerInfoContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoIconContainer: {
    backgroundColor: '#FFFFFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },
  infoLabel: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
  },
  
  // Tarjetas de sección
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: 10,
  },
  sectionContent: {
    marginTop: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 16,
    lineHeight: 20,
  },
  
  // Ubicación GPS
  coordinatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  coordinatesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0369A1',
    marginLeft: 8,
    marginRight: 6,
  },
  coordinatesValue: {
    fontSize: 13,
    color: '#0C4A6E',
    fontFamily: 'monospace',
    fontWeight: '500',
  },
  mapContainer: {
    position: 'relative',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  mapCaption: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    color: '#2C3E50',
  },
  markerContainer: {
    borderRadius: 15,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  
  // Formulario
  formContainer: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#2D3748',
  },
  
  // Fotos
  counterBadge: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  counterText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  photosGrid: {
    gap: 12,
  },
  
  // Botón de enviar
  submitButton: {
    backgroundColor: '#456ea3ff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
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
  
  // Estados de carga
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  loadingText: {
    color: '#4A5568',
    fontSize: 16,
    marginTop: 12,
    fontWeight: '500',
  },
  loadingSubtext: {
    color: '#A0AEC0',
    fontSize: 14,
    marginTop: 4,
  },
});