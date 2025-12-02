import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Dimensions } from 'react-native';
import CustomHeader from './components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const tecnicos = [
  {
    nombre: 'Carlos Méndez',
    especialidad: 'Instalaciones',
    completados: 28,
    pendientes: 3,
    eficiencia: '90%',
    ultimaActividad: '01 Dic 2025 - 18:42',
  },
  {
    nombre: 'Ana Rodríguez',
    especialidad: 'Reparaciones',
    completados: 34,
    pendientes: 1,
    eficiencia: '97%',
    ultimaActividad: '01 Dic 2025 - 19:15',
  },
  {
    nombre: 'Luis Torres',
    especialidad: 'Mantenimiento',
    completados: 22,
    pendientes: 5,
    eficiencia: '81%',
    ultimaActividad: '01 Dic 2025 - 17:30',
  },
];

// Configuración de gráficos
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
  labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
  decimalPlaces: 0,
};

export default function TecnicosDashboard({ navigation }) {
  return (
    <SafeAreaView style={styles.fullScreen} edges={["top", "left", "right", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <CustomHeader navigation={navigation} />
      <ScrollView style={styles.container}>
        

        <Text style={styles.title}>Estadísticas de Técnicos</Text>

        {/* 🔹 Resumen */}
        <View style={styles.summary}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Total Técnicos</Text>
            <Text style={styles.summaryValue}>{tecnicos.length}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Promedio Completados</Text>
            <Text style={styles.summaryValue}>
              {Math.round(tecnicos.reduce((acc, t) => acc + t.completados, 0) / tecnicos.length)}
            </Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Promedio Eficiencia</Text>
            <Text style={styles.summaryValue}>
              {Math.round(
                tecnicos.reduce((acc, t) => acc + parseInt(t.eficiencia), 0) / tecnicos.length
              )}%
            </Text>
          </View>
        </View>

        {/* 🔹 Gráfico de barras */}
        <Text style={styles.chartTitle}>Reportes Completados</Text>
        <BarChart
          data={{
            labels: tecnicos.map(t => t.nombre.split(' ')[0]),
            datasets: [{ data: tecnicos.map(t => t.completados) }],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />

        {/* 🔹 Gráfico circular */}
        <Text style={styles.chartTitle}>Pendientes por Técnico</Text>
        <PieChart
          data={tecnicos.map((t, i) => ({
            name: t.nombre.split(' ')[0],
            population: t.pendientes,
            color: ['#FF6384', '#36A2EB', '#FFCE56'][i],
            legendFontColor: '#333',
            legendFontSize: 12,
          }))}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
        />

        {/* 🔹 Cards individuales */}
        {tecnicos.map((t, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{t.nombre}</Text>
            <Text style={styles.cardSubtitle}>{t.especialidad}</Text>
            <View style={styles.cardStats}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Completados</Text>
                <Text style={styles.statValue}>{t.completados}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Pendientes</Text>
                <Text style={styles.statValue}>{t.pendientes}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Eficiencia</Text>
                <Text style={styles.statValue}>{t.eficiencia}</Text>
              </View>
            </View>
            <Text style={styles.lastActivity}>Última actividad: {t.ultimaActividad}</Text>
          </View>
        ))}
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
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryBox: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    width: '30%',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
    color: '#444',
  },
  chart: {
    borderRadius: 8,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statBox: {
    alignItems: 'center',
    width: '30%',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lastActivity: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});