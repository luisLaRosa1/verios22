import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnChanges, OnInit, SimpleChanges, inject, signal } from '@angular/core';
import { TituloComponent } from '../../components/titulo/titulo.component';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppConsts } from '../../../helpers/app.constants';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TableModule } from 'primeng/table';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITarifaAddRequest } from '../../../services/reglas/tarifas/commands/tarifas.commands.Interface';
import { ButtonModule } from 'primeng/button';
import { TarifasQueriesService } from '../../../services/reglas/tarifas/queries/tarifas.queries.service';
import { ITarifaResult } from '../../../services/reglas/tarifas/queries/tarifas.queries.interface';
import { TarifaCommandsService } from '../../../services/reglas/tarifas/commands/tarifas.commands.service';
import { IResponse } from '../../../services/shared/interfaces/response.interface';
import { LazyLoadEvent } from 'primeng/api';
import { ITarifaMetricaAddRequest } from '../../../services/reglas/tarifas-metricas/commands/tarifas-metricas.commands.Interface';
import { TarifasMetricasQueriesService } from '../../../services/reglas/tarifas-metricas/queries/tarifas-metricas.queries.service';
import { TarifasMetricasCommandsService } from '../../../services/reglas/tarifas-metricas/commands/tarifas-metricas.commands.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    FloatLabelModule,
    InputNumberModule,
    InputIconModule,
    IconFieldModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './tarifas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TarifasQueriesService, TarifaCommandsService, TarifasMetricasQueriesService, TarifasMetricasCommandsService, MessageService, ConfirmationService]
})
export class TarifasComponent implements OnInit {

  //#region INJECTS
  tarifas_queries_service = inject(TarifasQueriesService);
  tarifas_commands_service = inject(TarifaCommandsService);

  tarifas_metricas_queries_service = inject(TarifasMetricasQueriesService);
  tarifas_metricas_commands_service = inject(TarifasMetricasCommandsService);

  messageService = inject(MessageService)
  confirmationService = inject(ConfirmationService)
  //#endregion

  //#region CARGA INICIAL
  titulo: string = "Tarifas";
  breadcrumbs: MenuItem[] = [
    { label: 'Administración' },
    { label: 'Reglas' },
    { label: 'Tarifas' }
  ]
  locale = AppConsts.locale;
  ngOnInit(): void { this.load_data() }
  maximo_tarifas: number = 5;
  //#endregion

  //#region DECLARACION DE VARIABLES
  numero_tarifas!: number;
  total_tarifas!: number;
  tarifas = signal<ITarifaAddRequest[]>([]);

  total_tarifas_metricas: number = 0;
  tarifas_metricas = signal<ITarifaMetricaAddRequest[]>([]);
  //#endregion

  //#region ACCIONES
  blur_numero_tarifas() {
    this.tarifas.set([]);
    if (this.numero_tarifas <= this.maximo_tarifas) {
      for (let indiceTarifa = 0; indiceTarifa < this.numero_tarifas; indiceTarifa++) {
        let tarifa: ITarifaAddRequest = {
          esTitular: indiceTarifa === 0 ? true : false,
          descripcion: indiceTarifa === 0 ? 'Tarifa titular' : `Tarifa titular TI + ${indiceTarifa} OS`,
          indice: indiceTarifa + 1,
          tarifa: 0
        }
        this.tarifas.update((values) => { return [...values, tarifa]; });
        this.total_tarifas = 0;
      }
    } else {
      this.messageService.add({ severity: 'info', summary: 'Alerta', detail: `Solo se permiten ${this.maximo_tarifas} tarifas` });
    }
  }

  load_data() {
    this.load_tarifas();
    this.load_tarifas_metricas();
  }

  load_tarifas() {
    this.tarifas_queries_service.get_all()
      .subscribe({
        next: (response: IResponse) => {
          this.tarifas.set(response.data);
          if (this.tarifas().length > 0)
            this.numero_tarifas = this.tarifas().length;
          this.set_total_tarifas()
        },
        error: (error: IResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.message}` });
        }
      }
      )
  }

  load_tarifas_metricas() {
    this.tarifas_metricas_queries_service.get_all()
      .subscribe({
        next: (response: IResponse) => {
          this.tarifas_metricas.set(response.data);
          this.set_total_tarifas_metricas()
        },
        error: (error: IResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.message}` });
        }
      }
      )
  }

  click_cancelar() {
    this.load_data();
  }

  async click_guardar() {
    this.confirmationService.confirm({
      message: '¿Realente desea actuaizar las tarifas y sus metricas?',
      header: 'Actualización',
      icon: 'pi pi-question-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: async () => {
        await Promise.all([this.save_tarifas(), this.save_tarifas_metricas()])
          .then(() => {
            this.messageService.add({ severity: 'success', summary: 'Confirmación', detail: 'Información guardada correctamente' });
          })
          .catch(() => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `Error en el guadado, consulte al administrador` });
          });
      }
    });



  }

  async save_tarifas() {
    await this.tarifas_commands_service.add(this.tarifas()).subscribe({
      next: (data: boolean) => { },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.message}` });
      }
    })
  }


  async save_tarifas_metricas() {
    await this.tarifas_metricas_commands_service.add(this.tarifas_metricas()).subscribe({
      next: (data: boolean) => { },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.message}` });
      }
    })
  }
  //#endregion


  //#region SET - GET
  set_total_tarifas() {
    this.total_tarifas = this.tarifas().reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.tarifa || 0)
    }, 0);
  }

  set_total_tarifas_metricas() {
    this.total_tarifas_metricas = this.tarifas_metricas().reduce((accumulator, currentValue) => {
      return accumulator +
        (currentValue.fallecimiento || 0) +
        (currentValue.invalidez || 0) +
        (currentValue.desempleo || 0)
    }, 0);
  }
  //#endregion





}
