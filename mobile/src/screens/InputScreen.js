import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, RADIUS } from '../theme';
import { useAppContext } from '../context/AppContext';
import { SCENARIO_A_DATA, SCENARIO_B_DATA, SCENARIO_C_DATA } from '../constants/mockPayloads';

const InputScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const { setActivePipelineData } = useAppContext();

  const handleDemoScenario = (scenarioData) => {
    setActivePipelineData(scenarioData);
    navigation.navigate('InsightsScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.title}>ActionFlow AI</Text>
          <Text style={styles.subtitle}>Enter business data to begin analytical extraction.</Text>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Paste your report, logistics data, or market news here..."
          placeholderTextColor={COLORS.textMuted}
          multiline
          textAlignVertical="top"
          value={text}
          onChangeText={setText}
        />

        <View style={styles.demoSection}>
          <Text style={styles.demoLabel}>OR RUN A DEMO PIPELINE:</Text>
          
          <TouchableOpacity 
            style={styles.demoButton}
            onPress={() => handleDemoScenario(SCENARIO_A_DATA)}
            activeOpacity={0.8}
          >
            <Text style={styles.demoButtonText}>Execute Demo Scenario A (Sales Decline)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.demoButton, { backgroundColor: COLORS.warning }]}
            onPress={() => handleDemoScenario(SCENARIO_B_DATA)}
            activeOpacity={0.8}
          >
            <Text style={styles.demoButtonText}>Execute Demo Scenario B (Logistics Crisis)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.demoButton, { backgroundColor: COLORS.success }]}
            onPress={() => handleDemoScenario(SCENARIO_C_DATA)}
            activeOpacity={0.8}
          >
            <Text style={styles.demoButtonText}>Execute Demo Scenario C (Market Opportunity)</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  textInput: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    minHeight: 180,
    padding: SPACING.md,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xxl,
  },
  demoSection: {
    marginTop: SPACING.lg,
  },
  demoLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: 1.2,
    marginBottom: SPACING.md,
  },
  demoButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
  }
});

export default InputScreen;
