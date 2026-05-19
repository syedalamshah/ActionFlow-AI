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

const InsightsScreen = ({ navigation }) => {
  const { activePipelineData } = useAppContext();

  if (!activePipelineData || !activePipelineData.insights) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No Pipeline Data Found</Text>
      </View>
    );
  }

  const { extraction, insights, impact } = activePipelineData;
  const impactMap = {};
  if (impact && impact.impact_analyses) {
    impact.impact_analyses.forEach((ia) => {
      impactMap[ia.insight_title] = ia;
    });
  }

  const getUrgencyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return COLORS.error;
      case 'medium': return COLORS.warning;
      case 'low': return COLORS.success;
      default: return COLORS.textMuted;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.screenTitle}>Analytical Insights</Text>
        <Text style={styles.subtitle}>Extracted from: {extraction.source_type}</Text>

        {impact?.cross_cutting_themes && (
          <View style={styles.chipRow}>
            {impact.cross_cutting_themes.map((theme, idx) => (
              <View key={idx} style={styles.chip}>
                <Text style={styles.chipText}>{theme}</Text>
              </View>
            ))}
          </View>
        )}

        {insights.insights.map((insight, index) => {
          const ia = impactMap[insight.title] || {};
          const urgencyColor = getUrgencyColor(ia.urgency_level);
          const pct = Math.round((insight.confidence_score || 0) * 100);

          return (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{insight.title}</Text>
                {ia.urgency_level && (
                  <View style={[styles.urgencyBadge, { borderColor: urgencyColor, backgroundColor: `${urgencyColor}22` }]}>
                    <Text style={[styles.urgencyText, { color: urgencyColor }]}>{ia.urgency_level}</Text>
                  </View>
                )}
              </View>

              <Text style={styles.cardDetail}>{insight.detail}</Text>

              <View style={styles.confidenceWrapper}>
                <Text style={styles.confidenceLabel}>Confidence: {pct}%</Text>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${pct}%` }]} />
                </View>
              </View>

              {ia.business_consequence && (
                <View style={styles.impactContainer}>
                  <Text style={styles.impactLabel}>Consequence:</Text>
                  <Text style={styles.impactValue}>{ia.business_consequence}</Text>
                  <View style={styles.impactRow}>
                    <View style={styles.impactColumn}>
                      <Text style={styles.impactLabel}>Est. Impact:</Text>
                      <Text style={[styles.impactValue, { color: COLORS.primary, fontWeight: FONT_WEIGHTS.bold }]}>{ia.estimated_loss_or_gain}</Text>
                    </View>
                    <View style={styles.impactColumn}>
                      <Text style={styles.impactLabel}>Timeframe:</Text>
                      <Text style={[styles.impactValue, { color: COLORS.white }]}>{ia.time_sensitivity}</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          );
        })}

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('ActionPlanScreen')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Generate Action Optimization Matrix</Text>
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
    color: COLORS.primary,
    marginBottom: SPACING.lg,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  chip: {
    backgroundColor: COLORS.cardElevated,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SPACING.sm,
  },
  urgencyBadge: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
  },
  urgencyText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold,
    textTransform: 'uppercase',
  },
  cardDetail: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  confidenceWrapper: {
    marginBottom: SPACING.lg,
  },
  confidenceLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: COLORS.cardElevated,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
  },
  impactContainer: {
    backgroundColor: COLORS.cardElevated,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.warning,
  },
  impactRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
  },
  impactColumn: {
    flex: 1,
  },
  impactLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  impactValue: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
  }
});

export default InsightsScreen;
