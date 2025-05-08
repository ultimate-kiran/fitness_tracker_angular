import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: { type: string; id: string }[] = [];

  addNotification(type: string, id: string) {
    this.notifications.unshift({ type, id }); // Add to the top
    localStorage.setItem('notifications', JSON.stringify(this.notifications)); // Store in localStorage
  }

  getNotifications(): { type: string; id: string }[] {
    const storedNotifications = localStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  }

  clearNotifications() {
    this.notifications = [];
    localStorage.removeItem('notifications');
  }
}