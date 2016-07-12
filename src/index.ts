import isArray from 'isarray';
import FormData from 'form-data';

export interface GetSpaceActivitiesParams {
  activityTypeId?: ActivityType[];
  minId?: number;
  maxId?: number;
  count?: number;
  order?: Order;
}

export enum ActivityType {
    Undefined = -1,
    IssueCreated = 1,
    IssueUpdated = 2,
    IssueCommented = 3,
    IssueDeleted = 4,
    WikiCreated = 5,
    WikiUpdated = 6,
    WikiDeleted = 7,
    FileAdded = 8,
    FileUpdated = 9,
    FileDeleted = 10,
    SvnCommitted = 11,
    GitPushed = 12,
    GitRepositoryCreated = 13,
    IssueMultiUpdated = 14,
    ProjectUserAdded = 15,
    ProjectUserRemoved = 16,
    NotifyAdded = 17,
    PullRequestAdded = 18,
    PullRequestUpdated = 19,
    PullRequestCommented = 20,
    PullRequestMerged = 21
}

export interface PutSpaceNotificationParams {
  content: string;
}

export interface PostUserParams {
  userId: string;
  password: string;
  name: string;
  mailAddress: string;
  roleType: RoleType;
}

export interface PatchUserParams {
  password?: string;
  name?: string;
  mailAddress?: string;
  roleType?: RoleType;
}

export enum RoleType {
  Admin = 1,
  User = 2,
  Reporter = 3,
  Viewer = 4,
  GuestReporter = 5,
  GuestViewer = 6
}

export interface GetUserActivitiesParams {
  activityTypeId?: ActivityType[];
  minId?: number;
  maxId?: number;
  count?: number;
  order?: Order;
}

export interface GetUserStarsParams {
  minId?: number;
  maxId?: number;
  count?: number;
  order?: Order;
}

export interface GetUserStarsCountParams {
  since?: string;
  until?: string;
}

export interface GetRecentlyViewedParams {
  order?: Order;
  offset?: number;
  count?: number;
}

export interface GetGroupsParams {
  order?: Order;
  offset?: number;
  count?: number;
}

export interface PostGroupsParams {
  name: string;
  members?: string[];
}

export interface PatchGroupParams {
  name?: string;
  members?: string[];
}






// ======================================================


export interface PostIssueParams {
  projectId: number;
  summary: string;
  priorityId: number;
  issueTypeId: number;
  parentIssueId?: number;
  description?: string;
  startDate?: string;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  categoryId?: number[];
  versionId?: number[];
  milestoneId?: number[];
  assigneeId?: number;
  notifiedUserId?: number[];
  attachmentId?: number[];
  [customField_:string]: any;
}

export interface PatchIssueParams {
  summary?: string;
  parentIssueId?: number;
  description?: string;
  statusId?: number;
  resolutionId?: number;
  startDate?: string;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  issueTypeId?: number;
  categoryId?: number[];
  versionId?: number[];
  milestoneId?: number[];
  priorityId?: number;
  assigneeId?: number;
  notifiedUserId?: number[];
  attachmentId?: number[];
  comment?: string;
  [customField_:string]: any;
}

export interface GetIssuesParams {
  projectId?: number[];
  issueTypeId?: number[];
  categoryId?: number[];
  versionId?: number[];
  milestoneId?: number[];
  statusId?: number[];
  priorityId?: number[];
  assigneeId?: number[];
  createdUserId?: number[];
  resolutionId?: number[];
  parentChild?: ParentChildType;
  attachment?: boolean;
  sharedFile?: boolean;
  sort?: SortKey;
  order?: Order;
  offset?: number;
  count?: number;
  createdSince?: string;
  createdUntil?: string;
  updatedSince?: string;
  updatedUntil?: string;
  startDateSince?: string;
  startDateUntil?: string;
  dueDateSince?: string;
  dueDateUntil?: string;
  id?: number[];
  parentIssueId?: number[];
  keyword: string;
}

export enum ParentChildType {
  All = 0, NotChild = 1, Child = 2, NotChildNotParent = 3, Parent = 4
}

// TODO add customField_${id}
export type SortKey =
  "issueType" |
  "category" |
  "version" |
  "milestone" |
  "summary" |
  "status" |
  "priority" |
  "attachment" |
  "sharedFile" |
  "created" |
  "createdUser" |
  "updated" |
  "updatedUser" |
  "assignee" |
  "startDate" |
  "dueDate" |
  "estimatedHours" |
  "actualHours" |
  "childIssue";

export type Order = "asc" | "desc";

export interface GetProjectsParams {
  archived?: boolean;
  all?: boolean;
}

export interface GetPullRequestsParams {
  statusId?: number[];
  assigneeId?: number[];
  issueId?: number[];
  createdUserId?: number[];
  offset?: number;
  count?: number;
}

export interface PostPullRequestParams {
  summary: string;
  description: string;
  base: string;
  branch: string;
  issueId?: number;
  assigneeId?: number;
  notifiedUserId?: number[];
  attachmentId?: number[];
}

