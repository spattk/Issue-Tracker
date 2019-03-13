
class UI {
    constructor() {
        this.issues = document.getElementById('issues');
    }

    //Filling the results array
    async fillArray(owner, repo) {
        let more = true;

        console.log("Inside fill array", owner, repo);
        let results = [];
        await github.getIssues(owner, repo)
            .then(data => {
                if(data.message!=null){
                    console.log(data.message);
                    ui.showAlert(data.message);
                }
                results.push(data);
                if(data.length<100)
                more = false;
            })
            .catch(err=>{
                console.log(err);
                ui.showAlert(err);
            })
        
        let page = 2;
        while (more) {
            await github.getIssuesByPage(owner, repo, page)
                .then(data => {
                    if(data.message!=null){
                        console.log(data.message);
                        ui.showAlert(data.message);
                    }
                    results.push(data);
                    if (data.length < 100) {
                        more = false;
                    }
                })
                .catch(err=>{
                    console.log(err);
                })

            page = page + 1;
        }
        console.log(results);
        return results
    }

    //Showing the output in the UI
    showTable(total, first, second, third){
        this.issues.innerHTML = `
        <table class="table" border="1">
            <tr>
                <td><strong>Total number of open issues</strong></td>
                <td>${total.length}</td>
            </tr>
            <tr>
                <td><strong>Open issues that were opened in the last 24 hours</strong></td>
                <td>${first.length}</td>
            </tr>
            <tr>
                <td><strong>Open issues that were opened more than 24 hours ago but less than 7 days ago</strong></td>
                <td>${second.length}</td>
            </tr>
            <tr>
                <td><strong>Open issues that were opened more than 7 days ago </strong></td>
                <td>${third.length}</td>
            </tr>
        </table>
        `;
    }

    //Handle error messages
    showAlert(message){
        this.issues.innerHTML = `
        <div style="text-align:center">
            <h5>${message}</h5>
        </div>
        `
    }

}