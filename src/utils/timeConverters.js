export function convertToAmPm(dateTimeString) {
  if (!dateTimeString) return 'Time unavailable';
  
  try {
    // If the time already includes AM/PM, just remove leading zeros
    if (dateTimeString.includes('AM') || dateTimeString.includes('PM')) {
      // Remove leading zero from hours
      return dateTimeString.replace(/^0/, '');
    }

    // Original conversion logic for 24-hour format
    const timePart = dateTimeString.includes(' ') 
      ? dateTimeString.split(' ')[1] 
      : dateTimeString;
    
    let [hours, minutes] = timePart.split(':').map(Number);
    
    // Validate the parsed values
    if (isNaN(hours) || isNaN(minutes)) {
      throw new Error('Invalid time format');
    }
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutes} ${ampm}`;
  } catch (error) {
    console.error('Time conversion error:', error, 'for input:', dateTimeString);
    return 'Invalid time';
  }
}

export function removeLeadingZero(timeString) {
  if (timeString && timeString.startsWith('0')) {
    return timeString.slice(1);
  }
  return timeString;
}
  
  