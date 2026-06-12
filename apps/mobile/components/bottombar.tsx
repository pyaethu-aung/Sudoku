import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import type { Theme } from './theme';

interface BottomBarProps {
  theme: Theme;
  /** Wipe the board. */
  onClear: () => void;
  /** Run the solver. */
  onSolve: () => void;
}

// Real Apple Liquid Glass is available on iOS 26+. Resolve once: the value is
// fixed for the lifetime of the process, so there is no need to recompute it.
const GLASS = isLiquidGlassAvailable();

const BAR_HEIGHT = 50;

/**
 * The space a floating bar occupies at the bottom of the screen, so callers can
 * pad scroll content enough to clear it. Height + vertical padding; the home
 * indicator inset is added by the consumer from its own safe-area context.
 */
export const BOTTOM_BAR_HEIGHT = BAR_HEIGHT + 16;

function BarButton({
  theme,
  label,
  accessibilityLabel,
  primary,
  onPress,
}: {
  theme: Theme;
  label: string;
  accessibilityLabel: string;
  /** The emphasized action — tinted glass / filled fallback. */
  primary: boolean;
  onPress: () => void;
}) {
  const textColor = primary ? theme.primaryFg : theme.ink;

  const inner = (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => ({
        flex: 1,
        height: BAR_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        // Glass reacts to touch on its own (isInteractive); the fallback relies
        // on this opacity dip for press feedback.
        opacity: pressed && !GLASS ? 0.6 : 1,
      })}
    >
      <Text style={{ fontSize: 17, fontWeight: primary ? '600' : '500', color: textColor }}>
        {label}
      </Text>
    </Pressable>
  );

  if (GLASS) {
    return (
      <GlassView
        isInteractive
        glassEffectStyle="regular"
        tintColor={primary ? theme.primary : undefined}
        style={{ flex: 1, borderRadius: BAR_HEIGHT / 2, overflow: 'hidden' }}
      >
        {inner}
      </GlassView>
    );
  }

  // Solid fallback for Android and iOS < 26.
  return (
    <View
      style={{
        flex: 1,
        borderRadius: BAR_HEIGHT / 2,
        overflow: 'hidden',
        backgroundColor: primary ? theme.primary : theme.surface,
        borderWidth: primary ? 0 : 1,
        borderColor: theme.line,
      }}
    >
      {inner}
    </View>
  );
}

export default function BottomBar({ theme, onClear, onSolve }: BottomBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 16,
        paddingTop: 8,
        // Sit above the home indicator; fall back to a comfortable margin on
        // devices without a bottom inset.
        paddingBottom: insets.bottom > 0 ? insets.bottom : 12,
      }}
    >
      <BarButton
        theme={theme}
        label="Clear"
        accessibilityLabel="Clear the board"
        primary={false}
        onPress={onClear}
      />
      <BarButton
        theme={theme}
        label="Solve"
        accessibilityLabel="Solve the puzzle"
        primary
        onPress={onSolve}
      />
    </View>
  );
}
