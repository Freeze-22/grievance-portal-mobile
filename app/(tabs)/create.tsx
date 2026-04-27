import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
} from "react-native";
import Animated, { FadeInDown, FadeInUp, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { AnimatedView } from "@/src/components/ui/AnimatedView";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";

import { StepProgressBar } from "@/src/components/ui/StepProgressBar";
import { Button } from "@/src/components/ui/Button";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  Step1Data,
  Step2Data,
  Step3Data,
  GrievanceFormData,
} from "@/src/schemas/grievanceSchemas";
import { useDraftStore } from "@/src/store/useDraftStore";

const STEP_LABELS = ["Personal", "Details", "Supporting", "Review"];

const DEPARTMENTS = [
  "Engineering", "Human Resources", "Marketing", "Finance",
  "Operations", "Legal", "Sales", "Product",
];

const GRIEVANCE_TYPES = [
  "Harassment", "Discrimination", "Safety", "Compensation",
  "Management", "Work Environment", "Policy Violation", "Other",
];

const SEVERITY_LEVELS = [
  { label: "Low", value: "low", color: "#10b981", icon: "🟢" },
  { label: "Medium", value: "medium", color: "#f59e0b", icon: "🟡" },
  { label: "High", value: "high", color: "#f97316", icon: "🟠" },
  { label: "Critical", value: "critical", color: "#ef4444", icon: "🔴" },
];

