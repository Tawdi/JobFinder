import {Job} from '../models/job.model';

export class JobAdapter {

  static fromMuse(job: any): Job {
    return {
      id: job.id,
      title: job.name,
      company: job.company?.name,
      location: job.locations?.[0]?.name,
      description: job.contents,
      url: job.refs?.landing_page,
      published: job.publication_date,
      platformName:"The Muse"
    };
  }

  static fromUSA(job: any): Job {
    const d = job.MatchedObjectDescriptor;
    return {
      id: job.MatchedObjectId,
      title: d.PositionTitle,
      company: d.OrganizationName,
      location: d.PositionLocation?.[0]?.LocationName,
      description: '',
      url: d.PositionURI,
      published: d.PublicationStartDate,
      platformName:"USAJobs"
    };
  }

  static fromAdzuna(job: any): Job {
    return {
      id: job.id,
      title: job.title,
      company: job.company?.display_name,
      location: job.location?.display_name,
      description: job.description,
      url: job.redirect_url,
      published: job.created,
      platformName:"Adzuna"
    };
  }

  static fromArbeit(job: any): Job {
    return {
      id: job.slug,
      title: job.title,
      company: job.company_name,
      location: job.location,
      description: job.description,
      url: job.url,
      published: job.created_at,
      platformName:"Arbeitnow"
    };
  }
}
