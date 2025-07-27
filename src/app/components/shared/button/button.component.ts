import {
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

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
export class ButtonComponent implements OnInit {
  @Input() severity: 'green' | 'info' | 'danger' | 'warn' = 'green';
  @Input() syncShadow: boolean = true;
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() size: 'small' | 'large' | 'normal' = 'normal';
  @Input() type?: 'button' | 'submit';
  @Input() icon?: string;

  @Output() onClick = new EventEmitter<void>();

  class = signal('rounded-[9999px] border-0 text-primary-contrast');
  style: ButtonStyle = {
    colors: {
      green: {
        gradient: 'bg-gradient-to-b from-teal-500 to-emerald-700 to-75%',
        shadow: {
          normal: 'shadow-[0px_4px_8px_var(--p-surface-500)]',
          sync: 'shadow-[0px_4px_8px_theme(colors.emerald.700)]',
        },
      },
      info: {
        gradient: 'bg-gradient-to-b from-blue-400 to-blue-700 to-75%',
        shadow: {
          normal: 'shadow-[0px_4px_8px_var(--p-surface-500)]',
          sync: 'shadow-[0px_4px_8px_theme(colors.blue.700)]',
        },
      },
      danger: {
        gradient: 'bg-gradient-to-b from-red-400 to-red-700 to-75%',
        shadow: {
          normal: 'shadow-[0px_4px_8px_var(--p-surface-500)]',
          sync: 'shadow-[0px_4px_8px_theme(colors.red.700)]',
        },
      },
      warn: {
        gradient: 'bg-gradient-to-b from-yellow-300 to-yellow-600 to-75%',
        shadow: {
          normal: 'shadow-[0px_4px_8px_var(--p-surface-500)]',
          sync: 'shadow-[0px_4px_8px_theme(colors.yellow.600)]',
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

  ngOnInit(): void {
    this.class.set(
      `${this.class()} ${
        this.size === 'normal'
          ? ''
          : this.size === 'large'
          ? this.style.size?.large
          : this.style.size?.small
      } ${this.style.colors[this.severity].gradient} ${
        this.syncShadow
          ? this.style.colors[this.severity].shadow.sync
          : this.style.colors[this.severity].shadow.normal
      } ${!this.disabled ? this.style.animation : ''}`
    );
  }

  handleClick(): void {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
