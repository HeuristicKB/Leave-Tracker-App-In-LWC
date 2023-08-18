import { LightningElement } from 'lwc';

export default class LeaveTracker extends LightningElement {

    refreshLeaveRequestsHandler(){
        this.refs.myLeavesComp.refreshGrid();
    }
}