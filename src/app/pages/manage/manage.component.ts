import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { ManageService } from 'src/app/core/services/manage.service';
import Swal from 'sweetalert2';
import { ToastService } from '../extended/notifications/toast-service';
import { MustMatch } from '../form/validation/validation.mustmatch';
import { dataTableSortableDirective, } from '../tables/datatable/datatable-sortable.directive';
import { Table } from '../tables/datatable/datatable.model';
import { DataTableService } from '../tables/datatable/datatable.service';
import { Chapater } from './chapater.model';
import { Std } from './standard.model';
import { Subject } from './subject.model';
import { Syllabus } from './syllabus.model';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  providers: [DataTableService, DecimalPipe]
})
export class ManageComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  tableData!: Table[];
  hideme: boolean[] = [];
  tables$: Observable<Table[]>;
  total$: Observable<number>;


  submitstdflag = false;
  submitsubflag = false;
  submitchpflag = false;
  submitsyllabusflag = false;

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

  public chapModel: Chapater = new Chapater;
  public chapater: Chapater[] = [];
  valu = 0;


  chapId: any;
  selectedChap: any;
  public syllabusModel: Syllabus = new Syllabus;
  public syllabusList: Syllabus[] = [];
  editSyll: Syllabus[] = [];
  // imageError: string;
  // isImageSaved: boolean = true;
  cardImageBase64: string | undefined;
  syllabusId: any;
  image: any;
  safeURL: any;
  vTitle: any;
  relatedChapId: any;
  relatedSyllabusVideo: any = [];

  standardForm!: FormGroup;
  subjectForm!: FormGroup;
  chapaterForm!: FormGroup;
  syllabusForm!: FormGroup;

  tooltipvalidationform!: FormGroup;
  validationForm!: FormGroup;
  specificValidationForm!: FormGroup;
  rangeValidationForm!: any;

  constructor(
    private manageService: ManageService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastService: ToastService,
    public service: DataTableService
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
    this.getStdList();
    this.openStd = true;
  }

  ngOnInit(): void {

    this.breadCrumbItems = [

      { label: 'Pages' },
      { label: 'Manage', active: true }
    ];
    this.validationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      age: [10, [Validators.required, Validators.min(14)]],
      password: ['', Validators.required],
      confirmpwd: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmpwd'),

    });
    this.standardForm = this.formBuilder.group({
      stdname: ['', Validators.required],
    });
    this.subjectForm = this.formBuilder.group({
      sname: ['', Validators.required],
    });
    this.chapaterForm = this.formBuilder.group({
      chapname: ['', Validators.required],
    })
    this.syllabusForm = this.formBuilder.group({
      videoTitle: ['', Validators.required],
      descripition: ['', Validators.required],
      videoLength: ['', Validators.required],
      link: ['', Validators.required],
      image: ['', Validators.required],

    })

    this._fetchData();
    this.addSubjects = [{ name: this.val }];
    this.val++;
    this.addChapt = [{ name1: this.valu }]
    this.valu++;
  }

  /**
   * fetches the table value
   */
  _fetchData() {
    this.tableData = this.tableData;
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort(e: any) {
    // resetting other headers
    // this.headers.forEach(header => {
    //   if (header.sortable !== column) {
    //     header.direction = '';
    //   }
    // });
    // this.service.sortColumn = column;
    // this.service.sortDirection = direction;
  }


  get f() { return this.validationForm.controls; }
  get s() { return this.standardForm.controls; }
  get sub() { return this.subjectForm.controls; }
  get chap() { return this.chapaterForm.controls; }
  get syll() { return this.syllabusForm.controls; }

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
    this.selectedStd = 'Select Standard';
  }
  manageChapater() {
    this.openStd = false;
    this.openSubject = false;
    this.openChapater = true;
    this.openSyllabus = false;
    this.openPlayer = false;
    this.selectedStd = 'Select Standard';
    this.selectedSub = 'Select Subject';
  }
  manageSyllabus() {
    this.openStd = false;
    this.openSubject = false;
    this.openChapater = false;
    this.openSyllabus = true;
    this.openPlayer = false;
    this.selectedStd = 'Select Standard';
    this.selectedSub = 'Select Subject';
    this.selectedChap = 'Select Chapater';
    this.getSyllabusList();

  }
  //--------------------------------------Standard Fuctionallity Start Here-------------------------------------

  addStdList() {
    this.submitstdflag = true;
    this.StdModel.isactive = true;
    if (this.standardForm.valid) {
      this.manageService.saveStdList(this.StdModel).subscribe((response) => {
        if (response == 'success') {
          debugger
          this.toastService.show('Subject added Successfully.', { classname: 'bg-success text-center text-white', delay: 10000 });
          this.getStdList();
        }
      })
    }

  }
  getStdList() {

    this.manageService.getStdList().subscribe((data: any) => {
      this.STD = data;

      for (let i = 0; i < this.STD.length; i++) {
        this.STD[i].index = i + 1;

      }
    });
  }

  removeStandard(id: any) {
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
        this.manageService.removeStdList(id).subscribe((req) => {

        })
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.getStdList();
      }
    });
  }
  editStandard(data: any, largeDataModal: any) {
    debugger
    this.modalService.open(largeDataModal, { size: 'lg', windowClass: 'modal-holder', centered: true });
    this.editStd = data;
  }
  updateStandardList(data: any) {

    this.manageService.updateStdList(data).subscribe((req) => {
      // this.apiService.showNotification('top', 'right', 'Standard updated Successfully.', 'success');
    })

  }
  addSubjectFromTable(id: any) {
    debugger
    this.selectSTDList(id);
    this.openStd = false;
    this.openSubject = true;
    this.openChapater = false;
    this.openSyllabus = false;
    this.openPlayer = false;
  }


  //--------------------------------------Subject Fuctionallity Start Here--------------------------------------
  addSubjectList() {
    this.val++;
    this.addSubjects.push({ name: this.val });

  }
  removeSubjectList(val: any) {
    this.addSubjects.splice(val, 1);
  }
  getSubject(id: any) {
    this.manageService.getSubjectList(id).subscribe((data: any) => {
      this.subjects = data;
      for (let i = 0; i < this.subjects.length; i++) {
        this.subjects[i].index = i + 1;
      }
    });
  }
  selectSTDList(id: any) {
    this.stdId = id;
    debugger
    this.getSubject(this.stdId);
    this.STD.forEach(element => {
      if (element.id == id) {
        this.selectedStd = element.stdname;
      }
    })
  }
  saveSubject(data: any) {
    debugger
    this.submitsubflag = true;

    if (this.subjectForm.valid) {
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

  }
  editSubject(data: any, subjectUpdate: any) {
    this.modalService.open(subjectUpdate, { size: 'lg', windowClass: 'modal-holder', centered: true });
    this.editSub = data;
  }
  updateSubject(data: any) {
    this.manageService.updateSubjectList(data).subscribe((req) => {
      this.toastService.show('Subject updated Successfully.', { classname: 'bg-success text-center text-white', delay: 10000 });
      this.getSubject(this.stdId);
    })
  }
  removeSubject(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete! If you delete subjects than all the questions will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.manageService.removeSubjectList(id).subscribe((req) => {

        })
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.getSubject(this.stdId);
      }
    });



  }
  addChapaterFromTable(id: any) {

    this.openStd = false;
    this.openSubject = false;
    this.openChapater = true;
    this.openSyllabus = false;
    this.openPlayer = false;
    this.selectSubjectList(id);
  }

  //--------------------------------------Subject Fuctionallity End Here-----------------------------------------

  //------------------------------------Chapater Fuctionallity Start Here----------------------------------------
  addChapList() {
    this.valu++;
    this.addChapt.push({ name1: this.valu });
  }
  removeChapList(valu: any) {
    this.addChapt.splice(valu, 1);
  }
  selectSubjectList(id: any) {
    this.subId = id;
    this.getSubject(this.stdId);
    this.subjects.forEach(element => {
      if (element.id == id) {
        this.selectedSub = element.subject;
      }
    })
    this.getChapaters();
  }
  saveChapatersList(data: any) {
    debugger
    this.submitchpflag = true;
    if (this.chapaterForm.valid) {
      this.chaptList = [];
      this.addChapt.forEach((element: any) => {
        let data = {
          chapName: element.chap,
        }
        this.chaptList.push(data)
      });
      this.chapModel.chapList = this.chaptList;
      this.chapModel.stdid = this.stdId;
      this.chapModel.subid = this.subId;
      this.chapModel.isactive = true;

      this.manageService.addChapaters(this.chapModel).subscribe((data: any) => {
        if (data == 'success') {
          // this.apiService.showNotification('top', 'right', 'Chapter added Successfully.', 'success');

          this.getChapaters();
        }
        else {
          // this.apiService.showNotification('top', 'center', 'Chapter added Already.', 'danger');
        }

      })
    }

  }
  getChapaters() {
    this.manageService.getChapatersList(this.subId).subscribe((data: any) => {
      this.chapater = data;
      for (let i = 0; i < this.chapater.length; i++) {
        this.chapater[i].index = i + 1;
      }
    });
  }
  editChapater(data: any,chapaterUpdate:any) {
    this.modalService.open(chapaterUpdate, { size: 'lg', windowClass: 'modal-holder', centered: true });
    this.chapModel = data;
  }
  updateChapaterList() {
    this.manageService.updateChapaterList(this.chapModel).subscribe((req) => {
      // this.apiService.showNotification('top', 'right', 'Chapater updated Successfully.', 'success');
      this.getChapaters();
    })
  }
  removeChapater(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.manageService.removeChapaterList(id).subscribe((req) => {

        })
        Swal.fire('Deleted!', 'Your Chapater has been deleted.', 'success');
        this.getChapaters();
      }
    });


  }
  addSyllabusFromTable(id: any) {
    this.openStd = false;
    this.openSubject = false;
    this.openChapater = false;
    this.openSyllabus = true;
    this.openPlayer = false;
    this.selectChapaterList(id);
    this.getSyllabusList();
  }

  //------------------------------------Chapater Fuctionallity Start Here----------------------------------------
  //------------------------------------Syllabus Fuctionallity Start Here----------------------------------------
  selectChapaterList(id: any) {
    this.chapId = id;
    this.getChapaters();
    this.chapater.forEach(element => {
      if (element.id == id) {
        this.selectedChap = element.chapname;
      }
    })
  }

  addSyllabusList() {
    this.submitsyllabusflag = true;
    if (this.syllabusForm.valid) {
      this.syllabusModel.stdid = this.stdId;
      this.syllabusModel.subid = this.subId;
      this.syllabusModel.chapid = this.chapId;
      this.syllabusModel.isactive = true;
      this.syllabusModel.image = this.image;
      this.manageService.saveSyllabusList(this.syllabusModel).subscribe((response) => {
        // this.apiService.showNotification('top', 'right', 'Syllabus Added Successfully.', 'success');
        this.getSyllabusList();
      })
    }

  }
  getSyllabusList() {
    this.manageService.getAllSyllabusList().subscribe((data: any) => {
      this.syllabusList = data;
      for (let i = 0; i < this.syllabusList.length; i++) {
        this.syllabusList[i].index = i + 1;
      }
    });
  }
  editSyllabus(data: any, videoModal: any) {
    this.modalService.open(videoModal, { size: 'fullscreen', windowClass: 'modal-holder' });
    // this.modalService.open(videoModal, { size: 'lg', windowClass: 'modal-holder', centered: true });
    this.editSyll = data;
    this.safeURL = data.videolink;
    this.vTitle = data.videotitle;

  }
  updateSyllabus(data:any,syllabusUpdate:any){
    this.modalService.open(syllabusUpdate, {size: 'lg', windowClass: 'modal-holder', centered: true  });
  }
  removeSyllabusList(id: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.manageService.removeSyllabusList(id).subscribe((req) => {
        })
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.getSyllabusList();
      }
    });

  }
  selectedSyllabusImage(event: any) {

    // let max_height;
    // let max_width;
    // if (event.target.files && event.target.files[0]) {
    //   const file = event.target.files[0];
    //   const max_size = 20971520;
    //   const allowed_types = ['image/png', 'image/jpeg'];

    //   max_height = 300;
    //   max_width = 300;

    //   if (event.target.files[0].size > max_size) {
    //     this.imageError =
    //       'Maximum size allowed is ' + max_size / 1000 + 'Mb';

    //     return false;
    //   }
    //   const reader = new FileReader();
    //   reader.onload = (e: any) => {
    //     const image = new Image();
    //     image.src = e.target.result;
    //     image.onload = rs => {
    //       const img_height = rs.currentTarget['height'];
    //       const img_width = rs.currentTarget['width'];
    //       console.log(img_height, img_width);
    //       if (img_height > max_height && img_width > max_width) {
    //         alert("image must be " + max_height + "*" + max_width);
    //         this.isImageSaved = false;
    //         this.imageError =
    //           'Maximum dimentions allowed ' +
    //           max_height +
    //           '*' +
    //           max_width +
    //           'px';


    //         return false;
    //       } else {
    //         const imgBase64Path = e.target.result;
    //         this.cardImageBase64 = imgBase64Path;

    //         const formdata = new FormData();
    //         formdata.append('file', file);


    //         this.manageService.uploadSyllabusImage(formdata).subscribe((response) => {
    //           this.image = response;

    //           console.log(response);
    //           this.isImageSaved = true;


    //         })
    //       }
    //     };
    //   };

    //   reader.readAsDataURL(event.target.files[0]);
    // }

  }
  onFileChange(event: any) {
    debugger
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const imgBase64Path = event.target.result;
      this.cardImageBase64 = imgBase64Path;
      debugger
      const formdata = new FormData();
      formdata.append('file', file);


      this.manageService.uploadSyllabusImage(formdata).subscribe((response) => {
        this.image = response;

        console.log(response);
        // this.isImageSaved = true;
        this.syllabusForm.patchValue({
          fileSource: file

        });
      })
    }
  }
  //------------------------------------Syllabus Fuctionallity End Here----------------------------------------
}