// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { UserService } from '../user.service';
// // "address": {
// //   "street": "Kulas Light",
// //     "suite": "Apt. 556",
// //       "city": "Gwenborough",
// //         "zipcode": "92998-3874",
// //           "geo": {
// //     "lat": "-37.3159",
// //       "lng": "81.1496"
// //   }
// // }
// interface Address {
//   street: string;
//   suite: string;
//   city: string;
//   zipcode: string;
// }
// interface Post {
//   id: number;
//   title: string;
//   body: string;
// }

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   address: Address;
//   posts: Post[]; // ✅ Include posts in User type
// }

// @Component({
//   selector: 'app-user-list',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './user-list.component.html',
//   styleUrls: ['./user-list.component.css']
// })
// export class UserListComponent implements OnInit {

//   users: User[] = []; // ✅ Use typed array

//   constructor(private userService: UserService) { }

//   ngOnInit(): void {
//     this.userService.getUsers().subscribe((usersData: User[]) => {
//       this.users = usersData.map(user => ({ ...user, posts: [] })); // ✅ Initialize posts array

//       this.users.forEach((user: User) => {
//         this.userService.getUserPost(user.id).subscribe((posts: Post[]) => {
//           user.posts = posts; // ✅ Assign posts properly
//         });
//       });
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EMPTY } from 'rxjs';

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  posts: Post[]; // ✅ Include posts in User type
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = []; // ✅ Use typed array
  errorMessage: string | null = null; // ✅ Store error messages

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers()
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to load users. Please try again later.';
          console.error(error);
          return EMPTY; // Return an empty observable to prevent app crash
        })
      )
      .subscribe((usersData: User[]) => {
        this.users = usersData.map(user => ({ ...user, posts: [] })); // ✅ Initialize posts array

        this.users.forEach((user: User) => {
          this.userService.getUserPost(user.id)
            .pipe(
              catchError(error => {
                console.error(`Error fetching posts for user ${user.id}:`, error);
                return EMPTY; // Continue execution even if post fetching fails
              })
            )
            .subscribe((posts: Post[]) => {
              user.posts = posts; // ✅ Assign posts properly
            });
        });
      });
  }
}
