import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { colors, spacing, radius } from '../theme/colors';

const OPCIONES = [
  { value: 'general', label: 'General', emoji: '🎟️' },
  { value: 'vip', label: 'VIP', emoji: '⭐' },
];

export default function SelectorEntrada({ control, name, label, rules }) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error, isTouched } }) => {
        const mostrarError = error && isTouched;
        return (
          <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.row}>
              {OPCIONES.map((opcion) => {
                const seleccionado = value === opcion.value;
                return (
                  <TouchableOpacity
                    key={opcion.value}
                    style={[styles.boton, seleccionado && styles.botonSeleccionado]}
                    onPress={() => {
                      onChange(opcion.value);
                      onBlur(); // marca el campo como tocado para poder mostrar el error si hace falta
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.emoji}>{opcion.emoji}</Text>
                    <Text style={[styles.botonTexto, seleccionado && styles.botonTextoSeleccionado]}>
                      {opcion.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {mostrarError && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
    letterSpacing: 0.3,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  boton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingVertical: 12,
    gap: 6,
  },
  botonSeleccionado: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  emoji: {
    fontSize: 16,
  },
  botonTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  botonTextoSeleccionado: {
    color: colors.surface,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
});
