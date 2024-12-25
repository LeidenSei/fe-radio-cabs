import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.loadStyles();
    this.loadScripts();
  }

  private loadStyles() {
    const styles = [
      'assets/home-assets/css/style.css',
      'assets/home-assets/css/responsive.css'
    ];

    styles.forEach(style => {
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'stylesheet');
      this.renderer.setAttribute(link, 'href', style);
      this.renderer.appendChild(document.head, link);
    });
  }

  private loadScripts() {
    const scripts = [
      'assets/home-assets/js/jquery.js',
      'assets/home-assets/js/bootstrap.bundle.min.js',
      'assets/home-assets/js/owl.carousel.min.js',
      'assets/home-assets/js/bootstrap-select.min.js',
      'assets/home-assets/js/jquery.magnific-popup.min.js',
      'assets/home-assets/js/waypoints.min.js',
      'assets/home-assets/js/jquery.counterup.min.js',
      'assets/home-assets/js/jquery.bxslider.min.js',
      'assets/home-assets/js/theme.js'
    ];

    scripts.forEach(script => {
      const scriptElement = this.renderer.createElement('script');
      this.renderer.setAttribute(scriptElement, 'src', script);
      this.renderer.appendChild(document.body, scriptElement);
    });
  }

  ngOnDestroy() {
    // Remove public layout specific styles and scripts when component is destroyed
    const head = document.getElementsByTagName('head')[0];
    const body = document.getElementsByTagName('body')[0];
    
    // Remove styles
    const styles = document.querySelectorAll('link[href*="home-assets"]');
    styles.forEach(style => head.removeChild(style));
    
    // Remove scripts
    const scripts = document.querySelectorAll('script[src*="home-assets"]');
    scripts.forEach(script => body.removeChild(script));
  }
}
