// Planes.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PricingScreen = () => {
  const navigation = useNavigation();

  const plans = [
    {
      title: 'Básico',
      icon: 'person-outline',
      image: 'https://cdn-icons-png.flaticon.com/512/6073/6073873.png',
      users: '1 Usuario móvil',
      features: [
        '5 Plantillas básicas predefinidas',
        'Exportación a PDF',
        'Soporte por tickets (respuesta en 48h)',
        'Funciones básicas de foto/geolocalización',
      ],
      price: '9.99 $',
      color: '#E3F2FD',
    },
    {
      title: 'Premium',
      icon: 'people-outline',
      image: 'https://cdn-icons-png.flaticon.com/512/72/72728.png',
      users: '5 Usuarios móvil',
      features: [
        '20+ plantillas editables',
        'Exportación a PDF / Excel prioritaria',
        'Soporte 24/7 (Respuesta prioritaria)',
        'Monitoreo IA',
      ],
      price: '35.99 $',
      color: '#F1F8E9',
    },
    {
      title: 'Empresarial',
      icon: 'handshake-outline',
      image: require('./assets/Empresarial.png'), // Imagen local
      users: '25 Usuarios móvil',
      features: [
        'Creación ilimitada de plantillas personalizadas',
        'Exportación múltiple de formatos',
        'Soporte 24/7 (Respuesta prioritaria)',
        'Monitoreo IA',
      ],
      price: '75.99 $',
      color: '#FFF3E0',
    },
  ];

  const openDrawer = () => navigation.openDrawer();
  const exportPDF = () => Alert.alert('PDF', 'Exportando...');

  const WebScroll = ({ children }) => {
    if (Platform.OS === 'web') {
      return (
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {children}
        </div>
      );
    }
    return (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {children}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.header}>
        <Text style={styles.logo}>HQREPORT</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={openDrawer}>
            <Text style={styles.headerIcon}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={exportPDF} style={{ marginLeft: 20 }}>
            <Text style={styles.headerIcon}>PDF</Text>
          </TouchableOpacity>
        </View>
      </View>

      <WebScroll>
        {plans.map((plan, index) => (
          <View key={index} style={[styles.card, { backgroundColor: plan.color }]}>
            <View style={styles.cardTitleRow}>
              <Image
                source={typeof plan.image === 'string' ? { uri: plan.image } : plan.image}
                style={{ width: 48, height: 48, marginRight: 12 }}
                resizeMode="contain"
              />
              <Text style={styles.cardTitle}>{plan.title}</Text>
            </View>

            <Text style={styles.users}>{plan.users}</Text>

            <View style={styles.features}>
              {plan.features.map((feature, i) => (
                <View key={i} style={styles.featureRow}>
                  <Icon 
                  />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.price}>{plan.price}</Text>

            {(plan.title === 'Premium' || plan.title === 'Empresarial') && (
              <Text style={styles.monitoring}>Monitoreo IA</Text>
            )}

            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Comprar ahora</Text>
            </TouchableOpacity>
          </View>
        ))}
      </WebScroll>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#000',
  },
  logo: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  headerRight: { flexDirection: 'row' },
  headerIcon: { color: '#FFF', fontSize: 18 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  users: { fontSize: 15, color: '#555', marginBottom: 12, fontWeight: '500' },
  features: { marginBottom: 16 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  featureText: { fontSize: 14.5, color: '#333', flex: 1, lineHeight: 22, fontWeight: '500' },
  price: { fontSize: 28, fontWeight: 'bold', color: '#000', marginBottom: 6 },
  monitoring: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  buyButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  buyButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default PricingScreen;