import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';// Adjust the path as needed
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: { type: string; details: any; id: string }[] = []; // Include id for fetching details

  constructor(
    private notificationService: NotificationService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load initial notifications from NotificationService
    this.notifications = this.notificationService.getNotifications().map(notification => ({
      type: notification.type,
      id: notification.id,
      details: null // Initialize with null details
    }));
    this.fetchNotificationDetails(); // Fetch details for all notifications
  }

  // Fetch detailed information for workouts or recipes
  fetchNotificationDetails() {
    this.notifications.forEach((notification, index) => {
      if (notification.type === 'New workout added') {
        this.http.get(`http://localhost:5000/api/exercises/${notification.id}`).subscribe({
          next: (data: any) => {
            this.notifications[index].details = data;
          },
          error: (err) => {
            console.error('Error fetching workout details:', err);
          }
        });
      } else if (notification.type === 'New recipe added') {
        this.http.get(`http://localhost:5000/api/recipes/${notification.id}`).subscribe({
          next: (data: any) => {
            this.notifications[index].details = data;
          },
          error: (err) => {
            console.error('Error fetching recipe details:', err);
          }
        });
      }
    });
  }

  // Clear notifications
  clearNotifications() {
    this.notificationService.clearNotifications();
    this.notifications = [];
  }
  goToDashboard() {
    this.router.navigate(['/userdashboard']);
  }
  
}