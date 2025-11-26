import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import CustomHeader from './components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicTabBar from './components/Dynamic';

export default function HomeScreen({navigation}) {
  const router = useRouter();
  
  useEffect(() => {
    if (navigation) {
      navigation.setOptions({ headerShown: false });
    }
  }, [navigation]);

  const tabs = [
  { label: "Crear", value: "crear" },
  { label: "Administrar", value: "administrar" },
  { label: "Cuenta", value: "cuenta" },
  { label: "Planes", value: "planes" },
 ];

 const [activeTab, setActiveTab] = useState("editar");

  const menuItems = [
    {
      id: 1,
      title: 'Crear/Editar\nReportes',
      icon: require('./assets/da1.png'),
      route: '/CreateReport'
    },
    {
      id: 2,
      title: 'Formularios\nEnviados',
      icon: require('./assets/da2.png'),
      route: '/formularios'
    },
    {
      id: 3,
      title: 'Cuentas de\nComercio',
      icon: require('./assets/da3.png'),
      route: '/cuentas'
    },
    {
      id: 4,
      title: 'Operaciones',
      icon: require('./assets/da4.png'),
      route: '/operaciones'
    },
    {
      id: 5,
      title: 'Usuarios\nRegistrados',
      icon: require('./assets/da5.png'),
      route: '/usuarios'
    },
    {
      id: 6,
      title: 'Configuración',
      icon: require('./assets/da6.png'),
      route: '/configuracion'
    }
  ];

  const handleNavigation = (route: string) => {
    console.log(`Navegando a: ${route}`);
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.fullScreen} edges={["top", "left", "right", "bottom"]}>
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      {/* Header 
      <View style={styles.header}>
        <Image 
          source={require('./assets/LogoT.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
        */}
      <CustomHeader navigation={navigation}/>
      {/* Navigation Tabs 
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, styles.tabActive]}
          onPress={() => handleNavigation('/crear')}
        >
          <Text style={[styles.tabText, styles.tabTextActive]}>Crear</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => handleNavigation('/administrar')}
        >
          <Text style={styles.tabText}>Administrar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => handleNavigation('/cuenta')}
        >
          <Text style={styles.tabText}>Cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => handleNavigation('/planes')}
        >
          <Text style={styles.tabText}>Planes</Text>
        </TouchableOpacity>
      </View>
        */}
      {/* Menu Grid */}
      <ScrollView style={styles.content}>
        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuCard}
              onPress={() => handleNavigation(item.route)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Image 
                  source={item.icon}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  logo: {
    width: 200,
    height: 50,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ff6347',
    paddingVertical: 0,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  tabTextActive: {
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  iconContainer: {
    marginBottom: 12,
  },
  icon: {
    width: 80,
    height: 80,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 20,
  },
});
