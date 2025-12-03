import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import CustomHeader from './components/CustomHeader';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// 1) Datos de las secciones de configuración.

const SETTINGS_ITEMS = [
  {
    id: '1',
    title: 'Idioma',
    subtitle: 'Español',
  },
  {
    id: '2',
    title: 'Permisos de Aplicación',
    subtitle: 'Configurar permisos y acceso a datos',
  },
  {
    id: '3',
    title: 'Ajustes de notificaciones push',
    subtitle: 'Administrar notificaciones',
  },
  {
    id: '4',
    title: 'Versión de la aplicación',
    subtitle: 'Versión 1.2.0',
  },
];

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Barra de estado en claro sobre fondo oscuro */}
      <StatusBar style="light" />
      <CustomHeader navigation={navigation} />
      

     
      {/* ==== BARRA NARANJA CON TÍTULO ==== */}
      <View style={styles.sectionTitleBar}>
        <Text style={styles.sectionTitleText}>Configuración</Text>
      </View>

      {/* ==== CONTENIDO PRINCIPAL ==== */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bloque 1: lista de opciones (arriba) */}
        <View style={styles.innerContent}>
          {SETTINGS_ITEMS.map((item, index) => (
            <View key={item.id} style={styles.settingsGroup}>
              {/* Cabecera de cada opción */}
              <View style={styles.settingsRow}>
                <View style={styles.settingsTextBlock}>
                  <Text style={styles.settingsTitle}>{item.title}</Text>
                  <Text style={styles.settingsSubtitle}>{item.subtitle}</Text>
                </View>

                {/* Pill gris "Editar" */}
                <TouchableOpacity style={styles.editPill}>
                  <Text style={styles.editPillText}>Editar</Text>
                </TouchableOpacity>
              </View>

              {/* Línea divisoria debajo de cada grupo */}
              <View style={styles.separator} />
            </View>
          ))}

          {/* 👇 Bloque especial: Apariencia -> abre AppearanceScreen
              AHORA DENTRO de innerContent para que tenga el mismo padding */}
          <View style={styles.settingsGroup}>
            <View style={styles.settingsRow}>
              <View style={styles.settingsTextBlock}>
                <Text style={styles.settingsTitle}>Apariencia</Text>
                <Text style={styles.settingsSubtitle}>
                  Tema, colores y vista previa
                </Text>
              </View>

              <TouchableOpacity
                style={styles.editPill}
                onPress={() => navigation.navigate('Appearance')}
              >
                <Text style={styles.editPillText}>Editar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />
          </View>
        </View>

        {/*Bloque 2: botón "Reiniciar Aplicación" + barra negra (abajo) */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reiniciar Aplicación</Text>
          </TouchableOpacity>

          <View style={styles.bottomBlackBar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 2) Estilos de la pantalla

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#EE4E34',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitleText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '550',
  },

  /* SCROLL */
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  // flexGrow + space-between hace que el bloque de abajo quede pegado al fondo
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  /* BLOQUE 1: opciones de configuración */
  innerContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  settingsGroup: {
    marginBottom: 18,
  },

  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  settingsTextBlock: {
    flex: 1,
  },

  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 6,
  },

  settingsSubtitle: {
    fontSize: 12,
    color: '#444444',
  },

  // Pill "Editar"
  editPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#DDDDDD',
    marginLeft: 12,
  },
  editPillText: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '500',
  },

  // Línea divisoria delgada
  separator: {
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
    marginHorizontal: -24,
  },

  /* BLOQUE 2: botón "Reiniciar Aplicación" + barra negra */
  bottomSection: {
    marginTop: 24,
  },

  resetButton: {
    backgroundColor: '#7D7D7D', // gris oscuro
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: '550',
    color: '#ffffff',
  },

  bottomBlackBar: {
    height: 40,
    backgroundColor: '#000000',
    width: '100%',
  },
});
