import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../dashboard/services/users.service';

@Component({
  selector: 'app-mock-test',
  templateUrl: './mock-test.component.html',
  styleUrls: ['./mock-test.component.css']
})
export class MockTestComponent implements OnInit {
  ans: string;
  que: any;
  answers = new Array;
  canswers = new Array
  i: number = 0;
  score: number = 0;
  len: number = 0;
  // time:number;
  constructor(private user: UsersService) { }

  ngOnInit() {
    this.getQue();

  }
  getQue() {
    this.user.getQuestions().subscribe((res) => {
      this.que = res;
      this.len = this.que.length;
      // this.time=this.len/2*60;
      console.log('Length', this.len);
      console.log("Questions", this.que);
      for (let i = 0; i < this.que.length; i++) {
        this.canswers.push(this.que[i].ans);
      }
      console.log("Correct ans:", this.canswers);

    })


  }
  next() {
    if (this.i < this.que.length) {
      this.i += 1;
      console.log("que", this.que[this.i]);
      // if (this.que[this.i].option1==='true'||'false' && this.que[this.i].option2==='true'||'false') {
      //   document.getElementById('opt3').style.visibility='hidden';
      //   document.getElementById('opt4').style.visibility='hidden';


      // }

    }
    if (this.i == this.que.length) {


      document.getElementById("submit").style.visibility = "visible";
      document.getElementById("next").style.visibility = "hidden";
      document.getElementById("mock").style.visibility = "hidden";
      document.getElementById("totalq").style.visibility = "hidden";
      document.getElementById("timer").style.visibility = "hidden";





      console.log("Length exceeded");
    }
    let opt1 = document.getElementById('opt1') as HTMLInputElement;
    let opt2 = document.getElementById('opt2') as HTMLInputElement;
    let opt3 = document.getElementById('opt3') as HTMLInputElement;
    let opt4 = document.getElementById('opt4') as HTMLInputElement;
    if (opt1.checked) {
      this.ans = opt1.value;
    } else if (opt2.checked) {
      this.ans = opt2.value;
    } else if (opt3.checked) {
      this.ans = opt3.value;
    } else if (opt4.checked) {
      this.ans = opt4.value;
    } else {
      this.ans = ''
    }
    console.log(this.ans);
    this.answers.push(this.ans);
    console.log("Array of ans:", this.answers);
    console.log("Correct Ans:", this.canswers);
    console.log("cans:", this.canswers[this.i - 1]);
    console.log("ans:", this.answers[this.i - 1]);
    if (this.canswers[this.i - 1] == this.answers[this.i - 1]) {
      this.score = this.score + 1;
      console.log("Final Score is :", this.score);
    }


    // if (this.answers.length == this.canswers.length) {
    //   for (let i = 0; i < this.canswers.length; i++) {
    //     if (this.answers[i] == this.canswers[i]) {
    //       this.score =this.score+ 1;
    //       console.log("Current Score is :",this.score);
    //     }
    //   }
    // }

    console.log("Score is", this.score);


  }
  submit() {
    document.getElementById('submit').style.visibility = 'hidden';
    document.getElementById('mock').style.visibility = 'hidden';
    document.getElementById('score').style.visibility = 'visible';
    document.getElementById('timer').style.visibility = 'hidden';
    
  }
  onFinished() {
    console.log("Time is over");
    document.getElementById('timer').style.visibility = 'hidden';
    document.getElementById('totalq').style.visibility = 'hidden';
    this.submit();


  }



}