import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-toggle-switch-input',
  imports: [NgClass, ReactiveFormsModule, ToggleSwitchModule],
  templateUrl: './toggle-switch-input.component.html',
  styleUrl: './toggle-switch-input.component.scss',
})
export class ToggleSwitchInputComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() control: FormControl = new FormControl(true);
  @Input() readonly: boolean = false;

  @Input() label: string = '';

  private readonly destroy$ = new Subject<void>();

  private baseStyles = {
    root: {
      width: '3.5rem',
      height: '2rem',
      shadow: '0 4px 8px rgba(0,0,0,0.4)',
      borderColor: 'var(--p-surface-400)',
      borderWidth: '1px',
      borderStyle: 'solid',
      checkedHoverBackground: 'var(--p-emerald-500)',
    },
    handle: {
      size: '1.5rem',
      // For dark theme
      checkedBackground: 'var(--p-stone-50)',
      checkedHoverBackground: 'var(--p-stone-50)',
    },
  };

  private readonly shadowColors = {
    active: '0 4px 8px var(--p-green-500)',
    inactive: '0 4px 8px rgba(0,0,0,0.4)',
  };

  customToggleSwitchTokens = signal(this.baseStyles);

  ngOnInit(): void {
    this.setShadowColor(this.control.value);
  }

  ngAfterViewInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.setShadowColor(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setShadowColor(status: boolean) {
    this.customToggleSwitchTokens.update((currentTokens) => ({
      ...currentTokens,
      root: {
        ...currentTokens.root,
        shadow: status ? this.shadowColors.active : this.shadowColors.inactive,
      },
    }));
  }
}
