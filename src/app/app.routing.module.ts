import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth.guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./routing/home/home.component";
import { CanDeactivateGuard } from "./routing/routing-servers/edit-server/can-deactivte-guard.service";
import { EditServerComponent } from "./routing/routing-servers/edit-server/edit-server.component";
import { RoutingServerComponent } from "./routing/routing-servers/routing-server/routing-server.component";
import { ServerResolver } from "./routing/routing-servers/routing-server/routing-server.resolver.service";
import { RoutingServersComponent } from "./routing/routing-servers/routing-servers.component";
import { UserComponent } from "./routing/users/user/user.component";
import { UsersComponent } from "./routing/users/users.component";

const appRoutes: Routes = [

  { path: '', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }
    ]
  },

  {
    path: 'routing-servers',
    //canActivate: [AuthGuard],
    canActivateChild : [AuthGuard],
    component: RoutingServersComponent,
    children: [
      { path: ':id', component: RoutingServerComponent, resolve: {server: ServerResolver} },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },

  //{ path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: '**', redirectTo: '/not-found' }

];


@NgModule({
  imports: [
    //RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
