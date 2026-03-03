import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/constants/theme';

const PrimaryButton = ({
  label = '',
  onPress = () => {},
  loading = false,
  disabled = false,
  showArrow = false,
}) => {
  const resolveButtonStyle = () => [
    styles.button,
    disabled || loading ? styles.buttonDisabled : null,
  ];

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={theme.colors.white} />;
    }
    return (
      <>
        <Text style={styles.label}>{label}</Text>
        {showArrow && (
          <Ionicons name="arrow-forward" size={18} color={theme.colors.white} style={styles.arrow} />
        )}
      </>
    );
  };

  return (
    <TouchableOpacity
      style={resolveButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    height: 56,
    paddingHorizontal: theme.spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  label: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.white,
  },
  arrow: {
    marginLeft: theme.spacing.sm,
  },
});

export default PrimaryButton;