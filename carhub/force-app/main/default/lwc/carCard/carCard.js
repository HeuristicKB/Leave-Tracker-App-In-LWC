import { LightningElement, wire } from 'lwc';


// Car Schema
import CAR_OBJECT from '@salesforce/schema/Car__c'
import NAME_FIELD from '@salesforce/schema/Car__c.Name';
import PICTURE_URL_FIELD from '@salesforce/schema/Car__c.Picture_URL__c';
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c';
import MSRP_FIELD from '@salesforce/schema/Car__c.MSRP__c';
import FUEL_TYPE_FIELD from '@salesforce/schema/Car__c.Fuel_Type__c';
import SEATS_FIELD from '@salesforce/schema/Car__c.Number_of_Seats__c';
import CONTROL_FIELD from '@salesforce/schema/Car__c.Control__c';

// getFieldValue function used to fetch field value 
import { getFieldValue } from 'lightning/uiRecordApi';

// LMS
import {subscribe, MessageContext, unsubscribe} from 'lightning/messageService'
import CARS_SELECTED_MESSAGE from '@salesforce/messageChannel/CarSelected__c'

// Navigation
import {NavigationMixin} from 'lightning/navigation'

export default class CarCard extends NavigationMixin(LightningElement) {
    categotyField = CATEGORY_FIELD
    makeField = MAKE_FIELD
    msrpField = MSRP_FIELD
    fuelTypeField = FUEL_TYPE_FIELD
    seatsField = SEATS_FIELD
    controlField = CONTROL_FIELD

    recordId 

    // car fields displayed with specific format
    carName
    carPictureUrl
    carSelectionSubscription

    handleRecordLoaded(event){
        const {records} = event.detail
        const recordsData = records[this.recordId]

        this.carName = getFieldValue(recordsData, NAME_FIELD)
        this.carPictureUrl = getFieldValue(recordsData, PICTURE_URL_FIELD)
    }

    // Load context for LMS
    @wire(MessageContext)
    messageContext

    connectedCallback(){
        this.subscribeHandler()
    }

    subscribeHandler(){
        this.carSelectionSubscription = subscribe(this.messageContext, CARS_SELECTED_MESSAGE, (message)=>this.handleCarSelected(message))
    }

    handleCarSelected(message){
        this.recordId = message.carId
    }
    disconnectedCallback(){
        unsubscribe(this.carSelectionSubscription)
        this.carSelectionSubscription = null
    }

    handleNavigateToRecord(){
        this[NavigationMixin.Navigate]({
            type : 'standard__recordPage',
            attributes : {
                recordId : this.recordId,
                objectApiName : CAR_OBJECT.objectApiName,
                actionName : 'view'
            }
        })
    }
}