import { ReactNode } from 'react';

/**
 * Component type enum
 */
export enum ComponentType {
  TEXT = 'text',
  BUTTON = 'button',
  INPUT = 'input',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  DATE = 'date',
  TIME = 'time',
  DATETIME = 'datetime',
  FILE = 'file',
  IMAGE = 'image',
  TABLE = 'table',
  LIST = 'list',
  CARD = 'card',
  CONTAINER = 'container',
  TABS = 'tabs',
  ACCORDION = 'accordion',
  MODAL = 'modal',
  FORM = 'form',
  CHART = 'chart',
  MAP = 'map',
  CUSTOM = 'custom',
}

/**
 * Layout type enum
 */
export enum LayoutType {
  GRID = 'grid',
  FLEX = 'flex',
  FIXED = 'fixed',
  RESPONSIVE = 'responsive',
}

/**
 * Component definition interface
 */
export interface IComponentDefinition {
  id: string;
  type: ComponentType;
  name?: string;
  label?: string;
  props?: Record<string, any>;
  children?: IComponentDefinition[];
  events?: IEventHandler[];
  styles?: Record<string, any>;
  dataBinding?: IDataBinding;
  visibility?: IVisibilityCondition;
}

/**
 * Event handler interface
 */
export interface IEventHandler {
  event: string;
  action: string;
  params?: Record<string, any>;
}

/**
 * Data binding interface
 */
export interface IDataBinding {
  source: string;
  path?: string;
  transform?: string;
}

/**
 * Visibility condition interface
 */
export interface IVisibilityCondition {
  condition: string;
  value?: any;
}

/**
 * Layout definition interface
 */
export interface ILayoutDefinition {
  id: string;
  type: LayoutType;
  name?: string;
  props?: Record<string, any>;
  areas?: ILayoutArea[];
  styles?: Record<string, any>;
}

/**
 * Layout area interface
 */
export interface ILayoutArea {
  id: string;
  name: string;
  components?: IComponentDefinition[];
  styles?: Record<string, any>;
}

/**
 * Page definition interface
 */
export interface IPageDefinition {
  id: string;
  name: string;
  title?: string;
  description?: string;
  layout: ILayoutDefinition;
  route?: string;
  meta?: Record<string, any>;
}

/**
 * Theme definition interface
 */
export interface IThemeDefinition {
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
}

/**
 * UI builder context interface
 */
export interface IUIBuilderContext {
  components: Map<string, IComponentDefinition>;
  layouts: Map<string, ILayoutDefinition>;
  pages: Map<string, IPageDefinition>;
  theme: IThemeDefinition;
  registerComponent: (component: IComponentDefinition) => void;
  registerLayout: (layout: ILayoutDefinition) => void;
  registerPage: (page: IPageDefinition) => void;
  setTheme: (theme: IThemeDefinition) => void;
  getComponent: (id: string) => IComponentDefinition | undefined;
  getLayout: (id: string) => ILayoutDefinition | undefined;
  getPage: (id: string) => IPageDefinition | undefined;
}

/**
 * Component renderer interface
 */
export interface IComponentRenderer {
  render: (component: IComponentDefinition, context: any) => ReactNode;
}

/**
 * Layout renderer interface
 */
export interface ILayoutRenderer {
  render: (layout: ILayoutDefinition, context: any) => ReactNode;
}

/**
 * Page renderer interface
 */
export interface IPageRenderer {
  render: (page: IPageDefinition, context: any) => ReactNode;
}