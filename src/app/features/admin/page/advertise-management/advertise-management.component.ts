import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Advertise, CreateAdvertiseDTO } from 'src/app/models/advertise';
import { AdvertiseService } from 'src/app/core/services/advertise.service';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog.component';

@Component({
  selector: 'app-advertise-management',
  templateUrl: './advertise-management.component.html',
  styleUrls: ['./advertise-management.component.scss']
})
export class AdvertiseManagementComponent implements OnInit {
  adForm: FormGroup;
  searchForm: FormGroup;
  advertisements: Advertise[] = [];
  displayedColumns: string[] = ['id', 'company', 'designation', 'status', 'actions'];
  selectedFile: File | null = null;
  totalItems: number = 0;
  isEditing: boolean = false;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private advertiseService: AdvertiseService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.createForms();
  }

  ngOnInit() {
    this.loadAdvertisements();
  }
  createForms() {
    this.adForm = this.fb.group({
      companyId: ['', Validators.required],
      designation: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isActive: [true],
    }, { validators: this.dateValidator });
    
    this.searchForm = this.fb.group({
      companyId: [''],
      isActive: ['']
    });
  }
  dateValidator(group: FormGroup) {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    if (start && end && start > end) {
      return { dateError: true };
    }
    return null;
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
      if (this.selectedFile.size > 5 * 1024 * 1024) {
        this.showError('Kích thước file không được vượt quá 5MB');
        this.selectedFile = null;
        element.value = '';
      }
    }
  }

  searchAds() {
    const searchParams = this.searchForm.value;
    this.advertiseService.searchAdvertise(searchParams).subscribe({
      next: (response) => {
        this.advertisements = response.items;
        this.totalItems = response.total;
      },
      error: () => {
        this.showError('Có lỗi xảy ra khi tìm kiếm');
      }
    });
  }

  onSubmit() {
    if (this.adForm.valid) {
      const formData: CreateAdvertiseDTO = {
        ...this.adForm.value,
        images: this.selectedFile
      };

      if (this.isEditing && this.editingId) {
        this.advertiseService.updateAdvertise(this.editingId, formData).subscribe({
          next: () => {
            this.showSuccess('Cập nhật quảng cáo thành công');
            this.loadAdvertisements();
            this.resetForm();
          },
          error: (error) => {
            if (error.error === "Company is not existed") {
              this.showError('Công ty không tồn tại');
            } else {
              this.showError('Có lỗi xảy ra khi cập nhật quảng cáo');
            }
          }
        });
      } else {
        this.advertiseService.addAdvertise(formData).subscribe({
          next: () => {
            this.showSuccess('Thêm quảng cáo thành công');
            this.loadAdvertisements();
            this.resetForm();
          },
          error: (error) => {
            if (error.error === "Company is not existed") {
              this.showError('Công ty không tồn tại');
            } else {
              this.showError('Có lỗi xảy ra khi thêm quảng cáo');
            }
          }
        });
      }
    }
  }

  editAd(ad: Advertise) {
    this.isEditing = true;
    this.editingId = ad.id;
    this.adForm.patchValue({
      companyId: ad.companyId,
      designation: ad.designation,
      description: ad.description,
      startDate: ad.startDate,
      endDate: ad.endDate,
      isActive: ad.isActive
    });
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingId = null;
    this.resetForm();
  }

  private resetForm() {
    this.adForm.reset();
    this.selectedFile = null;
    this.isEditing = false;
    this.editingId = null;
    this.adForm.patchValue({
      isActive: true
    });
  }
  deleteAd(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        title: 'Xác nhận xóa',
        message: 'Bạn có chắc chắn muốn xóa quảng cáo này không?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.advertiseService.deleteAdvertise(id).subscribe({
          next: () => {
            this.showSuccess('Xóa quảng cáo thành công');
            this.loadAdvertisements();
          },
          error: () => {
            this.showError('Có lỗi xảy ra khi xóa quảng cáo');
          }
        });
      }
    });
  }

  private loadAdvertisements() {
    this.searchAds()
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  onPageChange(event: any) {
    const params = {
      ...this.searchForm.value,
      pageIndex: event.pageIndex,
      pageSize: event.pageSize
    };
    this.advertiseService.searchAdvertise(params).subscribe({
      next: (response) => {
        this.advertisements = response.items;
        this.totalItems = response.total;
      },
      error: () => {
        this.showError('Có lỗi xảy ra khi tải dữ liệu');
      }
    });
  }
}