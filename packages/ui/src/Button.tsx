import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. `primary` is the filled brand action; `secondary` is outlined. */
  variant?: ButtonVariant;
}

const BASE =
  'rounded-lg px-5 py-2 font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page';

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-fg hover:opacity-90',
  secondary: 'border border-line text-ink hover:bg-surface',
};

/**
 * Shared button primitive. Relies on the consuming app's semantic color tokens
 * (`primary`, `ink`, `line`, `surface`, `page`). Forwards all native button
 * props; `type` defaults to `button` to avoid accidental form submits.
 */
export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={[BASE, VARIANT[variant], className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}
