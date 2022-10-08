import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


export class Student{
  constructor(
    public id:string,
    public studentName:string,
    public phnNumber:string,
    public emailAddress:string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient:HttpClient
  ) { 
     }

     

     getEmployees()
  {
    let basicString=this.getHeaders();

    let headers=new HttpHeaders(
      {Authorization:basicString}
    );
    console.log("test call");
    return this.httpClient.get<Student[]>('http://localhost:8080/findAllStudent',{headers});
  }

  public deleteEmployee(student:any) {
    return this.httpClient.delete<Student>("http://localhost:8080//delete" + "/"+ student.id);
  }

  public createEmployee(student:any) {
    return this.httpClient.post<Student>("http://localhost:8080/findAllStudent", student);
  }



getHeaders(){
  let username='admin'
  let password='password'

  let  basicString='Basic '+window.btoa(username + ':' + password)
  return basicString;
}

}