import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/constants/theme';

const ActionButton = React.memo(({
  label = '',
  icon = '',
  color = theme.colors.primary,
  onPress = () => {},
  disabled = false,
}) => {
  const resolvedColor = disabled ? theme.colors.textMuted : color;
  const resolvedBorderColor = disabled ? theme.colors.border : color;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[
        styles.button,
        { borderColor: resolvedBorderColor },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon ? (
        <Ionicons name={icon} size={16} color={resolvedColor} />
      ) : null}

      <Text style={[styles.label, { color: resolvedColor }]}>{label}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontSize: theme.typography.fontSizeSM,
    fontWeight: theme.typography.fontWeightSemiBold,
  },
});

export default ActionButton;