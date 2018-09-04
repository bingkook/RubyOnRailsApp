import { Component, OnInit, Input } from "@angular/core";
import { AngularTokenService, SignInData } from "angular-token";
import * as fecha from "fecha";

import {
  HttpErrorResponse,
  HttpResponse,
  HttpClient
} from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd";
import { ProjectService } from "../../services/project.service";

@Component({
  selector: "project",
  templateUrl: "project.add.component.html",
  styleUrls: ["project.add.component.css"]
})
export class ProjectAddComponent implements OnInit {
  validateForm: FormGroup;

  public views = {
    id: 0,
    name: "",
    description: "",
    start_at: "",
    end_at: "",
    dateRange: null
  };
  public params = {
    isEdit: false
  };
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private projectService: ProjectService,
    private notification: NzNotificationService
  ) {}

  @Input()
  set isEdit(status: boolean) {
    this.params.isEdit = status;
  }

  @Input()
  set dateItem(data: any) {
    if (data != null) {
      this.views.name=data.name;
      this.views.id=data.id;
      this.views.description=data.description;
      this.views.dateRange = [data.start_at, data.end_at];
    }
    console.log(this.views);
  }
  createForm() {
    this.validateForm = this.fb.group({
      projectName: [null, [Validators.required]],
      dateRange: [null, [Validators.required]],
      description: [null]
    });
  }

  getParam() {
    let model = this.validateForm.value;
    if (model.dateRange != null) {
      this.views.start_at = fecha.format(
        new Date(model.dateRange[0]),
        "YYYY-MM-DD"
      );
      this.views.end_at = fecha.format(
        new Date(model.dateRange[1]),
        "YYYY-MM-DD"
      );
    }
    this.views.description = model.description;
    this.views.name = model.projectName;

    return this.views;
  }

  saveProject(success, error) {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      if (!this.params.isEdit) {
        this.projectService.post(this.getParam(), res => {
          if (res.ok) {
            success();
          } else {
            this.notification.create(
              "error",
              "create failed",
              "Error:" + res.error
            );
          }
        });
      } else {
        this.projectService.put(this.getParam(), res => {
          if (res.ok) {
            success();
          } else {
            this.notification.create(
              "error",
              "update failed",
              "Error:" + res.error
            );
          }
        });
      }
    } else {
      error("Not valid form, please check.");
      return;
    }
  }
  ngOnInit(): void {
    this.createForm();
  }
}
