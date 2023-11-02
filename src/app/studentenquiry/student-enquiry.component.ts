import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-student-enquiry',
  templateUrl: './student-enquiry.component.html',
  styleUrls: ['./student-enquiry.component.css']
})
export class StudentEnquiryComponent implements OnInit {
  userForm!: FormGroup;
  dtOptions: DataTables.Settings = {
    pageLength: 10,
  };
  dtTrigger: Subject<any> = new Subject<any>();
  currentPage = 1;
  goToPageNumber: number;
  itemsPerPage = 10; // Number of items per page
  totalPages: number = 1;
  pages: number[] = [];
  data: any[] = [
    { column1: 'Value1', column2: 'Value2', column3: 'Value3' },
    // Add more data rows as needed
  ];
  showPopup: boolean = false;
  userPostItems: any[] = [];
  editedItem: any;
  constructor(private formBuilder: FormBuilder,


  ) {
    this.loadData();
    this.goToPageNumber = 1;
  }

  ngOnInit(): void {

    this.buildForm();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: false,
      searching: true,
      lengthChange: true,
      info: false,
      paging: true,
      columnDefs: [
        { targets: [0, 4], orderable: false },
      ],
    };
  }
  openPopup() {
    this.showPopup = true;
    this.editedItem = {}
  }

  closePopup(event: string) {
    if (event == "closeQuestionAnswerPopup") {
      this.showPopup = false;
    }
    else {
      this.showPopup = false;
    }
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  disableSorting(event: MouseEvent): void {
    event.preventDefault();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  private loadData() {
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePage();
  }

  // Go to the specified page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  // Go to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  // Go to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  // Update DataTable options to reflect the current page
  private updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      agencyName: ['', [Validators.required, Validators.minLength(3)]],
      customsCode: ['', [Validators.required, Validators.minLength(3)]],
      creationDateFrom: ['', Validators.required],
      agencyType: ['', Validators.required],
      status: ['', Validators.required],
      establishmentId: ['', [Validators.required, Validators.minLength(3)]],
      creationDateTo: ['', Validators.required],
    });
  }

 

  blurEventHandler(event: FocusEvent) {
    (event.target as HTMLInputElement).classList.remove('invalid-input');
    const enteredValue = (event.target as HTMLInputElement).value;
    if (enteredValue.length < 3) {
      (event.target as HTMLInputElement).classList.add('invalid-input');
    }
  }
  resetForm() {
    this.userForm.reset();
  }

}
