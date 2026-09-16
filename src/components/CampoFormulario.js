import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { colors, spacing, radius } from '../theme/colors';

export default function CampoFormulario({
  control,
  name,
  label,
  rules,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  maxLength,
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error, isTouched } }) => {
        const mostrarError = error && isTouched; // recién se muestra cuando el usuario ya pasó por acá
        return (
          <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={[styles.input, mostrarError && styles.inputError]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={colors.textMuted}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              maxLength={maxLength}
            />
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
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
});
