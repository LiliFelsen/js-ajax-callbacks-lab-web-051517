$(document).ready(function (){
  $('#searchButton').on('click', searchRepositories)
});


function searchRepositories() {
let searchTerm = $('#searchTerms').val()
let url = `https://api.github.com/search/repositories?q=${searchTerm}`
function success(){console.log("made it")}
 $.get(url,success).fail(function(error){
    console.log("there is an error!");
  })
}

// function(data){
// let repoHTML = '<ul>'
// $.each(data.items, function(i, repo){
//   repoHTML += '<div class="repo">'
//   repoHTML += `<p><a href="${repo.html_url}"> ${repo.name} </a></p>`
//   repoHTML += `<p> ${repo.description} </p>`
//   repoHTML += `<p><img class = "avatar" src="${repo.owner.avatar_url}"/><p>`
//   repoHTML += `<p><a href="${repo.owner.html_url}">${repo.owner.login}</a><p>`
//   repoHTML += `<p><a class="commitLink" href="" rel="${repo.commits_url}">Show Commits</a></p></div>`
// })
// repoHTML += '</ul>'
// $('#results').html(repoHTML)
// })
