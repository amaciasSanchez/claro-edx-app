import { FormGroup } from '@angular/forms';

export function mustMatch(controlName: string, matchingControlName :string){
    return (formGroup: FormGroup) =>{
        const password = formGroup.controls[controlName];
        const matchingPassword = formGroup.controls[matchingControlName];
        
        if(matchingPassword.errors && !matchingPassword.errors.mustMatch)
            return;
        

        if(password.value !== matchingPassword.value){
            matchingPassword.setErrors({mustMatch: true})
        }else{
            matchingPassword.setErrors(null)
        }


    }
}