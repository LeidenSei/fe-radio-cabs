import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/core/services/user.service';
import { User, CreateUserDTO, UpdateUserDTO } from 'src/app/models/user';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>(this.users);

  searchForm: FormGroup;
  editForm: FormGroup;
  isEditing = false;
  selectedUser: User | null = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.searchForm = this.fb.group({
      keyword: [''],
      role: ['']
    });

    this.editForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const queryParams = this.searchForm.value;
    this.userService.searchUsers(queryParams).subscribe({
      next: (response) => {
        this.users = response.items || [];
        this.dataSource.data = this.users;
      },
      error: () => {
        this.snackBar.open('Failed to load users', 'Close', { duration: 3000 });
      }
    });
  }

  onSearch(): void {
    this.loadUsers();
  }

  resetSearch(): void {
    this.searchForm.reset();
    this.loadUsers();
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.editForm.patchValue(user);
    this.isEditing = true;
  }

  saveUser(): void {
    if (this.editForm.invalid) {
      return;
    }

    const userData: UpdateUserDTO = this.editForm.value;

    if (this.isEditing && this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, userData).subscribe({
        next: () => {
          this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
          this.loadUsers();
          this.cancelEdit();
        },
        error: () => {
          this.snackBar.open('Failed to update user', 'Close', { duration: 3000 });
        }
      });
    } else {
      const newUser: CreateUserDTO = userData;
      this.userService.createUser(newUser).subscribe({
        next: () => {
          this.snackBar.open('User created successfully', 'Close', { duration: 3000 });
          this.loadUsers();
        },
        error: () => {
          this.snackBar.open('Failed to create user', 'Close', { duration: 3000 });
        }
      });
    }
  }

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { title: 'Delete User', message: 'Are you sure you want to delete this user?' }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
            this.loadUsers();
          },
          error: () => {
            this.snackBar.open('Failed to delete user', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedUser = null;
    this.editForm.reset();
  }
}
