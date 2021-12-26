import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.scss']
})
export class GameEndComponent implements OnInit {

  uid:number; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<GameEndComponent>) { }

  ngOnInit() {
    this.uid = this.data['uid'];
  }

  /** 
  * @desc onSubmit on GameEnd to show logout button  
  **/

  onSubmit() {
    this.dialogRef.close();
    this.router.navigate(['user/home/',this.uid]);
  }
}
