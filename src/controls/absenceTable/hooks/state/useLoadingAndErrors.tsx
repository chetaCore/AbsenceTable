import React, { useState, useCallback } from 'react';

export function useLoadingAndErrors() {
  const [loadingCount, setLoadingCount] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const handleLoadingChange = useCallback((isLoading: boolean) => {
    setLoadingCount((count) => count + (isLoading ? 1 : -1));
  }, []);

  const handleError = useCallback((error: string) => {
    setErrors((prev) => [...prev, error]);
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const isLoading = loadingCount > 0;

  return { isLoading, errors, handleLoadingChange, handleError, clearErrors };
}
