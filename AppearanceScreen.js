import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// 1) Colores disponibles (los circulitos)
const ACCENT_COLORS = [
  { id: 'red',   value: '#EE4E34' }, // rojo
  { id: 'orange', value: '#FA7F13' }, // naranja
  { id: 'blue',  value: '#009CCC' }, // azul
  { id: 'white', value: '#FFFFFF' }, // blanco
  { id: 'black', value: '#000000' }, // negro
];

export default function AppearanceScreen() {
  // 2) Estado para guardar el tema seleccionado (Claro / Oscuro)
const [selectedTheme, setSelectedTheme] = useState('light');       // 👈 sin <'light' | 'dark'>

  // 3) Estado para guardar el color seleccionado (uno de los circulitos)
  //    Este color lo usaremos en los encabezados de la vista previa.
const [selectedColor, setSelectedColor] = useState('#F39C12');     // 👈 sin <string>

  // 4) Fondo general de la pantalla según el tema (solo visual, simple)
  const screenBackground =
    selectedTheme === 'light' ? '#FFFFFF' : '#111111';
  const textColor = selectedTheme === 'light' ? '#000000' : '#FFFFFF';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: screenBackground }]}>
      <StatusBar style="light" />

      {/* ==== HEADER NEGRO CON LOGO Y MENÚ ==== */}
      <View style={styles.header}>
        <Text style={styles.logoText}>HQREPORT</Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconButton}>
            <Ionicons name="chevron-back" size={22} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerIconButton}>
            <Ionicons name="menu" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ==== BARRA NARANJA CON TÍTULO ==== */}
      <View style={styles.sectionTitleBar}>
        <Text style={styles.sectionTitleText}>Apariencia</Text>
      </View>

      {/* ==== CONTENIDO PRINCIPAL ==== */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* BLOQUE 1: Tema + Color + Vista previa */}
        <View style={styles.innerContent}>
          {/* ================== SECCIÓN TEMA ================== */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionLabel, { color: textColor }]}>
                Tema
              </Text>

              {/* Pill "Editar" (decorativo por ahora) */}
              <TouchableOpacity style={styles.editPill}>
                <Text style={styles.editPillText}>Editar</Text>
              </TouchableOpacity>
            </View>

            {/* Botones Claro / Oscuro */}
            <View style={styles.themeOptionsRow}>
              {/* Opción CLARO */}
              <TouchableOpacity
                style={[
                  styles.themeOption,
                  selectedTheme === 'light' && styles.themeOptionActive,
                ]}
                onPress={() => setSelectedTheme('light')}
              >
                {/* Circulito tipo radio */}
                <View
                  style={[
                    styles.themeRadioOuter,
                    selectedTheme === 'light' && styles.themeRadioOuterActive,
                  ]}
                >
                  {selectedTheme === 'light' && <View style={styles.themeRadioInner} />}
                </View>
                <Text style={styles.themeOptionText}>Claro</Text>
              </TouchableOpacity>

              {/* Opción OSCURO */}
              <TouchableOpacity
                style={[
                  styles.themeOption,
                  selectedTheme === 'dark' && styles.themeOptionActive,
                ]}
                onPress={() => setSelectedTheme('dark')}
              >
                <View
                  style={[
                    styles.themeRadioOuter,
                    selectedTheme === 'dark' && styles.themeRadioOuterActive,
                  ]}
                >
                  {selectedTheme === 'dark' && <View style={styles.themeRadioInner} />}
                </View>
                <Text style={styles.themeOptionText}>Oscuro</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Línea divisoria de sección (toca los bordes) */}
          <View style={styles.sectionSeparator} />

          {/* ================== SECCIÓN COLOR ================== */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionLabel, { color: textColor }]}>
                Color
              </Text>

              <TouchableOpacity style={styles.editPill}>
                <Text style={styles.editPillText}>Editar</Text>
              </TouchableOpacity>
            </View>

            {/* Circulitos de color */}
            <View style={styles.colorRow}>
              {ACCENT_COLORS.map((colorItem) => {
                const isSelected = selectedColor === colorItem.value;
                return (
                  <TouchableOpacity
                    key={colorItem.id}
                    style={[
                      styles.colorCircle,
                      {
                        backgroundColor: colorItem.value,
                        borderColor:
                          colorItem.id === 'white' ? '#000000' : 'transparent',
                      },
                      isSelected && styles.colorCircleSelected,
                    ]}
                    onPress={() => setSelectedColor(colorItem.value)}
                  />
                );
              })}
            </View>
          </View>

          <View style={styles.sectionSeparator} />

          {/* ================== SECCIÓN VISTA PREVIA ================== */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionLabel, { color: textColor }]}>
                Vista Previa
              </Text>

              <TouchableOpacity style={styles.editPill}>
                <Text style={styles.editPillText}>Editar</Text>
              </TouchableOpacity>
            </View>

            {/* Vista previa del reporte */}
            <View style={styles.previewWrapper}>
              <View style={styles.previewPhone}>
                {/* Barra superior del reporte (usa el color seleccionado) */}
                <View
                  style={[
                    styles.previewTopHeader,
                    { backgroundColor: selectedColor },
                  ]}
                >
                  <Text style={styles.previewTopHeaderText}>
                    HQREPORT
                  </Text>
                </View>

                {/* Encabezado de sección "Reporte Fotográfico" */}
                <View
                  style={[
                    styles.previewMainHeader,
                    { backgroundColor: selectedColor },
                  ]}
                >
                  <Text style={styles.previewMainHeaderText}>
                    Reporte Fotográfico
                  </Text>
                </View>

                {/* Fila "Fecha Mantenimiento" */}
                <View style={styles.previewRowHeader}>
                  <Text style={styles.previewRowHeaderText}>
                    Fecha Mantenimiento
                  </Text>
                </View>
                <View style={styles.previewRowContent}>
                  <Text style={styles.previewRowContentText}>
                    15/10/2025 04:42 PM
                  </Text>
                </View>

                {/* Fila "Ubicación" */}
                <View style={styles.previewRowHeader}>
                  <Text style={styles.previewRowHeaderText}>UBICACIÓN</Text>
                </View>

                {/* Mapa (simulado como un rectángulo gris con un puntito azul) */}
                <View style={styles.previewMapBox}>
                  <View style={styles.previewMapPin} />
                </View>

                {/* Fila de latitud / longitud */}
                <View style={styles.previewRowContent}>
                  <Text style={styles.previewRowContentText}>
                    Latitud: 15.7922°
                  </Text>
                </View>
                <View style={styles.previewRowContent}>
                  <Text style={styles.previewRowContentText}>
                    Longitud: -87.2012°
                  </Text>
                </View>

                {/* Fila de títulos de fotos */}
                <View style={styles.previewPhotosHeaderRow}>
                  <Text style={styles.previewPhotosHeaderText}>
                    Foto Exterior
                  </Text>
                  <Text style={styles.previewPhotosHeaderText}>
                    Foto Interior
                  </Text>
                  <Text style={styles.previewPhotosHeaderText}>
                    Foto Antes/Después
                  </Text>
                </View>

                {/* Fila de cuadros de foto con botón Upload */}
                <View style={styles.previewPhotosRow}>
                  {[1, 2, 3].map((n) => (
                    <View key={n} style={styles.previewPhotoBox}>
                      <View style={styles.previewPhotoArea} />
                      <View
                        style={[
                          styles.previewUploadBar,
                          { backgroundColor: selectedColor },
                        ]}
                      >
                        <Text style={styles.previewUploadText}>Upload</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* BLOQUE 2: Botón Guardar Cambios + barra negra inferior */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>

          <View style={styles.bottomBlackBar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ====================== ESTILOS ======================

const ORANGE = '#F15A29';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  /* HEADER NEGRO */
  header: {
    height: 70,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconButton: {
    padding: 6,
  },

  /* BARRA NARANJA DEL TÍTULO */
  sectionTitleBar: {
    backgroundColor: ORANGE,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitleText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '550',
  },

  /* SCROLL GENERAL */
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  /* CONTENIDO INTERIOR */
  innerContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  sectionBlock: {
    marginBottom: 24,
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
  },

  // Pill "Editar"
  editPill: {
    marginLeft: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#DDDDDD',
  },
  editPillText: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '500',
  },

  sectionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
    marginBottom: 24,
    marginHorizontal: -24, // para que la línea toque los bordes
  },

  /* TEMA */
  themeOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF4CF',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E6D9A4',
  },
  themeOptionActive: {
    borderColor: '#000000',
  },
  themeRadioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  themeRadioOuterActive: {
    borderColor: '#000000',
  },
  themeRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
  },
  themeOptionText: {
    fontSize: 14,
  },

  /* COLORES */
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  colorCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorCircleSelected: {
    borderColor: '#000000',
    borderWidth: 3,
  },

  /* VISTA PREVIA */
  previewWrapper: {
    marginTop: 12,
    alignItems: 'center',
  },
  previewPhone: {
    width: '100%',
    backgroundColor: '#E5E5E5',
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 12,
  },

  previewTopHeader: {
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewTopHeaderText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  previewMainHeader: {
    marginTop: 6,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewMainHeaderText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  previewRowHeader: {
    marginTop: 6,
    backgroundColor: '#D0D0D0',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  previewRowHeaderText: {
    fontSize: 11,
    fontWeight: '600',
  },

  previewRowContent: {
    backgroundColor: '#F7F7F7',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  previewRowContentText: {
    fontSize: 10,
  },

  previewMapBox: {
    marginTop: 4,
    height: 120,
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewMapPin: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },

  previewPhotosHeaderRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  previewPhotosHeaderText: {
    flex: 1,
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#D0D0D0',
    paddingVertical: 4,
    borderRightWidth: 1,
    borderRightColor: '#FFFFFF',
  },

  previewPhotosRow: {
    flexDirection: 'row',
  },
  previewPhotoBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginTop: 2,
    marginRight: 2,
  },
  previewPhotoArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  previewUploadBar: {
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewUploadText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },

  /* BOTÓN FINAL + BARRA NEGRA */
  bottomSection: {
    marginTop: 24,
  },
  saveButton: {
    backgroundColor: '#8C8C8C',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomBlackBar: {
    height: 40,
    backgroundColor: '#000000',
    width: '100%',
  },
});
