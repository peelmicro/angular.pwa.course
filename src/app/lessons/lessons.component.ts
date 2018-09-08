import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SwPush } from '@angular/service-worker';

import { Lesson } from '../model/lesson';
import { NewsletterService } from '../services/newsletter.service';
import { LessonsService } from '../services/lessons.service';

@Component({
    selector: 'app-lessons',
    templateUrl: './lessons.component.html',
    styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

    lessons$: Observable<Lesson[]>;
    isLoggedIn$: Observable<boolean>;
    sub: PushSubscription;

    readonly VAPID_PUBLIC_KEY = 'BBPI8HJOm5U8VASkzeuSwh2rFcgiWGrg_3p3grozx-fPVMqi4rPqWnKWUFatgqMsOP5s9BhR_dOMAA6VqEnZnJ8';

    constructor(
        private lessonsService: LessonsService,
        private newsletterService: NewsletterService,
        private swPush: SwPush
    ) {}

    ngOnInit() {
        this.loadLessons();
    }

    loadLessons() {
        this.lessons$ = this.lessonsService.loadAllLessons();
    }

    subscribeToNotifications() {
        this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
        })
        .then(sub => {
            this.sub = sub;
            console.log('Notification Subscription: ', sub);
            this.newsletterService.addPushSubscriber(sub).subscribe(
                response => console.log('Sent push subscription object to server', response),
                err => console.error('Could not sent push subscription object to server, reason: ', err)
            );
        })
        .catch( err => console.error('Could not subscribe to notifications', err));
    }

    sendNewsletter() {
        console.log('Sending Newsletter to all Subscribers ...');
        this.newsletterService.send().subscribe(
            response => console.log('Sent request for Sending Newsletter to all Subscribers executed with success', response),
            err => console.error('Request for Sending Newsletter to all Subscribers executed was not executed, reason: ', err)
        );
    }
}
