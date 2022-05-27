import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterteacherComponent } from './registerteacher/registerteacher.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';


const routes: Routes = [
    {
        path: 'student',
        component: RegisteruserComponent
    },
    {
        path: 'teacher',
        component: RegisterteacherComponent
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RegistrationRoutingModule { }
