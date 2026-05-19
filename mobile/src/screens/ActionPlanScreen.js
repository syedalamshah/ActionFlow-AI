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

const ActionPlanScreen = ({ navigation }) => {
  const { activePipelineData } = useAppContext();

  if (!activePipelineData || !activePipelineData.actions) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No Action Data Found</Text>
      </View>
    );
  }

  const actions = [...activePipelineData.actions.recommendations].sort((a, b) => a.priority - b.priority);

  const getPriorityColor = (priority) => {
    if (priority === 1) return COLORS.error;
    if (priority === 2) return COLORS.warning;
    return COLORS.primary;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.screenTitle}>Optimization Matrix</Text>
        <Text style={styles.subtitle}>Prioritized Recommended Actions</Text>

        {actions.map((action, idx) => {
          const pColor = getPriorityColor(action.priority);

          return (
            <View key={idx} style={[styles.card, idx === 0 && { borderColor: COLORS.primary, borderWidth: 2 }]}>
              
              <View style={styles.cardHeader}>
                <View style={[styles.priorityBadge, { backgroundColor: pColor }]}>
                  <Text style={styles.priorityText}>P{action.priority}</Text>
                </View>
                <Text style={styles.cardTitle}>{action.title}</Text>
              </View>

              <Text style={styles.cardDetail}>{action.expected_outcome}</Text>

              <View style={styles.metaGrid}>
                <View style={styles.metaBox}>
                  <Text style={styles.metaLabel}>BUDGET ALLOCATION</Text>
                  <Text style={[styles.metaValue, { color: COLORS.warning }]}>{action.budget_estimate}</Text>
                </View>
                <View style={styles.metaBox}>
                  <Text style={styles.metaLabel}>DEADLINE</Text>
                  <Text style={[styles.metaValue, { color: COLORS.success }]}>{action.deadline}</Text>
                </View>
              </View>

              <View style={styles.teamContainer}>
                <Text style={styles.teamLabel}>OWNERSHIP:</Text>
                <View style={styles.teamBadge}>
                  <Text style={styles.teamText}>{action.responsible_team}</Text>
                </View>
              </View>

            </View>
          );
        })}

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('OutcomeScreen')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Execute Selected Action Items</Text>
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
    color: COLORS.textMuted,
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  priorityBadge: {
    height: 32,
    width: 32,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  priorityText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  cardDetail: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  metaBox: {
    flex: 1,
    backgroundColor: COLORS.cardElevated,
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metaLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  metaValue: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  teamLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginRight: SPACING.sm,
  },
  teamBadge: {
    backgroundColor: 'rgba(108, 92, 231, 0.15)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  teamText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
  }
});

export default ActionPlanScreen;
