import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import CustomHeader from './components/CustomHeader';
import { StatusBar } from 'expo-status-bar';
// Iconos de Expo (para el menú y la flecha de atrás)
import { Ionicons } from '@expo/vector-icons';

// 1) Datos de ejemplo de los usuarios.
const USERS = [
  {
    id: '1',
    name: 'Andrew Santos',
    role: 'Técnico',
    status: 'Activo',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '2',
    name: 'Angela Nova',
    role: 'Inspectora',
    status: 'Inactivo',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: '3',
    name: 'Ellie White',
    role: 'Supervisora',
    status: 'Activo',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: '4',
    name: 'Johnny Smith',
    role: 'Técnico',
    status: 'Activo',
    avatar: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: '5',
    name: 'Madison Hall',
    role: 'Técnico',
    status: 'Activo',
    avatar: 'https://i.pravatar.cc/150?img=52',
  },
  {
    id: '6',
    name: 'Lilly Wilde',
    role: 'Técnica',
    status: 'Activo',
    avatar: 'https://i.pravatar.cc/150?img=21',
  },
  {
    id: '7',
    name: 'Andrew Zhajar',
    role: 'Técnico',
    status: 'Inactivo',
    avatar: 'https://i.pravatar.cc/150?img=7',
  },
];

export default function RegisteredUsersScreen({navigation}) {
  // 2) Estado para el cuadro de búsqueda.
  const [search, setSearch] = useState('');

  // 3) Filtramos los usuarios según lo que se escriba en "Buscar".
  const filteredUsers = USERS.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Barra de estado clara sobre fondo oscuro */}
      <StatusBar style="light" />

      <CustomHeader navigation={navigation} />
            

      {/* 5) Barra naranja con el título "Usuarios Registrados" */}
      <View style={styles.sectionTitleBar}>
        <Text style={styles.sectionTitleText}>Usuarios Registrados</Text>
      </View>

      {/* 6) Contenido desplazable (todo el resto) */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ==== TARJETA PRINCIPAL SUPERIOR ==== */}
        <View style={styles.summaryCard}>
          {/* Imagen grande central (ilustración). 
              Puedes cambiar el source por una imagen local si quieres. */}
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/9541/9541844.png',
            }}
            style={styles.summaryImage}
            resizeMode="contain"
          />

          {/* Número grande de usuarios */}
          <Text style={styles.summaryNumber}>125,256</Text>
          <Text style={styles.summaryLabel}>Usuarios Registrados</Text>

          {/* Cuadro de búsqueda con icono de lupa */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={18}
              color="#555"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar"
              placeholderTextColor="#777"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* ==== LISTA DE USUARIOS ==== */}
        <View style={styles.userList}>
          {filteredUsers.map((user) => (
            <View key={user.id} style={styles.userCard}>
              {/* Avatar redondo */}
              <Image
                source={{ uri: user.avatar }}
                style={styles.userAvatar}
                resizeMode="cover"
              />

              {/* Nombre y rol */}
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userRole}>{user.role}</Text>
              </View>

              {/* Botón de estado (verde: Activo, rojo: Inactivo) */}
              <View
                style={[
                  styles.statusPill,
                  user.status === 'Activo'
                    ? styles.statusActive
                    : styles.statusInactive,
                ]}
              >
                <Text style={styles.statusText}>{user.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 7) Estilos de la pantalla.

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000', // fondo negro detrás del header
  },
  header: {
    height: 70,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '550',
    letterSpacing: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 6,
  },
  sectionTitleBar: {
    backgroundColor: '#EE4E34', // naranja HQREPORT
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitleText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '550',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    paddingBottom: 32,
  },
  summaryCard: {
    backgroundColor: '#FFFCE6', // crema suave
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 20,
    // sombra ligera
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    borderColor: '#A9A3A3',
    borderWidth: 1
  },
  summaryImage: {
    width: 200,
    height: 160,
    marginBottom: 16,
    backgroundColor: '#FFFCE6',
  },
  summaryNumber: {
    fontSize: 40,
    fontWeight: '550',
    color: '#000000',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 18,
    color: '#EE4E34',
    fontWeight: '600',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    height: 44,
    alignSelf: 'stretch',
    marginTop: 8,
    borderColor: '#A9A3A3',
    borderWidth: 1
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  userList: {
    gap: 12,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFCE6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    // sombra ligera
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
    borderColor: '#A9A3A3',
    borderWidth: 1
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
    borderColor: '#000000ff',
    borderWidth: 1,
  },
  userInfo: {
    flex: 1,
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
  },
  userRole: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
    textAlign: 'center',
  },
  statusPill: {
    minWidth: 90,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000000ff',
    borderWidth: 1
  },
  statusActive: {
    backgroundColor: '#14C400', // verde fuerte
  },
  statusInactive: {
    backgroundColor: '#EE4E34', // rojo/naranja
  },
  statusText: {
    color: '#000000ff',
    fontSize: 14,
    fontWeight: '600',
  },
});
