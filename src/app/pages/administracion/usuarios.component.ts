import { CommonModule } from "@angular/common";
import { TituloComponent } from "../components/titulo/titulo.component";
import { Component, ChangeDetectionStrategy, OnInit, inject, signal } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MessageService, ConfirmationService, MenuItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { FloatLabelModule } from "primeng/floatlabel";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputNumberModule } from "primeng/inputnumber";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { IResponse } from "../../helpers/interfaces/response";
import { IOutputBandejaUsuariosDataResponse, IBandejaUsuarioRequest, IOutputBandejaUsuariosResponse } from "../../services/administracion/usuario/queries/usuario.queries.interface";
import { UsuarioQueriesService } from "../../services/administracion/usuario/queries/usuario.queries.service";



@Component({
  selector: 'app-usuarios',
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
  templateUrl: './usuarios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService]
})
export class UsuariosComponent implements OnInit {

  //#region INJECTS
  usuario_queries_service = inject(UsuarioQueriesService);

  messageService = inject(MessageService)
  confirmationService = inject(ConfirmationService)
  //#endregion

  titulo: string = "Usuarios";
  breadcrumbs: MenuItem[] = [
    { label: 'Administración' },
    { label: 'Usuario' },
  ]

  ngOnInit(): void { this.load_data() }

  usuarios = signal<IOutputBandejaUsuariosDataResponse[]>([]);

  load_data() {
    this.load_all();
  }

  load_all() {
 
    this.usuario_queries_service.getBandejaUsuarios({ pageIndex: 1, pageSize: 10, search: '', sort: '' } as IBandejaUsuarioRequest)
      .subscribe({
        next: (response) => {
          console.log(response, 'getBandejaUsuarios');
        },
        error: (error) => {
          debugger
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.message}` });
        }
      }
      )
  }

  click_cancelar() {
    this.load_data();
  }
}
