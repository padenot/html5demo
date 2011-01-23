var sections = Array();

// Put all sections element in a variable, at startup
function init() {
  var allSections = document.querySelectorAll("section");
  for (var i = 0, il = allSections.length; i < il; i++) {
    sections[allSections[i].attributes[0].firstChild.data] = allSections[i];

    allSections[i].parentNode.removeChild(allSections[i]);
  }
}

// Hide an element, when a user clicks on the link while the element
// is visible.
function hide(e) {
  var toRemove = document.getElementById(e.target.firstChild.data);
  toRemove.removeAttribute("selected");
  command =
    "document.getElementById('"+e.target.firstChild.data+"').parentNode.removeChild(document.getElementById('"+e.target.firstChild.data+"'))";
  setTimeout(command, 800);
}

// Set the element as selected, i.e. start transition
function setSelected(elementID) {
  document.getElementById(elementID).setAttribute("selected", "true");
}

// Show an element.
  function show(e) {
    if(document.getElementById(e.target.firstChild.data) == null)
    {
      var element = e.target;
      var header = document.getElementsByTagName("header");
      var toInsert = sections[e.target.firstChild.data];

      document.getElementById("content").appendChild(toInsert);

      command = 'setSelected("'+e.target.firstChild.data+'")';

      // Mandatory : see https://bugzilla.mozilla.org/show_bug.cgi?id=571748
      setTimeout(command, 100);
    }
    else
    {
      hide(e);
    }
  }
