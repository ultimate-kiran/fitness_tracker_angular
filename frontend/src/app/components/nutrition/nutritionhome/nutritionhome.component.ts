import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nutritionhome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nutritionhome.component.html',
  styleUrls: ['./nutritionhome.component.css'],
})
export class NutritionhomeComponent implements OnInit {
  meals: { icon: string, title: string, description: string, backgroundColor: string }[] = [
    {
      icon: '☕',
      title: 'Breakfast',
      description: 'Start the day with nutritious breakfast options',
      backgroundColor: '#FFF3E0',
    },
    {
      icon: '🍴',
      title: 'Lunch',
      description: 'Energize your afternoon with balanced lunch meals',
      backgroundColor: '#E6F4EA',
    },
    {
      icon: '🌙',
      title: 'Dinner',
      description: 'Complete your day with healthy dinner recipes',
      backgroundColor: '#E6F0FA',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onMealSelect(mealtype: string): void {
    if (mealtype) {
      this.router.navigate([mealtype.toLowerCase()]);
    }
  }
  goToDashboard() {
    this.router.navigate(['/userdashboard']);
  }
}