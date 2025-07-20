import { ILayoutDefinition, LayoutType, ILayoutArea, IComponentDefinition } from './types';

/**
 * Layout class for defining UI layouts
 */
export class Layout implements ILayoutDefinition {
  id: string;
  type: LayoutType;
  name?: string;
  props?: Record<string, any>;
  areas?: ILayoutArea[];
  styles?: Record<string, any>;

  constructor(definition: ILayoutDefinition) {
    this.id = definition.id;
    this.type = definition.type;
    this.name = definition.name;
    this.props = definition.props || {};
    this.areas = definition.areas || [];
    this.styles = definition.styles || {};
  }

  /**
   * Add a layout area
   */
  addArea(area: ILayoutArea): Layout {
    if (!this.areas) {
      this.areas = [];
    }
    this.areas.push(area);
    return this;
  }

  /**
   * Get a layout area by ID
   */
  getArea(id: string): ILayoutArea | undefined {
    return this.areas?.find(area => area.id === id);
  }

  /**
   * Get a layout area by name
   */
  getAreaByName(name: string): ILayoutArea | undefined {
    return this.areas?.find(area => area.name === name);
  }

  /**
   * Add a component to a layout area
   */
  addComponentToArea(areaId: string, component: IComponentDefinition): Layout {
    const area = this.getArea(areaId);
    if (!area) {
      throw new Error(`Layout area with ID ${areaId} not found`);
    }

    if (!area.components) {
      area.components = [];
    }

    area.components.push(component);
    return this;
  }

  /**
   * Set styles for the layout
   */
  setStyles(styles: Record<string, any>): Layout {
    this.styles = { ...this.styles, ...styles };
    return this;
  }

  /**
   * Set props for the layout
   */
  setProps(props: Record<string, any>): Layout {
    this.props = { ...this.props, ...props };
    return this;
  }

  /**
   * Convert layout to a plain object
   */
  toJSON(): ILayoutDefinition {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      props: this.props,
      areas: this.areas,
      styles: this.styles,
    };
  }

  /**
   * Create a layout from a plain object
   */
  static fromJSON(json: ILayoutDefinition): Layout {
    return new Layout(json);
  }

  /**
   * Create a grid layout
   */
  static grid(id: string, rows: number, columns: number, options?: Partial<ILayoutDefinition>): Layout {
    const areas: ILayoutArea[] = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const areaId = `${id}-area-${row}-${col}`;
        areas.push({
          id: areaId,
          name: `Area ${row}-${col}`,
          components: [],
          styles: {
            gridRow: `${row + 1}`,
            gridColumn: `${col + 1}`,
          },
        });
      }
    }

    return new Layout({
      id,
      type: LayoutType.GRID,
      props: { rows, columns },
      areas,
      styles: {
        display: 'grid',
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '1rem',
      },
      ...options,
    });
  }

  /**
   * Create a flex layout
   */
  static flex(id: string, direction: 'row' | 'column', options?: Partial<ILayoutDefinition>): Layout {
    return new Layout({
      id,
      type: LayoutType.FLEX,
      props: { direction },
      areas: [
        {
          id: `${id}-area`,
          name: 'Main Area',
          components: [],
        },
      ],
      styles: {
        display: 'flex',
        flexDirection: direction,
        gap: '1rem',
      },
      ...options,
    });
  }

  /**
   * Create a responsive layout
   */
  static responsive(id: string, breakpoints: Record<string, any>, options?: Partial<ILayoutDefinition>): Layout {
    return new Layout({
      id,
      type: LayoutType.RESPONSIVE,
      props: { breakpoints },
      areas: [
        {
          id: `${id}-area`,
          name: 'Main Area',
          components: [],
        },
      ],
      ...options,
    });
  }

  /**
   * Create a fixed layout
   */
  static fixed(id: string, width: string, height: string, options?: Partial<ILayoutDefinition>): Layout {
    return new Layout({
      id,
      type: LayoutType.FIXED,
      props: { width, height },
      areas: [
        {
          id: `${id}-area`,
          name: 'Main Area',
          components: [],
        },
      ],
      styles: {
        width,
        height,
        position: 'relative',
      },
      ...options,
    });
  }
}