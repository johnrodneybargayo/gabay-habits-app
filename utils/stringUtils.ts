/**
 * Capitalize the first letter of a string
 * @param str - The input string
 * @returns The string with the first letter capitalized
 */
export const capitalizeFirstLetter = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  /**
   * Truncate a string to a specified length and append ellipsis if needed
   * @param str - The input string
   * @param maxLength - The maximum allowed length of the string
   * @returns The truncated string
   */
  export const truncateString = (str: string, maxLength: number): string => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
  };
  
  /**
   * Convert a string to title case
   * @param str - The input string
   * @returns The string in title case
   */
  export const toTitleCase = (str: string): string => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  /**
   * Check if a string contains only alphabets
   * @param str - The input string
   * @returns Boolean indicating whether the string is alphabetic
   */
  export const isAlphabetic = (str: string): boolean => {
    return /^[A-Za-z]+$/.test(str);
  };
  
  /**
   * Generate a slug from a string (e.g., for URLs)
   * @param str - The input string
   * @returns The slugified string
   */
  export const generateSlug = (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, ''); // Remove trailing and leading hyphens
  };
  