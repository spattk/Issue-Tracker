class GitHub {
    constructor() {
        this.client_id = '15612da7da543b48a2b2';
        this.client_secret = 'b1cd2ee6f923f3b881e08b3af0b8811c7ae01374';
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

        const getIssueReponseByPage = await fetch(`https://api.github.com/${owner}/${repo}/issues?filter=all&state=open&sort=created&direction=desc&per_page=100&page=${page}`);

        return getIssueReponseByPage.json();
    }
}

