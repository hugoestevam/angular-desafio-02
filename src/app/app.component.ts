import {Component, OnInit} from '@angular/core';
import { Inject } from '@angular/core';

import { Repository } from './model/repository';
import { RepositoryService } from '../app/services/repository.service';

@Component({
    selector: 'my-app',
    template: `
    <div className='container'>
        <ul data-testid='repository-list'>
            <ng-template ngFor let-repo [ngForOf]="repos" let-i="index" [ngForTrackBy]="trackByFn">
                <li>
                    {{repo.title}}
                    <button (click)="handleRemoveRepository(repo.id)">Remover</button>
                </li>
            </ng-template>
        </ul>

        <button (click)="handleAddRepository()">Adicionar</button>
    </div>
    `
})

export class AppComponent implements OnInit {
    repos: Repository[];
    error: any;

    constructor(@Inject(RepositoryService) private repoService: RepositoryService) { }

    ngOnInit(): void {
        this.getRepositories();
    }

    private getRepositories() {
        this.repoService.get().subscribe(
            repositories => (this.repos = repositories), 
            error => (this.error = error));
    }

    handleAddRepository() {
        const newRepo: Repository = {
            title: `Novo repositorio ${Date.now()}`,
            url: 'http://github.com/hugoestevam',
            techs: ['Tech 1', 'Tech 2'],
        }

        this.repoService.post(newRepo).subscribe(
            repository => (this.repos = [...this.repos, repository]),
            error => (this.error = error));
    }

    handleRemoveRepository(id: string) {
        this.repoService.delete(id);

        const deletedRepo = this.repos.filter((item) => {
            return item.id !== id;
        });

        this.repos = deletedRepo;
    }
}