import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { RecordsService } from '../../services/records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  displayedColumns: string[] = ['created_date', 'dimensions', 'checked', 'win'];
  recordsData = new MatTableDataSource();
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private recordsService: RecordsService) { }

  ngOnInit() {
  this.recordsService.getAllRecords().subscribe((res: any) => {
      console.log(res);
      this.recordsData = new MatTableDataSource(res.rows);
      this.recordsData.paginator = this.paginator;
      this.recordsData.sort = this.sort;
    });
  }

}
