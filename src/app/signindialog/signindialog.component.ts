import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { User } from '../model/app-model';
import { AppServiceService } from '../app-service.service';
import { InformationdialogComponent } from '../informationdialog/informationdialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signindialog',
  templateUrl: './signindialog.component.html',
  styleUrls: ['./signindialog.component.css'],
})
export class SignindialogComponent implements OnInit {
  user!: SocialUser;
  profile!: User;
  private loggedIn!: boolean;

  constructor(
    private authService: SocialAuthService,
    private service: AppServiceService,
    public dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    // if (browserRefresh) this.refreshToken();
    this.matIconRegistry.addSvgIcon(
      `google`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/google.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `facebook`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/facebook.svg')
    );

    // this.signInWithGoogle()
    // this.refreshToken()
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFace(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnInit(): void {
    // if (browserRefresh) this.refreshToken();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;

      // console.log("Token : ", user.idToken)
      // console.log("Provider : ", user.provider)

      // if (this.loggedIn) {
      this.service
        .userToken(user.idToken, user.provider.toLowerCase())
        .subscribe((profile) => {
          // console.log(profile)
          this.profile = profile;

          if (this.profile.wishlist == null) this.profile.wishlist = [];
          if (this.profile.wardrobeIds == null) this.profile.wardrobeIds = [];
          this.service.userSubject.next(this.profile);

          if (this.profile.id != '') {
            this.service.getWardrope(this.profile.id).subscribe((wardrobe) => {
              this.service.wardrobeSubject.next(wardrobe);
            });
          }
          if (this.loggedIn && this.profile.stripeId == '') {
            const dialogRef = this.dialog.open(InformationdialogComponent, {
              width: '400px',
              data: { productid: '' },
            });
          }
        });
      // }
    });
    // this.service.refreshSubject.subscribe(data => {
    //   if (data) this.refreshToken()
    //
    //   console.log('i was refreshed')
    // })
  }
}
