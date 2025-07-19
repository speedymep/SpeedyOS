import { IComponentDefinition, ComponentType, IEventHandler, IDataBinding, IVisibilityCondition } from './types';

/**
 * Component class for defining UI components
 */
export class Component implements IComponentDefinition {
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

  constructor(definition: IComponentDefinition) {
    this.id = definition.id;
    this.type = definition.type;
    this.name = definition.name;
    this.label = definition.label;
    this.props = definition.props || {};
    this.children = definition.children || [];
    this.events = definition.events || [];
    this.styles = definition.styles || {};
    this.dataBinding = definition.dataBinding;
    this.visibility = definition.visibility;
  }

  /**
   * Add a child component
   */
  addChild(child: IComponentDefinition): Component {
    if (!this.children) {
      this.children = [];
    }
    this.children.push(child);
    return this;
  }

  /**
   * Add an event handler
   */
  addEvent(event: IEventHandler): Component {
    if (!this.events) {
      this.events = [];
    }
    this.events.push(event);
    return this;
  }

  /**
   * Set data binding
   */
  setDataBinding(binding: IDataBinding): Component {
    this.dataBinding = binding;
    return this;
  }

  /**
   * Set visibility condition
   */
  setVisibility(condition: IVisibilityCondition): Component {
    this.visibility = condition;
    return this;
  }

  /**
   * Set styles
   */
  setStyles(styles: Record<string, any>): Component {
    this.styles = { ...this.styles, ...styles };
    return this;
  }

  /**
   * Set props
   */
  setProps(props: Record<string, any>): Component {
    this.props = { ...this.props, ...props };
    return this;
  }

  /**
   * Convert component to a plain object
   */
  toJSON(): IComponentDefinition {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      label: this.label,
      props: this.props,
      children: this.children,
      events: this.events,
      styles: this.styles,
      dataBinding: this.dataBinding,
      visibility: this.visibility,
    };
  }

  /**
   * Create a component from a plain object
   */
  static fromJSON(json: IComponentDefinition): Component {
    return new Component(json);
  }

  /**
   * Create a text component
   */
  static text(id: string, text: string, options?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.TEXT,
      props: { text },
      ...options,
    });
  }

  /**
   * Create a button component
   */
  static button(id: string, label: string, options?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.BUTTON,
      label,
      ...options,
    });
  }

  /**
   * Create an input component
   */
  static input(id: string, label: string, options?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.INPUT,
      label,
      ...options,
    });
  }

  /**
   * Create a textarea component
   */
  static textarea(id: string, label: string, options?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.TEXTAREA,
      label,
      ...options,
    });
  }

  /**
   * Create a select component
   */
  static select(id: string, label: string, options: { value: string; label: string }[], componentOptions?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.SELECT,
      label,
      props: { options },
      ...componentOptions,
    });
  }

  /**
   * Create a checkbox component
   */
  static checkbox(id: string, label: string, options?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.CHECKBOX,
      label,
      ...options,
    });
  }

  /**
   * Create a radio component
   */
  static radio(id: string, label: string, options: { value: string; label: string }[], componentOptions?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.RADIO,
      label,
      props: { options },
      ...componentOptions,
    });
  }

  /**
   * Create a date component
   */
  static date(id: string, label: string, options?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.DATE,
      label,
      ...options,
    });
  }

  /**
   * Create a table component
   */
  static table(id: string, columns: { key: string; title: string }[], options?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.TABLE,
      props: { columns },
      ...options,
    });
  }

  /**
   * Create a form component
   */
  static form(id: string, children: IComponentDefinition[], options?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.FORM,
      children,
      ...options,
    });
  }

  /**
   * Create a container component
   */
  static container(id: string, children: IComponentDefinition[], options?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.CONTAINER,
      children,
      ...options,
    });
  }

  /**
   * Create a card component
   */
  static card(id: string, title: string, children: IComponentDefinition[], options?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.CARD,
      props: { title },
      children,
      ...options,
    });
  }

  /**
   * Create a tabs component
   */
  static tabs(id: string, tabs: { key: string; title: string; content: IComponentDefinition[] }[], options?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.TABS,
      props: { tabs },
      ...options,
    });
  }

  /**
   * Create a chart component
   */
  static chart(id: string, chartType: string, data: any, options?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.CHART,
      props: { chartType, data },
      ...options,
    });
  }

  /**
   * Create a custom component
   */
  static custom(id: string, componentType: string, props?: Record<string, any>, options?: Partial<IComponentDefinition>): Component {
    return new Component({
      id,
      type: ComponentType.CUSTOM,
      props: { componentType, ...props },
      ...options,
    });
  }
}