import {Component, OnInit} from '@angular/core';
import {timer} from 'rxjs';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.scss']
})
export class DoorsComponent implements OnInit {
  door1: any;
  door2: any;
  door3: any;
  door4: any;

  constructor() {
  }

  ngOnInit() {
    this.door1 = this.createDoor();
    this.door2 = this.createDoor();
    this.door3 = this.createDoor();
    this.door4 = this.createDoor();
  }

  createDoor() {
    return {
      isClosed: true,
      status: 'door is closed'
    };
  }

  onDoor1Open() {
    this.door1.isClosed = !this.door1.isClosed;
    this.door1.status = 'door has been opened';
    console.log('door 1 is opened');
    this.checkIfOpenedAfterThirySeconds(this.door1);

  }

  onDoor1Close() {
    this.door1.isClosed = !this.door1.isClosed;
    this.door1.status = 'door is closed';
  }

  onDoor2Open() {
    this.door2.isClosed = !this.door2.isClosed;
    this.door2.status = 'door has been opened';
    console.log('door 2 is opened');
    this.checkIfOpenedAfterThirySeconds(this.door2);

  }

  onDoor2Close() {
    this.door2.isClosed = !this.door2.isClosed;
    this.door2.status = 'door is closed';
  }

  onDoor3Open() {
    this.door3.isClosed = !this.door3.isClosed;
    this.door3.status = 'door has been opened';
    console.log('door 3 is opened');
    this.checkIfOpenedAfterThirySeconds(this.door3);

  }

  onDoor3Close() {
    this.door3.isClosed = !this.door3.isClosed;
    this.door3.status = 'door is closed';
  }


  onDoor4Open() {
    this.door4.isClosed = !this.door4.isClosed;
    this.door4.status = 'door has been opened';
    console.log('door 4 is opened');
    this.checkIfOpenedAfterThirySeconds(this.door4);
  }

  onDoor4Close() {
    this.door4.isClosed = !this.door4.isClosed;
    this.door4.status = 'door is closed';
  }

  checkIfOpenedAfterThirySeconds(door: any) {
    // let i = 1;
    // while ( i < 61) {
    //   i = i + 1;
    //   if (door.isClosed) {
    //     break;
    //   }
      // tslint:disable-next-line:no-shadowed-variable
      let i = 1;
      let sub = timer(0, 1000).subscribe(i => {
        console.log(i);
        if ( door.isClosed) {
          console.log('unsubscribed as door is closed')
          sub.unsubscribe();
        }
        if (i === 29) {
          if (!door.isClosed) {
            console.log('after 30 seconds');
            if (!door.isClosed) {
              console.log('Triggering Voice Prompt');
              door.status = 'Voice Prompt Alarm 2. close now';
              // door.isClosed = !door.isClosed;
            } else {
              console.log('door is already closed, so doing nothing');
            }
          }
        }
        if (i === 59) {
          if (!door.isClosed) {
            console.log('after 60 seconds');
            console.log('Triggering Panel display');
            door.status = 'Panel display of ALARMS ON DSU';
            // door.isClosed = !door.isClosed;
          } else {
            console.log('door is already closed, so doing nothing');
          }
        }
      });

      setTimeout( () => {
        console.log('unsubscribed at 60');
        sub.unsubscribe();
      }, 60000);

    // }

  }
}
