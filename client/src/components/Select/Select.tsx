import ReactSelect, { Props as ReactSelectProps } from 'react-select';

export interface SelectOption {
  value: string | number | boolean;
  label: string;
}

export interface SelectProps extends ReactSelectProps {
  children?: React.ReactNode;
}

const Select = (props: SelectProps) => {
  return (
    <ReactSelect
      className="select"
      classNamePrefix="custom-select"
      {...props}
    />
  )
}

export default Select;
