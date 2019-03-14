//Init Github and UI
const github = new GitHub;
const ui = new UI;

//Search Input
const inputBox = document.getElementById('inputBox');

searchRepo.addEventListener('click', (e) => {

    const repoURL = document.createElement('a');
    repoURL.href = inputBox.value;
    ui.showAlert("");
    let invalid = false;

    if (repoURL.href != '') {

        let pathname = repoURL.pathname;
        let owner = '';
        let repo = '';

        while (pathname.charAt(0) == '/')
            pathname = pathname.substr(1);

        let length = pathname.length;
        while (pathname.charAt(length - 1) === '/') {
            pathname = pathname.substr(0, length - 1);
            length = length - 1;
        }

        var res = pathname.split('/');
        if (res.length != 2) {
            console.log("Invalid Repo URL");
            ui.showAlert("Invalid Repo URL, Please enter a valid one");
            invalid = true;
        }

        else if (res.length == 2) {
            owner = res[0];
            repo = res[1];
        }

        let results = [];
        let totalIssues = [];

        //for last 24 hrs
        let firstIssues = [];

        //for last 7 days
        let secondIssues = [];

        //more than 7 days
        let thirdIssues = [];

        if (!invalid) {
            github.checkIssues(owner, repo)
                .then(
                    data => {
                        if (data.message != null) {
                            //Show alert
                            ui.showAlert(data.message)
                        }
                        else {
                            //Show Issues
                            ui.fillArray(owner, repo).then(result => {
                                console.log("Response");
                                console.log({ result });
                                results = result;
                                const currDate = Date.parse(new Date());
                                const millis = 3600000; //Milliseconds of an hour

                                //Traverse the result array and check the time when is the issue created by checking 24 hours or 24*7 for 7 days
                                results.forEach((result) => {
                                    let createDate = Date.parse(result.created_at);
                                    if (result.pull_request == null) {
                                        totalIssues.push(result);

                                        if ((currDate - createDate) / millis < 24) {
                                            firstIssues.push(result);
                                        }

                                        else if ((currDate - createDate) / millis >= 24 && (currDate - Date.parse(result.created_at) / millis < 168)) {
                                            secondIssues.push(result);
                                        }

                                        else {
                                            thirdIssues.push(result);
                                        }

                                    }
                                })

                                console.log({ totalIssues });
                                console.log({ firstIssues });
                                console.log({ secondIssues });
                                console.log({ thirdIssues });

                                ui.showTable(totalIssues, firstIssues, secondIssues, thirdIssues);
                            });
                        }
                    })

                .catch(err=>{
                    ui.showAlert(err);
                    console.log(err);
                })
        }
    }

})