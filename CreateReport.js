import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar, // Para controlar la barra de estado
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from './assets/Logo.png';
// --- Componente de Reporte Individual ---
const ReportCard = ({ title, onVista, onCrear }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardButtons}>
      <TouchableOpacity onPress={onVista} style={styles.buttonVista}>
        <Text style={styles.buttonTextCard}>Vista</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCrear} style={styles.buttonCrear}>
        <Text style={styles.buttonTextCard}>Crear</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// --- Componente Principal ---
// Asegúrate de que este componente reciba 'navigation' como prop si usas React Navigation
export default function CreateReport({ navigation }) {
  const [activeTab, setActiveTab] = useState("Crear");

  // Ocultar la cabecera de navegación nativa
  useEffect(() => {
    if (navigation) {
      navigation.setOptions({ headerShown: false });
    }
  }, [navigation]);

  const reports = [
    { id: "mantenimiento", title: "Reporte de Mantenimiento" },
    { id: "instalacion", title: "Reporte de Instalación" },
    { id: "reparacion", title: "Reporte de Reparación" },
  ];

  // Componente del Header personalizado
  const CustomHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.icon}>{"<"}</Text>
      </TouchableOpacity>
      {/* Simulación del Logo */}
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
      </View>
      <TouchableOpacity onPress={() => console.log("Menú")}>
        <Text style={styles.icon}>{"≡"}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.fullScreen}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {/* Nuestro Header personalizado */}
      <CustomHeader />

      {/* Selector Crear/Editar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Crear" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Crear")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Crear" && styles.activeTabText,
            ]}
          >
            Crear
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Editar" && styles.inactiveTab, // Cambio aquí para mejor claridad
          ]}
          onPress={() => setActiveTab("Editar")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Editar" && styles.inactiveTabText, // Cambio aquí
              activeTab === "Crear" && styles.inactiveTabText, // Asegurarse de que el texto de "Editar" sea negro cuando "Crear" está activo
            ]}
          >
            Editar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {/* Filtro */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filtrar</Text>
            <Text style={styles.filterIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de reportes */}
        {activeTab === "Crear" && (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {reports.map((r) => (
              <ReportCard
                key={r.id}
                title={r.title}
                onVista={() => console.log(`Ver ${r.title}`)}
                onCrear={() => console.log(`Crear ${r.title}`)}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#fff", // Fondo blanco para toda la pantalla
  },
  contentContainer: {
    flex: 1,
  },
  // Encabezado (HQREPORT)
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000", // Fondo negro
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  logoContainer: {
    paddingHorizontal: 10,
    borderColor: "#999",
    // Asegúrate de que este contenedor sea flexible si el logo puede variar de tamaño
    justifyContent: 'center',
    alignItems: 'center',
  },/*
  logoText: {
    color: "#fff",
    fontWeight: "900", // Más grueso
    fontSize: 18,
    letterSpacing: 1.5,
  },*/
  logoImage:{
    width: 120, // Ajusta el ancho deseado de tu logo
    height: 30,
  },
  icon: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  // Barra de Pestañas (Crear/Editar)
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#ccc", // Fondo base gris claro
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#e24a4a", // Fondo rojo para "Crear"
  },
  inactiveTab: {
    backgroundColor: "#ccc", // Fondo gris para "Editar"
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff", // Texto blanco en pestaña activa "Crear"
  },
  inactiveTabText: {
    color: "#000", // Texto negro en pestaña inactiva "Editar"
    fontWeight: "normal",
  },
  // Contenedor del Filtro
  filterContainer: {
    alignItems: "flex-end", // Alinear a la derecha
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff", // Fondo blanco
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  filterText: {
    fontSize: 14,
    marginRight: 5,
  },
  filterIcon: {
    fontSize: 12,
  },
  // Lista de Reportes
  scrollViewContent: {
    paddingHorizontal: 0,
    paddingTop: 0, // Inicia justo debajo del filtro
  },
  card: {
    backgroundColor: "#fff",
    paddingVertical: 20, // Más relleno vertical para que ocupe todo el ancho
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "400", // Menos negrita que el original para ajustarse a la imagen
  },
  cardButtons: {
    flexDirection: "row",
  },
  // Botones dentro de la tarjeta
  buttonVista: {
    backgroundColor: "#eee", // Fondo gris muy claro
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonCrear: {
    backgroundColor: "#eee", // Fondo gris muy claro
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonTextCard: {
    color: "#000",
    fontSize: 12, // Tamaño de fuente más pequeño para simular el de la imagen
  },
});