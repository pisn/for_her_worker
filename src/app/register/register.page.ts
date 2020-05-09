import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {CognitoServiceService} from '../cognito-service.service';
import { GeneralUtilitiesModule} from '../general-utilities/general-utilities.module';
import { NavController, ToastController } from '@ionic/angular';


import {HttpService} from '../http.service';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  cpf_cnpj='';
  maskedId: any;
  DECIMAL_SEPARATOR=".";
  GROUP_SEPARATOR=",";

  constructor(private cognitoService : CognitoServiceService, private navCtrl : NavController, private toastController : ToastController, private httpService: HttpService) {     
  }

  nomeInput: string;
  dataNascimentoInput: string;
  cpfInput : string;
  cepInput: string;
  logradouroInput: string;
  numeroInput: number;
  complementoInput: string;
  cidadeInput: string;
  ufInput: string;
  emailInput : string;
  senhaInput : string;
  cepWorked : boolean;
  
  @ViewChild("numeroInputEdit") public numeroInputRef: ElementRef;

  customMonthNames = [
    'Janeiro',
    'Fevereiro',
    'Marco',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  ufs= [
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO'
  ]  
  
  cpf_mask(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
  }

  cep_mask(v){
    v = v.replace()
    v = v.replace(/(\d{5})(\d)/, '$1-$2'); //Coloca um hifem

    return v;
  }

  formatCpf() {       
    if (!this.cpfInput) {
        return '';
    }
    let val = this.cpfInput.toString();            
    
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);

    this.maskedId = this.cpf_mask(parts[0]);

    this.cpfInput = this.maskedId;    
  };

  formatCep(){

    if(!this.cepInput)
      return '';

    let val = this.cepInput.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR)
    this.maskedId = this.cep_mask(parts[0]);

    this.fillAddress(this.unFormat(val));

    this.cepInput = this.maskedId;

  };

  fillAddress(cep){        
    this.httpService.getHttpClient().get("https://viacep.com.br/ws/" + cep + "/json/")
       .subscribe((result: any) => {

         if(result.erro == true){//ViaCep retorna boolean erro quando nao encontra cep
          this.toastNotify("Não foi possível recuperar informações para este CEP.");          
          this.cepWorked = false;         

         }
         else {

          this.logradouroInput = result.logradouro;
          this.cidadeInput = result.localidade;
          this.ufInput = result.uf;         

          this.cepWorked = true;   
          
          this.numeroInputRef.nativeElement.focus();          
         }

       },
       (error: any) => {
          this.toastNotify("Não foi possível recuperar informações para este CEP.");          
          this.cepWorked = false;
       })

  }


  unFormat(val) {
    if (!val) {
        return '';
    }
    val = val.replace(/\D/g, '');

    if (this.GROUP_SEPARATOR === ',') {
        return val.replace(/,/g, '');
    } else {
        return val.replace(/\./g, '');
    }
  };

  unFormatCep(val){
    if(!val){
      return '';
    }

    return val.replace(/-/g,'');
  }

  ngOnInit() {
  }

  async toastNotify(message : string){
    const toast = await this.toastController.create({            
      duration:  1000, 
      message: message,
      position: 'bottom'      
    });
    toast.present();

  }

  createAccount(){
    var birthDate = new Date(this.dataNascimentoInput);
    var birthFormatedString = birthDate.getFullYear() + "-" + GeneralUtilitiesModule.pad(birthDate.getMonth(),2) + "-" + GeneralUtilitiesModule.pad(birthDate.getDay(),2);
    
    var fullAdress = this.logradouroInput + ", " + this.numeroInput + (this.complementoInput != "" ? ", " + this.complementoInput : "") + ", " + this.cidadeInput + ", " + this.ufInput;

    this.cognitoService.signUp(this.emailInput,this.nomeInput,birthFormatedString,this.senhaInput, this.unFormat(this.cpfInput.toString()),fullAdress)
        .then(res => {          
          this.navCtrl.back();
          this.toastNotify("Conta criada. Para confirmar sua conta, siga as instruções enviadas por email");
        },
        err => {
          console.log("Register failed at Amazon.");          
          console.log(err);  
        })


  }

}
