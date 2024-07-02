import {Component, ElementRef, ViewChild} from '@angular/core';
import {TituloComponent} from "../../components/titulo/titulo.component";
import {MenuItem} from "primeng/api";
import {CardModule} from "primeng/card";
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-qeq',
  standalone: true,
  imports: [
    TituloComponent,
    CardModule,
    ChipsModule,
    FormsModule,
    Button,
    TableModule
  ],
  templateUrl: './qeq.component.html',
  styleUrl: './qeq.component.scss'
})
export class QeqComponent {
  titulo: string = 'Carga masiva QeQ';
  breadcrumbs: MenuItem[] = [{ label: 'Carga  masiva QeQ' }];
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>
  value = '';
  dummyData = [
    {
      field1: 'campo 1',
      field2: 'campo 2',
      field3: 'campo 3',
    },
    {
      field1: 'campo 1',
      field2: 'campo 2',
      field3: 'campo 3',
    },
    {
      field1: 'campo 1',
      field2: 'campo 2',
      field3: 'campo 3',
    },
    {
      field1: 'campo 1',
      field2: 'campo 2',
      field3: 'campo 3',
    },

  ];

  handleChange(event: any) {
    const file = event.target.files[0];
    this.value = file.name;
  }

  triggerFileSelection() {
    this.fileInput.nativeElement.click()
  }
}
