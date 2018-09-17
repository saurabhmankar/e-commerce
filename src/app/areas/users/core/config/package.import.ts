import { SharedModule } from './../../../../library/shared/shared.module';
import {  Injectable } from '@angular/core';

@Injectable()
export class PackageImport{

    static setImport(){
        return [
            SharedModule
        ]
    }

    static setDeclaration(){
        return [

        ]
    }
    static setExport(){
        return [
            
        ]
    }

}