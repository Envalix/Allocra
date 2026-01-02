/**
 * Hooks Index
 *
 * Export all custom React hooks.
 */

// Storage
export { default as useLocalStorage } from './useLocalStorage';

// Debouncing
export { default as useDebounce, useDebouncedCallback } from './useDebounce';

// Responsive Design
export {
  default as useMediaQuery,
  useBreakpoint,
  useCurrentBreakpoint,
  useIsMobile,
  usePrefersReducedMotion,
  usePrefersDarkMode,
} from './useMediaQuery';

// Data Fetching
export { default as useFetch, useMutation } from './useFetch';
