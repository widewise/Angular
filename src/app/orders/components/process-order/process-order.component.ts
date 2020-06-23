import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from './../../../cart/services/cart.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CustomValidators } from '../../../shared/validators/custom.validators';

@Component({
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.css']
})
export class ProcessOrderComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  placeholder = {
    firstName: 'First Name (required)',
    lastName: 'Last Name',
    email: 'Email (required)',
    phone: 'Phone',
    address: 'Address'
  };
  validationMessages = {
    email: '',
    firstName: ''
  };

  minFirstNameLength = 5;
  maxFirstNameLength = 10;

  private sub: Subscription;
  private validationMessagesMap = {
    firstName: {
      userNameLength: `Please enter first name with invalid length: from ${this.minFirstNameLength} to ${this.maxFirstNameLength}.`
    },
    email: {
      required: 'Please enter your email address.',
      pattern: 'Please enter a valid email address.',
      email: 'Please enter a valid email address.',
      asyncEmailInvalid:
        'This email already exists. Please enter other email address.'
    }
  };

  constructor(
    private router: Router,
    private cartService: CartService,
    private fb: FormBuilder
  ) {}

  get phones(): FormArray {
    return this.userForm.get('phones') as FormArray;
  }

  ngOnInit(): void {
    this.buildForm();
    this.watchValueChanges();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBlur() {
    const emailControl = this.userForm.get('email');
    this.setValidationMessage(emailControl, 'email');
  }

  onAddPhone(): void {
    this.phones.push(this.buildPhone());
  }

  onRemoveAddress(index: number): void {
    this.phones.removeAt(index);
  }

  onSave() {
    this.cartService.removeAllProducts();
    this.router.navigate(['/products-list']);
  }

  onGoBack(): void {
    this.router.navigate(['/cart']);
  }

  private buildForm() {
    this.userForm = this.fb.group({
      firstName: this.fb.control('',
      {
        validators: [
          Validators.required,
          CustomValidators.userNameValidator(this.minFirstNameLength, this.maxFirstNameLength)
        ],
        updateOn: 'blur'
      }),
      lastName: '',
      email: ['',
          [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'), Validators.email]
      ],
      phones: this.fb.array([this.buildPhone()]),
      isCollect: true,
      address: ''
    });
  }

  private buildPhone(): FormGroup {
    // тут не обязательно группу создавать, можно и контрол дублировать
    return this.fb.group({
      phone: ''
    });
  }

  private watchValueChanges() {
    const emailControl = this.userForm.get('email');
    this.sub = emailControl.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value =>
        this.setValidationMessage(emailControl, 'email')
    );
    const firstNameControl = this.userForm.get('firstName');
    const sub = firstNameControl.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value =>
        this.setValidationMessage(firstNameControl, 'firstName')
    );
    this.sub.add(sub);
  }

  private setValidationMessage(c: AbstractControl, controlName: string) {
    this.validationMessages[controlName] = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.validationMessages[controlName] = Object.keys(c.errors)
        .map(key => this.validationMessagesMap[controlName][key])
        .join(' ');

      console.log(`Validation message fot control '${controlName}': ${this.validationMessages[controlName]}`);
    }
  }
}
