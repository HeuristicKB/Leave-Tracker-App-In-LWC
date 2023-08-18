import { LightningElement, api } from 'lwc';
// Static resource
import CAR_HUB_PLACEHOLDER from '@salesforce/resourceUrl/placeholder'
export default class Placeholder extends LightningElement {
    @api message
    placeholderUrl = CAR_HUB_PLACEHOLDER
}