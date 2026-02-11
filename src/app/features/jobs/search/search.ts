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
  // Pagination signals
  currentPage = signal(1);
  totalPages = signal(0);
  totalJobs = signal(0);

  ngOnInit() {

    this.loadJobs()
  }

  loadJobs(page: number = 1) {

    this.isLoading.set(true);
    this.errorMessage.set("");
    this.currentPage.set(page);

    // THEMUSE
    this.jobsService.getJobs('themuse', {page})
      .subscribe({
        next: (res: any) => {
          const jobs = res.results.map((j: any) => JobAdapter.fromMuse(j));
          // console.log(jobs)
          this.joblist.set(jobs);

          if (jobs.length > 0) {
            this.selectedJob.set(jobs[0]);
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
