import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Usuario:', username);
    console.log('Contraseña:', password);

    navigation.navigate("CreateReport");
  };

  const handleRegister = () => {
    console.log('Ir a registro');
  };

  const handleForgotPassword = () => {
    console.log('Olvidé contraseña');
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://media.istockphoto.com/id/1408827560/es/foto/textura-de-fondo-de-arena-negra.jpg?s=612x612&w=0&k=20&c=59sET-Br2ooli-vmLL2xwEVTxoGmxQF-BaAHaH0t2S8=' }} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar style="light" />
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoiding}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Header con Logo */}
            <View style={styles.header}>
              <Text style={styles.logo}>HQREPORT</Text>
            </View>

            {/* Formulario de Login - Estilo de la referencia */}
            <View style={styles.formContainer}>
              {/* Campo Usuario */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Usuario</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Ingresa tu usuario"
                    placeholderTextColor="#A0A0A0"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Campo Contraseña */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Contraseña</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Ingresa tu contraseña"
                    placeholderTextColor="#A0A0A0"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity 
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Icon 
                      name={showPassword ? 'eye-slash' : 'eye'} 
                      size={20} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Enlace "¿Olvidaste tu contraseña?" */}
              <TouchableOpacity 
                style={styles.forgotPasswordContainer}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>

              {/* Botón Iniciar Sesión */}
              <TouchableOpacity 
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              </TouchableOpacity>

              {/* Enlace a Registro */}
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>
                  ¿Aún no tienes una cuenta?{' '}
                </Text>
                <TouchableOpacity onPress={handleRegister}>
                  <Text style={styles.registerLink}>Regístrate</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                © 2025 HDR Todos los derechos reservados.
              </Text>
              <Text style={styles.footerText}>
                Contacto: hn@contacao.com
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Overlay oscuro para mejor legibilidad
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.1,
    marginBottom: 40,
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  inputGroup: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 10,
    marginLeft: 5,
  },
  inputWrapper: {
    position: 'relative',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#2D3748',
    paddingRight: 50, // Espacio para el ícono del ojo
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 16,
    padding: 4,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 30,
    marginTop: -5,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#4299E1',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#2D3748',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    fontSize: 15,
    color: '#718096',
  },
  registerLink: {
    fontSize: 15,
    color: '#2D3748',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default LoginScreen;