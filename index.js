function getIssues() {
  return fetch('https://api.github.com/repos/yammik/javascript-fetch-lab/issues', {
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(json => showIssues(json));
}

function showIssues(json) {
  const issues = `<ul>${json.map(issue => `<li>${issue.title} - ${issue.body}</li>`).join("")}</ul>`;
  document.getElementById("issues").innerHTML = issues;
}

function createIssue() {
  let issueTitle = document.getElementById('title').value;
  let issueBody = document.getElementById('body').value;

  return fetch('https://api.github.com/repos/yammik/javascript-fetch-lab/issues', {
    method: 'POST',
    headers: {
      Authorization: `token ${getToken()}`
    },
    body: JSON.stringify({title: issueTitle, body: issueBody})
  }).then(e => getIssues());
}

function showResults(json) {
  const result = JSON.stringify(json)
  document.getElementById("results").innerHTML = result;
  return json;
}

function forkRepo() {
  return fetch('https://api.github.com/repos/learn-co-curriculum/javascript-fetch-lab/forks', {
    method: 'POST',
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(json => showResults(json)).then(json => showForkedRepo(json));
}

function getToken() {
  return '';
}

function showForkedRepo(json) {
  let resultsBody = document.getElementById('results').innerHTML;
  document.getElementById('results').innerHTML = `<a href="${json.html_url}">Link to forked repo</a><br>` + resultsBody;
}
