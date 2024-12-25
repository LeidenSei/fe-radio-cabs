import { Component, OnInit } from '@angular/core';

declare var $: any; // Khai báo jQuery
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    // Khởi tạo carousel khi view đã sẵn sàng
    $('.banner-style-one').owlCarousel({
      loop: true,
      items: 1,
      nav: false,
      navText: [
        '<i class="conexi-icon-left"></i>',
        '<i class="conexi-icon-right"></i>'
      ],
      dots: false,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 5000
    });

    // Custom Navigation
    $('.banner-carousel-btn .left-btn').on('click', () => {
      $('.banner-style-one').trigger('prev.owl.carousel');
    });

    $('.banner-carousel-btn .right-btn').on('click', () => {
      $('.banner-style-one').trigger('next.owl.carousel');
    });
  }
}
