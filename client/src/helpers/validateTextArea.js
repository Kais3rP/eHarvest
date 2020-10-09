// Logic and Helper functions
export default function validateTextArea(ev) {
  if (ev.target.value.length < 100 || ev.target.value.length > 500)
    ev.target.setCustomValidity("Wrong length of text")
  // Adds a custom html validity check
  else ev.target.setCustomValidity("") // Removes the custom validity check
}
