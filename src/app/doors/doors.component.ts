import {Component, OnInit} from '@angular/core';
import {timer} from 'rxjs';
import {Howl, Howler} from 'howler';

// import {timeout} from 'rxjs/operators';

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
  beeper: any;
  door: any;
  isBeeperPlaying = false;
  isDoorPlaying = false;
  doorSub: any;

  constructor() {
  }

  ngOnInit() {
    this.door1 = this.createDoor();
    this.door2 = this.createDoor();
    this.door3 = this.createDoor();
    this.door4 = this.createDoor();
    this.beeper = this.playAudio('beep');
    this.door = this.playAudio('open-door');
  }

  playAudio(key: string) {
    // Change global volume.
    Howler.volume(0.5);

    if (key === 'open-door') {
      const door = new Howl({
        src: ['../../assets/audio/door.wav']
      });
      door.on('end', () => {
        console.log('Please close door sound finished!');
      });
      return door;
    }

    if (key === 'beep') {
      const beep = new Howl({
        src: ['../../assets/audio/beep.wav'],
        loop: true
      });
      beep.on('end', () => {
        console.log('beep sound finished!');
      });
      return beep;
    }
  }

  shutBeeper() {
    if (this.door1.isClosed && this.door2.isClosed && this.door3.isClosed && this.door4.isClosed) {
      this.isBeeperPlaying = false;
      this.beeper.stop();
    }
    return;
  }

  shutDoor() {
    if (this.door1.isClosed && this.door2.isClosed && this.door3.isClosed && this.door4.isClosed) {
      this.isDoorPlaying = false;
      this.doorSub.unsubscribe();
      this.door.stop();
    }
    return;
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
    this.shutBeeper();
    this.shutDoor();
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
    this.shutBeeper();
    this.shutDoor();
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
    this.shutBeeper();
    this.shutDoor();
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
    this.shutBeeper();
    this.shutDoor();
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

    const i = 1;
    // tslint:disable-next-line:no-shadowed-variable
    const sub = timer(0, 1000).subscribe(i => {
      console.log(i);
      if (door.isClosed) {
        console.log('unsubscribed as door is closed');
        sub.unsubscribe();
      }
      if (i === 29) {
        if (!door.isClosed) {
          console.log('after 30 seconds');
          if (!door.isClosed) {
            console.log('Triggering Voice Prompt');

            this.doorSub = timer(0, 5000).subscribe(j => {
              this.door.play();
            });
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
          if (!this.isBeeperPlaying) {
            this.isBeeperPlaying = true;
            this.beeper.play();
          }
          // door.isClosed = !door.isClosed;
        } else {
          console.log('door is already closed, so doing nothing');
        }
      }
    });

    setTimeout(() => {
      // console.log('unsubscribed at 60');
      sub.unsubscribe();
    }, 60000);

    // }

  }
}
