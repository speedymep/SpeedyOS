import { IPageDefinition, ILayoutDefinition, IComponentDefinition } from './types';
import { Layout } from './layout';

/**
 * Page class for defining UI pages
 */
export class Page implements IPageDefinition {
  id: string;
  name: string;
  title?: string;
  description?: string;
  layout: ILayoutDefinition;
  route?: string;
  meta?: Record<string, any>;

  constructor(definition: IPageDefinition) {
    this.id = definition.id;
    this.name = definition.name;
    this.title = definition.title || definition.name;
    this.description = definition.description;
    this.layout = definition.layout;
    this.route = definition.route;
    this.meta = definition.meta || {};
  }

  /**
   * Set the page title
   */
  setTitle(title: string): Page {
    this.title = title;
    return this;
  }

  /**
   * Set the page description
   */
  setDescription(description: string): Page {
    this.description = description;
    return this;
  }

  /**
   * Set the page route
   */
  setRoute(route: string): Page {
    this.route = route;
    return this;
  }

  /**
   * Set page metadata
   */
  setMeta(meta: Record<string, any>): Page {
    this.meta = { ...this.meta, ...meta };
    return this;
  }

  /**
   * Add a component to a layout area
   */
  addComponent(areaId: string, component: IComponentDefinition): Page {
    if (this.layout instanceof Layout) {
      this.layout.addComponentToArea(areaId, component);
    } else {
      const layout = Layout.fromJSON(this.layout);
      layout.addComponentToArea(areaId, component);
      this.layout = layout;
    }
    return this;
  }

  /**
   * Convert page to a plain object
   */
  toJSON(): IPageDefinition {
    return {
      id: this.id,
      name: this.name,
      title: this.title,
      description: this.description,
      layout: this.layout instanceof Layout ? this.layout.toJSON() : this.layout,
      route: this.route,
      meta: this.meta,
    };
  }

  /**
   * Create a page from a plain object
   */
  static fromJSON(json: IPageDefinition): Page {
    return new Page({
      ...json,
      layout: json.layout instanceof Layout ? json.layout : Layout.fromJSON(json.layout),
    });
  }

  /**
   * Create a simple page with a grid layout
   */
  static simple(id: string, name: string, rows: number = 1, columns: number = 1): Page {
    const layout = Layout.grid(`${id}-layout`, rows, columns);
    
    return new Page({
      id,
      name,
      title: name,
      layout,
    });
  }

  /**
   * Create a dashboard page
   */
  static dashboard(id: string, name: string): Page {
    const layout = Layout.grid(`${id}-layout`, 3, 4);
    
    return new Page({
      id,
      name,
      title: `${name} Dashboard`,
      layout,
      meta: {
        icon: 'dashboard',
        category: 'dashboard',
      },
    });
  }

  /**
   * Create a form page
   */
  static form(id: string, name: string): Page {
    const layout = Layout.flex(`${id}-layout`, 'column');
    
    return new Page({
      id,
      name,
      title: name,
      layout,
      meta: {
        icon: 'form',
        category: 'form',
      },
    });
  }

  /**
   * Create a list page
   */
  static list(id: string, name: string): Page {
    const layout = Layout.flex(`${id}-layout`, 'column');
    
    return new Page({
      id,
      name,
      title: `${name} List`,
      layout,
      meta: {
        icon: 'list',
        category: 'list',
      },
    });
  }

  /**
   * Create a detail page
   */
  static detail(id: string, name: string): Page {
    const layout = Layout.grid(`${id}-layout`, 2, 2);
    
    return new Page({
      id,
      name,
      title: `${name} Detail`,
      layout,
      meta: {
        icon: 'file',
        category: 'detail',
      },
    });
  }
}