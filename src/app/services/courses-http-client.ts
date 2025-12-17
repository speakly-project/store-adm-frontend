import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CourseInterface } from '../models/CourseInterface';
import { LanguageInterface } from '../models/LanguageInterface';
import { LevelInterface } from '../models/LevelInterface';

@Injectable({
    providedIn: 'root',
})
export class CoursesHttpClient {

    private user: string | null = null;
    private passwd: string | null = null;

    constructor(private Mihttp: HttpClient) { }

    urlCourses = "http://localhost:8080/api/speakly/courses";
    //urlLanguages = "http://localhost:3000/languages";
    urlLanguages = "http://localhost:8080/api/speakly/languages";
    urlLevels = "http://localhost:8080/api/speakly/levels";


    setCredentials(user: string, passwd: string) {
        this.user = user;
        this.passwd = passwd;
    }

    getUser(): string | null {
        return this.user;
    }

    getPasswd(): string | null {
        return this.passwd;
    }

    isLogged(): boolean {
        if (this.user === 'admin' || this.passwd === 'admin') {
            return true;
        }
        return false;
    }

    getAllCourses() {
        return this.Mihttp.get<{ data: CourseInterface[] }>(this.urlCourses+`?pageSize=100`).pipe(
            map(response => response.data)
        );
    }
    getCourseById(id: number) {
        return this.Mihttp.get(this.urlCourses + '/' + id);
    }
    deleteCourse(id: number) {
        return this.Mihttp.delete(this.urlCourses + '/' + id);
    }
    getAllLanguages() {
        return this.Mihttp.get<{ data: LanguageInterface[] }>(this.urlLanguages+`?pageSize=100`).pipe(
            map(response => response.data)
        );
    }
    getAllLevels() {
        return this.Mihttp.get<{ data: LevelInterface[] }>(this.urlLevels+`?pageSize=100`).pipe(
            map(response => response.data)
        );
    }
}
