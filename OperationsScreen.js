import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import CustomHeader from './components/CustomHeader';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// 1) Acciones de la fila superior (iconos cuadrados + burbuja naranja)
const ACTIONS = [
  {
    id: '1',
    label: 'Operaciones',
    count: 5,
    iconLib: 'material',          // usaremos MaterialCommunityIcons
    iconName: 'clipboard-text-clock-outline',
  },
  {
    id: '2',
    label: 'Revisar',
    count: 14,
    iconLib: 'material',
    iconName: 'file-search-outline', // ícono de documento con lupa
  },
  {
    id: '3',
    label: 'Actualizar',
    count: 5,
    iconLib: 'ion',
    iconName: 'sync-outline',       // símbolo de actualización
  },
  {
    id: '4',
    label: 'Enviar',
    count: 9,
    iconLib: 'ion',
    iconName: 'cloud-upload-outline', // icono de subir
  },
];

// 2) Lista de reportes de mantenimiento
const REPORTS = [
  { id: '1', title: 'Reporte de Mantenimiento - Tienda#1 - Sector 2' },
  { id: '2', title: 'Reporte de Mantenimiento - Tienda#2 - Sector 7' },
  { id: '3', title: 'Reporte de Mantenimiento - Tienda#3 - Sector 2' },
  { id: '4', title: 'Reporte de Mantenimiento - Tienda#4 - Sector 3' },
  { id: '5', title: 'Reporte de Mantenimiento - Tienda#5 - Sector 4' },
  { id: '6', title: 'Reporte de Mantenimiento - Tienda#1 - Sector 2' },
  { id: '7', title: 'Reporte de Mantenimiento - Tienda#8 - Sector 7' },
  { id: '8', title: 'Reporte de Mantenimiento - Tienda#3 - Sector 16' },
  { id: '9', title: 'Reporte de Mantenimiento - Tienda#4 - Sector 3' },
  { id: '10', title: 'Reporte de Mantenimiento - Tienda#15 - Sector 9' },
];

export default function OperationsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.fullScreen} edges={["top", "left", "right", "bottom"]}>
          <StatusBar barStyle="light-content" backgroundColor="#000" />
          
          <CustomHeader navigation={navigation} />

      {/* ==== BARRA NARANJA "Operaciones" ==== */}
      <View style={styles.sectionTitleBar}>
        <Text style={styles.sectionTitleText}>Operaciones</Text>
      </View>

      {/* ==== CONTENIDO PRINCIPAL ==== */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* BLOQUE 1: iconos + lista de reportes */}
        <View style={styles.innerContent}>
          {/* Fila de 4 acciones (icono cuadrado + badge naranja + texto) */}
          <View style={styles.actionsRow}>
            {ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionTouchable}
                onPress={() => {
                  if (action.label === 'Revisar') {
                    navigation.navigate('InfoTecnicos');
                  }
                }}
              >
                <View style={styles.actionItem}>
                  <View style={styles.iconWrapper}>
                    {/* Icono principal dentro del cuadrado */}
                    {action.iconLib === 'material' ? (
                      <MaterialCommunityIcons
                        name={action.iconName}
                        size={36}
                        color="#000000"
                      />
                    ) : (
                      <Ionicons
                        name={action.iconName}
                        size={36}
                        color="#000000"
                      />
                    )}

                    {/* Burbuja naranja con el número */}
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{action.count}</Text>
                    </View>
                  </View>

                  {/* Texto debajo del icono */}
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Separación antes de los reportes */}
          <View style={{ height: 32 }} />

          {/* Lista de reportes de mantenimiento */}
          <View style={styles.reportList}>
            {REPORTS.map((report) => (
              <View key={report.id} style={styles.reportGroup}>
                <View style={styles.reportRow}>
                  <View style={styles.reportTextBlock}>
                    <Text style={styles.reportTitle}>{report.title}</Text>
                  </View>

                  {/* Pill gris "Pendiente" */}
                  <TouchableOpacity style={styles.statusPill}>
                    <Text style={styles.statusPillText}>Pendiente</Text>
                  </TouchableOpacity>
                </View>

                {/* Línea divisoria */}
                <View style={styles.reportSeparator} />
              </View>
            ))}
          </View>
        </View>

        {/* BLOQUE 2: barra negra inferior */}
        <View style={styles.bottomSection}>
          <View style={styles.bottomBlackBar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 3) ESTILOS: 
const ORANGE = '#EE4E34';
const BADGE_ORANGE = '#EE4E34';

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    fontSize: 16,
    fontWeight: '550',
  },

  /* SCROLL GENERAL */
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between', // pega la barra negra al fondo
  },

  /* CONTENIDO PRINCIPAL */
  innerContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  /* FILA DE ACCIONES (iconos) */
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionTouchable: {
    alignItems: 'center',
  },
  actionItem: {
    alignItems: 'center',
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.18,          // qué tan marcada (0 a 1)
    shadowOffset: { width: 0, height: 3 }, // hacia dónde se desplaza
    shadowRadius: 4,               // qué tan difusa
    elevation: 4,                    // Android: altura de la sombra
  },
  badge: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: BADGE_ORANGE,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontWeight: '550',
    fontSize: 13,
  },
  actionLabel: {
    marginTop: 20,
    fontSize: 13,
    textAlign: 'center',
  },

  /* LISTA DE REPORTES */
  reportList: {
    marginTop: 24,
  },
  reportGroup: {
    marginBottom: 35,
  },
  reportRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportTextBlock: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 14,
    color: '#111111',
  },

  statusPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#DDDDDD',
    marginLeft: 12,
  },
  statusPillText: {
    fontSize: 11,
    color: '#333333',
    fontWeight: '500',
  },

  reportSeparator: {
    marginTop: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
    marginHorizontal: -24,
  },

  /* BARRA NEGRA INFERIOR */
  bottomSection: {
    marginTop: 24,
  },
  bottomBlackBar: {
    height: 50,
    backgroundColor: '#000000',
    width: '100%',
  },
  
  container: {
    padding: 16,
    flex: 1,
  },
});