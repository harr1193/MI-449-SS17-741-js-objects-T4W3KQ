// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}
// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  if (requestedJokeKey in jokes) {
    jokeBox.innerHTML =
      '<p>' + jokes[requestedJokeKey]['setup'] + '</p>' +
      '<p>' + jokes[requestedJokeKey]['punchline'] + '</p>'
  } else {
    jokeBox.innerHTML = '<p>' + 'No joke was found that matched.' + '</p>'
  }
}

// Store jokes in localStorage as a string
var updateStoredJokes = function () {
  var stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
  updateStoredJokes()
}

// -------
// STARTUP
// -------

var storedJokes = window.localStorage.getItem('jokes')
if (storedJokes !== null) {
  jokes = JSON.parse(storedJokes)
}

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

var jokeToRemember = document.getElementById('save')
var newJokeAbout = document.getElementById('about')
var newJokeSetup = document.getElementById('setup')
var newJokePunchline = document.getElementById('punchline')

var newJoke = function () {
  var jokeKey = newJokeAbout.value
  var jokeSetup = newJokeSetup.value
  var jokePunchline = newJokePunchline.value
  jokes[jokeKey] = {
    'setup': jokeSetup,
    'punchline': jokePunchline
  }
  updatePage()
  newJokeAbout.value = ''
  newJokeSetup.value = ''
  newJokePunchline.value = ''
}

jokeToRemember.addEventListener('click', newJoke)

var deletedJoke = document.getElementById('forget')
var deleteJoke = function () {
  var jokeToForgetInput = document.getElementById('joke-to-forget')
  var jokeToForgetKey = jokeToForgetInput.value
  if (jokeToForgetKey in jokes) {
    delete jokes[jokeToForgetKey]
    updatePage()
  }
  jokeToForgetInput.value = ''
}
deletedJoke.addEventListener('click', deleteJoke)
// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
