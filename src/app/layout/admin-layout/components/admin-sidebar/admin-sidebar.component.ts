import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
interface MenuItem {
  path: string;
  icon: string;
  label: string;
  children?: MenuItem[];
}
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  @Input() activeRoute: string = '';
  @Output() menuClick = new EventEmitter<string>();
  @Input() isOpen: boolean = false;

  onMenuSelect(route: string) {
    this.menuClick.emit(route);
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  menuItems: MenuItem[] = [
    {
      path: 'dashboard',
      icon: 'dashboard-icon',
      label: 'Dashboard'
    },
    {
      path: 'project',
      icon: 'project-icon',
      label: 'Project',
      children: [
        {
          path: '', label: 'Project List',
          icon: ''
        },
        {
          path: 'create', label: 'New Project',
          icon: ''
        }
      ]
    },
    // Thêm các menu items khác
  ];
  onMenuItemClick(item: any) {
    this.menuClick.emit(item.id);
  }
}