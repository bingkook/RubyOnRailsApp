import { Component, OnInit } from "@angular/core";
import { AngularTokenService, SignInData } from "angular-token";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import {  ProjectAddComponent } from "./add/project.add.component";

@Component({
  selector: "project",
  templateUrl: "project.component.html",
  styleUrls: ["project.component.css"]
})
export class ProjectListComponent implements OnInit {
 constructor(private modalService: NzModalService){}
  allChecked = false;
  indeterminate = false;
  displayData = [];
  data = [
    {
      name    : 'John Brown',
      age     : 32,
      address : 'New York No. 1 Lake Park',
      checked : false,
      disabled: false
    },
    {
      name    : 'Jim Green',
      age     : 42,
      address : 'London No. 1 Lake Park',
      checked : false,
      disabled: false
    },
    {
      name    : 'Joe Black',
      age     : 32,
      address : 'Sidney No. 1 Lake Park',
      checked : false,
      disabled: false
    },
    {
      name    : 'Disabled User',
      age     : 32,
      address : 'Sidney No. 1 Lake Park',
      checked : false,
      disabled: true
    }
  ];

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
 
  addNewProject(){
    const modal = this.modalService.create({
      nzWidth: 800,
      nzTitle:"Add new project",
      nzContent: ProjectAddComponent,
      nzComponentParams: {
 
      },
      nzFooter: [
        {
          label: "Cancel",
          onClick: () => {
            modal.close();
          }
        },
        {
          label: "Save",
          type: "primary",
          onClick: componentInstance => {
            const that = this;

          }
        }
      ]
    });
  }
  ngOnInit(): void {
   
  }
}
