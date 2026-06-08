import { Pressable, Text, View } from 'react-native';
import type { Theme } from './theme';

interface KeypadProps {
  /** Place a digit (1-9) in the selected cell. */
  onInput: (value: number) => void;
  /** Clear the selected cell. */
  onErase: () => void;
  /** No cell is selected, so there is nothing to write to. */
  disabled: boolean;
  /** Width of the keypad block (matches the board edge). */
  width: number;
  theme: Theme;
}

const GAP = 6;
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export default function Keypad({ onInput, onErase, disabled, width, theme }: KeypadProps) {
  // Five columns, two rows (9 digits + erase), mirroring the web grid-cols-5.
  const keyWidth = (width - GAP * 4) / 5;

  return (
    <View
      accessibilityRole="toolbar"
      accessibilityLabel="Number pad"
      style={{ width, flexDirection: 'row', flexWrap: 'wrap', gap: GAP }}
    >
      {DIGITS.map((digit) => (
        <Key
          key={digit}
          label={String(digit)}
          width={keyWidth}
          disabled={disabled}
          theme={theme}
          onPress={() => onInput(digit)}
        />
      ))}
      <Key
        label="⌫"
        accessibilityLabel="Erase cell"
        width={keyWidth}
        disabled={disabled}
        theme={theme}
        onPress={onErase}
      />
    </View>
  );
}

interface KeyProps {
  label: string;
  accessibilityLabel?: string;
  width: number;
  disabled: boolean;
  theme: Theme;
  onPress: () => void;
}

function Key({ label, accessibilityLabel, width, disabled, theme, onPress }: KeyProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      style={({ pressed }) => ({
        width,
        minHeight: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: theme.line,
        backgroundColor: pressed ? theme.related : theme.bg,
        opacity: disabled ? 0.4 : 1,
      })}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: '600',
          fontVariant: ['tabular-nums'],
          color: theme.ink,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
