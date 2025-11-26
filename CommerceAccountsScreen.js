import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// 1) Datos de ejemplo de las empresas.

const COMPANIES = [
  {
    id: '1',
    name: 'Grupo Financiero Atlantida',
    subscription: 'Empresarial',
    logo: 'https://media.licdn.com/dms/image/v2/D560BAQE-QqJ-UUaMIg/company-logo_200_200/company-logo_200_200/0/1704310311996/bancatlan_logo?e=2147483647&v=beta&t=tHTOGdX8CM2nQSzUQ87FJENsCqly9YpJgvNAFhDH1iI',
  },
  {
    id: '2',
    name: 'Delta Lactosa',
    subscription: 'Empresarial',
    logo: 'https://www.lacthosa.com/wp-content/uploads/2017/01/lacthosa-nuestras-marcas-logo-delta.png',
  },
  {
    id: '3',
    name: 'Grupo ASEMTECH',
    subscription: 'Empresarial',
    logo: 'https://tse4.mm.bing.net/th/id/OIP.-SBNWHvVkl3S4C0q_HElHgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: '4',
    name: 'Sula S.A',
    subscription: 'Empresarial',
    logo: 'https://www.lacthosa.com/wp-content/uploads/2017/01/lacthosa-nuestras-marcas-logo-sula.png',
  },
  {
    id: '5',
    name: 'Doral',
    subscription: 'Empresarial',
    logo: 'https://tse3.mm.bing.net/th/id/OIP.Np843eZn4OEEtB7o8q5nhQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: '6',
    name: 'Diunsa',
    subscription: 'Empresarial',
    logo: 'https://tse2.mm.bing.net/th/id/OIP.QJjuDUqFilEPagPaUw0XcgHaED?rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: '7',
    name: 'Banco Cuscatlan',
    subscription: 'Empresarial',
    logo: 'https://tse1.mm.bing.net/th/id/OIP.lYP66PCLPd7ZiK6iIFI7PAHaEj?rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: '8',
    name: 'NISSAN',
    subscription: 'Empresarial',
    logo: 'https://th.bing.com/th/id/OIP.t8bNpkxCVSULOixc81FAXgHaGY?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
    {
    id: '9',
    name: 'ZARA',
    subscription: 'Empresarial',
    logo: 'https://logos-world.net/wp-content/uploads/2020/05/Zara-Logo.png',
  },
];

export default function CommerceAccountsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Barra de estado en claro sobre fondo oscuro */}
      <StatusBar style="light" />

      {/* ==== HEADER NEGRO CON LOGO Y MENÚ ==== */}
      <View style={styles.header}>
        {/* Aquí idealmente usarías tu logo HQREPORT en PNG con <Image /> */}
        <Text style={styles.logoText}>HQREPORT</Text>

        <View style={styles.headerIcons}>
          {/* Flecha atrás (no tiene navegación todavía) */}
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
        <Text style={styles.sectionTitleText}>Cuentas de Comercio</Text>
      </View>

      {/* ==== CONTENIDO SCROLLABLE ==== */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/*BLOQUE 1: subtítulo + tarjetas, con padding lateral */}
        <View style={styles.innerContent}>
          <Text style={styles.subtitle}>
            Visualización de clientes registrados
          </Text>

          <View style={styles.cardList}>
            {COMPANIES.map((company) => (
              <View key={company.id} style={styles.companyCard}>
                <Image
                  source={{ uri: company.logo }}
                  style={styles.companyLogo}
                  resizeMode="contain"
                />

                <View style={styles.companyInfo}>
                  <Text style={styles.companyName}>{company.name}</Text>
                  <Text style={styles.companySubscription}>
                    Suscripción: {company.subscription}
                  </Text>
                </View>

                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Modificar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Espacio */}
        <View style={{ height: 40 }} />

        {/* BLOQUE 2: botón gris + barra negra, SIN padding lateral */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.adminButton}>
            <Text style={styles.adminButtonText}>Administrar Clientes</Text>
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
    fontWeight: '550',
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

  /* CONTENIDO SCROLL */
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  //scrollContent: {
  //  paddingHorizontal: 16,
  //  paddingTop: 20,
  //  paddingBottom: 40,
  //},

  scrollContent: {
  paddingBottom: 40,     // no tiene paddingHorizontal aquí
  paddingBottom: 0, //Aqui se quita el espacio sobrante.
},

// Bloque de subtítulo + tarjetas (con padding lateral)
innerContent: {
  paddingHorizontal: 16,
  paddingTop: 20,
},

  /* SUBTÍTULO */
  subtitle: {
    fontSize: 18,
    fontWeight: '550',
    textAlign: 'center',
    marginBottom: 20,
  },

  /* LISTA DE TARJETAS */
  cardList: {
    gap: 16,
  },

  //ESTO YA NO TOCA LAS TARJETAS, SOLO LA SECCIÓN FINAL
  bottomSection: {
  // SIN paddingHorizontal, ocupa todo el ancho de la pantalla
},

  /* TARJETA DE CADA COMERCIO */
  companyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFCE6', // crema
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
    // sombra suave
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 2,
    borderColor: '#A9A3A3',
    borderWidth: 1
  },

  /* LOGO REDONDO */
  companyLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    backgroundColor: '#ffffff',
    // borde fino para que se vea como círculo marcado
    borderWidth: 1,
    borderColor: '#000000ff',
  },

  /* TEXTO DE LA EMPRESA */
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 4,
  },
  companySubscription: {
    fontSize: 14,
    color: '#444444',
  },

  /* BOTÓN "MODIFICAR" */
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#E0E0E0', // gris claro
  },
  editButtonText: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '500',
  },

  /* SECCIÓN FINAL DE "ADMINISTRAR CLIENTES" */
  bottomSection: {
    marginTop: 16,
  },
  adminButton: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminButtonText: {
    fontSize: 18,
    fontWeight: '550',
    color: '#000000',
  },
  bottomBlackBar: {
    height: 40,
    backgroundColor: '#000000',
  },
});
