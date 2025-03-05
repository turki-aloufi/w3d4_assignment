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
  posts: Post[]; 
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string | null = null; 
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers()
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to load users. Please try again later.';
          console.error(error);
          return EMPTY; 
        })
      )
      .subscribe((usersData: User[]) => {
        this.users = usersData.map(user => ({ ...user, posts: [] })); 
        this.users.forEach((user: User) => {
          this.userService.getUserPost(user.id)
            .pipe(
              catchError(error => {
                console.error(`Error fetching posts for user ${user.id}:`, error);
                return EMPTY; 
              })
            )
            .subscribe((posts: Post[]) => {
              user.posts = posts;
            });
        });
      });
  }
}
