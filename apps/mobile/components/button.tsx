import { Pressable, Text } from 'react-native';
import type { Theme } from './theme';

export type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
  /** Visual emphasis. `primary` is the filled brand action; `secondary` is outlined. */
  variant?: ButtonVariant;
  label: string;
  theme: Theme;
  onPress: () => void;
}

/**
 * Shared button primitive, mirroring @sudoku/ui's Button variants in native
 * form. `primary` is a filled brand button; `secondary` is outlined.
 */
export default function Button({ variant = 'primary', label, theme, onPress }: ButtonProps) {
  const primary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => ({
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        borderCurve: 'continuous',
        borderWidth: primary ? 0 : 1,
        borderColor: theme.line,
        backgroundColor: primary
          ? theme.primary
          : pressed
            ? theme.surface
            : 'transparent',
        opacity: primary && pressed ? 0.75 : 1,
      })}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
          color: primary ? theme.primaryFg : theme.ink,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
