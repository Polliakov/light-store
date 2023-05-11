import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalAcceptComponent } from 'src/app/modules/shared/components/modal-accept/modal-accept.component';
import { nonWhitespaceOrNull } from 'src/app/modules/shared/validators/non-wihitespace-or-null-validator';
import { phoneNumber } from 'src/app/modules/shared/validators/phone-number';
import { WarehouseService } from '../../services/warehouse.service';

@Component({
  selector: 'app-warehouses-editor-tab',
  templateUrl: './warehouses-editor-tab.component.html',
  styleUrls: ['./warehouses-editor-tab.component.scss']
})
export class WarehousesEditorTabComponent implements OnInit {
  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  form: FormGroup = new FormGroup({
    name: new FormControl<string>('', [
      nonWhitespaceOrNull(),
      Validators.minLength(2),
      Validators.maxLength(64)
    ]),
    address: new FormControl<string>('', [
      nonWhitespaceOrNull(),
      Validators.minLength(2),
      Validators.maxLength(64)
    ]),
    phoneNumber: new FormControl<number>(null!, [
      Validators.required,
      phoneNumber()
    ])
  });

// #region getters
  get name() {
    return this.form.controls.name;
  }
  get address() {
    return this.form.controls.address;
  }
  get phoneNumber() {
    return this.form.controls.phoneNumber;
  }
// #endregion

  @ViewChild('modalDelete') modalDelete: ModalAcceptComponent;

  warehouseId: string;
  warehouseName: string;
  image: File;

  isEditMode = false;
  loading = false;
  isBtnSubmitDisabled = false;

  ngOnInit(): void {
    const warehouseId = this.route.snapshot.paramMap.get('id')
    if (!warehouseId) return;

    this.loading = true;
    this.isEditMode = true;
    this.warehouseId = warehouseId;
    this.warehouseService.get(warehouseId).subscribe({
      next: dto => {
        let {imageUri, id, ...warehouse} = dto;

        this.form.setValue(warehouse);
        this.warehouseName = warehouse.name;
        this.loading = false;
      }
    })
  }

  onImageSelected(image: File) {
    if (!image) return;
    this.image = image;
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isBtnSubmitDisabled = true;

    let dto = this.form.value;
    dto.phoneNumber = this.parsePhoneNumber(dto.phoneNumber);

    if (this.isEditMode) {
      dto.id = this.warehouseId;
      this.warehouseService.update(dto, this.image).subscribe({
        next: () => this.router.navigate(['../../warehouses'], { relativeTo: this.route })
      });
    }
    else {
      this.warehouseService.create(dto, this.image).subscribe({
        next: () => this.router.navigate(['../warehouses'], { relativeTo: this.route })
      });
    }
  }

  onBtnDeleteClick() {
    this.modalDelete.show();
  }

  modalDeleteAccept() {
    this.isBtnSubmitDisabled = true;
    this.warehouseService.delete(this.warehouseId).subscribe({
      next: () => this.router.navigate(['../../warehouses'], { relativeTo: this.route })
    });
  }

  private parsePhoneNumber(phoneNumber: string): number {
    return parseInt(phoneNumber.replace(/\D/g, ''));
  }
}
