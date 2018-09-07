import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { Observable } from 'rxjs';

import { Lesson } from '../model/lesson';

@Component({
    selector: 'app-lessons',
    templateUrl: './lessons.component.html',
    styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

    lessons$: Observable<Lesson[]>;
    isLoggedIn$: Observable<boolean>;

    constructor(private lessonsService: LessonsService) {

    }

    ngOnInit() {
        this.loadLessons();
    }

    loadLessons() {
        this.lessons$ = this.lessonsService.loadAllLessons();
    }

}
