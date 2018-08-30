import { Component, OnInit } from "@angular/core";
import { AngularTokenService, SignInData } from "angular-token";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd";

@Component({
  selector: "project",
  templateUrl: "project.add.component.html",
  styleUrls: ["project.add.component.css"]
})
export class ProjectAddComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  createForm() {
    this.validateForm = this.fb.group({
      projectName: [null, [Validators.required]],
      description: [null],
      passwordConfirm: [null, [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.createForm();
  }
}