// ── Step 1: Personal Info ────────────────────────────────────────────
function StepOne({
  onNext,
  defaultValues,
}: {
  onNext: (data: Step1Data) => void;
  defaultValues: Partial<Step1Data>;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues,
  });

  return (
    <AnimatedView entering={SlideInRight.duration(300)} exiting={SlideOutLeft.duration(300)}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <Text style={styles.stepDesc}>We need your basic details to process your grievance.</Text>

      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <View style={[styles.inputWrap, errors.fullName && styles.inputError]}>
              <Ionicons name="person-outline" size={18} color="#64748b" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your full name"
                placeholderTextColor="#475569"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="words"
              />
            </View>
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <View style={[styles.inputWrap, errors.email && styles.inputError]}>
              <Ionicons name="mail-outline" size={18} color="#64748b" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="you@company.com"
                placeholderTextColor="#475569"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="employeeId"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Employee ID</Text>
            <View style={[styles.inputWrap, errors.employeeId && styles.inputError]}>
              <Ionicons name="id-card-outline" size={18} color="#64748b" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="e.g. EMP-0042"
                placeholderTextColor="#475569"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="characters"
              />
            </View>
            {errors.employeeId && <Text style={styles.errorText}>{errors.employeeId.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="department"
        render={({ field: { onChange, value } }) => (
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Department</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 4 }}>
              {DEPARTMENTS.map((dept) => (
                <TouchableOpacity
                  key={dept}
                  style={[styles.chip, value === dept && styles.chipActive]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    onChange(dept);
                  }}
                >
                  <Text style={[styles.chipText, value === dept && styles.chipTextActive]}>{dept}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {errors.department && <Text style={styles.errorText}>{errors.department.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            <View style={[styles.inputWrap, errors.phone && styles.inputError]}>
              <Ionicons name="call-outline" size={18} color="#64748b" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter phone number"
                placeholderTextColor="#475569"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="phone-pad"
              />
            </View>
            {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
          </View>
        )}
      />

      <View style={{ height: 16 }} />
      <Button label="Continue" onPress={handleSubmit(onNext)} />
    </AnimatedView>
  );
}

// ── Step 2: Grievance Details ────────────────────────────────────────
function StepTwo({
  onNext,
  onBack,
  defaultValues,
}: {
  onNext: (data: Step2Data) => void;
  onBack: () => void;
  defaultValues: Partial<Step2Data>;
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues,
  });

  return (
    <AnimatedView entering={SlideInRight.duration(300)} exiting={SlideOutLeft.duration(300)}>
      <Text style={styles.stepTitle}>Grievance Details</Text>
      <Text style={styles.stepDesc}>Describe the incident clearly and thoroughly.</Text>

      <Controller
        control={control}
        name="grievanceType"
        render={({ field: { onChange, value } }) => (
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Grievance Type</Text>
            <View style={styles.chipsWrap}>
              {GRIEVANCE_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.chip, value === type && styles.chipActive]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    onChange(type);
                  }}
                >
                  <Text style={[styles.chipText, value === type && styles.chipTextActive]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.grievanceType && <Text style={styles.errorText}>{errors.grievanceType.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="incidentDate"
        render={({ field: { onChange, value } }) => (
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Incident Date</Text>
            <TouchableOpacity
              style={[styles.inputWrap, errors.incidentDate && styles.inputError]}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="calendar-outline" size={18} color="#64748b" style={{ marginRight: 10 }} />
              <Text style={[styles.textInput, !value && { color: "#475569" }]}>
                {value || "YYYY-MM-DD"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(Platform.OS === 'ios');
                  if (selectedDate) {
                    onChange(selectedDate.toISOString().split('T')[0]);
                  }
                }}
              />
            )}
            {errors.incidentDate && <Text style={styles.errorText}>{errors.incidentDate.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="subject"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Subject</Text>
            <View style={[styles.inputWrap, errors.subject && styles.inputError]}>
              <TextInput
                style={styles.textInput}
                placeholder="Brief title of the grievance"
                placeholderTextColor="#475569"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </View>
            {errors.subject && <Text style={styles.errorText}>{errors.subject.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Description</Text>
            <View style={[styles.textAreaWrap, errors.description && styles.inputError]}>
              <TextInput
                style={[styles.textInput, { minHeight: 120, textAlignVertical: "top" }]}
                placeholder="Describe the incident in detail..."
                placeholderTextColor="#475569"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                multiline
                numberOfLines={5}
              />
            </View>
            {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="severity"
        render={({ field: { onChange, value } }) => (
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Severity Level</Text>
            <View style={styles.severityRow}>
              {SEVERITY_LEVELS.map((s) => (
                <TouchableOpacity
                  key={s.value}
                  style={[
                    styles.severityCard,
                    value === s.value && { borderColor: s.color, backgroundColor: s.color + "18" },
                  ]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    onChange(s.value);
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{s.icon}</Text>
                  <Text style={[styles.severityLabel, value === s.value && { color: s.color }]}>
                    {s.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.severity && <Text style={styles.errorText}>{errors.severity.message}</Text>}
          </View>
        )}
      />

      <View style={styles.btnRow}>
        <Button label="Back" variant="outline" onPress={onBack} style={{ marginRight: 12 }} />
        <Button label="Continue" onPress={handleSubmit(onNext)} />
      </View>
    </AnimatedView>
  );
}

// ── Step 3: Supporting Info ──────────────────────────────────────────
function StepThree({
  onNext,
  onBack,
  defaultValues,
}: {
  onNext: (data: Step3Data) => void;
  onBack: () => void;
  defaultValues: Partial<Step3Data>;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues,
  });

  return (
    <AnimatedView entering={SlideInRight.duration(300)} exiting={SlideOutLeft.duration(300)}>
      <Text style={styles.stepTitle}>Supporting Information</Text>
      <Text style={styles.stepDesc}>Any additional context helps us resolve faster.</Text>

      <Controller
        control={control}
        name="witnesses"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Witnesses (optional)</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="people-outline" size={18} color="#64748b" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="Names of any witnesses"
                placeholderTextColor="#475569"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        name="previouslyReported"
        render={({ field: { onChange, value } }) => (
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Previously Reported?</Text>
            <View style={styles.radioRow}>
              {["Yes", "No"].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.radioBtn, value === opt && styles.radioBtnActive]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    onChange(opt);
                  }}
                >
                  <View style={[styles.radioCircle, value === opt && styles.radioCircleActive]}>
                    {value === opt && <View style={styles.radioInner} />}
                  </View>
                  <Text style={[styles.radioLabel, value === opt && styles.radioLabelActive]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.previouslyReported && (
              <Text style={styles.errorText}>{errors.previouslyReported.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="desiredResolution"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Desired Resolution</Text>
            <View style={[styles.textAreaWrap, errors.desiredResolution && styles.inputError]}>
              <TextInput
                style={[styles.textInput, { minHeight: 100, textAlignVertical: "top" }]}
                placeholder="What outcome would you like to see?"
                placeholderTextColor="#475569"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                multiline
              />
            </View>
            {errors.desiredResolution && (
              <Text style={styles.errorText}>{errors.desiredResolution.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="additionalComments"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Additional Comments (optional)</Text>
            <View style={styles.textAreaWrap}>
              <TextInput
                style={[styles.textInput, { minHeight: 80, textAlignVertical: "top" }]}
                placeholder="Any other information..."
                placeholderTextColor="#475569"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                multiline
              />
            </View>
          </View>
        )}
      />

      {/* Evidence Upload */}
      <Controller
        control={control}
        name="evidence"
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity 
            style={styles.uploadArea} 
            onPress={async () => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              try {
                const result = await DocumentPicker.getDocumentAsync({
                  type: "*/*",
                  copyToCacheDirectory: true,
                });
                if (!result.canceled && result.assets && result.assets.length > 0) {
                  onChange({
                    name: result.assets[0].name,
                    uri: result.assets[0].uri,
                    type: result.assets[0].mimeType
                  });
                }
              } catch (err) {
                console.error("Document Picker Error:", err);
              }
            }}
          >
            <Ionicons name="document-attach-outline" size={28} color="#667eea" />
            <Text style={styles.uploadText}>
              {value ? value.name : "Attach Evidence (Photo/Document)"}
            </Text>
            <Text style={styles.uploadHint}>
              {value ? "Tap to change file" : "Tap to capture or upload files"}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.btnRow}>
        <Button label="Back" variant="outline" onPress={onBack} style={{ marginRight: 12 }} />
        <Button label="Review" onPress={handleSubmit(onNext)} />
      </View>
    </AnimatedView>
  );
}

// ── Step 4: Review & Submit ──────────────────────────────────────────
function ReviewStep({
  data,
  onBack,
  onSubmit,
  isSubmitting,
}: {
  data: Partial<GrievanceFormData>;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const sections = [
    {
      title: "Personal Info",
      icon: "person-outline" as const,
      fields: [
        { label: "Name", value: data.fullName },
        { label: "Email", value: data.email },
        { label: "Employee ID", value: data.employeeId },
        { label: "Department", value: data.department },
        { label: "Phone", value: data.phone },
      ],
    },
    {
      title: "Grievance Details",
      icon: "document-text-outline" as const,
      fields: [
        { label: "Type", value: data.grievanceType },
        { label: "Date", value: data.incidentDate },
        { label: "Subject", value: data.subject },
        { label: "Description", value: data.description },
        { label: "Severity", value: data.severity },
      ],
    },
    {
      title: "Supporting Info",
      icon: "information-circle-outline" as const,
      fields: [
        { label: "Witnesses", value: data.witnesses || "None" },
        { label: "Previously Reported", value: data.previouslyReported },
        { label: "Desired Resolution", value: data.desiredResolution },
        { label: "Comments", value: data.additionalComments || "None" },
        { label: "Evidence", value: data.evidence ? data.evidence.name : "None" },
      ],
    },
  ];

  return (
    <AnimatedView entering={SlideInRight.duration(300)}>
      <Text style={styles.stepTitle}>Review & Submit</Text>
      <Text style={styles.stepDesc}>Please verify all information before submission.</Text>

      {sections.map((section, idx) => (
        <View
          key={section.title}
          style={styles.reviewSection}
        >
          <View style={styles.reviewHeader}>
            <Ionicons name={section.icon} size={18} color="#667eea" />
            <Text style={styles.reviewTitle}>{section.title}</Text>
          </View>
          {section.fields.map((field) => (
            <View key={field.label} style={styles.reviewField}>
              <Text style={styles.reviewLabel}>{field.label}</Text>
              <Text style={styles.reviewValue} numberOfLines={3}>
                {field.value ? String(field.value) : "—"}
              </Text>
            </View>
          ))}
        </View>
      ))}

      {/* Confidentiality Notice */}
      <AnimatedView entering={FadeInDown.delay(500).duration(400)} style={styles.notice}>
        <Ionicons name="shield-checkmark" size={20} color="#10b981" />
        <Text style={styles.noticeText}>
          Your grievance is protected by our confidentiality policy. Only authorized personnel will
          have access.
        </Text>
      </AnimatedView>

      <View style={styles.btnRow}>
        <Button label="Back" variant="outline" onPress={onBack} style={{ marginRight: 12 }} />
        <Button label="Submit Grievance" onPress={onSubmit} isLoading={isSubmitting} />
      </View>
    </AnimatedView>
  );
}

// ── Main Create Screen ───────────────────────────────────────────────
export default function CreateGrievanceScreen() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { draft, updateDraft, clearDraft } = useDraftStore();

  const handleStep1 = (data: Step1Data) => {
    updateDraft(data);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setStep(1);
  };

  const handleStep2 = (data: Step2Data) => {
    updateDraft(data);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setStep(2);
  };

  const handleStep3 = (data: Step3Data) => {
    updateDraft(data);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setStep(3);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    clearDraft();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      "🎉 Grievance Submitted",
      "Your grievance has been submitted successfully. You'll receive a confirmation email shortly.",
      [
        {
          text: "View Dashboard",
          onPress: () => setStep(0),
        },
      ]
    );
    setStep(0);
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.safeArea}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <AnimatedView entering={FadeInDown.duration(400)} style={styles.createHeader}>
            <Text style={styles.createTitle}>New Grievance</Text>
            {Object.keys(draft).length > 0 && (
              <View style={styles.autosaveBadge}>
                <Ionicons name="cloud-done-outline" size={14} color="#10b981" />
                <Text style={styles.autosaveText}>Draft saved</Text>
              </View>
            )}
          </AnimatedView>

          <StepProgressBar currentStep={step} totalSteps={4} stepLabels={STEP_LABELS} />

          {step === 0 && <StepOne onNext={handleStep1} defaultValues={draft} />}
          {step === 1 && (
            <StepTwo onNext={handleStep2} onBack={() => setStep(0)} defaultValues={draft} />
          )}
          {step === 2 && (
            <StepThree onNext={handleStep3} onBack={() => setStep(1)} defaultValues={draft} />
          )}
          {step === 3 && (
            <ReviewStep
              data={draft}
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 16,
  },
  createHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  createTitle: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
  },
  autosaveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  autosaveText: {
    color: "#10b981",
    fontSize: 12,
    fontWeight: "600",
  },
  stepTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  stepDesc: {
    color: "#e2e8f0",
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  fieldWrap: {
    marginBottom: 20,
  },
  fieldLabel: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 2,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
  },
  textAreaWrap: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputError: {
    borderColor: "#ef4444",
  },
  textInput: {
    flex: 1,
    color: "#1e293b",
    fontSize: 15,
  },
  errorText: {
    color: "#f87171",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: "#667eea",
    borderColor: "#667eea",
  },
  chipText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "500",
  },
  chipTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  severityRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  severityCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 6,
  },
  severityLabel: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "600",
  },
  radioRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
  radioBtn: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 10,
  },
  radioBtnActive: {
    borderColor: "#667eea",
    backgroundColor: "rgba(102, 126, 234, 0.05)",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#cbd5e1",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleActive: {
    borderColor: "#667eea",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#667eea",
  },
  radioLabel: {
    color: "#64748b",
    fontSize: 15,
    fontWeight: "500",
  },
  radioLabelActive: {
    color: "#1e293b",
  },
  uploadArea: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 28,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderStyle: "dashed",
    backgroundColor: "#ffffff",
    marginBottom: 20,
    gap: 6,
  },
  uploadText: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  uploadHint: {
    color: "#94a3b8",
    fontSize: 12,
  },
  btnRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  reviewSection: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  reviewTitle: {
    color: "#1e293b",
    fontSize: 16,
    fontWeight: "700",
  },
  reviewField: {
    flexDirection: "row",
    paddingVertical: 6,
  },
  reviewLabel: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "500",
    width: 110,
  },
  reviewValue: {
    color: "#0f172a",
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 16,
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 20,
  },
  noticeText: {
    color: "#475569",
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
});
