import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.loadStyles();
    this.loadScripts();
  }

  private loadStyles() {
    const styles = [
      'assets/admin-assets/css/style.css'
    ];

    styles.forEach(style => {
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'stylesheet');
      this.renderer.setAttribute(link, 'href', style);
      this.renderer.appendChild(document.head, link);
    });
  }

  private async loadScripts() {
    // Load vendors first
    await this.loadScript('assets/admin-assets/js/vendors.min.js');
    
    // Then load ApexCharts
    await this.loadScript('assets/admin-assets/vendors/apexcharts/apexcharts.js');
    
    // Then load app.min.js
    await this.loadScript('assets/admin-assets/js/app.min.js');
    
    // Finally load dashboard script
    await this.loadScript('assets/admin-assets/js/pages/project-dashboard.js');
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      this.renderer.appendChild(document.body, script);
    });
  }

  ngOnDestroy() {
    // Remove admin layout specific styles and scripts when component is destroyed
    const head = document.getElementsByTagName('head')[0];
    const body = document.getElementsByTagName('body')[0];
    
    // Remove styles
    const styles = document.querySelectorAll('link[href*="admin-assets"]');
    styles.forEach(style => head.removeChild(style));
    
    // Remove scripts
    const scripts = document.querySelectorAll('script[src*="admin-assets"]');
    scripts.forEach(script => body.removeChild(script));
  }
  onMenuClick(event:any){
    
  }
}
