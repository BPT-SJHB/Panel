import {
  Component,
  EventEmitter,
  input,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

export type ButtonSeverity =
  | 'primary'
  | 'green'
  | 'info'
  | 'danger'
  | 'secondary'
  | 'warn';

interface ButtonStyle {
  colors: {
    [key: string]: {
      gradient: string;
      shadow: {
        normal: string;
        sync: string;
      };
    };
  };
  animation: string;
  size?: {
    small: string;
    large: string;
  };
}

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input() severity: ButtonSeverity = 'green';
  @Input() syncShadow = true;
  @Input() shadow = true;
  @Input() label = '';
  @Input() disabled = false;
  @Input() size: 'small' | 'large' | 'normal' = 'normal';
  @Input() type?: 'button' | 'submit';
  @Input() icon?: string;
  @Input() styleClass = '';
  @Input() rounded = false;
  @Input() raised = false;

  @Output() onClick = new EventEmitter<void>();

  private readonly baseClass =
    'rounded-[9999px] border-0 text-primary-contrast';
  class = signal(this.baseClass);
  style: ButtonStyle = {
    colors: {
      primary: {
        gradient:
          'bg-gradient-to-b dark:from-primary-400 dark:to-primary-800 from-primary-400 to-primary-800 to-75%',
        shadow: {
          normal: 'shadow-[0px_4px_8px_var(--p-surface-500)]',
          sync: 'dark:shadow-[0px_4px_8px_theme(colors.primary.800)] shadow-[0px_4px_8px_theme(colors.primary.800)]',
        },
      },
      green: {
        gradient:
          'bg-gradient-to-b dark:from-teal-200 dark:to-emerald-500 from-teal-500 to-emerald-700 to-75%',
        shadow: {
          normal: 'shadow-[0px_4px_8px_var(--p-surface-500)]',
          sync: 'dark:shadow-[0px_4px_8px_theme(colors.emerald.500)] shadow-[0px_4px_8px_theme(colors.emerald.700)]',
        },
      },
      info: {
        gradient: 'bg-gradient-to-b from-blue-400 to-blue-700 to-75%',
        shadow: {
          normal: 'shadow-[0px_4px_8px_var(--p-surface-500)]',
          sync: 'dark:shadow-[0px_4px_8px_theme(colors.blue.500)] shadow-[0px_4px_8px_theme(colors.blue.700)]',
        },
      },
      danger: {
        gradient: 'bg-gradient-to-b from-red-400 to-red-700 to-75%',
        shadow: {
          normal: 'shadow-[0px_4px_8px_var(--p-surface-500)]',
          sync: 'dark:shadow-[0px_4px_8px_theme(colors.red.500)] shadow-[0px_4px_8px_theme(colors.red.700)]',
        },
      },
      warn: {
        gradient: 'bg-gradient-to-b from-yellow-300 to-yellow-600 to-75%',
        shadow: {
          normal: 'shadow-[0px_4px_8px_var(--p-surface-500)]',
          sync: 'dark:shadow-[0px_4px_8px_theme(colors.yellow.400)] shadow-[0px_4px_8px_theme(colors.yellow.600)]',
        },
      },
      disabled: {
        gradient:
          'bg-gradient-to-b from-gray-300 to-gray-600 to-75% blur-[1px]',
        shadow: {
          normal: 'shadow-[0px_4px_8px_var(--p-surface-500)]',
          sync: '',
        },
      },
    },
    animation:
      'transition-all duration-150 ease-in-out hover:scale-105 active:translate-y-0.5 active:shadow-sm active:scale-95',
    size: {
      small: 'text-sm px-3 py-1',
      large: 'text-lg px-5 py-2',
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.styleHandler();
    }
  }

  ngOnInit(): void {
    this.styleHandler();
  }

  private styleHandler() {
    // Rebuild the class string from scratch
    const classes: string[] = [this.baseClass];

    // Add size classes
    if (this.size !== 'normal' && this.style.size) {
      classes.push(
        this.size === 'large' ? this.style.size.large : this.style.size.small
      );
    }

    // Determine and add gradient and shadow classes
    let styleData = this.disabled
      ? this.style.colors['disabled']
      : this.style.colors[this.severity];

    if (!styleData) styleData = this.style.colors['primary'];
    classes.push(styleData.gradient);

    if (this.shadow || this.disabled) {
      if (this.disabled) {
        classes.push(styleData.shadow.normal);
      } else {
        classes.push(
          this.syncShadow ? styleData.shadow.sync : styleData.shadow.normal
        );
      }
    }

    // Add animation class if not disabled
    if (!this.disabled) {
      classes.push(this.style.animation);
    }

    // Set the new, clean class string
    this.class.set(classes.join(' '));
  }

  handleClick(): void {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
