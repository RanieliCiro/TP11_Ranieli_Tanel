import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../theme/colors';

export default function TicketConfirmacion({ datos, onVolver }) {
  // datos y onVolver llegan por props, este componente no guarda nada por su cuenta
  const esVip = datos.tipoEntrada === 'vip';

  return (
    <View style={styles.wrapper}>
      <View style={styles.ticket}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerEyebrow}>ENTRADA CONFIRMADA</Text>
            <Text style={styles.headerTitulo}>SONIDO SUR</Text>
            <Text style={styles.headerSubtitulo}>Festival de Música · 2026</Text>
          </View>
          <View style={[styles.badge, esVip && styles.badgeVip]}>
            <Text style={styles.badgeTexto}>{esVip ? '⭐ VIP' : '🎟️ GENERAL'}</Text>
          </View>
        </View>

        <View style={styles.perforacionFila}>
          <View style={styles.circuloIzq} />
          <View style={styles.lineaPunteada} />
          <View style={styles.circuloDer} />
        </View>

        <View style={styles.cuerpo}>
          <Fila etiqueta="Nombre" valor={datos.nombreCompleto} />
          <Fila etiqueta="Email" valor={datos.email} />
          <Fila etiqueta="Edad" valor={String(datos.edad)} />
          <Fila etiqueta="Teléfono" valor={datos.telefono ? datos.telefono : 'No informado'} />
        </View>
      </View>

      <TouchableOpacity style={styles.botonVolver} onPress={onVolver} activeOpacity={0.85}>
        <Text style={styles.botonVolverTexto}>Volver a inscribir a otra persona</Text>
      </TouchableOpacity>
    </View>
  );
}

function Fila({ etiqueta, valor }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.filaEtiqueta}>{etiqueta}</Text>
      <Text style={styles.filaValor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  ticket: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.lg,
  },
  headerEyebrow: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  headerTitulo: {
    color: colors.textOnDark,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  headerSubtitulo: {
    color: colors.textOnDarkMuted,
    fontSize: 13,
    marginTop: 2,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeVip: {
    backgroundColor: colors.secondary,
  },
  badgeTexto: {
    color: colors.textOnDark,
    fontWeight: '800',
    fontSize: 12,
  },
  perforacionFila: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  circuloIzq: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.background,
    marginLeft: -9,
  },
  circuloDer: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.background,
    marginRight: -9,
  },
  lineaPunteada: {
    flex: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    marginHorizontal: spacing.sm,
  },
  cuerpo: {
    padding: spacing.lg,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  filaEtiqueta: {
    color: colors.textOnDarkMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  filaValor: {
    color: colors.textOnDark,
    fontSize: 14,
    fontWeight: '700',
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: spacing.md,
  },
  botonVolver: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 15,
    alignItems: 'center',
  },
  botonVolverTexto: {
    color: colors.surface,
    fontWeight: '800',
    fontSize: 15,
  },
});
