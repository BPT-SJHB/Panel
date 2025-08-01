import {
  AfterViewInit,
  Component,
  inject,
  signal,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { WebProcess } from 'app/data/model/web-process.model';
import { selectWebProcessesGroups } from 'app/store/sidebar/sidebar.selectors';
import { Dialog } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { createTab } from 'app/store/tab/tab.actions';
import { TabComponentKey } from 'app/constants/tab-component-registry';
import { DEFAULT_MAIN_TAB_ID } from 'app/store/tab/tab.reducer';
import { Button } from "primeng/button";

@Component({
  selector: 'app-search-processes',
  imports: [TextInputComponent, Dialog, SearchInputComponent, CommonModule, Button],
  templateUrl: './search-processes.component.html',
  styleUrls: ['./search-processes.component.scss'],
})
export class SearchProcessesComponent implements AfterViewInit, OnDestroy {
  private allProcesses = signal<WebProcess[]>([]);
  private store = inject(Store);
  private subscription: Subscription = new Subscription();
  private readonly minLengthSearch = 3;
  readonly searchTerm = new FormControl('');

  processes = signal<WebProcess[]>([]);
  headerTitle = signal('جستجو');
  isDialogVisible = false;

  ngAfterViewInit(): void {
    this.subscription.add(
      this.store.select(selectWebProcessesGroups).subscribe((processes) => {
        this.allProcesses.set(processes);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  searchProcess = (query: string): Promise<void> => {
    return new Promise((resolve) => {
      if (query.length < this.minLengthSearch) {
        this.processes.set([]);
        return;
      }

      const all = this.allProcesses();

      const titleMatches = all.filter((p) => p.title.includes(query));

      const descriptionMatches = all.filter(
        (p) => p.description.includes(query) && !titleMatches.includes(p)
      );

      this.processes.set([...titleMatches, ...descriptionMatches]);

      resolve();
    });
  };

  onSelectProcess(process: WebProcess) {
    const componentToLoad: TabComponentKey = Object.values(
      TabComponentKey
    ).includes(process.id)
      ? (process.id as TabComponentKey)
      : TabComponentKey.Main;

    const isMainPage = componentToLoad === TabComponentKey.Main;

    const tabPayload = {
      id: isMainPage ? DEFAULT_MAIN_TAB_ID : undefined,
      title: isMainPage ? 'صفحه اصلی' : process.title,
      icon: isMainPage ? 'pi pi-home' : process.icon,
      closeable: true,
      component: componentToLoad,
    };

    this.store.dispatch(createTab(tabPayload));
    this.isDialogVisible = false;
  }
}
