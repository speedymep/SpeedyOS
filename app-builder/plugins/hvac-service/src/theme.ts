import { Theme } from '@speedyos/ui-builder';

/**
 * HVAC Service Theme
 */
export const HVACServiceTheme = new Theme({
  id: 'hvac-service-theme',
  name: 'HVAC Service Theme',
  colors: {
    primary: '#00B2FF',
    secondary: '#00E676',
    success: '#00E676',
    danger: '#FF3D00',
    warning: '#FFA000',
    info: '#00B2FF',
    light: '#B0BEC5',
    dark: '#121926',
    background: {
      primary: '#121926',
      secondary: '#1E2A3A',
      tertiary: '#263238',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
      tertiary: '#607D8B',
    },
    border: {
      primary: '#1E2A3A',
      secondary: '#263238',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      base: '16px',
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
      xlarge: '1.5rem',
      xxlarge: '2rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700',
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      loose: '1.8',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  },
  components: {
    button: {
      borderRadius: '0.5rem',
      padding: '0.75rem 1rem',
      fontWeight: '700',
      variants: {
        primary: {
          backgroundColor: '#00B2FF',
          color: '#FFFFFF',
          hoverBackgroundColor: '#0091CC',
        },
        secondary: {
          backgroundColor: '#00E676',
          color: '#000000',
          hoverBackgroundColor: '#00C853',
        },
        danger: {
          backgroundColor: '#FF3D00',
          color: '#FFFFFF',
          hoverBackgroundColor: '#DD2C00',
        },
      },
    },
    card: {
      backgroundColor: '#1E2A3A',
      borderRadius: '0.5rem',
      padding: '1rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    input: {
      backgroundColor: '#1E2A3A',
      borderColor: '#263238',
      borderRadius: '0.5rem',
      padding: '0.75rem',
      color: '#FFFFFF',
      placeholderColor: '#607D8B',
      focusBorderColor: '#00B2FF',
    },
    select: {
      backgroundColor: '#1E2A3A',
      borderColor: '#263238',
      borderRadius: '0.5rem',
      padding: '0.75rem',
      color: '#FFFFFF',
      placeholderColor: '#607D8B',
      focusBorderColor: '#00B2FF',
      optionBackgroundColor: '#1E2A3A',
      optionHoverBackgroundColor: '#263238',
    },
    table: {
      headerBackgroundColor: '#1E2A3A',
      headerTextColor: '#FFFFFF',
      rowBackgroundColor: '#121926',
      rowHoverBackgroundColor: '#1E2A3A',
      rowTextColor: '#B0BEC5',
      borderColor: '#263238',
    },
    badge: {
      borderRadius: '1rem',
      padding: '0.25rem 0.5rem',
      fontSize: '0.75rem',
      fontWeight: '700',
      variants: {
        primary: {
          backgroundColor: '#00B2FF',
          color: '#FFFFFF',
        },
        secondary: {
          backgroundColor: '#00E676',
          color: '#000000',
        },
        danger: {
          backgroundColor: '#FF3D00',
          color: '#FFFFFF',
        },
        warning: {
          backgroundColor: '#FFA000',
          color: '#FFFFFF',
        },
      },
    },
  },
});