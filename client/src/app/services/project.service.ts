import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiRespose,SuccessRespose } from "../shared/models/service.response";
import { ProjectModel } from "../shared/models/common.models";
@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) {}

  //get project list
  get(param = {},success) {
    this.http
      .get("projects", {params: param})
      .subscribe((response: ApiRespose<ProjectModel>) => {
        console.log(response);
        success(response);
      });
  }

    //delete project list
    delete(id,success) {
      this.http
        .delete("projects/"+id)
        .subscribe((response: ApiRespose<ProjectModel>) => {
          console.log(response);
          success(response);
        });
    }
  //create new project
  post(param = {},success){
    this.http.post("projects",param)
    .subscribe(
      (res:ApiRespose<ProjectModel>)=> success(res), error => console.log(error)
    );
  }
  //update new project
  put(param,success){
    this.http.put("projects/"+param.id,param)
    .subscribe(
      (res:ApiRespose<ProjectModel>)=> success(res), error => console.log(error)
    );
  }
}
