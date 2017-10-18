import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { EarmbaConstantes } from '../../app/EarmbaConstantes';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials, type){
    
        return new Promise((resolve, reject) =>{
          let headers = new Headers();
          
          this.http.post(EarmbaConstantes.BASE_URL + '/' +type, credentials, {headers: headers}).
          subscribe(res =>{
            resolve(res.json());
          }, (err) =>{
            reject(err.json());
          });
    
        });
    
      }

      getData(credentials, type){
        
            return new Promise((resolve, reject) =>{
              let headers = new Headers();
              
              /*this.http.get(EarmbaConstantes.BASE_URL + '/' +type, credentials).
              subscribe(res =>{
                resolve(res);
                console.log("res");
              }, (err) =>{
                reject(err.json());console.log("rej");
                
              });
*/
              this.http.get(EarmbaConstantes.BASE_URL + '/' +type, credentials).map(res => res.json())
              .subscribe(
                data => {
                  resolve(data);
                  console.log("data");
                }, 
                err => {
                  reject(err);console.log("rej");
                }
              );
        
            });

          
        
          }      

}
