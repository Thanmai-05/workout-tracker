import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { UserDataService } from '../../services/user-data.service';

Chart.register(...registerables);

@Component({
  selector: 'app-workout-chart',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css']
})
export class WorkoutChartComponent implements OnInit, AfterViewInit {
  @ViewChild('workoutChart')
  chartCanvas!: ElementRef;
  chart: any;

  constructor(private userDataService: UserDataService, 
    @Inject(PLATFORM_ID) private platformId: Object) {}
  
  
  ngOnInit(): void {
    //this.createChart();
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.createChart();
  }
  }
  
  createChart(): void {
    this.userDataService.getUsers().subscribe(users => {
      const workoutTypes = Array.from(new Set(users.flatMap(u => u.workouts.map(w => w.type))));
      const datasets = workoutTypes.map(type => ({
        label: type,
        data: users.map(u => u.workouts.filter(w => w.type === type).reduce((sum, w) => sum + w.minutes, 0)),
        backgroundColor: this.getRandomColor(),
      }));

      if(this.chart){
        this.chart.destroy();
      }

      this.chart = new Chart(this.chartCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: users.map(u => u.name),
          datasets: datasets,
        },
        options: {
          responsive: true,
          scales: {
            x: { stacked: true },
            y: { stacked: true },
          },
        },
      });
    });
  }

  getRandomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
}