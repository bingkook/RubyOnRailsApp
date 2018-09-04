import { Component, OnInit } from "@angular/core";
import { AngularTokenService, SignInData } from "angular-token";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { ProjectAddComponent } from "./add/project.add.component";
import { ProjectService } from "../services/project.service";
import swal from "sweetalert2";

@Component({
  selector: "project",
  templateUrl: "project.component.html",
  styleUrls: ["project.component.css"]
})
export class ProjectListComponent implements OnInit {
  allChecked = false;
  indeterminate = false;
  displayData = [];
  public views = {
    total:0,
    projectList: [],
    tableLoading: true
  };

  public params = {
    page: 1,
    pageSize: 3
  };

  currentPageDataChange(
    $event: Array<{
      id:number;
      name: string;
      description: string;
      checked: boolean;
      start_at: Date;
      end_at: Date;
    }>
  ): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    if (this.displayData.length > 0) {
      const allChecked = this.displayData.every(
        value => value.checked === true
      );
      const allUnChecked = this.displayData.every(value => !value.checked);
      this.allChecked = allChecked;
      this.indeterminate = !allChecked && !allUnChecked;
    }
  }

  checkAll(value: boolean): void {
    console.log(value);
    this.displayData.forEach(data => {
      data.checked = value;
    });
    this.refreshStatus();
  }

  addNewProject() {
    const modal = this.modalService.create({
      nzWidth: 800,
      nzTitle: "Add new project",
      nzContent: ProjectAddComponent,
      nzComponentParams: {
        isEdit:false,
        dateItem:null
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
            componentInstance.saveProject(
              res => {
                modal.destroy();
                this.notification.create(
                  "success",
                  "create success",
                  "Create new project success!"
                );
                this.getProjectList();
              },
              () => {}
            );
          }
        }
      ]
    });
  }

  deleteProject(data){
    swal({
      title: "Notice",
      text: "Do you want to delete this record?",
      type: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.projectService.delete(data.id,(response)=>{
          if (response.ok) {
            swal("Success!", "Deleted successful!.", "success");
            this.params.page = 1;
            this.getProjectList();
          } else {
            swal("Failed!", "Delete failed!", "error");
          }
        });
      }
    });
  }

  editProject(data){
    const modal = this.modalService.create({
      nzWidth: 800,
      nzTitle: "Edit project",
      nzContent: ProjectAddComponent,
      nzComponentParams: {
        isEdit:true,
        dateItem:data
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
            componentInstance.saveProject(
              res => {
                modal.destroy();
                this.notification.create(
                  "success",
                  "update success",
                  "update project success!"
                );
                this.getProjectList();
              },
              () => {}
            );
          }
        }
      ]
    });
  }

  getProjectList() {
    this.views.projectList = [];
    this.projectService.get(this.params, response => {
      this.views.tableLoading = false;
      this.views.total=response.data.total;
      response.data.list.forEach(item => {
        console.log("item:" + item);
        this.views.projectList.push({
          id:item.id,
          name: item.name,
          description: item.description,
          start_at: item.start_at,
          end_at: item.end_at,
          checked: false
        });
      });
      console.log("list:" + this.views.projectList);
    });
  }

  constructor(
    private modalService: NzModalService,
    private projectService: ProjectService,
    private notification: NzNotificationService
  ) {
    this.getProjectList();
  }

  ngOnInit(): void {}
}
