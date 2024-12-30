import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DriverService } from 'src/app/core/services/driver.service';
import { Driver } from 'src/app/models/driver';
import { QueryParams } from 'src/app/models/user';
import { DriverFormDialogComponent } from './driver-form-dialog/driver-form-dialog.component';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog.component';

@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.scss']
})
export class DriverManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'driverName', 
    'contactPerson', 
    'mobile', 
    'email', 
    'city',
    'experience',
    'isActive',
    'registrationDate', 
    'actions'
  ];
  dataSource: MatTableDataSource<Driver> = new MatTableDataSource();
  totalItems = 0;
  loading = false;

  queryParams: QueryParams = {
    pageNumber: 1,
    pageSize: 10,
    keyword: '',
    status: '',
    sortBy: 'Id',
    sortDir: 'asc'
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private driverService: DriverService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDrivers();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.queryParams.sortBy = this.sort.active;
      this.queryParams.sortDir = this.sort.direction;
      this.paginator.firstPage();
      this.loadDrivers();
    });
  }

  loadDrivers() {
    this.loading = true;
    
    // Update query params with current pagination state
    this.queryParams.pageNumber = this.paginator?.pageIndex + 1 || 1;
    this.queryParams.pageSize = this.paginator?.pageSize || 10;
  
    this.driverService.searchDrivers(this.queryParams).subscribe({
      next: (response) => {
        // Map response.data to dataSource
        this.dataSource.data = response.data;
        // Map response.totalRecords to totalItems
        this.totalItems = response.totalRecords;
        this.loading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading drivers', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.queryParams.keyword = filterValue.trim().toLowerCase();
    this.paginator.firstPage();
    this.loadDrivers();
  }

  filterByStatus(status: string) {
    this.queryParams.status = status;
    this.paginator.firstPage();
    this.loadDrivers();
  }

  openDriverDialog(driver?: Driver) {
    const dialogRef = this.dialog.open(DriverFormDialogComponent, {
      width: '600px',
      data: driver || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (driver) {
          this.updateDriver(driver.id, result);
        } else {
          this.createDriver(result);
        }
      }
    });
  }

  createDriver(driverData: any) {
    this.driverService.createDriver(driverData).subscribe({
      next: () => {
        this.snackBar.open('Driver created successfully', 'Close', { duration: 3000 });
        this.loadDrivers();
      },
      error: (error) => {
        this.snackBar.open(error.message || 'Error creating driver', 'Close', { duration: 3000 });
      }
    });
  }

  updateDriver(id: number, driverData: any) {
    this.driverService.updateDriver(id, driverData).subscribe({
      next: () => {
        this.snackBar.open('Driver updated successfully', 'Close', { duration: 3000 });
        this.loadDrivers();
      },
      error: (error) => {
        this.snackBar.open('Error updating driver', 'Close', { duration: 3000 });
      }
    });
  }

  confirmDelete(driver: Driver) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete driver ${driver.driverName}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDriver(driver.id);
      }
    });
  }

  deleteDriver(id: number) {
    this.driverService.deleteDriver(id).subscribe({
      next: () => {
        this.snackBar.open('Driver deleted successfully', 'Close', { duration: 3000 });
        this.loadDrivers();
      },
      error: (error) => {
        this.snackBar.open('Error deleting driver', 'Close', { duration: 3000 });
      }
    });
  }

  onPageChange(event: any) {
    this.queryParams.pageNumber = event.pageIndex + 1;
    this.queryParams.pageSize = event.pageSize;
    this.loadDrivers();
  }
}