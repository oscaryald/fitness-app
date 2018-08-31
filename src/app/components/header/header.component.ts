import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../auth/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  @Output()
  logout = new EventEmitter<any>();

  @Input()
  user: User;

  constructor() { }

  ngOnInit() {
  }

  logoutUser() {
    this.logout.emit();
  }

}
