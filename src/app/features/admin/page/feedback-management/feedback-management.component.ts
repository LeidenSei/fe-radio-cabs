import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Feedback, CreateFeedbackDTO, UpdateFeedbackDTO } from 'src/app/models/feedback';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog.component';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import { QueryParams } from 'src/app/models/user';

@Component({
  selector: 'app-feedback-management',
  templateUrl: './feedback-management.component.html' // Updated
})
export class FeedbackManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'mobile', 'city', 'feedbackType', 'submissionDate', 'actions'];
  dataSource: MatTableDataSource<Feedback>;
  totalItems: number = 0;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  queryParams: QueryParams = {
    pageNumber: 1,
    pageSize: 10,
    keyword: '',
    status: '',
    sortBy: 'Id',
    sortDir: 'asc'
  };

  constructor(
    private feedbackService: FeedbackService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loadFeedbacks();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });
  }

  applyFilter() {
    this.queryParams.pageNumber = 1;
    this.loadFeedbacks();
  }

  pageChanged(event: PageEvent) {
    this.queryParams.pageNumber = event.pageIndex + 1;
    this.queryParams.pageSize = event.pageSize;
    this.loadFeedbacks();
  }

  sortData(sort: Sort) {
    this.queryParams.sortDir = sort.direction || 'asc';
    this.queryParams.sortBy = sort.active;
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.feedbackService.searchFeedbacks(this.queryParams).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.items;
        this.totalItems = response.totalItems;
      },
      error: (error) => {
        this.showSnackBar('Failed to load feedbacks', 'error');
      }
    });
  }

  openDialog(feedback?: Feedback) {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '600px',
      data: feedback || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFeedbacks();
      }
    });
  }

  deleteFeedback(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      data: { title: 'Delete Feedback', message: 'Are you sure you want to delete this feedback?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.feedbackService.deleteFeedback(id).subscribe({
          next: () => {
            this.showSnackBar('Feedback deleted successfully', 'success');
            this.loadFeedbacks();
          },
          error: (error) => {
            this.showSnackBar('Failed to delete feedback', 'error');
          }
        });
      }
    });
  }

  showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'error' ? ['error-snackbar'] : ['success-snackbar']
    });
  }
}