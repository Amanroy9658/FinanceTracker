import { useState, useCallback } from 'react';

interface ValidationSchema {
  [key: string]: (value: any, formValues: any) => string | null;
}

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema: ValidationSchema,
  onSubmit: (values: T) => void
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validate = useCallback((name: keyof T, value: any, currentValues: T) => {
    if (validationSchema[name as string]) {
      const error = validationSchema[name as string](value, currentValues);
      setErrors(prev => ({ ...prev, [name]: error }));
      return error;
    }
    return null;
  }, [validationSchema]);

  const handleChange = useCallback((name: keyof T, value: any) => {
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    if (touched[name]) {
      validate(name, value, nextValues);
    }
  }, [values, touched, validate]);

  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validate(name, values[name], values);
  }, [values, validate]);

  const handleSubmit = useCallback(() => {
    const newErrors: any = {};
    let hasErrors = false;

    Object.keys(validationSchema).forEach(key => {
      const error = validationSchema[key](values[key], values);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (!hasErrors) {
      onSubmit(values);
    }
  }, [values, validationSchema, onSubmit]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  };
};
