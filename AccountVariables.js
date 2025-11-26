import React from 'react';
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

// 1) Lista de variables que se muestran en las tarjetas
const VARIABLES = [
  { id: '1', label: 'Región Predeterminada' },
  { id: '2', label: 'Formato de fecha' },
  { id: '3', label: 'Limite de Formularios' },
  { id: '4', label: 'Modo de Operación' },
  { id: '5', label: 'Parametros del Sistema' },
];

export default function AccountVariablesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Barra de estado en claro sobre fondo oscuro */}
      <StatusBar style="light" />

      {/* ==== HEADER NEGRO CON LOGO Y MENÚ ==== */}
      <View style={styles.header}>
        {/* Aquí puedes reemplazar el texto por el logo con <Image source={{uri: 'https://...'}} /> */}
        <Text style={styles.logoText}>HQREPORT</Text>

        <View style={styles.headerIcons}>
          {/* Flecha atrás (por ahora sin acción, luego le conectas navigation.goBack) */}
          <TouchableOpacity style={styles.headerIconButton}>
            <Ionicons name="chevron-back" size={22} color="#ffffff" />
          </TouchableOpacity>

          {/* Menú hamburguesa */}
          <TouchableOpacity style={styles.headerIconButton}>
            <Ionicons name="menu" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ==== BARRA NARANJA CON TÍTULO ==== */}
      <View style={styles.sectionTitleBar}>
        <Text style={styles.sectionTitleText}>Variables de Cuenta</Text>
      </View>

      {/* ==== CONTENIDO PRINCIPAL SCROLLABLE ==== */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bloque 1: texto + tarjetas, con padding lateral */}
        <View style={styles.innerContent}>
          {/* Texto centrado: "Estas variables afectan a todos los usuarios" */}
          <Text style={styles.subtitle}>
            Estas variables afectan a todos los usuarios
          </Text>

          {/* Tarjetas de variables */}
          <View style={styles.cardList}>
            {VARIABLES.map((item) => (
              <View key={item.id} style={styles.variableCard}>
                {/* Nombre de la variable (texto a la izquierda) */}
                <Text style={styles.variableLabel}>{item.label}</Text>

                {/* Botón pill "Editar" a la derecha */}
                <TouchableOpacity style={styles.editPill}>
                  <Text style={styles.editPillText}>Editar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Bloque 2: botón gris + barra negra al final, de ancho completo */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Agregar Variable</Text>
          </TouchableOpacity>

          <View style={styles.bottomBlackBar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 2) Estilos de la pantalla.

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
    fontSize: 16,
    fontWeight: '550',
  },

  /* SCROLL */
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  // flexGrow + space-between para pegar el bloque inferior al fondo
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  /* BLOQUE 1: texto + tarjetas */
  innerContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '550',
    textAlign: 'center',
    marginBottom: 26,
  },

  cardList: {
    gap: 18,
  },

  // Tarjeta de variable (rectángulo blanco con borde y esquinas redondeadas)
  variableCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 22,
    paddingVertical: 35,
    borderWidth: 1,
    borderColor: '#333333',
  },

  variableLabel: {
    flex: 1,
    fontSize: 16,
    color: '#222222',
  },

  // Pill gris "Editar"
  editPill: {
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

  /* BLOQUE 2: botón gris + barra negra, ancho completo */
  bottomSection: {
    marginTop: 24,
  },

  addButton: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: '550',
    color: '#000000',
  },

  bottomBlackBar: {
    height: 40,
    backgroundColor: '#000000',
    width: '100%',
  },
});
