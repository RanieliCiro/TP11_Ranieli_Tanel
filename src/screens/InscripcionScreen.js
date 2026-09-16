import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CampoFormulario from '../components/CampoFormulario';
import SelectorEntrada from '../components/SelectorEntrada';
import TicketConfirmacion from '../components/TicketConfirmacion';
import { colors, spacing, radius } from '../theme/colors';

const EMAIL_STORAGE_KEY = '@sonido_sur_ultimo_email';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO_REGEX = /^[0-9]+$/;

const VALORES_INICIALES = {
  nombreCompleto: '',
  email: '',
  edad: '',
  tipoEntrada: '',
  telefono: '',
};

export default function InscripcionScreen() {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { isValid },
  } = useForm({
    defaultValues: VALORES_INICIALES,
    mode: 'onChange',
  });

  const [ticket, setTicket] = useState(null); // sin ticket se ve el formulario, con ticket se ve la confirmación
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    async function cargarEmailGuardado() {
      // precarga el email de la última vez que se usó la app
      const emailGuardado = await AsyncStorage.getItem(EMAIL_STORAGE_KEY);
      if (emailGuardado) {
        setValue('email', emailGuardado);
      }
      trigger();
    }
    cargarEmailGuardado();
  }, []);

  const onSubmit = async (datos) => {
    setCargando(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // espera un segundo, como si enviara los datos
    await AsyncStorage.setItem(EMAIL_STORAGE_KEY, datos.email);
    setCargando(false);
    setTicket({ ...datos, nombreCompleto: datos.nombreCompleto.trim() });
  };

  const handleVolver = () => {
    setTicket(null);
    reset(VALORES_INICIALES);
    trigger();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // para que el teclado no tape los campos
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>FESTIVAL 2026</Text>
          <Text style={styles.heroTitulo}>Sonido Sur</Text>
          <Text style={styles.heroSubtitulo}>
            {ticket ? '¡Ya sos parte del line-up!' : 'Completá tus datos para inscribirte'}
          </Text>
        </View>

        {ticket ? (
          <TicketConfirmacion datos={ticket} onVolver={handleVolver} />
        ) : (
          <View style={styles.card}>
            <CampoFormulario
              control={control}
              name="nombreCompleto"
              label="Nombre completo"
              placeholder="Ej: Ana Torres"
              autoCapitalize="words"
              rules={{
                validate: (value) =>
                  value.trim().length >= 3 ? true : 'Ingresá tu nombre completo',
              }}
            />

            <CampoFormulario
              control={control}
              name="email"
              label="Email"
              placeholder="Ej: ana@mail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              rules={{
                validate: (value) =>
                  EMAIL_REGEX.test(value.trim()) ? true : 'Ingresá un email válido',
              }}
            />

            <CampoFormulario
              control={control}
              name="edad"
              label="Edad"
              placeholder="Ej: 21"
              keyboardType="numeric"
              maxLength={2}
              rules={{
                validate: (value) => {
                  if (!value) return 'La edad tiene que ser mayor a 12';
                  const numero = Number(value);
                  if (Number.isNaN(numero) || numero < 12 || numero > 99) {
                    return 'La edad tiene que ser mayor a 12';
                  }
                  return true;
                },
              }}
            />

            <SelectorEntrada
              control={control}
              name="tipoEntrada"
              label="Tipo de entrada"
              rules={{
                validate: (value) => (value ? true : 'Elegí un tipo de entrada'),
              }}
            />

            <CampoFormulario
              control={control}
              name="telefono"
              label="Teléfono (opcional)"
              placeholder="Ej: 1122334455"
              keyboardType="phone-pad"
              rules={{
                validate: (value) => {
                  if (!value) return true;
                  return TELEFONO_REGEX.test(value) ? true : 'Solo se permiten números';
                },
              }}
            />

            <TouchableOpacity
              style={[styles.boton, (!isValid || cargando) && styles.botonDeshabilitado]}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || cargando}
              activeOpacity={0.85}
            >
              {cargando ? (
                <ActivityIndicator color={colors.surface} />
              ) : (
                <Text style={styles.botonTexto}>Confirmar inscripción</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  hero: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  heroEyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 6,
  },
  heroTitulo: {
    color: colors.textOnDark,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  heroSubtitulo: {
    color: colors.textOnDarkMuted,
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  boton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  botonDeshabilitado: {
    backgroundColor: colors.textMuted,
  },
  botonTexto: {
    color: colors.surface,
    fontWeight: '800',
    fontSize: 15,
  },
});
