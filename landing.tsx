import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// --- Colores Globales ---
const COLORS = {
  background: '#050505',
  text: '#FFFFFF',
  textMuted: '#A0A0A0',
  primaryBrand: '#EE4E34', 
  cardBg: '#111111',
  navBarBg: 'rgba(30, 30, 30, 0.90)', 
  borderColor: '#333333',
  serifFont: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  inputBg: '#1A1A1A',
};

export default function App() {
  const navigation: any = useNavigation();
  const router = useRouter();
  useEffect(() => {
    try {
      navigation?.setOptions?.({ headerShown: false });
    } catch (err) {
    }
  }, [navigation]);

  const scrollViewRef = useRef<ScrollView>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState('');
  
  const [sectionCoords, setSectionCoords] = useState<{[key: string]: number}>({
    beneficios: 0,
    planes: 0,      
    soluciones: 0,  
    soporte: 0  
  });

  const handleLayout = (sectionName: string, event: any) => {
    const layout = event.nativeEvent.layout;
    setSectionCoords(prev => ({
      ...prev,
      [sectionName]: layout.y
    }));
  };

  const scrollToSection = (sectionName: string) => {
    if (scrollViewRef.current && sectionCoords[sectionName]) {
      scrollViewRef.current.scrollTo({ 
        y: sectionCoords[sectionName], 
        animated: true 
      });
    }
  };

  const comparisonData = [
    { 
      hq: 'Navegación ultrarrápida', hqIcon: true,
      sn: 'Navegación rápida', snIcon: true,
      df: 'Velocidades moderadas', dfIcon: false 
    },
    { 
      hq: 'Análisis avanzados de IA', hqIcon: true,
      sn: 'Recomendaciones de IA básica', snIcon: true,
      df: 'Sin asistencia de IA', dfIcon: false 
    },
    { 
      hq: 'Integración sin fisuras', hqIcon: true,
      sn: 'Restringe la personalización', snIcon: true,
      df: 'Curva de aprendizaje pronunciada', dfIcon: false 
    },
    { 
      hq: 'UI moderna y de alto rendimiento', hqIcon: true,
      sn: 'UI estándar y equilibrada', snIcon: false,
      df: 'UI obsoleta y poco amigable', dfIcon: false 
    },
    { 
      hq: 'Exportación inteligente con múltiples formatos', hqIcon: true,
      sn: 'Exportación avanzada con múltiples formatos', snIcon: true,
      df: 'Exportación limitada a formatos básicos', dfIcon: false 
    },
    { 
      hq: 'Soporte prioritario 24/7 con expertos', hqIcon: true,
      sn: 'Soporte estándar en horario comercial', snIcon: false,
      df: 'Soporte por ticket con respuesta en 48h', dfIcon: false 
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" />
      
      {/* --- STICKY NAVBAR --- */}
      <View style={styles.stickyNavBarContainer}>
        <View style={styles.stickyNavBar}>
          <TouchableOpacity onPress={() => scrollToSection('beneficios')}>
            <Text style={styles.navText}>Beneficios</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => scrollToSection('planes')}>
            <Text style={styles.navText}>Planes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => scrollToSection('soluciones')}>
            <Text style={styles.navText}>Soluciones</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.navText}>Contacto</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* --- MODAL DE CONTACTO --- */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.8}
        backdropColor="#000"
        avoidKeyboard
        useNativeDriver={true}
        style={styles.modalContainer}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Conoce mas sobre nosotros</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.modalSubtitle}>Déjanos tus datos y te contactaremos brevemente.</Text>

          <ScrollView scrollEnabled={true} keyboardShouldPersistTaps="handled">
            <TextInput 
              style={styles.input} 
              placeholder="Nombre completo" 
              placeholderTextColor="#666"
            />
            <TextInput 
              style={styles.input} 
              placeholder="Correo electrónico" 
              placeholderTextColor="#666" 
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor="#666"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Organización (Opcional)" 
              placeholderTextColor="#666"
            />
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Descripción o consulta" 
              placeholderTextColor="#666"
              multiline={true}
              numberOfLines={4}
            />

            <TouchableOpacity style={styles.submitButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.submitButtonText}>Enviar Mensaje</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
      >
        
        {/* 1. HEADER */}
        <View style={styles.header}>
           <Image 
             source={require('./assets/LogoT.png')}
             style={{ width: 180, height: 40, marginLeft: -8 }}
             resizeMode="contain"
           />
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.ctaButtonHeader}
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Text style={styles.ctaButtonTextHeader}>¡Comienza ya!</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. HERO SECTION */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Explora todo</Text>
          <View style={styles.heroImageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }} 
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* 3. LOGOS PARTNERS */}
        <View style={styles.logosSection}>
          <Text style={styles.logosText}>Contamos con la confianza de:</Text>
          <View style={styles.logosGrid}>
            <View style={styles.logoColumn}>
              <Image source={require('./assets/li1.png')} style={styles.partnerLogoImg} resizeMode="contain" />
              <Image source={require('./assets/li2.png')} style={styles.partnerLogoImg} resizeMode="contain" />
              <Image source={require('./assets/li3.png')} style={styles.partnerLogoImg} resizeMode="contain" />
            </View>
            <View style={styles.logoColumn}>
              <Image source={require('./assets/li4.png')} style={styles.partnerLogoImg} resizeMode="contain" />
              <Image source={require('./assets/li5.png')} style={styles.partnerLogoImg} resizeMode="contain" />
              <Image source={require('./assets/li6.png')} style={styles.partnerLogoImg} resizeMode="contain" />
            </View>
          </View>
        </View>

        {/* --- SECCIÓN 1: BENEFICIOS --- */}
        <View 
          style={styles.section} 
          onLayout={(event) => handleLayout('beneficios', event)}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Beneficios</Text>
            <Text style={styles.h2}>Hicimos que lo complicado sea simple.</Text>
            <Text style={styles.subtitle}>
              HQReport te da información real, sin abrumarte con datos.
            </Text>
          </View>
          
          <View style={styles.featureGrid}>
            {[
              { 
                icon: require('./assets/b1.png'),
                title: 'Amplifica tu visión', 
                desc: 'Desbloquea decisiones basadas en datos con análisis integrales, revelando oportunidades clave para el crecimiento estratégico regional.' 
              },
              { 
                icon: require('./assets/b2.png'),
                title: 'Controla tu presencia global', 
                desc: 'Gestiona y supervisa sedes satélite, garantizando un rendimiento consistente y operaciones optimizadas en todos los lugares.' 
              },
              { 
                icon: require('./assets/b3.png'),
                title: 'Remueve las barreras de lenguaje', 
                desc: 'Adáptate a mercados diversos con localización integrada para una comunicación clara y una mejor experiencia de usuario.' 
              },
              { 
                icon: require('./assets/b4.png'),
                title: 'Visualiza tu crecimiento', 
                desc: 'Genera informes precisos y visualmente atractivos que ilustren tus trayectorias de crecimiento en todas las regiones.' 
              }
            ].map((item, idx) => (
              <View key={idx} style={styles.featureItemClean}>
                <Image source={item.icon} style={styles.featureIconImgSmall} resizeMode="contain" tintColor="#fff" />
                <Text style={styles.featureTitleClean}>{item.title}</Text>
                <Text style={styles.featureDescClean}>{item.desc}</Text>
              </View>
            ))}
          </View>

           <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }} 
            style={styles.fullWidthImage}
            resizeMode="cover"
          />
        </View>

        {/* --- SECCIÓN 2: PLANES --- */}
        <View 
          style={styles.section}
          onLayout={(event) => handleLayout('planes', event)}
        >
          <View style={styles.planesContainer}>
            <Text style={styles.h2}>Planes</Text>
            <Text style={styles.paragraph}>
              HQReport transforma tus reportes en visualizaciones claras y vibrantes 
              que te muestran exactamente lo que está sucediendo en cada región.
            </Text>
            
            <View style={styles.planesList}>
              {[
                { id: '01', text: 'Plan Individual: Nivel básico' },
                { id: '02', text: 'Plan Premium: Nivel Intermedio' },
                { id: '03', text: 'Plan Empresarial: Nivel Avanzado' },
                { id: '04', text: 'Demo: Prueba gratis hasta 7 días' },
              ].map((plan, i) => (
                <View key={i} style={styles.planRow}>
                  <Text style={styles.planNumber}>{plan.id}</Text>
                  <Text style={styles.planText}>{plan.text}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.unifiedButton}
              onPress={() => navigation.navigate('Planes')}
            >
              <Text style={styles.unifiedButtonText}>Ver Planes</Text>
            </TouchableOpacity>

            <Image 
              source={require('./assets/p1.png')} 
              style={styles.cylinderImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* --- SECCIÓN 3: SOLUCIONES --- */}
        <View 
          style={styles.section}
          onLayout={(event) => handleLayout('soluciones', event)}
        >
          <View style={{ alignItems: 'center', marginBottom: 30 }}>
            <Text style={[styles.sectionLabel, {textAlign: 'center'}]}>Soluciones</Text>
            <Text style={[styles.h2, { textAlign: 'center' }]}>¿Por qué elegir HQReport?</Text>
            <Text style={[styles.subtitle, { textAlign: 'center', maxWidth: 300 }]}>
               Necesitas una solución que esté a la altura. Por eso desarrollamos HQReport. Un enfoque amigable para optimizar tu empresa.
            </Text>
            <TouchableOpacity 
              style={[styles.unifiedButton, { marginTop: 20, marginBottom: 0 }]}
              onPress={() => router.push('./Planes')}
            >
              <Text style={styles.unifiedButtonText}>Descubre más</Text>
            </TouchableOpacity>
          </View>
          
          {/* TABLA CON SCROLL HORIZONTAL */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableScrollView}>
            <View style={styles.tableContainer}>
              
              <View style={styles.tableRowHeader}>
                 <View style={[styles.cellHQHeader, styles.cellFirst]}>
                    <Text style={styles.tableHeaderTitle}>HQReport</Text>
                 </View>
                 <View style={styles.cell}>
                    <Text style={styles.tableHeaderTitleMuted}>ServiceNow</Text>
                 </View>
                 <View style={styles.cell}>
                    <Text style={styles.tableHeaderTitleMuted}>doForms</Text>
                 </View>
              </View>

              {comparisonData.map((row, i) => (
                <View key={i} style={styles.tableRow}>
                  <View style={[
                      styles.cellHQ, 
                      styles.cellFirst,
                      i === comparisonData.length - 1 && styles.cellHQLast 
                  ]}>
                    <View style={styles.cellContent}>
                        <Text style={styles.icon}>{row.hqIcon ? '✓' : '✕'}</Text>
                        <Text style={styles.cellTextHQ}>{row.hq}</Text>
                    </View>
                  </View>

                  <View style={styles.cell}>
                    <View style={styles.cellContent}>
                        <Text style={[styles.icon, !row.snIcon && styles.iconCross]}>{row.snIcon ? '✓' : '✕'}</Text>
                        <Text style={styles.cellText}>{row.sn}</Text>
                    </View>
                  </View>

                   <View style={styles.cell}>
                    <View style={styles.cellContent}>
                        <Text style={[styles.icon, !row.dfIcon && styles.iconCross]}>{row.dfIcon ? '✓' : '✕'}</Text>
                        <Text style={styles.cellText}>{row.df}</Text>
                    </View>
                  </View>
                </View>
              ))}

            </View>
          </ScrollView>
        </View>

        {/* --- SECCIÓN TESTIMONIO --- */}
        <View style={styles.section}>
            <View style={styles.testimonialContainer}>
                <View style={styles.testimonialImageWrapper}>
                   <Image 
                     source={require('./assets/c1.jpg')}
                     style={styles.testimonialImage}
                     resizeMode="cover"
                   />
                </View>
                <View style={styles.testimonialTextContent}>
                    <Text style={styles.testimonialQuote}>
                      “Era escéptico, pero HQReport ha transformado completamente la forma en que gestiono mis negocios. Las visualizaciones de datos son tan claras e intuitivas, y la plataforma es tan fácil de usar. No puedo imaginar manejar mi empresa sin ella.”
                    </Text>
                    <View style={styles.testimonialAuthorBlock}>
                        <Text style={styles.testimonialAuthorName}>Donald Trump y Cristiano Ronaldo</Text>
                        <Text style={styles.testimonialAuthorRole}>Miembro del Partido Republicano, 47º presidente de los Estados Unidos</Text>
                        <Text style={styles.testimonialAuthorRole}>Futbolista portugués</Text>
                    </View>
                </View>
            </View>
        </View>

        {/* --- SECCIÓN 4: FOOTER / CONTACTO (FINAL) --- */}
        <View 
          style={styles.footerContainer}
          onLayout={(event) => handleLayout('soporte', event)}
        >
          <Text style={styles.footerTitle}>Póngase en contacto con nosotros</Text>
          
          <Text style={styles.footerSubtitle}>
            Agenda una llamada rápida para aprender cómo HQReport puede ayudarte a gestionar tus reportes y convertirlo en una ventaja poderosa.
          </Text>

          {/* Botón que abre el Modal (UNIFICADO) */}
          <TouchableOpacity 
            style={[styles.unifiedButton, { width: '100%', marginBottom: 60 }]} 
            onPress={() => setModalVisible(true)}
          >
             <Text style={styles.unifiedButtonText}>Aprende más ↗</Text>
          </TouchableOpacity>

          {/* Línea Divisoria */}
          <View style={styles.footerDivider} />

          {/* Enlaces y Copyright - MODIFICADO */}
          <View style={styles.footerBottomRow}>
             
             <View style={styles.footerLeftBlock}>
                {/* IMAGEN DEL LOGO DE FOOTER */}
                <Image 
                  source={require('./assets/IconT.png')} 
                  style={styles.footerLogo}
                  resizeMode="contain"
                />
                <Text style={styles.copyrightTextRed}>© HQReport. 2025</Text>
             </View>

             <Text style={styles.copyrightTextRed}>
               Todos los derechos reservados.
             </Text>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  // --- HEADER ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaButtonHeader: {
    backgroundColor: COLORS.primaryBrand,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  ctaButtonTextHeader: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  
  // --- BOTÓN UNIFICADO (Nuevo Estilo Global) ---
  unifiedButton: {
    backgroundColor: COLORS.primaryBrand, // #EE4E34
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center', // Centrado por defecto, ajustar si se requiere flex-start
  },
  unifiedButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  // --- STICKY NAVBAR ---
  stickyNavBarContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickyNavBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.navBarBg,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#333',
    boxShadow: '0px 4px 4.65px rgba(0, 0, 0, 0.3)',
    elevation: 8,
  },
  navText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
    marginHorizontal: 8,
  },
  // --- MODAL ---
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#151515',
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: '#333',
    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.5)',
    elevation: 10,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: COLORS.serifFont,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#888',
  },
  modalSubtitle: {
    color: '#aaa',
    marginBottom: 20,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    color: '#fff',
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: COLORS.primaryBrand,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // --- HERO ---
  heroSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  heroTitle: {
    fontSize: 48,
    color: COLORS.text,
    fontFamily: COLORS.serifFont,
    textAlign: 'center',
    marginBottom: 20,
  },
  heroImageContainer: {
    width: '90%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  // --- LOGOS ---
  logosSection: {
    paddingVertical: 30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#222',
    alignItems: 'center',
  },
  logosText: {
    color: '#888',
    fontSize: 12,
    marginBottom: 20,
    fontWeight: '500',
  },
  logosGrid: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  logoColumn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 150,
  },
  partnerLogoImg: {
    width: 90, 
    height: 40, 
    opacity: 0.7,
    marginBottom: 10,
  },
  // --- GENERAL SECTIONS ---
  section: {
    padding: 20,
    marginTop: 20,
  },
  sectionHeader: {
    marginBottom: 30,
  },
  sectionLabel: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 10,
    letterSpacing: 1,
  },
  h2: {
    fontSize: 32,
    color: COLORS.text,
    fontFamily: COLORS.serifFont,
    marginBottom: 15,
    lineHeight: 38,
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  
  // --- BENEFICIOS ---
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItemClean: {
    width: '48%', 
    marginBottom: 40,
  },
  featureIconImgSmall: {
    width: 24,
    height: 24,
    marginBottom: 15,
  },
  featureTitleClean: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: COLORS.serifFont,
  },
  featureDescClean: {
    color: '#999',
    fontSize: 13,
    lineHeight: 18,
  },
  fullWidthImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 12,
  },

  // --- PLANES ---
  planesContainer: {
    flexDirection: 'column',
  },
  paragraph: {
    color: COLORS.textMuted,
    fontSize: 15,
    marginBottom: 30,
    lineHeight: 22,
  },
  planesList: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    marginBottom: 30,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  planNumber: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 15,
    fontSize: 14,
  },
  planText: {
    color: '#ddd',
    fontSize: 16,
  },
  cylinderImage: {
    width: '100%',
    height: 350,
    borderRadius: 16,
    backgroundColor: '#E5E0D8', 
    marginTop: 30,
  },

  // --- TABLA SOLUCIONES ---
  tableScrollView: {
    marginTop: 20,
  },
  tableContainer: {
    flexDirection: 'column',
    minWidth: 600, 
  },
  tableRowHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  cell: {
    width: 200,
    padding: 15,
    justifyContent: 'center',
  },
  cellHQ: {
    width: 220,
    padding: 15,
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#fff', 
  },
  cellHQHeader: {
    width: 220,
    padding: 15,
    justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    borderBottomWidth: 0, 
    paddingBottom: 20,
  },
  cellFirst: {
    borderTopWidth: 1,
  },
  cellHQLast: {
    borderBottomWidth: 1,
    borderColor: '#fff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  cellContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tableHeaderTitle: {
    color: '#fff',
    fontSize: 22,
    fontFamily: COLORS.serifFont,
    textAlign: 'center',
  },
  tableHeaderTitleMuted: {
    color: '#888',
    fontSize: 20,
    fontFamily: COLORS.serifFont,
    textAlign: 'center',
  },
  cellText: {
    color: '#888',
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
  },
  cellTextHQ: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 8,
    fontWeight: '500',
    flex: 1,
  },
  icon: {
    color: '#fff',
    fontSize: 14,
    marginTop: 1,
  },
  iconCross: {
    color: '#666',
  },

  // --- TESTIMONIO ---
  testimonialContainer: {
    flexDirection: 'column', 
    marginTop: 20,
  },
  testimonialImageWrapper: {
    width: '100%',
    height: 250,
    borderRadius: 30, 
    overflow: 'hidden',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  testimonialImage: {
    width: '100%',
    height: '100%',
  },
  testimonialTextContent: {
    paddingHorizontal: 10,
  },
  testimonialQuote: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Roboto Mono',
    lineHeight: 32,
    marginBottom: 25,
  },
  testimonialAuthorBlock: {
    marginTop: 10,
  },
  testimonialAuthorName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'DM Sans',
    marginBottom: 5,
  },
  testimonialAuthorRole: {
    color: COLORS.primaryBrand, 
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
    textTransform: 'none',
  },

  // --- FOOTER MODIFICADO ---
  footerContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerTitle: {
    fontFamily: COLORS.serifFont,
    fontSize: 36,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  footerSubtitle: {
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 350,
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#333',
    width: '100%',
    marginBottom: 30,
  },
  
  // Fila inferior limpia y naranja
  footerBottomRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Separar izquierda (logo+copy) y derecha (derechos)
  },
  footerLeftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLogo: {
    width: 30, 
    height: 30, 
    marginRight: 10, 
    // No tintColor si tu logo es blanco/negro original, 
    // o tintColor: COLORS.primaryBrand si quieres forzar el color.
  },
  copyrightTextRed: {
    color: COLORS.primaryBrand, // #EE4E34
    fontSize: 12,
    fontWeight: '600',
  },
});