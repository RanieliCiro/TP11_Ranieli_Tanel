import { SafeAreaView, StyleSheet } from 'react-native';
import InscripcionScreen from './src/screens/InscripcionScreen';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <InscripcionScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
