import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, RADIUS, SHADOWS } from '../theme';
import { useAppContext } from '../context/AppContext';

const OutcomeScreen = ({ navigation }) => {
  const { activePipelineData, setActivePipelineData } = useAppContext();

  if (!activePipelineData || !activePipelineData.simulation) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No Simulation Data Found</Text>
      </View>
    );
  }

  const { outcomes, simulations } = activePipelineData.simulation;

  const handleReset = () => {
    setActivePipelineData(null);
    navigation.navigate('InputScreen');
  };

  const getChangeColor = (changeStr, metricName) => {
    const isNegative = changeStr.startsWith('-');
    const metricLower = metricName.toLowerCase();
    
    // For metrics like complaints, tickets, delays: negative is GOOD (Success)
    const isNegativeMetric = ['complaint', 'ticket', 'delay', 'risk'].some(term => metricLower.includes(term));

    if (isNegativeMetric) {
      return isNegative ? COLORS.success : COLORS.error;
    } else {
      // For revenue, margin, dispatch rate: positive is GOOD (Success)
      return isNegative ? COLORS.error : COLORS.success;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.screenTitle}>Execution Simulator</Text>
        <Text style={styles.subtitle}>State Delta Analysis</Text>

        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { flex: 2 }]}>METRIC</Text>
            <Text style={[styles.th, { flex: 1.2 }]}>BEFORE</Text>
            <Text style={[styles.th, { flex: 1.2 }]}>AFTER</Text>
            <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>Δ</Text>
          </View>
          
          {outcomes.map((outcome, idx) => (
            <View key={idx}>
              <View style={[styles.tableRow, idx % 2 === 0 && styles.tableRowAlt]}>
                <Text style={[styles.td, { flex: 2, color: COLORS.textSecondary }]}>{outcome.metric}</Text>
                <Text style={[styles.td, { flex: 1.2, fontWeight: FONT_WEIGHTS.bold }]}>{outcome.before_value}</Text>
                <Text style={[styles.td, { flex: 1.2, fontWeight: FONT_WEIGHTS.bold, color: COLORS.white }]}>{outcome.after_value}</Text>
                <Text style={[styles.td, { flex: 1, textAlign: 'right', fontWeight: FONT_WEIGHTS.bold, color: getChangeColor(outcome.change_pct, outcome.metric) }]}>
                  {outcome.change_pct}
                </Text>
              </View>
              <View style={[styles.explanationRow, idx % 2 === 0 && styles.tableRowAlt]}>
                <Text style={styles.explanationText}>↳ {outcome.explanation}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>SYSTEM LEDGER</Text>
        <View style={styles.ledgerCard}>
          {simulations.map((sim, idx) => {
            const mockJson = JSON.parse(sim.mock_response || "{}");
            return (
              <View key={idx} style={styles.ledgerItem}>
                <Text style={styles.ledgerTimestamp}>[{new Date(sim.timestamp).toLocaleTimeString()}] DISPATCH: {sim.simulated_service}</Text>
                <Text style={styles.ledgerAction}>EXECUTING: {sim.action_title}</Text>
                <Text style={styles.ledgerResponse}>STATUS: {sim.status.toUpperCase()} | RESPONSE: {JSON.stringify(mockJson)}</Text>
              </View>
            );
          })}
          <Text style={styles.ledgerCursor}>█</Text>
        </View>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleReset}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Reset & Run New Simulation</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    marginTop: 100,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  screenTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.success,
    marginBottom: SPACING.lg,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  tableCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: SPACING.xl,
    ...SHADOWS.card,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardElevated,
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  th: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: FONT_WEIGHTS.bold,
  },
  tableRow: {
    flexDirection: 'row',
    padding: SPACING.md,
    paddingBottom: SPACING.xs,
  },
  tableRowAlt: {
    backgroundColor: 'rgba(26, 29, 39, 0.5)',
  },
  td: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
  },
  explanationRow: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  explanationText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: 1.2,
    marginBottom: SPACING.md,
  },
  ledgerCard: {
    backgroundColor: '#0A0C10',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xl,
  },
  ledgerItem: {
    marginBottom: SPACING.md,
  },
  ledgerTimestamp: {
    color: COLORS.primary,
    fontSize: 10,
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  ledgerAction: {
    color: COLORS.white,
    fontSize: 11,
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  ledgerResponse: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontFamily: 'monospace',
  },
  ledgerCursor: {
    color: COLORS.success,
    fontSize: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.cardElevated,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  primaryButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
  }
});

export default OutcomeScreen;
