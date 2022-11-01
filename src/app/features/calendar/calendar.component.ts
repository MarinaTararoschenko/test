import { Component, OnInit } from '@angular/core';
import moment from 'moment';

interface ICalendar {
    startYear: number;
    endYear: number;
    weekDays: string[];
    periods: any[];
    currentPeriodName: string;
    currentPeriod: any[];
    prevMonthDays: string[];
    nextMonthDays: string[];
}

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    public calendarOprions: ICalendar;

    constructor() {
        this.calendarOprions = {
            startYear: 2019,
            endYear: 2020,
            weekDays: [],
            periods: [],
            currentPeriodName: '',
            currentPeriod: [],
            prevMonthDays: [],
            nextMonthDays: []
        };
    }

    public ngOnInit(): void {
        this.initCalendar();
    }

    public initCalendar(): void {
        for (let year = this.calendarOprions.startYear; year <= this.calendarOprions.endYear; year++) {
            for (let month = 0; month <= 11; month++) {
                const monthYear: moment.Moment = moment().year(year).month(month);
                this.calendarOprions.periods.push(monthYear);
            }
        }

        // set calendar options
        this.calendarOprions.weekDays = moment.weekdays();
        this.calendarOprions.currentPeriodName = moment(new Date(), 'YYYY-MM-DD').format('MMMM') + ' ' +
            moment(new Date(), 'YYYY-MM-DD').format('YYYY');
        this.calendarOprions.currentPeriod = this._weekDays(
            moment(new Date(), 'YYYY-MM-DD').format('MMMM'),
            Number(moment(new Date(), 'YYYY-MM-DD').format('YYYY'))
        );

        this._previosMonth(new Date());
        this._nextMonth(new Date());
    }

    public isPreviosMonth(day: string): boolean {
        for (let prevDays of this.calendarOprions.prevMonthDays) {
            const prevMonth = this.getMonth(moment(day).format('YYYY-MM-DD'));
            const currentMonth = this.getMonth(prevDays);

            if (currentMonth.indexOf(prevMonth) < 0) {
                return false;
            }
            return true;
        }

        return false;
    }

    public isNextMonth(day: string): boolean {
        for (let nextDays of this.calendarOprions.nextMonthDays) {
            const prevMonth = this.getMonth(moment(day).format('YYYY-MM-DD'));
            const currentMonth = this.getMonth(nextDays);

            if (currentMonth.indexOf(prevMonth) < 0) {
                return false;
            }
            return true;
        }

        return false;
    }

    public changePeriod(period: any): void {
        this.calendarOprions.currentPeriodName = this.getCurrentPeriod(period);

        this.calendarOprions.currentPeriod = this._weekDays(
            this.getMonth(period),
            Number(this.getYear(period))
        );
        this._previosMonth(period);
        this._nextMonth(period);
    }

    public getCurrentPeriod(period: any): string {
        return this.getMonth(period) + ' ' + this.getYear(period);
    }

    public getDay(day: Date): string {
        return moment(day).format('D');
    }

    public getMonth(day: string): string {
        return moment(day).format('MMMM');
    }

    public getYear(day: number): string {
        return moment(day).format('YYYY');
    }

    private _previosMonth(date: Date): void {
        const prevMonthDates = [];

        const numberOfDaysInLastMonth = moment(date, 'YYYY-MM-DD').subtract(1, 'months').daysInMonth();
        const startOfLastMonth = moment(date, 'YYYY-MM-DD').subtract(1, 'months').startOf('month');

        for (let i = 0; i < numberOfDaysInLastMonth; i++) {
            prevMonthDates.push(startOfLastMonth.format('YYYY-MM-DD'));
            startOfLastMonth.add(1, 'days');
        }
        this.calendarOprions.prevMonthDays = prevMonthDates;
    }

    private _nextMonth(date: Date): void {
        const nextMonthDates = [];
        const numberOfDaysInNextMonth = moment(date, 'YYYY-MM-DD').add(1, 'months').daysInMonth();
        const startOfNextMonth = moment(date, 'YYYY-MM-DD').add(1, 'months').startOf('month');

        for (let i = 0; i < numberOfDaysInNextMonth; i++) {
            nextMonthDates.push(startOfNextMonth.format('YYYY-MM-DD'));
            startOfNextMonth.add(1, 'days');
        }
        this.calendarOprions.nextMonthDays = nextMonthDates;
    }

    private _weekDays(month: string, year: number): any {
        const endDate = moment.utc().year(year).month(month).endOf('month');

        return Array(endDate.date())
            .fill(0).map((_, i) => moment.utc().year(year).month(month).date(i + 1))
            .map((day) => ({ day, week: day.week() }))
            .filter(({ week }, i, arr) => arr.findIndex((info) => info.week === week) === i)
            .map(({ day, week }) => ({
                week,
                days: Array(7).fill(0).map((_, i) => moment.utc(day).week(week).startOf('week').add(i, 'day'))
            }));
    }

}
