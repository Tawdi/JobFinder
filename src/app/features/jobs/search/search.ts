import {Component, inject, OnInit, signal} from '@angular/core';
import {SearchFilters} from './search-filters/search-filters';
import {JobList} from '../job-list/job-list';
import {JobDetails} from '../job-details/job-details';
import {JobsService} from '../../../core/services/jobs';
import {JobAdapter} from '../../../core/adapters/job-adapter';
import {Job} from '../../../core/models/job.model';

@Component({
  selector: 'app-search',
  imports: [
    SearchFilters,
    JobList,
    JobDetails
  ],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {

  private jobsService = inject(JobsService);

  joblist = signal<Job[]>([]);
  selectedJob = signal<Job | null>(null);
  isLoading = signal(false);
  errorMessage = signal("");

  // Pagination signals
  currentPage = signal(1);
  totalPages = signal(0);
  totalJobs = signal(0);

  // Search filter signals
  searchCategory = signal<string>('');
  searchLevel = signal<string>('');
  searchLocation = signal<string>('');
  descending = signal<boolean>(true);

  ngOnInit() {

    this.loadJobs()
  }

  loadJobs(page: number = 1) {

    const params: any = {
      page: page === 0 ? 0 : page - 1,
      descending: this.descending()
    };

    if (this.searchCategory()) {
      params.category = this.searchCategory();
    }

    if (this.searchLevel()) {
      params.level = this.searchLevel();
    }

    if (this.searchLocation()) {
      params.location = this.searchLocation();
    }

    this.isLoading.set(true);
    this.errorMessage.set("");
    this.currentPage.set(page);

    // THEMUSE
    this.jobsService.getJobs('themuse', params)
      .subscribe({
        next: (res: any) => {
          const jobs = res.results.map((j: any) => JobAdapter.fromMuse(j));
          // console.log(jobs)
          this.joblist.set(jobs);

          if (jobs.length > 0) {
            this.selectedJob.set(jobs[0]);
          } else {
            this.selectedJob.set(null);
          }

          this.totalPages.set(res.page_count);
          this.totalJobs.set(res.total || 0);

          this.isLoading.set(false);
          this.errorMessage.set("");
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set("Failed to load jobs");
        }
      });

    // // ADZUNA
    // this.jobsService.getJobs('adzuna', { country: 'us', page: 1 }).subscribe((res: any) => {
    //   const jobs = res.results.map((j: any) => JobAdapter.fromAdzuna(j));
    //   console.log('adzuna', jobs);
    // });
    //
    // // USAJOBS
    // this.jobsService.getJobs('usajobs', { Keyword: 'developer' }).subscribe((res: any) => {
    //   const jobs = res.SearchResult.SearchResultItems.map((j: any) => JobAdapter.fromUSA(j));
    //   console.log('usajobs', jobs);
    // });
    //
    // // ARBEITNOW
    // this.jobsService.getJobs('arbeitnow', { remote: true }).subscribe((res: any) => {
    //   const jobs = res.data.map((j: any) => JobAdapter.fromArbeit(j));
    //   console.log('arbeitnow', jobs);
    // });
  }

  // Search methods
  searchByCategory(category: string) {
    this.searchCategory.set(category);
    this.loadJobs(1);
  }

  searchByLevel(level: string) {
    this.searchLevel.set(level);
    this.loadJobs(1);
  }

  searchByLocation(location: string) {
    this.searchLocation.set(location);
    this.loadJobs(1);
  }

  setSortOrder(descending: boolean) {
    this.descending.set(descending);
    this.loadJobs(this.currentPage()); // Keep current page
  }

  clearSearch() {
    this.searchCategory.set('');
    this.searchLevel.set('');
    this.searchLocation.set('');
    this.descending.set(true);
    this.loadJobs(1);
  }

  onJobSelected(job: Job) {
    this.selectedJob.set(job);
  }

  onPreviousPage() {
    if (this.currentPage() > 1) {
      this.loadJobs(this.currentPage() - 1);
      this.scrollJobListToTop();
    }
  }

  onNextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.loadJobs(this.currentPage() + 1);
      this.scrollJobListToTop();
    }
  }


  private scrollJobListToTop() {
    setTimeout(() => {
      const jobListElement = document.querySelector('.job-list-container');
      if (jobListElement) {
        jobListElement.scrollTop = 0;
      }
    });
  }


}
