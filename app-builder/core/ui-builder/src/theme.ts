import { IThemeDefinition } from './types';

/**
 * Theme class for defining UI themes
 */
export class Theme implements IThemeDefinition {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    error: string;
    text: {
      primary: string;
      secondary: string;
    };
    [key: string]: any;
  };
  typography: {
    fontFamily: string;
    fontSize: Record<string, string>;
    fontWeight: Record<string, number>;
    lineHeight: Record<string, string>;
    [key: string]: any;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  breakpoints: Record<string, string>;
  [key: string]: any;

  constructor(definition: IThemeDefinition) {
    this.id = definition.id;
    this.name = definition.name;
    this.colors = definition.colors;
    this.typography = definition.typography;
    this.spacing = definition.spacing;
    this.borderRadius = definition.borderRadius;
    this.shadows = definition.shadows;
    this.breakpoints = definition.breakpoints;

    // Copy any additional properties
    Object.keys(definition).forEach(key => {
      if (!['id', 'name', 'colors', 'typography', 'spacing', 'borderRadius', 'shadows', 'breakpoints'].includes(key)) {
        this[key] = definition[key];
      }
    });
  }

  /**
   * Set a color value
   */
  setColor(key: string, value: string): Theme {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!this.colors[parent]) {
        this.colors[parent] = {};
      }
      this.colors[parent][child] = value;
    } else {
      this.colors[key] = value;
    }
    return this;
  }

  /**
   * Set a typography value
   */
  setTypography(key: string, value: any): Theme {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!this.typography[parent]) {
        this.typography[parent] = {};
      }
      this.typography[parent][child] = value;
    } else {
      this.typography[key] = value;
    }
    return this;
  }

  /**
   * Set a spacing value
   */
  setSpacing(key: string, value: string): Theme {
    this.spacing[key] = value;
    return this;
  }

  /**
   * Set a border radius value
   */
  setBorderRadius(key: string, value: string): Theme {
    this.borderRadius[key] = value;
    return this;
  }

  /**
   * Set a shadow value
   */
  setShadow(key: string, value: string): Theme {
    this.shadows[key] = value;
    return this;
  }

  /**
   * Set a breakpoint value
   */
  setBreakpoint(key: string, value: string): Theme {
    this.breakpoints[key] = value;
    return this;
  }

  /**
   * Convert theme to a plain object
   */
  toJSON(): IThemeDefinition {
    return {
      id: this.id,
      name: this.name,
      colors: this.colors,
      typography: this.typography,
      spacing: this.spacing,
      borderRadius: this.borderRadius,
      shadows: this.shadows,
      breakpoints: this.breakpoints,
      ...Object.keys(this)
        .filter(key => !['id', 'name', 'colors', 'typography', 'spacing', 'borderRadius', 'shadows', 'breakpoints'].includes(key))
        .reduce((obj, key) => {
          obj[key] = this[key];
          return obj;
        }, {} as Record<string, any>),
    };
  }

  /**
   * Create a theme from a plain object
   */
  static fromJSON(json: IThemeDefinition): Theme {
    return new Theme(json);
  }

  /**
   * Create a default light theme
   */
  static light(id: string, name: string = 'Light Theme'): Theme {
    return new Theme({
      id,
      name,
      colors: {
        primary: '#1976d2',
        secondary: '#dc004e',
        background: '#f5f5f5',
        surface: '#ffffff',
        error: '#f44336',
        text: {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          md: '1rem',
          lg: '1.25rem',
          xl: '1.5rem',
        },
        fontWeight: {
          light: 300,
          regular: 400,
          medium: 500,
          bold: 700,
        },
        lineHeight: {
          xs: '1',
          sm: '1.25',
          md: '1.5',
          lg: '1.75',
          xl: '2',
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
      borderRadius: {
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '2rem',
      },
      shadows: {
        none: 'none',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      breakpoints: {
        xs: '0px',
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1920px',
      },
    });
  }

  /**
   * Create a default dark theme
   */
  static dark(id: string, name: string = 'Dark Theme'): Theme {
    return new Theme({
      id,
      name,
      colors: {
        primary: '#90caf9',
        secondary: '#f48fb1',
        background: '#121212',
        surface: '#1e1e1e',
        error: '#f44336',
        text: {
          primary: 'rgba(255, 255, 255, 0.87)',
          secondary: 'rgba(255, 255, 255, 0.6)',
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          md: '1rem',
          lg: '1.25rem',
          xl: '1.5rem',
        },
        fontWeight: {
          light: 300,
          regular: 400,
          medium: 500,
          bold: 700,
        },
        lineHeight: {
          xs: '1',
          sm: '1.25',
          md: '1.5',
          lg: '1.75',
          xl: '2',
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
      borderRadius: {
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '2rem',
      },
      shadows: {
        none: 'none',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      breakpoints: {
        xs: '0px',
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1920px',
      },
    });
  }

  /**
   * Create a custom theme
   */
  static custom(id: string, name: string, primaryColor: string, secondaryColor: string): Theme {
    return new Theme({
      id,
      name,
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        background: '#f5f5f5',
        surface: '#ffffff',
        error: '#f44336',
        text: {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          md: '1rem',
          lg: '1.25rem',
          xl: '1.5rem',
        },
        fontWeight: {
          light: 300,
          regular: 400,
          medium: 500,
          bold: 700,
        },
        lineHeight: {
          xs: '1',
          sm: '1.25',
          md: '1.5',
          lg: '1.75',
          xl: '2',
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
      borderRadius: {
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '2rem',
      },
      shadows: {
        none: 'none',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      breakpoints: {
        xs: '0px',
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1920px',
      },
    });
  }
}