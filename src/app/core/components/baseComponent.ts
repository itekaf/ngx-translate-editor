import { ChangeDetectorRef } from '@angular/core';
import { OnDestroy } from '@angular/core';

export class BaseComponent implements OnDestroy {
  public isLoading: boolean = false;

  private changeDetectorRef: ChangeDetectorRef;

  constructor(cdRef: ChangeDetectorRef) {
    this.changeDetectorRef = cdRef;
    const f = this.ngOnDestroy;

    this.ngOnDestroy = () => {
      f.call(this);
    };
  }

  protected toggleLoader(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.changeDetectorRef.markForCheck();
  }

  public  ngOnDestroy(): void {
    // no-op
  }
}
