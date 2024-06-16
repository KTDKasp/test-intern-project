export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  forId: string;
  labelText: string;
  placeholder: string;
  type: string;
  icon?: React.ReactNode
}