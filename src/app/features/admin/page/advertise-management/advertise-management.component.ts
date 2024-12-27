import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdvertiseService } from 'src/app/core/services/advertise.service';

@Component({
  selector: 'app-advertise-management',
  templateUrl: './advertise-management.component.html',
  styleUrls: ['./advertise-management.component.scss']
})
export class AdvertiseManagementComponent {
  // adForm: FormGroup;
  // searchForm: FormGroup;
  // advertisements: Advertise[] = [];
  // displayedColumns: string[] = ['id', 'company', 'designation', 'status', 'actions'];
  // selectedFile: File | null = null;
  // totalItems: number = 0;

  // constructor(
  //   private fb: FormBuilder,
  //   private advertiseService: AdvertiseService,
  //   private snackBar: MatSnackBar,
  //   private dialog: MatDialog
  // ) {
  //   this.createForms();
  // }

  // ngOnInit() {
  //   this.loadAdvertisements();
  // }

  // createForms() {
  //   this.adForm = this.fb.group({
  //     companyId: ['', Validators.required],
  //     designation: ['', [Validators.required, Validators.minLength(3)]],
  //     description: ['', [Validators.required, Validators.minLength(10)]],
  //     startDate: ['', Validators.required],
  //     endDate: ['', Validators.required],
  //     isActive: [true],
  //   }, { validators: this.dateValidator });
    
  //   this.searchForm = this.fb.group({
  //     companyId: [''],
  //     isActive: ['']
  //   });
  // }

  // dateValidator(group: FormGroup) {
  //   const start = group.get('startDate')?.value;
  //   const end = group.get('endDate')?.value;
  //   if (start && end && start > end) {
  //     return { dateError: true };
  //   }
  //   return null;
  // }

  // onFileSelected(event: Event) {
  //   const element = event.target as HTMLInputElement;
  //   const fileList: FileList | null = element.files;
  //   if (fileList) {
  //     this.selectedFile = fileList[0];
  //     // Kiểm tra kích thước file (ví dụ: giới hạn 5MB)
  //     if (this.selectedFile.size > 5 * 1024 * 1024) {
  //       this.snackBar.open('Kích thước file không được vượt quá 5MB', 'Đóng', {
  //         duration: 3000
  //       });
  //       this.selectedFile = null;
  //       element.value = '';
  //     }
  //   }
  // }

  // searchAds() {
  //   const searchParams = this.searchForm.value;
  //   // Implement search logic using the service
  //   this.advertiseService.searchAdvertise(searchParams).subscribe({
  //     next: (response) => {
  //       this.advertisements = response.items;
  //       this.totalItems = response.total;
  //     },
  //     error: (error) => {
  //       this.showError('Có lỗi xảy ra khi tìm kiếm');
  //     }
  //   });
  // }

  // onSubmit() {
  //   if (this.adForm.valid) {
  //     const formData: CreateAdvertiseDTO = {
  //       ...this.adForm.value,
  //       images: this.selectedFile
  //     };

  //     this.advertiseService.addAdvertise(formData).subscribe({
  //       next: (response) => {
  //         this.showSuccess('Thêm quảng cáo thành công');
  //         this.loadAdvertisements();
  //         this.resetForm();
  //       },
  //       error: (error) => {
  //         if (error.error === "Company is not existed") {
  //           this.showError('Công ty không tồn tại');
  //         } else {
  //           this.showError('Có lỗi xảy ra khi thêm quảng cáo');
  //         }
  //       }
  //     });
  //   }
  // }

  // editAd(ad: Add) {
  //   // Implement edit logic with confirmation dialog
  //   const dialogRef = this.dialog.open(EditAdvertiseDialog, {
  //     width: '600px',
  //     data: ad
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.loadAdvertisements();
  //     }
  //   });
  // }

  // deleteAd(id: number) {
  //   const dialogRef = this.dialog.open(ConfirmDialog, {
  //     width: '400px',
  //     data: {
  //       title: 'Xác nhận xóa',
  //       message: 'Bạn có chắc chắn muốn xóa quảng cáo này không?'
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.advertiseService.deleteAdvertise(id).subscribe({
  //         next: () => {
  //           this.showSuccess('Xóa quảng cáo thành công');
  //           this.loadAdvertisements();
  //         },
  //         error: () => {
  //           this.showError('Có lỗi xảy ra khi xóa quảng cáo');
  //         }
  //       });
  //     }
  //   });
  // }

  // private loadAdvertisements() {
  //   this.advertiseService.getAdvertisements().subscribe({
  //     next: (response) => {
  //       this.advertisements = response.items;
  //       this.totalItems = response.total;
  //     },
  //     error: () => {
  //       this.showError('Có lỗi xảy ra khi tải danh sách quảng cáo');
  //     }
  //   });
  // }

  // private showSuccess(message: string) {
  //   this.snackBar.open(message, 'Đóng', {
  //     duration: 3000,
  //     panelClass: ['success-snackbar']
  //   });
  // }

  // private showError(message: string) {
  //   this.snackBar.open(message, 'Đóng', {
  //     duration: 3000,
  //     panelClass: ['error-snackbar']
  //   });
  // }

  // private resetForm() {
  //   this.adForm.reset();
  //   this.selectedFile = null;
  //   this.adForm.patchValue({
  //     isActive: true
  //   });
  // }

  // onPageChange(event: any) {
  //   // Implement pagination logic
  // }
}