import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../extended/notifications/toast-service';
import { DataTableService } from '../../tables/datatable/datatable.service';
import { Teacher } from '../Teacher.model';

@Component({
  selector: 'app-registerteacher',
  templateUrl: './registerteacher.component.html',
  styleUrls: ['./registerteacher.component.scss']
})
export class RegisterteacherComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  teacherForm!: FormGroup;
  submitteacherflag = false;
  gender: any = '';
  get teach() { return this.teacherForm.controls; }
  selectValue = ['Alaska', 'Hawaii', 'California', 'Nevada', 'Oregon', 'Washington', 'Arizona', 'Colorado', 'Idaho', 'Montana', 'Nebraska', 'New Mexico', 'North Dakota', 'Utah', 'Wyoming', 'Alabama', 'Arkansas', 'Illinois', 'Iowa'];

  public teacherModel: Teacher = new Teacher;
  public teacherList: Teacher[] = [];

  constructor(
    // private manageService: ManageService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastService: ToastService,
    // public service: DataTableService
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [

      { label: 'Registration' },
      { label: 'Teacher', active: true }
    ];
    this.teacherForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      qualification: ['', Validators.required],
      contact: ['', Validators.required],
      whatsapp: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], confirmpwd: ['', Validators.required]
    })
  }
  saveTeacherDetail() {
    this.submitteacherflag = true;
    if (this.teacherForm.valid) {
      // this.syllabusModel.stdid = this.stdId;
      // this.syllabusModel.subid = this.subId;
      // this.syllabusModel.chapid = this.chapId;
      // this.syllabusModel.isactive = true;
      // this.syllabusModel.image = this.image;
      // this.manageService.saveSyllabusList(this.syllabusModel).subscribe((response) => {
      //   // this.apiService.showNotification('top', 'right', 'Syllabus Added Successfully.', 'success');
      //   this.getSyllabusList();
      // })
    }

  }
  addTeacher() { }
}
