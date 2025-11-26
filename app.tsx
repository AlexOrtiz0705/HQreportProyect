import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const menuItems = [
    {
      id: 1,
      title: 'Crear/Editar\nReportes',
      icon: 'URL_ICON_REPORTES',
      route: 'CrearReportes'
    },
    {
      id: 2,
      title: 'Formularios\nEnviados',
      icon: 'URL_ICON_FORMULARIOS',
      route: 'FormulariosEnviados'
    },
    {
      id: 3,
      title: 'Cuentas de\nComercio',
      icon: 'URL_ICON_CUENTAS',
      route: 'CuentasComercio'
    },
    {
      id: 4,
      title: 'Operaciones',
      icon: 'URL_ICON_OPERACIONES',
      route: 'Operaciones'
    },
    {
      id: 5,
      title: 'Usuarios\nRegistrados',
      icon: 'URL_ICON_USUARIOS',
      route: 'Usuarios'
    },
    {
      id: 6,
      title: 'Configuración',
      icon: 'URL_ICON_CONFIG',
      route: 'Configuracion'
    }
  ];

  const handleNavigation = (route) => {
    console.log(`Navegando a: ${route}`);
    // navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'URL_LOGO_HQREPORT' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, styles.tabActive]}
          onPress={() => handleNavigation('Crear')}
        >
          <Text style={[styles.tabText, styles.tabTextActive]}>Crear</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => handleNavigation('Administrar')}
        >
          <Text style={styles.tabText}>Administrar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => handleNavigation('Cuenta')}
        >
          <Text style={styles.tabText}>Cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => handleNavigation('Planes')}
        >
          <Text style={styles.tabText}>Planes</Text>
        </TouchableOpacity>
      </View>

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
                  source={{ uri: item.icon }}
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
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#EE4E34',
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
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
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

export default HomeScreen;