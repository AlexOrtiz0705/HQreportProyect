import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

const PricingScreen = () => {
  const plans = [
    {
      title: 'Básico',
      icon: '👤', // Placeholder; usa Image para iconos reales
      users: '1 Usuario móvil',
      features: [
        '5 Plantillas básicas predefinidas',
        'Exportación a PDF',
        'Soporte por tickets (respuesta en 48h)',
      ],
      price: '9.99$',
      buttonText: 'Comprar ahora',
      color: '#E3F2FD', // Azul claro
    },
    {
      title: 'Premium',
      icon: '👥',
      users: '5 Usuarios móvil',
      features: [
        '20 Plantillas editables',
        'Exportación a PDF/Excel prioritaria',
        'Monitoreo IA',
      ],
      price: '35.99$',
      buttonText: 'Comprar ahora',
      color: '#E8F5E8', // Verde claro (para resaltar si es popular)
    },
    {
      title: 'Empresarial',
      icon: '🤝',
      users: 'Creación ilimitada de usuarios móviles personalizados',
      features: [
        'Exportación múltiple de formatos personalizados',
        'Soporte 24/7 prioritario',
        'Monitoreo IA',
      ],
      price: '75.99$',
      buttonText: 'Comprar ahora',
      color: '#FFF3E0', // Naranja claro
    },
  ];

  const handleBuy = (plan) => {
    // Aquí puedes agregar lógica, como navegación a pago
    alert(`Comprando plan: ${plan.title}`);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#000" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HQREPORT</Text>
        <View style={styles.headerIcons}>
          <Text>📱</Text> {/* Placeholder para PDF y menu */}
          <Text>📄</Text>
        </View>
      </View>

      {plans.map((plan, index) => (
        <View key={index} style={[styles.card, { backgroundColor: plan.color }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.icon}>{plan.icon}</Text>
            <Text style={styles.title}>{plan.title}</Text>
          </View>

          <Text style={styles.users}>{plan.users}</Text>

          <View style={styles.features}>
            {plan.features.map((feature, i) => (
              <View key={i} style={styles.featureItem}>
                <Text style={styles.check}>✓</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.price}>{plan.price}</Text>
          <Text style={styles.monitoring}>Monitoreo IA</Text> {/* Solo para Premium y Empresarial; ajústalo si es necesario */}

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleBuy(plan)}
          >
            <Text style={styles.buttonText}>{plan.buttonText}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fondo negro como en la imagen
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 4, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  users: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  features: {
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  check: {
    fontSize: 18,
    color: '#4CAF50',
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  monitoring: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF9800', // Naranja
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PricingScreen;