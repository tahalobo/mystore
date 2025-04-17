
/**
 * RTL utility functions to help with RTL support
 */

/**
 * Swaps left/right classes for RTL support
 * @param classes String of classes that might contain directional classes
 * @returns String with directional classes swapped if needed
 */
export const swapDirectionalClasses = (classes: string): string => {
  if (!classes) return '';
  
  // Create a mapping of classes to swap
  const swapMap: Record<string, string> = {
    'mr-': 'ml-',
    'ml-': 'mr-',
    'pr-': 'pl-',
    'pl-': 'pr-',
    'right-': 'left-',
    'left-': 'right-',
    'text-left': 'text-right',
    'text-right': 'text-left',
    'border-l-': 'border-r-',
    'border-r-': 'border-l-',
    'rounded-l-': 'rounded-r-',
    'rounded-r-': 'rounded-l-',
    'rounded-tl-': 'rounded-tr-',
    'rounded-tr-': 'rounded-tl-',
    'rounded-bl-': 'rounded-br-',
    'rounded-br-': 'rounded-bl-',
    'from-l-': 'from-r-',
    'from-r-': 'from-l-',
    'to-l-': 'to-r-',
    'to-r-': 'to-l-',
    'translate-x-': 'translate-x-negative-',
    'translate-x-negative-': 'translate-x-',
  };
  
  // Split the classes into an array
  const classArray = classes.split(' ');
  
  // Process each class
  const processedClasses = classArray.map(cls => {
    // Check for each directional class pattern
    for (const [prefix, replacement] of Object.entries(swapMap)) {
      if (cls.startsWith(prefix)) {
        // Extract the value part (e.g., '4' from 'ml-4')
        const value = cls.substring(prefix.length);
        
        // For translate-x with negative values, handle specially
        if (prefix === 'translate-x-' && value.startsWith('-')) {
          return `translate-x${value}`; // Already a negative, so make it positive
        } else if (prefix === 'translate-x-negative-') {
          return `-translate-x-${value}`; // Add the negative sign back
        }
        
        return `${replacement}${value}`;
      }
    }
    return cls;
  });
  
  return processedClasses.join(' ');
};

/**
 * Helper function to conditionally apply RTL-aware classes
 * @param isRTL Boolean indicating if RTL is enabled
 * @param ltrClasses Classes to use in LTR mode
 * @param rtlClasses Classes to use in RTL mode
 * @returns The appropriate class string based on direction
 */
export const rtlAwareClasses = (
  isRTL: boolean,
  ltrClasses: string,
  rtlClasses?: string
): string => {
  if (isRTL) {
    return rtlClasses || swapDirectionalClasses(ltrClasses);
  }
  return ltrClasses;
};
