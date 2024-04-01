import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TagInfo } from '../../interfaces/tagInfo';

@Component({
  selector: 'app-modal-tag-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-tag-list.component.html',
  styleUrl: './modal-tag-list.component.scss'
})
export class ModalTagListComponent implements OnInit{

  tagTypeList: any
  tagListToAdd: Array<TagInfo> = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalTagListComponent>) {
    this.tagTypeList = data.tagList
  }

  ngOnInit(): void {
  }

  closeModal(){
    this.dialogRef.close(this.tagListToAdd)
  }

  onTagClick(tag: any){
    console.log(tag)
    tag.isSelected = !tag.isSelected
  }

  resetTagSelection() {
    this.tagTypeList.forEach((tagType:any) => {
      tagType.tagList.forEach((tag: any) => {
        tag.isSelected = false
      });
    })
  }

  onSubmit(){
    this.tagTypeList.forEach((tagType:any) => {
      tagType.tagList.forEach((tag: any) => {
        if(tag.isSelected){
          var tagToAdd: TagInfo = new TagInfo()
          tagToAdd.idTag = tag.idTag
          tagToAdd.dsTag = tag.dsTag
          tagToAdd.cdColorTag = tagType.cdColorTypeTag
          tagToAdd.isSelected = tag.isSelected
          this.tagListToAdd.push(tagToAdd)
        }
      });
    })
    this.closeModal()
  }

}
