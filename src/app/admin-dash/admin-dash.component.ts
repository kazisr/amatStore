import {HttpClient} from '@angular/common/http';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminauthenticationService} from '../Services/adminauthentication.service';
import Swal from 'sweetalert2';
import {ListFormat} from 'typescript';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  userFromDB:any;
  orders: any;
  itemss:any;


  constructor(public loginservice: AdminauthenticationService,
             private http:HttpClient,
             private router:Router,
              private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    let resourse = this.http.get("http://localhost:8080/admin/find/"+this.loginservice.getAdmin());
    resourse.subscribe((data)=> this.userFromDB=data);

    this.getAllOrders();
    this.getNewPID();
  }



  orderDetails(odr:any){
    this.odr = odr;
    this.itemss = odr.items;

  }

  getAllOrders(){
    let resourse = this.http.get("http://localhost:8080/orders/find/all");
    resourse.subscribe((data)=> this.orders=data);
  }

  deleteOrder(ordId:any){
    this.http.post<any>('http://localhost:8080/orders/delete', ordId).subscribe({
        next: data => {

        },
        error: error => {
            console.error('There was an error!  aay haaay', error);

        }
    })


    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Deleted',
      showConfirmButton: false,
      timer: 1500
    })

    this.getAllOrders();

  }

  getNewPID(){
    let resourse = this.http.get("http://localhost:8080/product/lastProductId");
    resourse.subscribe((data)=> this.items.productId =Number(data.toString()));
    this.items.productName = '';
    this.items.productImgUrl = '';
    this.items.productPrice = 0;
    this.items.productAvailable = 0;
    this._changeDetectorRef.detectChanges();

  }

  addItem(item:any){
    this.http.post<any>('http://localhost:8080/product/add', item).subscribe({
        next: data => {

        },
        error: error => {
            console.error('There was an error!  aay haaay', error);

        }
    })


    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'New Product Added',
      showConfirmButton: false,
      timer: 1500
    })

    this.getNewPID();


  }



  odr = {
    "id":0,
    "userFirstName":"",
    "userLastName":"",
    "userName":"",
    "userContactNumber":"",
    "userAddress":"",
    "city":"",
    "country":"",
    "zip":"",
    "paymentMethode":"",
    "items":ListFormat,
    "grossAmount":0,

  };


  items= {
    "productId":0,
    "productName":"",
    "productImgUrl":"",
    "productPrice":0,
    "productAvailable":0,

  };

}
