class GitHub {
    constructor() {
        this.client_id = 'e4ffc829b972a5f5d9df';
        this.client_secret = 'bcd4ba04da792b043b08aec1f948bdb076a695f0';
    }

    async checkIssues(owner, repo){
        const checkIssueResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        return checkIssueResponse.json();
    }

    async getIssues(owner, repo) {
        const getIssueReponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?filter=all&state=open&sort=created&direction=desc&per_page=100`);

        return getIssueReponse.json();
    }

    async getIssuesByPage(owner, repo, page) {

        const getIssueReponseByPage = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?filter=all&state=open&sort=created&direction=desc&per_page=100&page=${page}`);

        return getIssueReponseByPage.json();
    }
}

