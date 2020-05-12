import { Component, OnInit,  ElementRef, ViewChild, ChangeDetectorRef} from '@angular/core';
import { NavController, Platform, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMapsService } from '../google-maps.service';


declare var google;

/**********BOTAR ISSO NA CHAMADA DO COMPONENTE
 * async launchLocationPage(){

    let modal = await this.modalCtrl.create({
      component: LocationSelectPage      
    });

    await modal.present();
    
    modal.onDidDismiss().then ((location) => {
      console.log(location);
    })
  }
 * 
 */


@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.page.html',
  styleUrls: ['./location-select.page.scss'],
})
export class LocationSelectPage implements OnInit{  

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;  
  autocompleteService: any;
  placesService: any;
  query: string;  
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;  
  geocoder : any;

  constructor(public navCtrl: NavController, public cdRef: ChangeDetectorRef, public maps: GoogleMapsService, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ModalController) {
      this.searchDisabled = true;
      this.saveDisabled = true;      
      this.query = '';
  }

  ngOnInit(){
    this.geolocation.getCurrentPosition().then((position) => {
      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement, position.coords.latitude, position.coords.longitude).then(() => {
        

        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.placesService = new google.maps.places.PlacesService(this.maps.map);
        this.geocoder = new google.maps.Geocoder();
        this.searchDisabled = false;               

        this.maps.map.addListener('dragend', () => {            
            var latLng = this.maps.map.getCenter();
            this.setAdressByLocation(latLng.lat(), latLng.lng())                                      
        });      

        this.setAdressByLocation(position.coords.latitude, position.coords.longitude); 


        /***Criando botao de confirmacao */
        // Set CSS for the control border.
        var controlDiv = document.createElement('div');
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Confirmar';
        controlUI.appendChild(controlText);

        
        this.maps.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controlDiv);
        
        controlUI.addEventListener('click',  (event) => {
          this.save();
        });               

      });       

    });     
  }      

  testeQuery(){
    console.log(this.query);
  }
  

  setLocation(latitude: number, longitude: number, streetName: string, number: number, postalCode: number, city: string, state: string, fullAddress: string){
    let location = {
        lat: latitude,
        lng: longitude,
        streetName: streetName,
        number: number,
        postalCode: postalCode,
        city: city,
        state: state,
        fullAddress: fullAddress
    };

    this.query = fullAddress;   

    this.location = location;      
    this.cdRef.detectChanges();
  }

  selectPlace(place){

      this.places = [];            
      
      this.placesService.getDetails({placeId: place.place_id}, (details) => {
        
        console.log(details)
        const locationDict = {};

        details.address_components.forEach(element => {
            locationDict[element.types[0]] = element.short_name;
            console.log(locationDict[element.types[0]]);
          });
          
        this.setLocation(details.geometry.location.lat(),details.geometry.location.lng(), locationDict['route'], locationDict['street_number'], locationDict['postal_code'], locationDict['administrative_area_level_2'], locationDict['administrative_area_level_1'], place.description);        
        this.maps.map.setCenter({lat: details.geometry.location.lat(), lng: details.geometry.location.lng()});                            

        //   this.zone.run(() => {

        //       location.name = details.name;
        //       location.lat = details.geometry.location.lat();
        //       location.lng = details.geometry.location.lng();
        //       this.saveDisabled = false;

        //       this.maps.map.setCenter({lat: location.lat, lng: location.lng}); 

        //       this.location = location;

        //   });

      });

  }

  searchPlace(){           
      this.saveDisabled = true;

      if(this.query.length > 0 && !this.searchDisabled) {

          let config = {
              types: ['geocode'],
              input: this.query,
              location: this.maps.map.getCenter(),
              radius: 2000
          }

          this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

              if(status == google.maps.places.PlacesServiceStatus.OK && predictions){

                  this.places = [];

                  predictions.forEach((prediction) => {
                      this.places.push(prediction);
                  });
              }

          });

      } else {
          this.places = [];
      }

  }

  setAdressByLocation (latitude: number, longitude: number) {
    var latlng = {lat: latitude, lng: longitude};

    console.log('Executing request to google Geocoding. Latitude:' + latitude.toString() + ' Longitude:' + longitude.toString());    

    this.geocoder.geocode({'location': latlng}, (results, status) =>  {
      console.log('GeocodingRequest');
      if (status === 'OK') {
        if (results[0]) {          
          console.log(results[0].formatted_address);
          
          const locationDict = {};

          results[0].address_components.forEach(element => {
            locationDict[element.types[0]] = element.short_name;    
            console.log(locationDict[element.types[0]]);
          });

          this.setLocation(latitude, longitude, locationDict['route'], locationDict['street_number'], locationDict['postal_code'], locationDict['administrative_area_level_2'], locationDict['administrative_area_level_1'], results[0].formatted_address);                    
          
        } else {
          this.query = 'No results found';          
        }
      } else {
        console.log('Geocoder failed due to: ' + status);        
      }
    });    
    
  }

  save(){            
      this.viewCtrl.dismiss(this.location);
  }

  close(){
      this.viewCtrl.dismiss();
  }   

}
