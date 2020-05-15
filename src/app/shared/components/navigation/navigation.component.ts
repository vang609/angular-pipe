import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  selectedNav;
  constructor(private router: Router,
              private location: Location) {
    router.events.subscribe(e => {
      if (location.path() !== '') {
        this.selectedNav = location.path();
      }
    });
  }

  ngOnInit(): void {
  }

  selectNav(nav: string) {
    console.log(nav);
  }

}
