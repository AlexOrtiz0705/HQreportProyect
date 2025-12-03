import React from 'react';
import { Platform } from 'react-native';

let MapView, Marker, PROVIDER_GOOGLE;

if (Platform.OS === 'web') {
  // Usar react-native-web-maps en web
  const WebMaps = require('react-native-web-maps');
  MapView = WebMaps.default;
  Marker = WebMaps.Marker;
  PROVIDER_GOOGLE = 'google';
} else {
  // Usar react-native-maps en móvil
  const NativeMaps = require('react-native-maps');
  MapView = NativeMaps.default;
  Marker = NativeMaps.Marker;
  PROVIDER_GOOGLE = NativeMaps.PROVIDER_GOOGLE;
}

export { MapView, Marker, PROVIDER_GOOGLE };s