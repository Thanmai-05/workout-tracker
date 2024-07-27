import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../services/user-data.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import {MatIconModule} from '@angular/material/icon'


@Component({
  selector: 'app-user-list',
  standalone:true,
  imports:[FormsModule, NgFor,CommonModule, MatIconModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  workoutTypeFilter: string = '';
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.userDataService.getUsers().subscribe(users => {
      this.users = users;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.workoutTypeFilter === '' || user.workouts.some(w => w.type.toLowerCase() === this.workoutTypeFilter.toLowerCase()))
    );
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}