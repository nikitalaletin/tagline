import React from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  'data-testid'?: string;
}

const fieldStyles = {
  root: 'flex flex-col w-full rounded-md border focus-within:border-[#217EF2] transition-colors text-left gap-1',
  rootBox: {
    height: '47px',
    padding: '7px 12px 8px 12px',
    background: 'rgba(255, 255, 255, 0.07)',
    borderColor: 'rgba(233, 236, 246, 0.07)',
  },
  label: 'text-[10px] text-gray-500 font-bold uppercase tracking-wider text-left leading-tight shrink-0',
  input: 'w-full bg-transparent border-none outline-none text-white text-sm text-left font-medium',
  inputStyle: { fontFamily: 'Onest, sans-serif', lineHeight: '16px' },
};

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  autoFocus,
  'data-testid': testId,
}) => (
  <div
    className={fieldStyles.root}
    style={fieldStyles.rootBox}
    data-testid={testId}
  >
    <label className={fieldStyles.label}>{label}</label>
    <input
      autoFocus={autoFocus}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={fieldStyles.input}
      style={fieldStyles.inputStyle}
      placeholder={placeholder}
    />
  </div>
);