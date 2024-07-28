import React, {useEffect, useState} from "react";
import {Input, InputProps} from "@mantine/core";

export type DebouncedInputProps = InputProps & {
  onChange: (value: string) => void;
  initialValue?: string;
  delay?: number;
  placeholder?: string;
  className?: string;
  value?: string;
}

const DebouncedInput: React.FC<DebouncedInputProps> = (props) => {
  const {
    onChange,
    initialValue = "",
    delay = 300,
    placeholder,
    className,
    ...rest
  } = props;

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, [debounceTimeout]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      onChange(newValue);
    }, delay);

    setDebounceTimeout(timeout);
  };

  return (
    <Input
      value={props.value}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      {...rest}
    />
  );
};

export default DebouncedInput;
