import * as ImagePicker from 'expo-image-picker';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

// --- TIPOS TYPESCRIPT ---
interface Field {
  id: string;
  label: string;
  type: 'text' | 'number' | 'listbox' | 'photo';
  value: string;
  options?: string[];
  photos?: Photo[];
}

interface Photo {
  id: string;
  uri: string;
  timestamp: string;
}

// --- 1. PLANTILLAS CON DETALLES TÉCNICOS ---
const PLANTILLA_AC: Field[] = [
  // Datos Generales
  { id: 'dg1', label: 'Nombre de la Empresa', type: 'text', value: '' },
  { id: 'dg2', label: 'Nombre del Empresa o Cliente', type: 'text', value: '' },
  { id: 'dg3', label: 'Responsable de Trabajo', type: 'text', value: '' },
  { id: 'dg4', label: 'Responsable', type: 'text', value: '' },
  { id: 'dg5', label: 'Área de Trabajo', type: 'text', value: '' },
  { id: 'dg6', label: 'Dirección', type: 'text', value: '' },
  { id: 'dg7', label: 'Teléfono', type: 'text', value: '' },
  { id: 'dg8', label: 'E-mail', type: 'text', value: '' },
  { id: 'dg9', label: 'Número de Serie', type: 'text', value: '' },
  { id: 'dg10', label: 'Descripción del Reporte', type: 'text', value: '' },
  // Datos Técnicos
  { id: '1', label: 'Tipo de Servicio', type: 'listbox', options: ['Mantenimiento Preventivo', 'Correctivo', 'Instalación'], value: '' },
  { id: '2', label: 'Marca y Modelo', type: 'text', value: '' },
  { id: '3', label: 'Capacidad (BTU)', type: 'listbox', options: ['12,000', '18,000', '24,000', '36,000', '60,000'], value: '' },
  { id: '4', label: 'Presión Baja (PSI)', type: 'number', value: '' },
  { id: '5', label: 'Presión Alta (PSI)', type: 'number', value: '' },
  { id: '6', label: 'Amperaje Consumo (A)', type: 'number', value: '' },
  { id: '7', label: 'Limpieza de Filtros', type: 'listbox', options: ['Realizada', 'No necesaria', 'Filtros Dañados'], value: '' },
  { id: '8', label: 'Limpieza Condensadora', type: 'listbox', options: ['Realizada', 'Pendiente'], value: '' },
  { id: '9', label: 'Costo ($)', type: 'number', value: '' },
  { id: '18', label: 'Fotos del Servicio', type: 'photo', value: '' },
];

const PLANTILLA_UPS: Field[] = [
  // Datos Generales
  { id: 'dg1', label: 'Nombre de la Empresa', type: 'text', value: '' },
  { id: 'dg2', label: 'Nombre del Empresa o Cliente', type: 'text', value: '' },
  { id: 'dg3', label: 'Responsable de Trabajo', type: 'text', value: '' },
  { id: 'dg4', label: 'Responsable', type: 'text', value: '' },
  { id: 'dg5', label: 'Área de Trabajo', type: 'text', value: '' },
  { id: 'dg6', label: 'Dirección', type: 'text', value: '' },
  { id: 'dg7', label: 'Teléfono', type: 'text', value: '' },
  { id: 'dg8', label: 'E-mail', type: 'text', value: '' },
  { id: 'dg9', label: 'Número de Serie', type: 'text', value: '' },
  { id: 'dg10', label: 'Descripción del Reporte', type: 'text', value: '' },
  // Datos Técnicos
  { id: '10', label: 'Tipo de Servicio', type: 'listbox', options: ['Revisión Baterías', 'Calibración', 'Reparación'], value: '' },
  { id: '11', label: 'Marca UPS', type: 'text', value: '' },
  { id: '12', label: 'Capacidad (KVA)', type: 'number', value: '' },
  { id: '13', label: 'Voltaje Entrada (V)', type: 'number', value: '' },
  { id: '14', label: 'Voltaje Salida (V)', type: 'number', value: '' },
  { id: '15', label: 'Carga Actual (%)', type: 'number', value: '' },
  { id: '16', label: 'Estado de Baterías', type: 'listbox', options: ['Óptimo', 'Hinchadas', 'Sulfatadas', 'Fuga de Ácido'], value: '' },
  { id: '17', label: 'Temperatura Sala (°C)', type: 'number', value: '' },
  { id: '18', label: 'Fotos del Servicio', type: 'photo', value: '' },
];

