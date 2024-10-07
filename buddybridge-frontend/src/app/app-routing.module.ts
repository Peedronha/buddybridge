import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './open/account/login/login.component';
import { RecoveryComponent } from "./open/account/recovery/recovery.component";
import { RegisterComponent } from './open/account/register/register.component';
import { AuthGuard } from './open/account/shared/auth.guard';
import { LoginGuard } from './open/account/shared/login.guard';
import { ValidateloginComponent } from './open/account/validatelogin/validatelogin.component';
import { HomeComponent } from './open/home/home.component';
import { InsitucionalComponent } from './open/insitucional/insitucional.component';
import { TopMenuOpenComponent } from './open/top-menu-open/top-menu-open.component';
import { AccountFormSenhaComponent } from './restrict/base/account/component/container/account-form-senha/account-form-senha.component';
import { AccountFormComponent } from './restrict/base/account/component/container/account-form/account-form.component';
import { AccountComponent } from './restrict/base/account/component/container/account/account.component';
import { ProfileComponent } from './restrict/base/account/component/profile/profile.component';
import { accountResolver } from './restrict/base/account/guards/account.resolver';
import { AnimalFormComponent } from "./restrict/base/animal/component/animal-form/animal-form.component";
import { AnimalComponent } from "./restrict/base/animal/component/animal/animal.component";
import { animalResolver } from "./restrict/base/animal/guard/animal.resolver";
import { OngComponent } from './restrict/base/ong/component/ong/ong.component';
import { RacaFormComponent } from "./restrict/base/raca/component/raca-form/raca-form.component";
import { RacaComponent } from "./restrict/base/raca/component/raca/raca.component";
import { racaResolver } from "./restrict/base/raca/guard/raca.resolver.guard";
import { FormTipoComponent } from "./restrict/base/tipo_animal/component/form-tipo/form-tipo.component";
import { TipoComponent } from "./restrict/base/tipo_animal/component/tipo/tipo.component";
import { tipoResolver } from "./restrict/base/tipo_animal/guard/tipo.resolver.guard";
import { VolunteerFormComponent } from "./restrict/base/volunteer/component/container/volunteer-form/volunteer-form.component";
import { VolunteerComponent } from "./restrict/base/volunteer/component/container/volunteer/volunteer.component";
import { volunteerResolver } from "./restrict/base/volunteer/guards/volunteer.resolver";
import { DashboardComponent } from './restrict/dashboard/dashboard.component';
import { AppLayoutComponent } from './restrict/layout/app.layout.component';
import { ErrorComponent } from './restrict/layout/error/error/error.component';
import { GrupoacessoComponent } from './restrict/base/grupo_acesso/component/grupoacesso/grupoacesso.component';
import { GrupoacessoFormComponent } from './restrict/base/grupo_acesso/component/grupoacesso-form/grupoacesso-form.component';
import { grupoacessoResolver } from './restrict/base/grupo_acesso/guard/grupoacesso.resolver';
import { SolicitacaoacessoComponent } from './restrict/base/solicitacao_acesso/component/solicitacaoacesso/solicitacaoacesso.component';
import { AdoptionComponent } from './open/adoption/components/adoption-header/adoption.component';
import { adoptionProfileResolver } from './restrict/base/adoption-profile/guards/adoption-profile.resolver.guard';
import { AdoptionProfileComponent } from './restrict/base/adoption-profile/component/adoption/adoption-profile.component';
import { AdoptionProfileFormComponent } from './restrict/base/adoption-profile/component/adoption-form/adoption-profile-form.component';
import { AdoptionSubmissionFormComponent } from './open/adoption/components/adoption-submission-form/adoption-submission-form.component';
import { AdoptionManagementComponent } from './open/adoption/components/adoption-private/adoption/adoption-management.component';
import { AdoptionManagementResolver } from './open/adoption/components/adoption.resolver.guard';
import { AdoptionUpdateComponent } from './open/adoption/components/adoption-private/adoption-update/adoption-update.component';
import { ClassificacaoComponent } from './restrict/base/financeiro/classificacao/component/classificacao/classificacao.component';
import { ClassificacaoFormComponent } from './restrict/base/financeiro/classificacao/component/classificacao-form/classificacao-form.component';
import { ClassificacaoResolver } from './restrict/base/financeiro/classificacao/guard/classificacao.resolver';
import { ContacaixaComponent } from './restrict/base/financeiro/contacaixa/component/contacaixa/contacaixa.component';
import { ContacaixaFormComponent } from './restrict/base/financeiro/contacaixa/component/contacaixa-form/contacaixa-form.component';
import { ContaCaixaResolver } from './restrict/base/financeiro/contacaixa/guard/contacaixa.resolver';
import { MovimentoComponent } from './restrict/base/financeiro/movimento/component/movimento/movimento.component';
import { MovimentoFormComponent } from './restrict/base/financeiro/movimento/component/movimento-form/movimento-form.component';
import { MovimentacaoResolver } from './restrict/base/financeiro/movimento/guard/movimento.resolver';
import { PagamentoComponent } from './restrict/base/financeiro/pagamento/component/pagamento/pagamento.component';
import { PagamentoFormComponent } from './restrict/base/financeiro/pagamento/component/pagamento-form/pagamento-form.component';
import { PagamentoResolver } from './restrict/base/financeiro/pagamento/guard/pagamento.resolver';
import { DashfinanceiroComponent } from './restrict/base/financeiro/dashfinanceiro/dashfinanceiro.component';
const routes: Routes = [
  { path: 'errorBuddyBridge', title: 'BuddyBridge - Erro', component: ErrorComponent },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},

      { path: 'restrict/home', title: 'BuddyBridge - Home', component: HomeComponent },
      { path: 'restrict/institucional', title: 'BuddyBridge - Institucional', component: InsitucionalComponent },

      { path: 'dashboard', title: 'BuddyBridge - DashBoard', component: DashboardComponent },
      { path: 'profile', title: 'BuddyBridge - Meu Perfil', component: ProfileComponent },
      { path: 'account', title: 'BuddyBridge - Usuários', component: AccountComponent },

      { path: 'account/addaccount', title: 'BuddyBridge - Novo Usuário', component: AccountFormComponent, resolve: {account : accountResolver} },
      { path: 'account/editaccount/:id', title: 'BuddyBridge - Alterar Usuário', component: AccountFormComponent, resolve: {account : accountResolver} },
      { path: 'account/editpassword/:id', title: 'BuddyBridge - Alterar Usuário', component: AccountFormSenhaComponent, resolve: {account : accountResolver} },

      { path: 'volunteer', title: 'BuddyBridge - Voluntários', component: VolunteerComponent },
      { path: 'volunteer/addvolunteer', title: 'BuddyBridge - Novo Voluntário', component: VolunteerFormComponent, resolve: {volunteer : volunteerResolver} },
      { path: 'volunteer/editvolunteer/:id', title: 'BuddyBridge - Alterar Voluntário', component: VolunteerFormComponent, resolve: {volunteer : volunteerResolver} },

      { path: 'animal', title: 'BuddyBridge - Animais', component: AnimalComponent },
      { path: 'animal/addanimal', title: 'BuddyBridge - Novo Animal', component: AnimalFormComponent, resolve: {animal : animalResolver} },
      { path: 'animal/editanimal/:id', title: 'BuddyBridge - Alterar Animal', component: AnimalFormComponent, resolve: {animal : animalResolver} },

      { path: 'racas', title: 'BuddyBridge - Raca', component: RacaComponent },
      { path: 'racas/addraca', title: 'BuddyBridge - Novo Raca', component: RacaFormComponent, resolve: {raca : racaResolver} },
      { path: 'racas/editraca/:id', title: 'BuddyBridge - Alterar Raca', component: RacaFormComponent, resolve: {raca : racaResolver} },

      { path: 'tipos', title: 'BuddyBridge - Tipo', component: TipoComponent },
      { path: 'tipos/addtipo', title: 'BuddyBridge - Novo Tipo', component: FormTipoComponent, resolve: {tipo : tipoResolver} },
      { path: 'tipos/edittipo/:id', title: 'BuddyBridge - Alterar Tipo', component: FormTipoComponent, resolve: {tipo : tipoResolver} },

      { path: 'grupoacesso', title: 'BuddyBridge - Grupos de acesso', component: GrupoacessoComponent },
      { path: 'grupoacesso/addgrupoacesso', title: 'BuddyBridge - Novo Grupoe de acesso', component: GrupoacessoFormComponent, resolve: {grupoacesso : grupoacessoResolver} },
      { path: 'grupoacesso/editgrupoacesso/:id', title: 'BuddyBridge - Alterar Grupo de acesso', component: GrupoacessoFormComponent, resolve: {grupoacesso : grupoacessoResolver} },

      { path: 'perfil-adocao', title: 'BuddyBridge - Perfil de Adoção', component: AdoptionProfileComponent },
      { path: 'perfil-adocao/addperfil', title: 'BuddyBridge - Novo Perfil de Adoção', component: AdoptionProfileFormComponent, resolve: {perfil : adoptionProfileResolver} },
      { path: 'perfil-adocao/editperfil/:id', title: 'BuddyBridge - Alterar Perfil de Adoção', component: AdoptionProfileFormComponent, resolve: {perfil : adoptionProfileResolver} },

      { path: 'restrict/adocao', title: 'BuddyBridge - Adocao', component: AdoptionComponent },
      { path: 'restrict/adocao/addadocao/:id', title: 'BuddyBridge - Adocao', component: AdoptionSubmissionFormComponent, resolve: {perfil_adocao : adoptionProfileResolver} },
      //{ path: 'restrict/adocao/list', title: 'BuddyBridge - Adocao', component: AdoptionListComponent },
      //{ path: 'restrict/adocao/editsubmission/:id', title: 'BuddyBridge - Adocao', component: AdoptionUpdateComponent },

      { path: 'restrict/manage-adoption', title: 'BuddyBridge - Adoção', component: AdoptionManagementComponent },
      // { path: 'restrict/manage-adoption/list', title: 'BuddyBridge - Adocao', component: AdoptionListComponent },
      { path: 'restrict/manage-adoption/editsubmission/:id', title: 'BuddyBridge - Adocao', component: AdoptionUpdateComponent, resolve: {adocao : AdoptionManagementResolver}  },

      { path: 'solicitacaoAcesso', title: 'BuddyBridge - Grupos de acesso', component: SolicitacaoacessoComponent },

      { path: 'ong', title: 'BuddyBridge - Institucional', component: OngComponent },

      { path: 'classificacao', title: 'BuddyBridge - Classificações', component: ClassificacaoComponent },
      { path: 'classificacao/addclassificacao', title: 'BuddyBridge - Nova Classificação', component: ClassificacaoFormComponent, resolve: { classificacao: ClassificacaoResolver } },
      { path: 'classificacao/editclassificacao/:id', title: 'BuddyBridge - Editar Classificação', component: ClassificacaoFormComponent, resolve: { classificacao: ClassificacaoResolver } },

      { path: 'contacaixa', title: 'BuddyBridge - Contas de Caixa', component: ContacaixaComponent },
      { path: 'contacaixa/addcontacaixa', title: 'BuddyBridge - Nova Conta de Caixa', component: ContacaixaFormComponent, resolve: { contacaixa: ContaCaixaResolver } },
      { path: 'contacaixa/editcontacaixa/:id', title: 'BuddyBridge - Editar Conta de Caixa', component: ContacaixaFormComponent, resolve: { contacaixa: ContaCaixaResolver } },

      { path: 'movimentacao', title: 'BuddyBridge - Movimentações', component: MovimentoComponent },
      { path: 'movimentacao/addmovimentacao', title: 'BuddyBridge - Nova Movimentação', component: MovimentoFormComponent, resolve: { movimentacao: MovimentacaoResolver } },
      { path: 'movimentacao/editmovimentacao/:id', title: 'BuddyBridge - Editar Movimentação', component: MovimentoFormComponent, resolve: { movimentacao: MovimentacaoResolver } },

      { path: 'pagamento', title: 'BuddyBridge - Pagamentos', component: PagamentoComponent },
      { path: 'pagamento/addpagamento', title: 'BuddyBridge - Novo Pagamento', component: PagamentoFormComponent, resolve: { pagamento: PagamentoResolver } },
      { path: 'pagamento/editpagamento/:id', title: 'BuddyBridge - Editar Pagamento', component: PagamentoFormComponent, resolve: { pagamento: PagamentoResolver } },

      { path: 'dashfinanceiro', title: 'BuddyBridge - Financeiro', component: DashfinanceiroComponent }

    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: TopMenuOpenComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'adocao', title: 'BuddyBridge - Quero Adotar', component: AdoptionComponent, canActivate: [LoginGuard] },
      { path: 'home', title: 'BuddyBridge - Home', component: HomeComponent, canActivate: [LoginGuard] },
      { path: 'institucional', title: 'BuddyBridge - Institucional', component: InsitucionalComponent, canActivate: [LoginGuard] },
      { path: 'register', title: 'BuddyBridge - Criar Conta', component: RegisterComponent, canActivate: [LoginGuard] },
      { path: 'login', title: 'BuddyBridge - Login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: 'recovery', title: 'BuddyBridge - Recovery', component: RecoveryComponent, canActivate: [LoginGuard] },
      { path: 'validatelogin', title: 'BuddyBridge - Validar código', component: ValidateloginComponent, canActivate: [LoginGuard] },
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full'},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
