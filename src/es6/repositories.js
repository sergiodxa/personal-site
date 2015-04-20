import template from 'igatajs';

const $repos = document.querySelector('#repositorios');

function getRepositories() {
  if (!sessionStorage.repos) {
    const request = new XMLHttpRequest();

    request.open('GET', 'https://api.github.com/users/sergiodxa/repos', true);

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        sessionStorage.setItem('repos', this.response);

        const data = JSON.parse(this.response);

        showRepositories(data);
      } else {
        $repos.style.display = 'none';
      }
    };

    request.onerror = function onError() {
      $repos.style.display = 'none';
    };

    request.send();
  }
  else {
    const data = JSON.parse(sessionStorage.getItem('repos'));
    showRepositories(data);
  }
}

function showRepositories(repos) {
  repos.forEach(repo => {
    const tplt = template('#tplt-repo', {
      title: repo.name,
      description: repo.description,
      link: repo.html_url
    });

    $repos.appendChild(tplt);
  });
}

export default getRepositories;
