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
  Image,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        backgroundColor="#000000" 
        barStyle="light-content"
        translucent={Platform.OS === 'android'}
      />
      
      <View style={styles.container}>
        {/* Header */}
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('CreateReport')}>
            <Text style={styles.logo}>HQREPORT</Text>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={openDrawer} style={styles.headerButton}>
              <Icon name="menu-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={exportPDF} style={styles.headerButton}>
              <Icon name="document-text-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Contenido */}
        <WebScroll>
          <View style={styles.content}>
            {/* Título */}
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>Planes Disponibles</Text>
              <Text style={styles.subTitle}>Elige el plan que mejor se adapte a tus necesidades</Text>
            </View>

            {/* Tarjetas de planes */}
            {plans.map((plan, index) => (
              <View key={index} style={[styles.card, { backgroundColor: plan.color }]}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleRow}>
                    <Image
                      source={typeof plan.image === 'string' ? { uri: plan.image } : plan.image}
                      style={styles.planImage}
                      resizeMode="contain"
                    />
                    <View style={styles.titleWrapper}>
                      <Text style={styles.cardTitle}>{plan.title}</Text>
                      <Text style={styles.users}>{plan.users}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.features}>
                  {plan.features.map((feature, i) => (
                    <View key={i} style={styles.featureRow}>
                      <Icon name="checkmark-circle" size={18} color="#4CAF50" style={styles.featureIcon} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{plan.price}</Text>
                  <Text style={styles.pricePeriod}>/mes</Text>
                </View>

                {(plan.title === 'Premium' || plan.title === 'Empresarial') && (
                  <View style={styles.badgeContainer}>
                    <View style={styles.badge}>
                      <Icon name="sparkles" size={14} color="#FF9800" />
                      <Text style={styles.badgeText}>Incluye Monitoreo IA</Text>
                    </View>
                  </View>
                )}

                <TouchableOpacity style={styles.buyButton}>
                  <Text style={styles.buyButtonText}>Comprar ahora</Text>
                  <Icon name="arrow-forward" size={18} color="#FFF" style={styles.buttonIcon} />
                </TouchableOpacity>
              </View>
            ))}
            
            {/* Nota al pie */}
            <View style={styles.footerNote}>
              <Text style={styles.footerNoteText}>
                * Todos los planes incluyen actualizaciones gratuitas y soporte técnico
              </Text>
            </View>
          </View>
        </WebScroll>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight + 10,
    paddingBottom: 15,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  logo: { 
    color: '#FFF', 
    fontSize: 24, 
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  headerRight: { 
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 20,
    padding: 5,
  },
  scrollView: { 
    flex: 1,
  },
  scrollContent: { 
    paddingBottom: 40,
    minHeight: height - 100,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: '#AAA',
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    marginBottom: 24,
    padding: 24,
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planImage: {
    width: 56,
    height: 56,
    marginRight: 16,
  },
  titleWrapper: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  users: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  features: {
    marginBottom: 24,
    paddingVertical: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  featureIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  featureText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    lineHeight: 22,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 6,
  },
  pricePeriod: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  badgeContainer: {
    marginBottom: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '600',
    marginLeft: 8,
  },
  buyButton: {
    backgroundColor: '#FF9800',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buyButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonIcon: {
    marginLeft: 10,
  },
  footerNote: {
    marginTop: 30,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerNoteText: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default PricingScreen;