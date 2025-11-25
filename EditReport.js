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
  Modal,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Asumo que estos componentes existen en tu proyecto según tu código anterior
// import Logo from "./assets/Logo.png"; // Comentado si no se usa directamente aquí
import CustomHeader from "./components/CustomHeader";
import DynamicTabBar from "./components/DynamicTabBar";

// --- Componente de Reporte Editable (Pestaña Editar) ---
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

// --- Componente de Reporte (Pestaña Crear) ---
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
  const [activeTab, setActiveTab] = useState("editar");

  // --- ESTADOS DINÁMICOS PARA LA CREACIÓN MÚLTIPLE ---
  const [modalVisible, setModalVisible] = useState(false);
  
  // Estado para guardar los borradores (drafts) de reportes en el modal
  const [newDraftReports, setNewDraftReports] = useState([{ id: 1, title: '' }]);
  const [nextDraftId, setNextDraftId] = useState(2); // Contador para IDs únicos

  // Convertimos reportsCrear en un estado para que sea dinámico
  const [reportsCrear, setReportsCrear] = useState([
    { id: "mantenimiento", title: "Reporte de Mantenimiento" },
    { id: "instalacion", title: "Reporte de Instalación" },
    { id: "reparacion", title: "Reporte de Reparación" },
  ]);

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({ headerShown: false });
    }
  }, [navigation]);

  // Lista estática para la pestaña Editar
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

  const tabs = [
    { label: "Crear", value: "crear" },
    { label: "Editar", value: "editar" },
  ];

  // --- LÓGICA DEL MODAL DINÁMICO ---
  
  // Helper para abrir el modal y reiniciar los campos
  const openCreationModal = () => {
    setNewDraftReports([{ id: 1, title: '' }]);
    setNextDraftId(2);
    setModalVisible(true);
  };
  
  // Función para el '+' dentro del modal (agrega un nuevo campo de texto)
  const addDraftReportField = () => {
    setNewDraftReports((prevDrafts) => [
      ...prevDrafts,
      { id: nextDraftId, title: '' },
    ]);
    setNextDraftId(prevId => prevId + 1);
  };

  // Función para manejar los cambios de texto en cualquiera de los campos
  const handleDraftTitleChange = (id, newTitle) => {
    setNewDraftReports((prevDrafts) => 
      prevDrafts.map(draft => 
        draft.id === id ? { ...draft, title: newTitle } : draft
      )
    );
  };

  // Función para el botón final 'Crear Reporte(s)'
  const handleCreateNewReports = () => {
    // 1. Filtrar los títulos vacíos
    const validNewReports = newDraftReports
      .filter(draft => draft.title.trim().length > 0)
      .map(draft => ({
        // Usamos Date.now() + ID para asegurar un ID único globalmente
        id: Date.now().toString() + '-' + draft.id, 
        title: draft.title.trim(),
      }));

    if (validNewReports.length === 0) {
      // Si no se ingresó nada válido, solo cerramos el modal
      setModalVisible(false); 
      return;
    }

    // 2. Agregar los nuevos reportes válidos a la lista principal
    setReportsCrear((prevReports) => [...prevReports, ...validNewReports]);

    // 3. Resetear el estado y cerrar el modal
    setNewDraftReports([{ id: 1, title: '' }]);
    setNextDraftId(2);
    setModalVisible(false);
  };
  
  // Función que se llama al presionar 'Crear' en un ReportCard existente
  const handleCrearReporte = (reportTitle) => {
    console.log(`Creando reporte de tipo: ${reportTitle}`);
  };


  return (
    <SafeAreaView style={styles.fullScreen} edges={["top", "left", "right", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <CustomHeader navigation={navigation} />

      <>
        <DynamicTabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={(val) => setActiveTab(val)}
        />

        {activeTab === "crear" ? (
          <View style={styles.contentContainer}>
            {/* Filtro y Botón Nuevo */}
            <View style={[styles.filterContainer, styles.filterContainerCrear]}>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Filtrar</Text>
                <Text style={styles.filterIcon}>▼</Text>
              </TouchableOpacity>

              {/* BOTÓN + NUEVO (ABRE EL MODAL) */}
              <TouchableOpacity 
                style={styles.buttonNuevo} 
                onPress={openCreationModal} // Usa la nueva función helper
              >
                <Text style={styles.buttonNuevoText}>+ Nuevo Tipo</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {reportsCrear.map((r) => (
                <ReportCard
                  key={r.id}
                  title={r.title}
                  onVista={() => console.log(`Ver ${r.title}`)}
                  onCrear={() => handleCrearReporte(r.title)}
                />
              ))}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            {/* Filtro y Buscador (Pestaña Editar) */}
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

            {/* Lista de Reportes (Pestaña Editar) */}
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

        {/* --- MODAL PARA AGREGAR MÚLTIPLES TIPOS DE REPORTE --- */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalOverlay}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Elementos del Reporte</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScrollView}> 
                {/* Mapeo de campos dinámicos */}
                {newDraftReports.map((draft, index) => (
                  <View key={draft.id} style={styles.inputRow}>
                    <TextInput
                      style={styles.inputModal}
                      placeholder={`Nuevo Elemento`}
                      placeholderTextColor="#999"
                      value={draft.title}
                      onChangeText={(text) => handleDraftTitleChange(draft.id, text)}
                      autoFocus={index === newDraftReports.length - 1} // Enfocar el último campo
                      onSubmitEditing={addDraftReportField} // Agrega uno nuevo al presionar Enter/Done
                      returnKeyType="next"
                    />
                    {/* El botón '+' solo se muestra en el último campo de entrada */}
                    {index === newDraftReports.length - 1 && (
                      <TouchableOpacity
                        style={[styles.addBtn, { backgroundColor: "#ff6600" }]}
                        onPress={addDraftReportField}
                      >
                        <Text style={styles.addBtnText}>+</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </ScrollView>

              {/* Botón de Submit */}
              <TouchableOpacity
                style={[
                  styles.submitBtn,
                  // El botón solo se activa si al menos un campo tiene texto
                  { backgroundColor: newDraftReports.some(d => d.title.trim().length > 0) ? "#000000" : "#ccc" }
                ]}
                onPress={handleCreateNewReports}
                disabled={!newDraftReports.some(d => d.title.trim().length > 0)}
              >
                <Text style={styles.submitBtnText}>Crear Reporte(s)</Text>
              </TouchableOpacity>

            </View>
          </KeyboardAvoidingView>
        </Modal>

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
  filterContainerCrear: {
    // Aseguramos que los botones de Filtro y Nuevo estén juntos si el espacio lo permite
    justifyContent: 'flex-start', 
    gap: 10,
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

  // --- ESTILOS PARA LA NUEVA FUNCIONALIDAD Y MODAL ---
  buttonNuevo: {
    backgroundColor: "#ff6600",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonNuevoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end", // El modal aparece desde abajo
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20, // Ajuste para iOS por el padding
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  closeText: {
    fontSize: 24,
    color: "#999",
    fontWeight: "bold",
  },
  modalScrollView: {
    maxHeight: 300, // Limita la altura del scroll para dispositivos pequeños
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputModal: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 10,
    color: "#000",
  },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: -2,
  },
  // Nuevo estilo para el botón de Submit
  submitBtn: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});