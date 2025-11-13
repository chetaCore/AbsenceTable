import React, { useState } from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';
import { Period } from '../../api/types/types';

export function usePeriod() {
  const [period, setPeriod] = useState<Period>({
    startDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
    endDate: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  return { period, setPeriod };
}
