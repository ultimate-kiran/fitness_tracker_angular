import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.initParticles();
    this.initTypingEffect();
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  initParticles() {
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = 600; // Match hero section height

    const particles: any[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  initTypingEffect() {
    const headline = document.getElementById('typing-headline')!;
    const text = headline.innerHTML;
    headline.innerHTML = '';
    let i = 0;

    function type() {
      if (i < text.length) {
        headline.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 50);
      }
    }

    type();
  }
}