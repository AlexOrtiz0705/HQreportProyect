import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

// Componente para los botones naranjas
const MenuButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// Componente para las tarjetas de sección
const CardSection = ({ title, imageSource, children }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeaderContent}>
        <Image
          source={imageSource}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={styles.buttonsGrid}>
        {children}
      </View>
    </View>
  );
};

export default function AdminScreen({ navigation }) {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    console.log(`Navegando a: ${route}`);
    router.push(route);
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Header similar to index */}
      <View style={styles.header}>
        <Image 
          source={require('../assets/LogoT.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <Text style={styles.iconText}>{'←'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>{'☰'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <Text style={styles.tabText}>Administración</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <CardSection
          title="Aplicación Movil"
          imageSource={require('../assets/a1.png')}
        >
          <MenuButton title="Usuarios Registrados" onPress={() => handleNavigation('/usuarios')} />
          <MenuButton title="Formularios Enviados" onPress={() => handleNavigation('/formularios')} />
          <MenuButton title="Apariencia" onPress={() => handleNavigation('/apariencia')} />
          <MenuButton title="Configuración" onPress={() => handleNavigation('/configuracion')} />
        </CardSection>

        <CardSection
          title="General"
          imageSource={require('../assets/a2.png')}
        >
          <MenuButton title="Operaciones" onPress={() => handleNavigation('/operaciones')} />
          <MenuButton title="Cuentas de Comercio" onPress={() => handleNavigation('/cuentas')} />
          <MenuButton title="Variables del Usuario" onPress={() => handleNavigation('/var-usuario')} />
          <MenuButton title="Variables de Cuenta" onPress={() => handleNavigation('/var-cuenta')} />
        </CardSection>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#000000ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logo: {
    width: 200,
    height: 50,
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 20,
    padding: 5,
  },
  iconText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#EE4E34',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: '#fffbe6',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
    padding: 15,
    width: '100%',
    maxWidth: 400,
    marginBottom: 25,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  cardHeaderContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardImage: {
    width: 90,
    height: 90,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContainer: {
    backgroundColor: '#EE4E34',
    width: '48%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },
});