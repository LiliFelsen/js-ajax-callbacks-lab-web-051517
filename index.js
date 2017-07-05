$(document).ready(function (){
  $('#searchButton').on('click', searchRepositories)
  $('#results').on('click', '.commitLink', showCommits)
});


function searchRepositories(event) {
  event.preventDefault()
let searchTerm = $('#searchTerms').val()
let url = `https://api.github.com/search/repositories?q=${searchTerm}`

function success(data){
let repoHTML = '<ul>'
$.each(data.items, function(i, repo){
  repoHTML += '<div class="repo">'
  repoHTML += `<p><a href="${repo.html_url}"> ${repo.name} </a></p>`
  repoHTML += `<p> ${repo.description} </p>`
  repoHTML += `<p><img class = "avatar" src="${repo.owner.avatar_url}"/><p>`
  repoHTML += `<p><a href="${repo.owner.html_url}">${repo.owner.login}</a><p>`
  repoHTML += `<p><a class="commitLink" href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" id="show-commits">Show Commits</a></p></div>`
})
repoHTML += '</ul>'
$('#results').html(repoHTML)
}

 $.get(url,success).fail(displayError)
}

function showCommits(el) {
  console.log(el.dataset.repository)
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    console.log(data);

    data.forEach( commit => {
      let html = ""
      html += `<div class="commit">`
      html += `<p>SHA: ${commit.sha}</p>`
      html += `<a href="${commit.author.html_url}">Author Page</a>`
      html += `<p>Author Login: ${commit.author.login}</p>`
      html += `<p><image src="${commit.author.avatar_url}" width="100"></p>`
      html += `<div>`

      $("#details").append(html)
    })
  })
}

// function showCommits() {
// let commitsUrl = `https://api.github.com/repos/${element.dataset.owner}/${element.dataset.repository}/commits`
// $.get(commitsUrl, commitsDisplay).fail(displayError)
//
//   function commitsDisplay(commits) {
//     let commitHTML = "<ul>"
//     commits.forEach( commit => {
//         commitHTML += `<div class="commit">`
//         commitHTML += `<p>SHA: ${commit.sha}</p>`
//         commitHTML += `<a href="${commit.author.html_url}">Author Page</a>`
//         commitHTML += `<p>Author Login: ${commit.author.login}</p>`
//         commitHTML += `<p><image src="${commit.author.avatar_url}" width="100"></p></div>`
//         })
//       commitHTML += "</ul>"
//       $("#details").html(commitHTML)
//   }
// }


function displayError(error) {
  $("#errors").text("I'm sorry, there's been an error. Please try again.")
}
