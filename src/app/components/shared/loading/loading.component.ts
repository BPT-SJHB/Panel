import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  imports: [AsyncPipe,ProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit {
  private loadingService = inject(LoadingService);
  loading$!:Observable<boolean>;
 
  ngOnInit(): void {
   this.loading$ =  this.loadingService.loading$;
  }
}
