import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomHeader from './components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function RegistroScreen({ navigation }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    empresa: '',
    telefono: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      nombre: 'Básico',
      descripcion: 'Para usuarios individuales',
      precio: '$9.99/mes',
      caracteristicas: ['1 usuario', '5 reportes/mes', 'Soporte básico'],
      color: '#E3F2FD',
    },
    {
      id: 2,
      nombre: 'Premium',
      descripcion: 'Para pequeñas empresas',
      precio: '$35.99/mes',
      caracteristicas: ['5 usuarios', 'Reportes ilimitados', 'Soporte prioritario', 'Analítica básica'],
      color: '#F1F8E9',
    },
    {
      id: 3,
      nombre: 'Empresarial',
      descripcion: 'Para corporaciones',
      precio: '$75.99/mes',
      caracteristicas: ['Usuarios ilimitados', 'Reportes avanzados', 'Soporte 24/7', 'Analítica avanzada', 'API acceso'],
      color: '#FFF3E0',
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan.id);
    Alert.alert('Plan seleccionado', `Has seleccionado el plan ${plan.nombre}`);
  };

  const handleRegister = () => {
    // Validaciones básicas
    if (!formData.nombre || !formData.email || !formData.password || !formData.empresa) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (!selectedPlan) {
      Alert.alert('Error', 'Por favor selecciona un plan');
      return;
    }

    // Aquí iría la lógica para registrar al usuario en tu backend
    Alert.alert(
      'Registro exitoso',
      `Usuario ${formData.nombre} registrado correctamente.\nPlan: ${plans.find(p => p.id === selectedPlan)?.nombre}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]
    );
  };

  const navigateToPlans = () => {
    navigation.navigate('Planes');
  };

  // CORRECCIÓN: Usa el mismo nombre de ruta que en handleRegister
  const navigateToLogin = () => {
    navigation.navigate('LoginScreen'); // Cambia esto según el nombre exacto en tu navegador
  };

  return (
    <SafeAreaView style={styles.fullScreen} edges={["top", "left", "right", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <CustomHeader navigation={navigation} />
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Título */}
        <Text style={styles.title}>Crear Nueva Cuenta</Text>
        <Text style={styles.subtitle}>Regístrate para comenzar a usar HQREPORT</Text>

        {/* Formulario de Registro */}
        <View style={styles.formSection}>
          {/* Nombre Completo */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nombre Completo *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre completo"
                value={formData.nombre}
                onChangeText={(text) => handleInputChange('nombre', text)}
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Correo Electrónico */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Correo Electrónico *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="ejemplo@empresa.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Contraseña */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contraseña *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Mínimo 8 caracteres"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                returnKeyType="next"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirmar Contraseña */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirmar Contraseña *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Repite tu contraseña"
                secureTextEntry={!showConfirmPassword}
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                returnKeyType="next"
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons 
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Empresa */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Empresa *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="business-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre de tu empresa"
                value={formData.empresa}
                onChangeText={(text) => handleInputChange('empresa', text)}
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Teléfono (Opcional) */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Teléfono (Opcional)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="+52 123 456 7890"
                keyboardType="phone-pad"
                value={formData.telefono}
                onChangeText={(text) => handleInputChange('telefono', text)}
                returnKeyType="done"
              />
            </View>
          </View>
        </View>

        {/* Sección de Planes */}
        <Text style={styles.sectionTitle}>Selecciona tu Plan</Text>
        <Text style={styles.sectionSubtitle}>Elige el plan que mejor se adapte a tus necesidades</Text>

        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                { backgroundColor: plan.color },
                selectedPlan === plan.id && styles.selectedPlanCard,
              ]}
              onPress={() => handlePlanSelection(plan)}
            >
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.nombre}</Text>
                {selectedPlan === plan.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#27ae60" />
                )}
              </View>
              <Text style={styles.planDescription}>{plan.descripcion}</Text>
              <Text style={styles.planPrice}>{plan.precio}</Text>
              <View style={styles.planFeatures}>
                {plan.caracteristicas.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Ionicons name="checkmark" size={16} color="#27ae60" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botón para ver todos los planes */}
        <TouchableOpacity 
          style={styles.viewPlansButton}
          onPress={navigateToPlans}
        >
          <Ionicons name="list-outline" size={20} color="#4A90E2" />
          <Text style={styles.viewPlansText}>Ver todos los planes en detalle</Text>
          <Ionicons name="chevron-forward" size={20} color="#4A90E2" />
        </TouchableOpacity>

        {/* Botón de Registro */}
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Ionicons name="person-add-outline" size={22} color="#FFF" />
          <Text style={styles.registerButtonText}>Crear Cuenta</Text>
        </TouchableOpacity>

        {/* Enlace a Login - CORREGIDO */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.loginLink}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  plansContainer: {
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPlanCard: {
    borderColor: '#4A90E2',
    borderWidth: 2,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  planFeatures: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  viewPlansButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 25,
  },
  viewPlansText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
    marginHorizontal: 10,
  },
  registerButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 18,
    marginBottom: 20,
  },
  registerButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
  spacer: {
    height: 30,
  },
});