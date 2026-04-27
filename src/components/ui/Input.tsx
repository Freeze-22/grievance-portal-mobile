import React, { useState } from "react";
import { View, Text, TextInput, TextInputProps, StyleSheet, Platform } from "react-native";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputWrap,
          isFocused && styles.inputFocused,
          error ? styles.inputError : null,
        ]}
      >
        <TextInput
          style={styles.textInput}
          placeholderTextColor="#64748b"
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#94a3b8",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrap: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#334155",
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    flexDirection: "row",
    alignItems: "center",
  },
  inputFocused: {
    borderColor: "#6366f1",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  textInput: {
    flex: 1,
    color: "#f1f5f9",
    fontSize: 15,
  },
  errorText: {
    fontSize: 12,
    color: "#ef4444",
    marginTop: 4,
    marginLeft: 4,
  },
});
