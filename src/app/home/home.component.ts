import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cards = [
    { ImgSrc: 'assets/car1.svg', ImgAlt: 'BMW 2023',des:'BMW FASTEST', pID: 'Product ID:445588', cBid: 'Current Bid : pkr:5855000', lctn:'location:Lahore' ,imgName:'sedan'},
    { ImgSrc: 'assets/car2.svg', ImgAlt: 'BMW 2022',des:'BMW NORMAL', pID: 'Product ID:455432', cBid: 'Current Bid : pkr:5455000', lctn:'location:Islamabad' ,imgName:'sedan'},
    { ImgSrc: 'assets/car3.svg', ImgAlt: 'BMW 2021',des:'BMW GAMING', pID: 'Product ID:123332', cBid: 'Current Bid : pkr:5335500', lctn:'location:Karachi' ,imgName:'sedan'},
    { ImgSrc: 'assets/car1.svg', ImgAlt: 'BMW 2023',des:'BMW FASTEST', pID: 'Product ID:445588', cBid: 'Current Bid : pkr:5855000', lctn:'location:Lahore' ,imgName:'sedan'}
 ]
}
