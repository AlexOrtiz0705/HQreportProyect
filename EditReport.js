import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from "./assets/Logo.png";
import CustomHeader from "./components/CustomHeader";
import DynamicTabBar from "./components/DynamicTabBar";

// --- Componente de Reporte Editable ---
const EditableReportCard = ({ title, date, onEdit }) => (
  <View style={styles.card}>
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDate}>{date}</Text>
    </View>
    <TouchableOpacity onPress={onEdit} style={styles.buttonEditar}>
      <Text style={styles.buttonTextCard}>Editar</Text>
    </TouchableOpacity>
  </View>
);

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
export default function EditReport({ navigation }) {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({ headerShown: false });
    }
  }, [navigation]);

  const reports = [
    {
      id: "r1",
      title: "Reporte de Mantenimiento - Tienda#1 - Sector 2",
      date: "Abierto el mar, ago 26, 2025 10:21",
    },
    {
      id: "r2",
      title: "Reporte de Instalación - Aire Acondicionado",
      date: "Abierto el vier, sept 14, 2025 10:21",
    },
    {
      id: "r3",
      title: "Reporte de Reparación - Sistema Eléctrico - Sucursal 3",
      date: "Abierto el vier, sept 14, 2025 10:21",
    },
  ];

  const [activeTab, setActiveTab] = useState("editar");

  const tabs = [
    { label: "Crear", value: "crear" },
    { label: "Editar", value: "editar" },
  ];

  const reportsCrear = [
    { id: "mantenimiento", title: "Reporte de Mantenimiento" },
    { id: "instalacion", title: "Reporte de Instalación" },
    { id: "reparacion", title: "Reporte de Reparación" },
  ];

  return (
    <SafeAreaView style={styles.fullScreen} edges={["top", "left", "right", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {/*<CustomHeader />*/}

      <CustomHeader navigation={navigation} />

      <>
        <DynamicTabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={(val) => setActiveTab(val)}
        />

        {activeTab === "crear" ? (
          <View style={styles.contentContainer}>
            {/* Filtro */}
            <View style={styles.filterContainer}>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Filtrar</Text>
                <Text style={styles.filterIcon}>▼</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {reportsCrear.map((r) => (
                <ReportCard
                  key={r.id}
                  title={r.title}
                  onVista={() => console.log(`Ver ${r.title}`)}
                  onCrear={() => console.log(`Crear ${r.title}`)}
                />
              ))}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            {/* Filtro y Buscador */}
            <View style={styles.filterContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar..."
                value={searchText}
                onChangeText={setSearchText}
              />
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Filtrar</Text>
                <Text style={styles.filterIcon}>▼</Text>
              </TouchableOpacity>
            </View>

            {/* Lista de Reportes */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {reports
                .filter((r) => r.title.toLowerCase().includes(searchText.toLowerCase()))
                .map((r) => (
                  <EditableReportCard
                    key={r.id}
                    title={r.title}
                    date={r.date}
                    onEdit={() => console.log(`Editar ${r.title}`)}
                  />
                ))}
            </ScrollView>
          </View>
        )}
      </>
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  navbuttons: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 144,
    height: 36,
  },
  icon: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 45,
    marginRight: 10,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#ccc",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#e24a4a",
  },
  inactiveTab: {
    backgroundColor: "#ccc",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff",
  },
  inactiveTabText: {
    color: "#000",
    fontWeight: "normal",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 14,
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
  scrollViewContent: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  card: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfo: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "400",
  },
  cardDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  buttonEditar: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonTextCard: {
    color: "#000",
    fontSize: 12,
  },
  // Estilos agregados para ReportCard
  cardButtons: {
    flexDirection: "row",
    gap: 8,
  },
  buttonVista: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 8,
  },
  buttonCrear: {
    backgroundColor: "#ff6600",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});