export interface PatchPullRequestParams {
  summary?: string;
  description?: string;
  issueId?: number;
  assigneeId?: number;
  notifiedUserId?: number[];
  comment?: string[];
}

export interface GetPullRequestCommentsParams {
  minId?: number;
  maxId?: number;
  count?: number;
  order?: Order;
}

export interface PostPullRequestCommentsParams {
  content: string;
  notifiedUserId?: number[];
}

export interface PatchPullRequestCommentsParams {
  content: string;
}





export default class Backlog {

  private spaceId: string;
  private apiKey: string;

  constructor(option: { spaceId: string, apiKey: string }) {
    this.spaceId = option.spaceId;
    this.apiKey = option.apiKey;
  }

  public getSpace(): Promise<any> {
    return this.get('/api/v2/space');
  }

  public getSpaceActivities(params: GetSpaceActivitiesParams): Promise<any> {
    return this.get('/api/v2/space/activities', params);
  }

  public getSpaceNotification(): Promise<any> {
    return this.get('/api/v2/space/notification');
  }

  public putSpaceNotification(params: PutSpaceNotificationParams): Promise<any> {
    return this.put('/api/v2/space/notification', params);
  }

  public getSpaceDiskUsage(): Promise<any> {
    return this.get('/api/v2/space/diskUsage');
  }

  public getUsers(): Promise<any> {
    return this.get(`/api/v2/users`);
  }

  public getUser(userId: number): Promise<any> {
    return this.get(`/api/v2/users/${userId}`);
  }

  public postUser(params: PostUserParams): Promise<any> {
    return this.post(`/api/v2/users`, params);
  }

  public patchUser(userId: number, params: PatchUserParams): Promise<any> {
    return this.patch(`/api/v2/users/${userId}`, params);
  }

  public deleteUser(userId: number): Promise<any> {
    return this.delete(`/api/v2/users/${userId}`);
  }

  public getMyself(): Promise<any> {
    return this.get('/api/v2/users/myself');
  }

  public getUserActivities(userId: number, params: GetUserActivitiesParams): Promise<any> {
    return this.get(`/api/v2/users/${userId}/activities`, params);
  }

  public getUserStars(userId: number, params: GetUserStarsParams): Promise<any> {
    return this.get(`/api/v2/users/${userId}/stars`, params);
  }

  public getUserStarsCount(userId: number, params: GetUserStarsCountParams): Promise<any> {
    return this.get(`/api/v2/users/${userId}/count`, params);
  }

  public getRecentlyViewedIssues(params: GetRecentlyViewedParams): Promise<any> {
    return this.get('/api/v2/users/myself/recentlyViewedIssues', params);
  }

  public getRecentlyViewedProjects(params: GetRecentlyViewedParams): Promise<any> {
    return this.get('/api/v2/users/myself/recentlyViewedProjects', params);
  }

  public getRecentlyViewedWikis(params: GetRecentlyViewedParams): Promise<any> {
    return this.get('/api/v2/users/myself/recentlyViewedWikis', params);
  }

  public getGroups(params: GetGroupsParams): Promise<any> {
    return this.get('/api/v2/groups', params);
  }

  public postGroups(params: PostGroupsParams): Promise<any> {
    return this.post('/api/v2/groups', params);
  }

  public getGroup(groupId: number): Promise<any> {
    return this.get(`/api/v2/groups/${groupId}`);
  }

  public patchGroup(groupId:number, params: PatchGroupParams): Promise<any> {
    return this.patch('/api/v2/groups', params);
  }

  public deleteGroup(groupId: number): Promise<any> {
    return this.delete(`/api/v2/groups/${groupId}`);
  }










// =============================================================

  public postIssue(params: PostIssueParams): Promise<any> {
    return this.post('/api/v2/issues', params);
  }

  public patchIssue(issueIdOrKey: string, params: PatchIssueParams): Promise<any> {
    return this.patch(`/api/v2/issues/${issueIdOrKey}`, params);
  }

  public getIssues(params?: GetIssuesParams): Promise<any> {
    return this.get('/api/v2/issues', params);
  }

  public getIssue(issueIdOrKey: string): Promise<any> {
    return this.get(`/api/v2/issues/${issueIdOrKey}`);
  }

  public getProjects(params?: GetProjectsParams): Promise<any> {
    return this.get('/api/v2/projects', params);
  }

  public getIssueTypes(projectIdOrKey: string): Promise<any> {
    return this.get(`/api/v2/projects/${projectIdOrKey}/issueTypes`);
  }

  public getPriorities(): Promise<any> {
    return this.get('/api/v2/priorities');
  }

  public getCategories(projectIdOrKey: string): Promise<any> {
    return this.get(`/api/v2/projects/${projectIdOrKey}/categories`);
  }

  public getVersions(projectIdOrKey: string): Promise<any> {
    return this.get(`/api/v2/projects/${projectIdOrKey}/versions`);
  }

  public getProjectUsers(projectIdOrKey: string): Promise<any> {
    return this.get(`/api/v2/projects/${projectIdOrKey}/users`);
  }