export default function GeneradorReportes() {
  const [fields, setFields] = useState<Field[]>([]);
  const [modoPreview, setModoPreview] = useState<boolean>(false);
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<'AC' | 'UPS' | null>(null);
  const [fieldIdFotoActual, setFieldIdFotoActual] = useState<string | null>(null);
  
  // Estados para crear nuevo campo
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalPlantilla, setModalPlantilla] = useState<boolean>(true);
  const [newLabel, setNewLabel] = useState<string>('');
  const [newType, setNewType] = useState<'text' | 'number' | 'listbox' | 'photo'>('text');
  const [newOptions, setNewOptions] = useState<string>('Opción 1\nOpción 2\nOpción 3');
  const [showOptionsInput, setShowOptionsInput] = useState<boolean>(false);
  
  // Estados para editar campo existente
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState<string>('');
  const [editOptions, setEditOptions] = useState<string>('');

  // --- LOGICA DE FOTOS ---
  const capturarFoto = async (fieldId: string): Promise<void> => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso denegado', 'Se requiere acceso a la cámara');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      const nuevaFoto: Photo = {
        id: Date.now().toString(),
        uri: resultado.assets[0].uri,
        timestamp: new Date().toLocaleString(),
      };
      
      setFields(fields.map(f => {
        if (f.id === fieldId) {
          return { ...f, photos: [...(f.photos || []), nuevaFoto] };
        }
        return f;
      }));
    }
  };

  const eliminarFoto = (fieldId: string, fotoId: string): void => {
    setFields(fields.map(f => {
      if (f.id === fieldId) {
        return { ...f, photos: (f.photos || []).filter(p => p.id !== fotoId) };
      }
      return f;
    }));
  };

  // --- LOGICA DE FORMULARIO DINAMICO ---
  const cambiarPlantilla = (tipo: 'AC' | 'UPS'): void => {
    if(tipo === 'AC') setFields(JSON.parse(JSON.stringify(PLANTILLA_AC)));
    if(tipo === 'UPS') setFields(JSON.parse(JSON.stringify(PLANTILLA_UPS)));
    setPlantillaSeleccionada(tipo);
    setModoPreview(false);
    setModalPlantilla(false);
  };

  const updateField = (id: string, val: string): void => {
    setFields(fields.map(f => f.id === id ? { ...f, value: val } : f));
  };

  const deleteField = (id: string): void => {
    setFields(fields.filter(f => f.id !== id));
  };

  const startEditingField = (field: Field): void => {
    setEditingFieldId(field.id);
    setEditLabel(field.label);
    setNewType(field.type);
    if (field.type === 'listbox' && field.options) {
      setEditOptions(field.options.join('\n'));
    } else {
      setEditOptions('');
    }
  };

  const saveFieldChanges = (): void => {
    if (!editLabel.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para el campo');
      return;
    }

    setFields(fields.map(f => {
      if (f.id === editingFieldId) {
        const updatedField = { ...f, label: editLabel, type: newType };
        
        // Si cambia a listbox, actualizar opciones
        if (newType === 'listbox' && editOptions) {
          updatedField.options = editOptions
            .split('\n')
            .map(opt => opt.trim())
            .filter(opt => opt.length > 0);
          updatedField.value = '';
        } else if (newType === 'listbox' && !editOptions) {
          // Si no hay opciones y es listbox, usar por defecto
          updatedField.options = ['Opción 1', 'Opción 2'];
          updatedField.value = '';
        }
        
        // Si cambia de tipo, limpiar valores relacionados
        if (f.type !== newType) {
          if (newType === 'photo') {
            updatedField.photos = [];
            updatedField.value = '';
          } else if (newType === 'text' || newType === 'number') {
            updatedField.photos = undefined;
            updatedField.value = '';
          }
        }
        
        return updatedField;
      }
      return f;
    }));

    cancelEditingField();
  };

  const cancelEditingField = (): void => {
    setEditingFieldId(null);
    setEditLabel('');
    setEditOptions('');
    setNewType('text');
  };

  const addNewField = (): void => {
    if (!newLabel.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para el campo');
      return;
    }

    let opciones: string[] = [];
    if (newType === 'listbox') {
      opciones = newOptions
        .split('\n')
        .map(opt => opt.trim())
        .filter(opt => opt.length > 0);
      
      if (opciones.length === 0) {
        Alert.alert('Error', 'Debes agregar al menos una opción a la lista');
        return;
      }
    }

    const nuevo: Field = {
      id: Date.now().toString(),
      label: newLabel,
      type: newType,
      value: '',
      options: opciones
    };
    setFields([...fields, nuevo]);
    setModalVisible(false);
    setNewLabel('');
    setNewOptions('Opción 1\nOpción 2\nOpción 3');
    setShowOptionsInput(false);
    setNewType('text');
  };

  // --- LOGICA DE GENERACION PDF ---
  // Helper para convertir URI a base64 usando fetch
  const uriToBase64 = async (uri: string): Promise<string> => {
    try {
      // Si ya es un data URI, devolverlo sin el prefijo
      if (uri.startsWith('data:')) {
        return uri.split(',')[1];
      }
      
      console.log('Converting URI to base64:', uri);
      
      // Usar fetch para descargar la imagen
      const response = await fetch(uri);
      const blob = await response.blob();
      
      // Convertir blob a base64
      const reader = new FileReader();
      
      return new Promise((resolve, reject) => {
        reader.onload = () => {
          try {
            const result = reader.result as string;
            const base64String = result.includes(',') ? result.split(',')[1] : result;
            console.log('Successfully converted, base64 length:', base64String.length);
            resolve(base64String);
          } catch (e) {
            reject(e);
          }
        };
        reader.onerror = () => reject(new Error('FileReader error'));
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', uri, error);
      return '';
    }
  };

  // Helper para cargar printL.png como base64
  const getPrintLBase64 = async (): Promise<string> => {
    try {
      // Usar require para obtener la ruta correcta del asset
      const printLAsset = require('../assets/printL.png');
      const source = Image.resolveAssetSource(printLAsset);
      
      if (source && source.uri) {
        console.log('PrintL URI resolved:', source.uri);
        const base64 = await uriToBase64(source.uri);
        console.log('PrintL base64 length:', base64.length);
        return base64;
      }
      
      return '';
    } catch (error) {
      console.error('Error loading printL.png:', error);
      return '';
    }
  };

  const generarPDF = async (): Promise<void> => {
    let filasHTML = fields.map(field => {
      if (field.type === 'photo') {
        return '';
      }
      
      // Si es un listbox, mostrar todas las opciones con checkboxes en 2 columnas
      if (field.type === 'listbox' && field.options) {
        const optionsHTML = field.options.map(opt => {
          const isSelected = field.value === opt;
          return `
            <div style="margin-bottom: 2px; display: flex; align-items: center;">
              <input type="checkbox" ${isSelected ? 'checked' : ''} disabled style="margin-right: 4px; margin-top: 0;" />
              <label style="margin: 0;">${opt}</label>
            </div>
          `;
        }).join('');
        
        // Excepción: Tipo de Servicio en una línea
        if (field.label === 'Tipo de Servicio') {
          const inlineHTML = field.options.map(opt => {
            const isSelected = field.value === opt;
            return `
              <div style="display: inline-flex; align-items: center; margin-right: 15px;">
                <input type="checkbox" ${isSelected ? 'checked' : ''} disabled style="margin-right: 4px;" />
                <label style="margin: 0;">${opt}</label>
              </div>
            `;
          }).join('');
          
          return `
            <tr>
              <td style="padding: 5px; border: 1px solid #ddd; font-weight: bold;">${field.label}</td>
              <td style="padding: 5px; border: 1px solid #ddd;">${inlineHTML}</td>
            </tr>
          `;
        }
        
        // Dividir opciones en 2 columnas si hay 3 o más opciones, o en 1 fila si hay 2
        const halfIndex = Math.ceil(field.options.length / 2);
        
        if (field.options.length === 2) {
          // Mostrar 2 opciones en una fila
          const inlineHTML = field.options.map(opt => {
            const isSelected = field.value === opt;
            return `
              <div style="display: inline-flex; align-items: center; margin-right: 20px;">
                <input type="checkbox" ${isSelected ? 'checked' : ''} disabled style="margin-right: 4px;" />
                <label style="margin: 0;">${opt}</label>
              </div>
            `;
          }).join('');
          
          return `
            <tr>
              <td style="padding: 5px; border: 1px solid #ddd; font-weight: bold;">${field.label}</td>
              <td style="padding: 5px; border: 1px solid #ddd;">${inlineHTML}</td>
            </tr>
          `;
        }
        
        const col1 = field.options.slice(0, halfIndex).map(opt => {
          const isSelected = field.value === opt;
          return `
            <div style="margin-bottom: 2px; display: flex; align-items: center;">
              <input type="checkbox" ${isSelected ? 'checked' : ''} disabled style="margin-right: 4px; margin-top: 0;" />
              <label style="margin: 0;">${opt}</label>
            </div>
          `;
        }).join('');
        
        const col2 = field.options.slice(halfIndex).map(opt => {
          const isSelected = field.value === opt;
          return `
            <div style="margin-bottom: 2px; display: flex; align-items: center;">
              <input type="checkbox" ${isSelected ? 'checked' : ''} disabled style="margin-right: 4px; margin-top: 0;" />
              <label style="margin: 0;">${opt}</label>
            </div>
          `;
        }).join('');
        
        const columnsHTML = field.options.length >= 3 ? `
          <div style="display: flex; gap: 15px;">
            <div style="flex: 1;">${col1}</div>
            <div style="flex: 1;">${col2}</div>
          </div>
        ` : optionsHTML;
        
        return `
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd; font-weight: bold;">${field.label}</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${columnsHTML}</td>
          </tr>
        `;
      }
      
      // Para campo de descripción del reporte, dar bastante altura
      if (field.type === 'text' && field.label === 'Descripción del Reporte') {
        return `
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">${field.label}</td>
            <td style="padding: 5px; border: 1px solid #ddd; height: 60px; vertical-align: top;">
              ${field.value || ''}
            </td>
          </tr>
        `;
      }
      
      // Para campos de texto, mostrar vacío en PDF
      if (field.type === 'text') {
        return `
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd; font-weight: bold;">${field.label}</td>
            <td style="padding: 5px; border: 1px solid #ddd;">
              ${field.value || ''}
            </td>
          </tr>
        `;
      }
      
      return `
        <tr>
          <td style="padding: 5px; border: 1px solid #ddd; font-weight: bold;">${field.label}</td>
          <td style="padding: 5px; border: 1px solid #ddd;">${field.value || ''}</td>
        </tr>
      `;
    }).join('');

    // Generar secciones de fotos para cada campo de foto (con base64)
    let fotosHTML = '';
    for (const field of fields) {
      if (field.type === 'photo' && field.photos && field.photos.length > 0) {
        console.log(`Processing photos for field: ${field.label}, count: ${field.photos.length}`);
        fotosHTML += `
          <h3 style="margin-top: 30px; border-bottom: 2px solid #EE4E34; padding-bottom: 10px;">${field.label}</h3>
        `;
        
        for (const foto of field.photos) {
          try {
            console.log(`Converting photo URI: ${foto.uri}`);
            const base64 = await uriToBase64(foto.uri);
            if (base64 && base64.length > 0) {
              fotosHTML += `
                <div style="margin: 20px 0; page-break-inside: avoid;">
                  <p style="color: #666; font-size: 10px;">${foto.timestamp}</p>
                  <img src="data:image/jpeg;base64,${base64}" style="width: 100%; max-width: 400px; border: 1px solid #ddd; border-radius: 4px;" />
                </div>
              `;
              console.log('Photo successfully added to PDF');
            } else {
              console.warn('Base64 conversion returned empty');
            }
          } catch (error) {
            console.error('Error processing photo:', foto.uri, error);
          }
        }
      }
    }

    // Cargar printL.png como base64 para watermark
    const printLBase64 = await getPrintLBase64();

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica'; padding: 10px; font-size: 12px; position: relative; }
            .watermark { position: absolute; top: 10px; right: 10px; opacity: 0.12; z-index: 0; pointer-events: none; }
            .watermark img { width: 120px; height: auto; }
            .content { position: relative; z-index: 1; }
            h1 { color: #333; text-align: center; margin-bottom: 2px; font-size: 18px; }
            h3 { color: #EE4E34; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { text-align: left; font-size: 11px; }
            .header-bg { background-color: #f2f2f2; }
            input[type="checkbox"] { accent-color: #0055a5; }
            label { font-size: 11px; color: #333; }
            hr { margin: 5px 0; }
          </style>
        </head>
        <body>
          <div class="watermark">
            ${printLBase64 ? `<img src="data:image/png;base64,${printLBase64}" />` : ''}
          </div>
          <div class="content">
            <h1>Reporte de Servicio Técnico</h1>
            <p style="text-align: center; color: #666; margin-top: 0; font-size: 10px;">Fecha: ${new Date().toLocaleDateString()} | Hora: ${new Date().toLocaleTimeString()}</p>
            <hr />
            <table>
              <tr class="header-bg">
                <th style="padding: 5px; border: 1px solid #ddd;">Concepto</th>
                <th style="padding: 5px; border: 1px solid #ddd;">Detalle / Valor</th>
              </tr>
              ${filasHTML}
            </table>
            <div style="margin-top: 120px; display: flex; justify-content: space-between; gap: 20px;">
              <div style="flex: 1; text-align: center;">
                <div style="border-top: 2px solid #000; width: 120px; margin: 0 auto;"></div>
                <p style="font-size: 10px; margin-top: 2px; margin-bottom: 2px;">Firma del Técnico</p>
              </div>
              <div style="flex: 1; text-align: center;">
                <div style="border-top: 2px solid #000; width: 120px; margin: 0 auto;"></div>
                <p style="font-size: 10px; margin-top: 2px; margin-bottom: 2px;">Firma del Cliente</p>
              </div>
            </div>
            ${fotosHTML ? `<div style="page-break-before: always; margin-top: 20px;">${fotosHTML}</div>` : ''}
          </div>
        </body>
      </html>
    `;

    try {
      // Generar nombre descriptivo para el PDF
      const now = new Date();
      const dia = String(now.getDate()).padStart(2, '0');
      const mes = String(now.getMonth() + 1).padStart(2, '0');
      const año = now.getFullYear();
      const numAleatorio = Math.floor(Math.random() * 9000) + 1000; // Número entre 1000 y 9999
      
      const nombrePDF = `Reporte_${plantillaSeleccionada}_${numAleatorio}_${dia}-${mes}-${año}`;
      
      console.log('Generando PDF con nombre:', nombrePDF);
      
      // Generar PDF para compartir
      const { uri: pdfUri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('PDF generado en:', pdfUri);
      
      // Mostrar diálogo de compartir con el nombre personalizado
      const resultado = await Sharing.shareAsync(pdfUri, {
        mimeType: 'application/pdf',
        UTI: 'com.adobe.pdf',
        dialogTitle: `Compartir: ${nombrePDF}.pdf`
      });
      
      console.log('Resultado de compartir:', resultado);
    } catch (error) {
      console.error('Error generando PDF:', error);
      Alert.alert("Error", "No se pudo generar el PDF: " + (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER DE CONTROL */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.title}>Creación de reportes: {modoPreview ? 'Vista previa' : 'Edición'}</Text>
          <Text style={styles.subtitle}>{modoPreview ? 'Haz clic en Exportar a PDF para descargar' : 'Cambia a vista previa para exportar como PDF'}</Text>
        </View>
      </View>

      {plantillaSeleccionada && (
        <>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#f5f7fa', borderBottomWidth: 1, borderBottomColor: '#e8eef5'}}>
            <Text style={{fontSize: 12, fontWeight: '600', color: '#0f2a4a'}}>Cambiar vista</Text>
            <Switch 
              value={modoPreview} 
              onValueChange={setModoPreview}
              trackColor={{false: '#d3d3d3', true: '#81c784'}}
            />
          </View>

          {modoPreview && (
            <TouchableOpacity 
              style={[styles.exportBtn, {marginHorizontal: 15, marginVertical: 10, paddingVertical: 12}]}
              onPress={generarPDF}
            >
              <Text style={styles.exportBtnText}>Exportar a PDF</Text>
            </TouchableOpacity>
          )}

          {!modoPreview && (
            <View style={{backgroundColor: 'rgba(40, 167, 69, 0.08)', marginHorizontal: 0, paddingHorizontal: 15, paddingVertical: 8}}>
              <TouchableOpacity 
                style={[styles.addFieldBtn, {paddingVertical: 10, marginHorizontal: 0, marginTop: 4, marginBottom: 4}]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={[styles.addFieldBtnText, {fontSize: 14}]}>+ Agregar Campo</Text>
              </TouchableOpacity>
            </View>
          )}

          <ScrollView style={{flex: 1}}>
            {fields.map((field: Field) => (
              <View key={field.id} style={styles.fieldRow}>
                <Text style={styles.label}>{field.label}:</Text>
                
                {/* CAMPO DE FOTOS */}
                {field.type === 'photo' ? (
                  <View>
                    {!modoPreview && (
                      <TouchableOpacity onPress={() => capturarFoto(field.id)} style={styles.photoButton}>
                        <Text style={styles.photoButtonText}>Capturar Foto</Text>
                      </TouchableOpacity>
                    )}
                    <View style={styles.photosGrid}>
                      {(field.photos || []).map((foto: Photo) => (
                        <View key={foto.id} style={styles.photoContainer}>
                          <Image source={{ uri: foto.uri }} style={styles.photoThumbnail} />
                          {!modoPreview && (
                            <TouchableOpacity onPress={() => eliminarFoto(field.id, foto.id)} style={styles.deletePhotoBtn}>
                              <Text style={styles.deletePhotoBtnText}>✕</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      ))}
                    </View>
                    {!modoPreview && (
                      <View style={styles.fieldActionButtons}>
                        <TouchableOpacity 
                          onPress={() => startEditingField(field)} 
                          style={styles.editFieldBtn}
                        >
                          <Text style={styles.editFieldBtnText}>✎ Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          onPress={() => deleteField(field.id)} 
                          style={styles.deleteFieldBtn}
                        >
                          <Text style={styles.deleteFieldBtnText}>✕ Eliminar</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ) : modoPreview ? (
                  <Text style={styles.previewText}>{field.value || 'N/A'}</Text>
                ) : (
                  /* SI ESTAMOS EN MODO EDICION: INPUTS */
                  <View style={{flex: 1}}>
                    {field.type === 'listbox' ? (
                      <View style={styles.pillsContainer}>
                        {field.options?.map((opt: string) => (
                          <TouchableOpacity 
                            key={opt} 
                            onPress={() => updateField(field.id, field.value === opt ? '' : opt)}
                            style={[styles.pill, field.value === opt && styles.pillActive]}
                          >
                            <Text style={{color: field.value === opt ? 'white' : 'black', fontSize: 12}}>{opt}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ) : (
                      <TextInput 
                        style={styles.input} 
                        value={field.value} 
                        keyboardType={field.type === 'number' ? 'numeric' : 'default'}
                        onChangeText={(t) => updateField(field.id, t)}
                        placeholder="Escribir..."
                      />
                    )}
                    
                    {/* Botones de editar y eliminar (solo en edición) */}
                    <View style={styles.fieldActionButtons}>
                      <TouchableOpacity 
                        onPress={() => startEditingField(field)} 
                        style={styles.editFieldBtn}
                      >
                        <Text style={styles.editFieldBtnText}>✎ Editar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => deleteField(field.id)} 
                        style={styles.deleteFieldBtn}
                      >
                        <Text style={styles.deleteFieldBtnText}>✕ Eliminar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </>
      )}

      {/* MODAL PARA SELECCIONAR PLANTILLA */}
      <Modal visible={modalPlantilla} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={[styles.modalCard, {maxHeight: '70%'}]}>
            <Text style={styles.modalTitle}>Seleccionar Tipo de Reporte</Text>
            <Text style={styles.modalDescription}>Elige el tipo de servicio para generar el reporte</Text>
            
            <View style={{marginVertical: 20, gap: 10}}>
              <TouchableOpacity 
                style={styles.plantillaModalBtn}
                onPress={() => cambiarPlantilla('AC')}
              >
                <Text style={styles.plantillaModalBtnText}>Servicio de Aire Acondicionado</Text>
                <Text style={styles.plantillaModalBtnDesc}>A/C, mantenimiento, reparaciones</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.plantillaModalBtn}
                onPress={() => cambiarPlantilla('UPS')}
              >
                <Text style={styles.plantillaModalBtnText}>Servicio UPS</Text>
                <Text style={styles.plantillaModalBtnDesc}>Sistemas de potencia ininterrumpible</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL PARA AGREGAR CAMPO */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end', padding: 0}}>
            <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Crear Campo Personalizado</Text>
            <Text style={styles.modalDescription}>Define un nuevo campo para tu reporte</Text>
            
            <View style={styles.modalSection}>
              <Text style={styles.inputLabel}>Nombre del Campo</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Ejemplo: Garantía Extendida, Observaciones, etc." 
                value={newLabel} 
                onChangeText={setNewLabel}
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.inputLabel}>Tipo de Campo</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between'}}>
                <TouchableOpacity 
                  style={[styles.typeBtn, {flex: 0.48}, newType === 'text' && styles.typeBtnActive]}
                  onPress={() => {setNewType('text'); setShowOptionsInput(false);}}
                >
                  <Text style={[styles.typeBtnText, newType === 'text' && styles.typeBtnTextActive]}>Texto</Text>
                  <Text style={[styles.typeBtnDesc, newType === 'text' && styles.typeBtnDescActive]}>Entrada libre</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.typeBtn, {flex: 0.48}, newType === 'number' && styles.typeBtnActive]}
                  onPress={() => {setNewType('number'); setShowOptionsInput(false);}}
                >
                  <Text style={[styles.typeBtnText, newType === 'number' && styles.typeBtnTextActive]}>Número</Text>
                  <Text style={[styles.typeBtnDesc, newType === 'number' && styles.typeBtnDescActive]}>Dígitos</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.typeBtn, {flex: 0.48}, newType === 'listbox' && styles.typeBtnActive]}
                  onPress={() => {setNewType('listbox'); setShowOptionsInput(true);}}
                >
                  <Text style={[styles.typeBtnText, newType === 'listbox' && styles.typeBtnTextActive]}>Lista</Text>
                  <Text style={[styles.typeBtnDesc, newType === 'listbox' && styles.typeBtnDescActive]}>Opciones</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.typeBtn, {flex: 0.48}, newType === 'photo' && styles.typeBtnActive]}
                  onPress={() => {setNewType('photo'); setShowOptionsInput(false);}}
                >
                  <Text style={[styles.typeBtnText, newType === 'photo' && styles.typeBtnTextActive]}>Foto</Text>
                  <Text style={[styles.typeBtnDesc, newType === 'photo' && styles.typeBtnDescActive]}>Cámara</Text>
                </TouchableOpacity>
              </View>
            </View>

            {showOptionsInput && newType === 'listbox' && (
              <View style={styles.modalSection}>
                <Text style={styles.inputLabel}>Opciones de Lista</Text>
                <Text style={styles.optionsHint}>Una opción por línea</Text>
                <TextInput 
                  style={[styles.input, styles.optionsInput]}
                  placeholder="Opción 1&#10;Opción 2&#10;Opción 3" 
                  value={newOptions} 
                  onChangeText={setNewOptions}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor="#999"
                />
              </View>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelBtn}
                onPress={() => {
                  setModalVisible(false);
                  setNewLabel('');
                  setNewOptions('Opción 1\nOpción 2\nOpción 3');
                  setShowOptionsInput(false);
                }}
              >
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.confirmBtn}
                onPress={addNewField}
              >
                <Text style={styles.confirmBtnText}>Agregar Campo</Text>
              </TouchableOpacity>
            </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* MODAL PARA EDITAR CAMPO */}
      <Modal visible={editingFieldId !== null} transparent animationType="fade">
        <View style={styles.modalBg}>
          <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end', padding: 0}}>
            <View style={[styles.modalCard]}>
              <Text style={styles.modalTitle}>Editar Campo</Text>
              <Text style={styles.modalDescription}>Modifica el nombre, tipo o las opciones del campo</Text>
            
            <View style={styles.modalSection}>
              <Text style={styles.inputLabel}>Nombre del Campo</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Nombre del campo" 
                value={editLabel} 
                onChangeText={setEditLabel}
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.inputLabel}>Tipo de Campo</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between'}}>
                <TouchableOpacity 
                  style={[styles.typeBtn, {flex: 0.48}, newType === 'text' && styles.typeBtnActive]}
                  onPress={() => setNewType('text')}
                >
                  <Text style={[styles.typeBtnText, newType === 'text' && styles.typeBtnTextActive]}>Texto</Text>
                  <Text style={[styles.typeBtnDesc, newType === 'text' && styles.typeBtnDescActive]}>Línea</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.typeBtn, {flex: 0.48}, newType === 'number' && styles.typeBtnActive]}
                  onPress={() => setNewType('number')}
                >
                  <Text style={[styles.typeBtnText, newType === 'number' && styles.typeBtnTextActive]}>Número</Text>
                  <Text style={[styles.typeBtnDesc, newType === 'number' && styles.typeBtnDescActive]}>Dígitos</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.typeBtn, {flex: 0.48}, newType === 'listbox' && styles.typeBtnActive]}
                  onPress={() => setNewType('listbox')}
                >
                  <Text style={[styles.typeBtnText, newType === 'listbox' && styles.typeBtnTextActive]}>Lista</Text>
                  <Text style={[styles.typeBtnDesc, newType === 'listbox' && styles.typeBtnDescActive]}>Opciones</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.typeBtn, {flex: 0.48}, newType === 'photo' && styles.typeBtnActive]}
                  onPress={() => setNewType('photo')}
                >
                  <Text style={[styles.typeBtnText, newType === 'photo' && styles.typeBtnTextActive]}>Foto</Text>
                  <Text style={[styles.typeBtnDesc, newType === 'photo' && styles.typeBtnDescActive]}>Cámara</Text>
                </TouchableOpacity>
              </View>
            </View>

            {newType === 'listbox' && (
              <View style={styles.modalSection}>
                <Text style={styles.inputLabel}>Opciones de Lista</Text>
                <Text style={styles.optionsHint}>Una opción por línea</Text>
                <TextInput 
                  style={[styles.input, styles.optionsInput]}
                  placeholder="Opción 1&#10;Opción 2&#10;Opción 3" 
                  value={editOptions} 
                  onChangeText={setEditOptions}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor="#999"
                />
              </View>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelBtn}
                onPress={cancelEditingField}
              >
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.confirmBtn}
                onPress={saveFieldChanges}
              >
                <Text style={styles.confirmBtnText}>Guardar Cambios</Text>
              </TouchableOpacity>
            </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

    </View>
  );
}

// --- ESTILOS PARA QUE SE VEA LIMPIO ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa', paddingTop: 40 },
  topBar: { padding: 20, backgroundColor: '#ffffff', elevation: 4, borderBottomWidth: 1, borderBottomColor: '#e8eef5', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8 },
  title: { fontSize: 18, fontWeight: '700', color: '#0f2a4a', letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: '#7a8fa0', marginTop: 5, fontWeight: '500' },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: '#0f2a4a', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  templateSelector: { padding: 15, backgroundColor: '#ffffff', borderRadius: 14, marginHorizontal: 15, marginTop: 15, elevation: 3, gap: 10 },
  templateBtn: { flex: 1, paddingVertical: 15, paddingHorizontal: 15, borderRadius: 12, borderWidth: 2, borderColor: '#dbe4ed', backgroundColor: '#f8fafc' },
  templateBtnActive: { backgroundColor: '#0055a5', borderColor: '#0055a5', elevation: 4 },
  templateBtnText: { fontSize: 15, fontWeight: '700', color: '#5a7a92', textAlign: 'center' },
  templateBtnTextActive: { color: '#ffffff' },
  modeSwitch: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#ffffff', marginHorizontal: 15, marginTop: 12, borderRadius: 14, elevation: 3 },
  modeSwitchLabel: { fontWeight: '700', fontSize: 15, color: '#0f2a4a' },
  modeSwitchHint: { fontSize: 12, color: '#8a9aaa', marginTop: 4, fontWeight: '500' },
  scrollArea: { padding: 15, paddingBottom: 20 },
  fieldRow: { backgroundColor: 'white', padding: 16, marginBottom: 12, borderRadius: 14, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#0055a5', shadowColor: '#0055a5', shadowOpacity: 0.08, shadowRadius: 6 },
  label: { fontWeight: '700', marginBottom: 10, color: '#0f2a4a', fontSize: 14 },
  previewText: { fontSize: 15, color: '#0055a5', backgroundColor: '#f0f7ff', padding: 12, borderRadius: 8, fontWeight: '500', borderLeftWidth: 3, borderLeftColor: '#0055a5' },
  input: { borderWidth: 1.5, borderColor: '#dbe4ed', borderRadius: 10, padding: 13, backgroundColor: '#fafbfc', fontSize: 14, color: '#1a2332', fontWeight: '500' },
  pillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pill: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1.5, borderColor: '#dbe4ed', backgroundColor: '#f8fafc', fontWeight: '600', fontSize: 13 },
  pillActive: { backgroundColor: '#0055a5', borderColor: '#0055a5', color: 'white' },
  photoButton: { backgroundColor: '#0055a5', padding: 14, borderRadius: 12, marginBottom: 12, alignItems: 'center', elevation: 3, shadowColor: '#0055a5', shadowOpacity: 0.3, shadowRadius: 8 },
  photoButtonText: { color: 'white', fontWeight: '700', fontSize: 15 },
  photosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 },
  photoContainer: { position: 'relative', width: 100, height: 120, borderRadius: 12, overflow: 'hidden', backgroundColor: '#f0f0f0', elevation: 2, borderWidth: 1.5, borderColor: '#e0e0e0' },
  photoThumbnail: { width: '100%', height: '100%', resizeMode: 'cover' },
  deletePhotoBtn: { position: 'absolute', top: 6, right: 6, width: 30, height: 30, borderRadius: 15, backgroundColor: '#dc3545', justifyContent: 'center', alignItems: 'center', elevation: 3 },
  deletePhotoBtnText: { color: 'white', fontWeight: '700', fontSize: 18 },
  fieldActionButtons: { flexDirection: 'row', gap: 12, marginTop: 18 },
  editFieldBtn: { flex: 1, paddingVertical: 11, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#e7f3ff', borderWidth: 1.5, borderColor: '#0055a5', alignItems: 'center', elevation: 1 },
  editFieldBtnText: { color: '#0055a5', fontWeight: '700', fontSize: 13 },
  deleteFieldBtn: { flex: 1, paddingVertical: 11, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#ffe6e6', borderWidth: 1.5, borderColor: '#dc3545', alignItems: 'center', elevation: 1 },
  deleteFieldBtnText: { color: '#dc3545', fontWeight: '700', fontSize: 13 },
  addFieldBtn: { backgroundColor: '#28a745', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 12, elevation: 3, shadowColor: '#28a745', shadowOpacity: 0.3, shadowRadius: 8 },
  addFieldBtnText: { color: 'white', fontWeight: '700', fontSize: 16 },
  footer: { padding: 18, backgroundColor: 'white', borderTopWidth: 1.5, borderTopColor: '#e8eef5', elevation: 4 },
  exportBtn: { backgroundColor: '#28a745', paddingVertical: 15, borderRadius: 16, alignItems: 'center', marginTop: 12, elevation: 3, shadowColor: '#28a745', shadowOpacity: 0.3, shadowRadius: 8 },
  exportBtnText: { color: 'white', fontWeight: '700', fontSize: 16 },
  exportHint: { backgroundColor: '#f0f7f5', paddingVertical: 13, paddingHorizontal: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#28a745', marginBottom: 12 },
  exportHintText: { color: '#2d5f52', fontSize: 13, fontWeight: '600' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: 'flex-end', padding: 0 },
  modalCard: { backgroundColor: 'white', padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '85%', elevation: 8, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 12 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#0f2a4a', marginBottom: 4 },
  modalDescription: { fontSize: 13, color: '#7a8fa0', marginBottom: 18, fontWeight: '500' },
  modalSection: { marginVertical: 14 },
  inputLabel: { fontSize: 12, fontWeight: '700', color: '#0f2a4a', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.3 },
  optionsHint: { fontSize: 11, color: '#8a9aaa', marginBottom: 8, fontStyle: 'italic', fontWeight: '500' },
  optionsInput: { minHeight: 90, paddingTop: 10, paddingBottom: 10, textAlignVertical: 'top' },
  typeSelector: { flexDirection: 'row', gap: 10 },
  typeSelectorExtended: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between' },
  typeBtn: { paddingVertical: 11, paddingHorizontal: 8, borderRadius: 10, borderWidth: 1.5, borderColor: '#dbe4ed', backgroundColor: '#f8fafc', alignItems: 'center', justifyContent: 'center' },
  typeBtnActive: { backgroundColor: '#0055a5', borderColor: '#0055a5', elevation: 2 },
  typeBtnText: { fontSize: 12, fontWeight: '700', color: '#1a2332', textAlign: 'center' },
  typeBtnTextActive: { color: 'white' },
  typeBtnDesc: { fontSize: 10, color: '#8a9aaa', marginTop: 3, fontWeight: '500', textAlign: 'center' },
  typeBtnDescActive: { color: '#e0eeff' },
  modalActions: { flexDirection: 'row', gap: 12, marginTop: 20, marginBottom: 8, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#e8eef5' },
  cancelBtn: { flex: 1, paddingVertical: 11, borderRadius: 10, backgroundColor: '#f5f7fa', alignItems: 'center', borderWidth: 1.5, borderColor: '#dbe4ed' },
  cancelBtnText: { fontWeight: '700', fontSize: 13, color: '#0f2a4a' },
  confirmBtn: { flex: 1, paddingVertical: 11, borderRadius: 10, backgroundColor: '#0055a5', alignItems: 'center', elevation: 2 },
  confirmBtnText: { fontWeight: '700', fontSize: 13, color: 'white' },
  plantillaModalBtn: { paddingVertical: 18, paddingHorizontal: 16, borderRadius: 14, backgroundColor: '#f0f7ff', borderWidth: 2.5, borderColor: '#0055a5', marginVertical: 10, justifyContent: 'center', elevation: 1 },
  plantillaModalBtnText: { fontSize: 17, fontWeight: '700', color: '#0055a5', marginBottom: 5 },
  plantillaModalBtnDesc: { fontSize: 13, color: '#7a8fa0', fontStyle: 'italic', fontWeight: '500' }
});