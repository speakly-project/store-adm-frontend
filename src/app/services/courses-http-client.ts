import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoursesHttpClient {
    constructor(private Mihttp: HttpClient) {}
    urlCourses = "http://localhost:3000/courses";
    urlLanguages = "http://localhost:3000/languages";
    urlLevels = "http://localhost:3000/levels";
    getAllCourses() {
        return this.Mihttp.get(this.urlCourses);
    }
    getCourseById(id: number) {
        return this.Mihttp.get(`${this.urlCourses}/${id}`);
    }
    getCoursesByLanguage(language: string) {
        return this.Mihttp.get(`${this.urlCourses}?language=${language}`);
    }
    getCoursesByLevel(level: string) {
        return this.Mihttp.get(`${this.urlCourses}?level=${level}`);
    }   
    getCoursesByLanguageAndLevel(language: string, level: string) {
        return this.Mihttp.get(`${this.urlCourses}?language=${language}&level=${level}`);
    }
    deleteCourse(id: number) {
        return this.Mihttp.delete(`${this.urlCourses}/${id}`);
    }
    getAllLanguages() {
        return this.Mihttp.get(this.urlLanguages);
    }
    getAllLevels() {
        return this.Mihttp.get(this.urlLevels);
    }
}