  public getStatuses(): Promise<any> {
    return this.get('/api/v2/statuses');
  }

  public getGitRepositories(projectIdOrKey: string): Promise<any> {
    return this.get(`/api/v2/projects/${projectIdOrKey}/git/repositories`);
  }

  public getGitRepository(
    projectIdOrKey: string,
    repoIdOrName: string
  ): Promise<any> {
    return this.get(`/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}`);
  }

  public getPullRequests(
    projectIdOrKey: string,
    repoIdOrName: string,
    params: GetPullRequestsParams
  ): Promise<any> {
    return this.get(`/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests`, params);
  }

  public getPullRequestsCount(
    projectIdOrKey: string,
    repoIdOrName: string,
    params: GetPullRequestsParams
  ): Promise<any> {
    return this.get(`/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/count`, params);
  }

  public postPullRequest(
    projectIdOrKey: string,
    repoIdOrName: string,
    params: PostPullRequestParams
  ): Promise<any> {
    return this.post(`/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests`, params);
  }

  public getPullRequest(
    projectIdOrKey: string,
    repoIdOrName: string,
    number: number
  ): Promise<any> {
    return this.get(`/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}`);
  }

  public patchPullRequest(
    projectIdOrKey: string,
    repoIdOrName: string,
    number: number,
    params: PatchPullRequestParams
  ): Promise<any> {
    return this.patch(`/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}`, params);
  }

  public getPullRequestComments(
    projectIdOrKey: string,
    repoIdOrName: string,
    number: number,
    params: GetPullRequestCommentsParams
  ): Promise<any> {
    return this.get(`/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}/comments`, params);
  }

  public postPullRequestComments(
    projectIdOrKey: string,
    repoIdOrName: string,
    number: number,
    params: PostPullRequestCommentsParams
  ): Promise<any> {
    return this.post(`/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}/comments`, params);
  }

  public getPullRequestCommentsCount(
    projectIdOrKey: string,
    repoIdOrName: string,
    number: number
  ): Promise<any> {
    return this.get(`/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}/comments/count`);
  }

  public patchPullRequestComments(
    projectIdOrKey: string,
    repoIdOrName: string,
    number: number,
    commentId: number,
    params: PatchPullRequestCommentsParams
  ): Promise<any> {
    return this.patch(`/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}/${commentId}`, params);
  }

  public getPullRequestAttachments(
    projectIdOrKey: string,
    repoIdOrName: string,
    number: number
  ): Promise<any> {
    return this.get(`/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}/attachments`);
  }

  public deletePullRequestAttachment(
    projectIdOrKey: string,
    repoIdOrName: string,
    number: number,
    attachmentId: number
  ): Promise<any> {
    return this.get(`/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}/attachments/${attachmentId}`);
  }

	private get(endpoint: string, query?: any): Promise<any> {
    return this.request('GET', endpoint, query);
  }

  private post(endpoint: string, body: any): Promise<any> {
    return this.request('POST', endpoint, null, body);
  }

  private put(endpoint: string, body: any): Promise<any> {
    return this.request('PUT', endpoint, null, body);
  }

  private patch(endpoint: string, body: any): Promise<any> {
    return this.request('PATCH', endpoint, null, body);
  }

  private delete(endpoint: string, body?: any): Promise<any> {
    return this.request('DELETE', endpoint, null, body);
  }

  private request (
    method: string,
    endpoint: string,
    query = new Map<string, any>(),
    body = new Map<string, any>()
  ): Promise<any> {
    query.set('apiKey', this.apiKey);
    const url = `https://${this.spaceId}.backlog.jp${endpoint}?${this.toQueryString(query)}`;
    const init: RequestInit = {};
    init.method = method;
    if (method != 'GET') {
      const form = this.toFormData(body);
      init.headers = <{ [index: string]: string; }> form.getHeaders();
      init.body = form;
    }
    init.headers['Accept'] = 'application/json';
    return fetch(url, init).then(this.checkStatus).then(this.parseJSON);
  }

  private checkStatus(response: IResponse): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      if (200 <= response.status && response.status < 300) {
        return response;
      } else {
        throw new Error(response.statusText);
      }
    });
  }

  private parseJSON(response: IResponse): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(response.json());
    });
  }

  private toFormData(obj: any): FormData {
    return Object.keys(obj).reduce((result, key) => {
      const value = obj[key];
      if (!value) {
        return result;
      }
      if (isArray(value)) {
        value.forEach(v => result.append(`${key}[]`, v));
      } else {
        result.append(key, value);
      }
      return result;
    }, new FormData());
  }

  private toQueryString(obj: any): string {
    return Object.keys(obj).reduce((result, key) => {
      const value = obj[key];
      if (!value) {
        return result;
      }
      if (isArray(value)) {
        value.forEach(v => result.push(`${key}[]=${v}`));
      } else {
        result.push(`${key}=${obj[key]}`);
      }
      return result;
    }, []).join('&');
  }

}
