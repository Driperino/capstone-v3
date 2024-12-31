'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';

interface TimezoneDropdownProps {
  currentTimezone: string;
  onTimezoneChange: (timezone: string) => void;
}

const TimezoneDropdown: React.FC<TimezoneDropdownProps> = ({
  currentTimezone,
  onTimezoneChange,
}) => {
  const [timezones, setTimezones] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the list of time zones from moment-timezone
    const availableTimezones = moment.tz.names();
    setTimezones(availableTimezones);
  }, []);

  if (timezones.length === 0) {
    return <p>Loading time zones...</p>;
  }

  return (
    <select
      value={currentTimezone}
      onChange={(e) => onTimezoneChange(e.target.value)}
      className="p-2 border rounded-md bg-input text-foreground"
    >
      {timezones.map((tz) => (
        <option key={tz} value={tz}>
          {tz}
        </option>
      ))}
    </select>
  );
};

export default TimezoneDropdown;
