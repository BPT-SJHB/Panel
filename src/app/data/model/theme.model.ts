// Primitive tokens represent basic color values without context
interface PrimitiveTokens {
  [key: string]: string;
}

// Semantic tokens provide contextual meaning to primitive tokens
interface SemanticTokens {
  primary?: {
    [shade: number]: string;
  };
  colorScheme?: {
    light?: ColorScheme;
    dark?: ColorScheme;
  };
  [key: string]: any;
}

// Defines the structure for color schemes
interface ColorScheme {
  primary?: {
    color?: string;
    inverseColor?: string;
    hoverColor?: string;
    activeColor?: string;
  };
  highlight?: {
    background?: string;
    focusBackground?: string;
    color?: string;
    focusColor?: string;
  };
  [key: string]: any;
}

// Component tokens allow customization at the component level
interface ComponentTokens {
  [componentName: string]: {
    [property: string]: string;
  };
}

// The complete theme preset combining all token types
export interface ThemePreset {
  name?: string;
  primitives?: PrimitiveTokens;
  semantic?: SemanticTokens;
  components?: ComponentTokens;
}
