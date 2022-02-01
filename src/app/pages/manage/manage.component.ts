import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/api.service';
import { ManageService } from 'src/app/core/services/manage.service';
import Swal from 'sweetalert2';
import { ToastService } from '../extended/notifications/toast-service';
import { MustMatch } from '../form/validation/validation.mustmatch';
import { dataTableSortableDirective, SortEvent } from '../tables/datatable/datatable-sortable.directive';
import { DataTableService } from '../tables/datatable/datatable.service';
import { Chapater } from './chapater.model';
import { Std } from './standard.model';
import { Subject } from './subject.model';
import { Syllabus } from './syllabus.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  @ViewChildren(dataTableSortableDirective)



  submitted = false;
  openStd: boolean = false;
  openSubject: boolean = false;
  openChapater: boolean = false;
  openSyllabus: boolean = false;
  openPlayer: boolean = false;
  //-----------------------------------Stanadard Module---------------------------------------------------------
  public StdModel: Std = new Std;
  public STD: Std[] = [];
  public editStd: Std[] = [];

  public SubjectModel: Subject = new Subject;
  public std: Std[] = [];
  public subjects: Subject[] = [];
  val = 0;
  selectedStd: any;
  selectedSub: any;
  stdId: any;
  subId: any;
  Ref_id: any;
  editSub: Subject[] = [];
  addSubjects: any = [];
  addChapt: any = [];
  chaptList: any = [];

  headers!: QueryList<dataTableSortableDirective>;
  tableData!: Std[];
  hideme: boolean[] = [];
  // tables$: Observable<Std[]>;
  // total$: Observable<number>;

  public chapModel: Chapater = new Chapater;
  public chapater: Chapater[] = [];
  valu = 0;


  chapId: any;
  selectedChap: any;
  public syllabusModel: Syllabus = new Syllabus;
  public syllabusList: Syllabus[] = [];
  editSyll: Syllabus[] = [];
  // imageError: string;
  isImageSaved: boolean = true;
  // cardImageBase64: string;
  syllabusId: any;
  image: any;
  safeURL: any;
  vTitle: any;
  relatedChapId: any;
  relatedSyllabusVideo: any = [];
  validationform!: FormGroup;
  tooltipvalidationform!: FormGroup;
  validationForm!: FormGroup;
  specificValidationForm!: FormGroup;
  rangeValidationForm!: any;

  constructor(
    private manageService: ManageService,
    private apiService: ApiService,
    private _sanitizer: DomSanitizer,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastService: ToastService
    // public serviceDataTable: DataTableService
  ) {
    // this.tables$ = serviceDataTable.tables$;
    // this.total$ = serviceDataTable.total$;
  }

  ngOnInit(): void {

    this.breadCrumbItems = [
      { label: 'Pages' },
      { label: 'Manage', active: true }
    ];
    this.validationForm = this.formBuilder.group({
      stdname: ['', Validators.required],
      sname:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [10, [Validators.required, Validators.min(14)]],
      password: ['', Validators.required],
      confirmpwd: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmpwd'),

    });

  }
  get f() { return this.validationForm.controls; }
  manageStd() {
    this.openStd = true;
    this.openSubject = false;
    this.openChapater = false;
    this.openSyllabus = false;
    this.openPlayer = false;
    this.getStdList();
  }
  manageSubject() {
    this.openStd = false;
    this.openSubject = true;
    this.openChapater = false;
    this.openSyllabus = false;
    this.openPlayer = false;
  }
  manageChapater() {
    this.openStd = false;
    this.openSubject = false;
    this.openChapater = true;
    this.openSyllabus = false;
    this.openPlayer = false;
  }
  manageSyllabus() {
    this.openStd = false;
    this.openSubject = false;
    this.openChapater = false;
    this.openSyllabus = true;
    this.openPlayer = false;
    // this.getSyllabusList();

  }
  //--------------------------------------Standard Fuctionallity Start Here-------------------------------------

  addStdList() {
    this.submitted = true;
    this.StdModel.isactive = true;
    this.manageService.saveStdList(this.StdModel).subscribe((response) => {
      this.getStdList();
    })
  }
  getStdList() {

    this.manageService.getStdList().subscribe((data: any) => {
      this.STD = data;

      for (let i = 0; i < this.STD.length; i++) {
        this.STD[i].index = i + 1;
      }
    });
  }
  _fetchData() {
    this.tableData = this.tableData;
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    // this.serviceDataTable.sortColumn = column;
    // this.serviceDataTable.sortDirection = direction;
  }
  extraLarge(exlargeModal: any) {
    this.modalService.open(exlargeModal, { size: 'xl', windowClass: 'modal-holder', centered: true });
  }
  removeStandard() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete! If you delete Standard than all the subjects and questions will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.manageService.removeStdList().subscribe((req) => {

        })
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.getStdList();
      }
    });
  }
  editStandard(data:any) {
    this.editStd = data;
  }
  updateStandardList(data:any) {

    this.manageService.updateStdList(data).subscribe((req) => {
      // this.apiService.showNotification('top', 'right', 'Standard updated Successfully.', 'success');
    })

  }


  //--------------------------------------Subject Fuctionallity Start Here--------------------------------------
  addSubjectList() {
    this.val++;
    this.addSubjects.push({ name: this.val });
  }
  removeSubjectList(val:any) {
    this.addSubjects.splice(val, 1);
  }
  getSubject(id:any) {
    this.manageService.getSubjectList(id).subscribe((data: any) => {
      this.subjects = data;
      for (let i = 0; i < this.subjects.length; i++) {
        this.subjects[i].index = i + 1;
      }
    });
  }
  selectSTDList(id:any) {
    this.stdId = id;
    this.getSubject(this.stdId);
    this.STD.forEach(element => {
      if (element.id == id) {
        this.selectedStd = element.stdname;
      }
    })
  }
  saveSubject(data:any) {
    this.addSubjects.forEach((element: { id: any; }) => {
      element.id = this.stdId
    });
    this.manageService.addSubject(this.addSubjects).subscribe((data: any) => {
      if (data == 'success') {
        this.addSubjects = [{ name: this.val }];
        this.toastService.show('Subject added Successfully.', { classname: 'bg-success text-center text-white', delay: 10000 });
        this.getSubject(this.stdId);
      }
      else {
        this.toastService.show('Subject Already Added.', { classname: 'bg-danger text-center text-white', delay: 10000 });
      }

    })
  }
  editSubject(data:any) {
    this.editSub = data;
  }
  updateSubject(data:any) {
    this.manageService.updateSubjectList(data).subscribe((req) => {
       this.toastService.show('Subject updated Successfully.', { classname: 'bg-success text-center text-white', delay: 10000 });
      this.getSubject(this.stdId);
    })
  }
  removeSubject(id:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete!",
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Yes',
      buttonsStyling: false
    }).then((result) => {
      if (result.value == true) {
        this.manageService.removeSubjectList(id).subscribe((req) => {
          this.toastService.show('Subject removed Successfully.', { classname: 'bg-success text-center text-white', delay: 10000 });
        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your standard has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getSubject(this.stdId);
      }
    })


  }
  addChapaterFromTable(id:any) {

    this.openStd = false;
    this.openSubject = false;
    this.openChapater = true;
    this.openSyllabus = false;
    this.openPlayer = false;
    // this.selectSubjectList(id);
  }

  //--------------------------------------Subject Fuctionallity End Here-----------------------------------------
}