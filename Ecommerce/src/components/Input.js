import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";
import PasswordToggle from "@/components/PasswordToggle";

const FormInput = ({
  label = "",
  placeholder = "",
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  value = "",
  onChangeText = () => {},
  onBlur = () => {},
  error = null,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const resolveSecureEntry = () => secureTextEntry && !isPasswordVisible;

  const renderError = () => {
    if (!error) return null;
    return <Text style={styles.errorText}>{error}</Text>;
  };

  const resolveInputContainerStyle = () => [
    styles.inputContainer,
    error ? styles.inputContainerError : null,
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={resolveInputContainerStyle()}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          secureTextEntry={resolveSecureEntry()}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
        <PasswordToggle
          secure={secureTextEntry}
          visible={isPasswordVisible}
          onToggle={togglePasswordVisibility}
        />
      </View>
      {renderError()}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    height: 56,
  },
  inputContainerError: {
    borderColor: theme.colors.error,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textPrimary,
  },
  eyeIcon: {
    padding: theme.spacing.xs,
  },
  errorText: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
  },
});

export default FormInput;
