/**
 * Get conditional styles based on a condition 
 */
export function conditionalStyles(condition: boolean, trueStyles: string, falseStyles: string): string {
  return condition ? trueStyles : falseStyles;
}

/**
 * Get a gradient text style
 */
export function getGradientTextStyle(): string {
  return "bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent";
}

/**
 * Get button styles based on state
 */
export function getButtonStateStyles(enabled: boolean, maxed = false): string {
  if (maxed) {
    return "bg-green-600 hover:bg-green-700";
  }
  
  return enabled 
    ? "bg-primary/90 hover:bg-primary/80" 
    : "bg-muted/10 hover:bg-muted/20";
}

/**
 * Get container background based on active state
 */
export function getContainerBackground(active: boolean): string {
  return active
    ? "bg-gradient-to-r from-card to-muted/30 hover:from-muted/40 hover:to-muted/50"
    : "bg-muted/10";
} 