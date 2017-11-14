import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'tablr-column',
    template: `
<div *ngIf="data.visible === 'true'"
    [attr.id]="data.index"
    class="tablr-column"
    [style.width]="tablrColumnWidth"
    [class.tablr-last-column]="isFinalColumn"
    >
    <div [style.background-color]="headerBgColor"
        [style.pointer-events]="pointerEvents"
        [style.padding]="cellPadding"
        class="cell cell-header"
        [style.font-size]="headerFontSize"
        [style.color]="headerFontColor"
        (click)="tablrSort()"
        [style.position]="headerPosition"
        style="text-align: left; position: absolute; height: 25px; width: inherit;">
        <b>{{data.label}}</b>
    </div>
    <div *ngFor="let row of rows"
        [style.padding]="cellPadding"
        [style.color]="fontColor"
        class="cell"
        [style.font-size]="fontSize"
        [style.margin-top]="marginTop(row.index)"
        [style.background-color]="bgColor(row.index % 2 === 0)">
        {{row[data.key]}}
    </div>
    <div *ngIf="!isFinalColumn"
        [hidden]="isDraggingColumn"
        class="tablr-column-handle"
        (mousedown)="click()"
        (mouseup)="unClick()"
        (click)="click()"
        [style.border-left-width]="columnBorderWidth"
    [style.border-color]="columnBorderColor">
    </div>
</div>`,
    styles: [`
.tablr-column{
    min-height: 100%;
    padding: 0;
    margin: 0;
    position: relative;
    float: left;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background-color: #434344;
}
.tablr-column-handle{
    width: 10px;
    position: absolute;
    right: 0;
    margin-right: -5.5px;
    height: 100%;
    z-index: 99 !important;
    top: 0;
    border-left-style: solid;
}
.tablr-column-handle:hover{
    cursor: col-resize;
}
.cell {
    pointer-events:none;
    width: 100%;
    height: 24px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #8b93a0;
    z-index: 1 !important;
    font-family: Roboto, 'Helvetica Neue', sans-serif;
    color: #ccc9c9;
}
.cell-header{
    height: 35px;
}
.even{
    background-color:  #4a4a4c;
}
.odd{
    background-color: #575759;
}
.tablr-last-column{
    border-right: none;
}`]
})
export class TablrColumnComponent implements OnInit, OnChanges {

    @Input() tablrColumnWidth: string;
    @Input() sortedHighlightColor: string;
    @Input() isDraggingColumn: boolean;
    @Output() dragging = new EventEmitter();
    @Output() doneDragging = new EventEmitter();
    @Output() initSort = new EventEmitter();
    @Input() isFinalColumn: boolean;
    @Input() finalColumnWidth: string;
    @Input() scrollTop: string;
    @Input() data: any;
    @Input() cellPadding: string;
    @Input() evenRowBgColor: string;
    @Input() oddRowBgColor: string;
    @Input() headerBgColor: string;
    @Input() alternatingRowColors: boolean;
    @Input() columnBorderColor: string;
    @Input() columnBorderWidth: string;
    @Input() headerFontSize: string;
    @Input() fontSize: string;
    @Input() headerFontColor: string;
    @Input() fontColor: string;
    @Input() fixedHeader: boolean;
    @Input() rows: any[];

    headerPosition: string;

    pointerEvents: string = 'auto';
    hightlighted: boolean = false;

    ngOnInit() {
        if (!this.tablrColumnWidth && !this.isFinalColumn) {
            this.tablrColumnWidth = '150px';
        } else if (this.isFinalColumn) {
            this.tablrColumnWidth = this.finalColumnWidth;
        }
        if(this.fixedHeader)
            this.headerPosition = 'fixed';
        else this.headerPosition = 'absolute';
    }
    marginTop(index: number) {
        if (index === 0) {
            return '25px';
        } else {
            return '0px';
        }
    }
    bgColor(isEven: boolean) {
        if (isEven) {
            return this.evenRowBgColor;
        } else if (!isEven) {
            return this.oddRowBgColor;
        } else {
            return this.oddRowBgColor;
        }
    }
    ngOnChanges() {
        if (this.isFinalColumn) {
            this.tablrColumnWidth = this.finalColumnWidth;
        }
        if (this.hightlighted) {
            this.headerBgColor = this.sortedHighlightColor;
        }
    }
    click() {
        if (this.isFinalColumn) return;
        this.isDraggingColumn = true;
        this.pointerEvents = 'none';
        this.dragging.emit({ 'columnData': this.data });
    }
    unClick() {
        this.pointerEvents = 'auto';
    }
    tablrSort() {
        this.initSort.emit({ 'key': this.data.key });
        //this.hightlighted = true;
    }
}
