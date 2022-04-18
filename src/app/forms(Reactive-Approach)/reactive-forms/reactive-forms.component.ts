import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from '../../custom-validators';


@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm!: FormGroup;
  forbiddenUsernames = ['india', 'america'];

  projectForm!: FormGroup;


  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {

  
    this.projectForm = new FormGroup({
      'projectName': new FormControl(
        null,
        [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('critical'),
    });

    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl('null',[Validators.required, this.forbiddenNames.bind(this)]),
      'email': new FormControl('null', [Validators.required, Validators.email])
      }),      
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    });
    //this.signupForm.valueChanges.subscribe(
//(value) => console.log(value)
    //);

this.signupForm.statusChanges.subscribe(
(status) => console.log(status)
);

    this.signupForm.setValue({
      'userData': {
        'username': 'vanitha',
        'email': 'vanithanagula98@gmail.com'
      },
      'gender': 'female',
      'hobbies': []
    })

    this.signupForm.patchValue({
      'userData': {
        'username': 'harika',
        'email': 'vanithanagula98@gmail.com'
      },
      'gender': 'female',
      'hobbies': []
    })

   
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

 get controls() {
  return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return { 'nameIsForbidden': false };
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        }
        else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSaveProject() {
    console.log(this.projectForm.value);
  }


}
