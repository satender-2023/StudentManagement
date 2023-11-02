import { ChangeDetectorRef, NgModule, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

function validateQualification(control: AbstractControl): ValidationErrors | null {
  const providedQualifications = ['B.E./B.Tech', 'BCA', 'B.Sc', 'B.Com', 'BBA', 'B.Arch', 'M.E./M.Tech', 'M.Arch', 'MCA', 'M.Sc', 'MBA', 'M.Com', 'Others'];

  if (providedQualifications.includes(control.value)) {
    return null; // Valid qualification
  } else {
    return { invalidQualification: true }; // Invalid qualification
  }
}
@Component({
  selector: 'app-studentenquiry-popup',
  templateUrl: './studentenquiry-popup.component.html',
  styleUrls: ['./studentenquiry-popup.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class StudentenquiryPopupComponent implements OnInit {
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
  @Output() questionAnswerSaved = new EventEmitter<any>();
  @Output() popupEvent = new EventEmitter();
  @Input() editedItem: any;
  userForm!: FormGroup;
  selectedPhotoUrl: string = '';
  isFormValid: boolean = false;
  selectedImage: any;
  selectedQualification: string = '';
  searchText: string = '';
  private closeTimeout: any;
  selectedItem: string = '';
  photoFieldBlurred: boolean = false;
  selectedEducation: string = '';
  isVisible = false;
  commonErrorMessage: string = '';

  constructor(private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.userForm = this.fb.group({
      Fname: ['', Validators.required],
      Mname: ['', Validators.required],
      Lname: ['', Validators.required],
      Contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Exactly 10 digits
      Email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]], // Email pattern
      Address: ['', Validators.required],
      Qualification: ['', [Validators.required, validateQualification]],
      RequiredCourse: ['', Validators.required],
      Location: ['', Validators.required],
      Eid: ['', Validators.required],
      TestScore: ['', Validators.required],
      Reference: ['', Validators.required],
      Cname: ['', Validators.required],
      Gender: ['', Validators.required],
    });
  }

  // Simulated data GENDER
  data = ['Male', 'Female', 'Others'];

  search = (text$: Observable<string>): Observable<string[]> =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.data.filter(item => item.toLowerCase().includes(term.toLowerCase()))
      )
    );

  // Simulated education data source
  educationData = ['B.E./B.Tech', 'BCA', 'B.Sc', 'B.Com', 'BBA', 'B.Arch', 'M.E./M.Tech', 'M.Arch', 'MCA', 'M.Sc', 'MBA', 'M.Com', 'Others'];

  searchEducation = (text$: Observable<string>): Observable<string[]> =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.educationData.filter(education => education.toLowerCase().includes(term.toLowerCase()))
      )
    );

  // select photo
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.displayImage(file);
    }
  }

  displayImage(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.selectedImage = event.target.result;
      this.changeDetectorRef.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  openPopup() {
    this.isVisible = true;
  }
  closeAddEditPopup() {
    this.popupEvent.emit('closeQuestionAnswerPopup');
  }
  saveInterviewQuestionAnswer() {
    if (this.userForm.valid) {
      if (this.selectedImage) {
        alert('Student Enquiry submitted successfully!');
      } else {
        alert('Please fill in all required fields!');
      }
    } else {
      alert('Please fill in all required fields!');
    }
  }

  ngOnInit(): void {
  }

  // blur event
  blurEventHandler(event: FocusEvent) {
    const enteredValue = (event.target as HTMLInputElement).value;
    (event.target as HTMLInputElement).classList.remove('invalid-input');

    if (enteredValue.length < 2) {
      this.commonErrorMessage = '*Please enter at least 2 characters!';
      (event.target as HTMLInputElement).classList.add('invalid-input');
    } else {
      this.commonErrorMessage = ''; // Reset the error message
    }
  }
  // blur event photo
  onPhotoFieldBlur() {
    if (!this.selectedImage) {
      this.photoFieldBlurred = true;
    }
  }

}
