// ES6
class TypeWriter {
  constructor(textElement, words, wait = 3000) {
    this.textElement = textElement;
    this.words = words;
    this.wait = parseInt(wait, 10);
    this.wordIndex = 0;
    this.txt = "";
    this.isDeleting = false;
    this.type();
  }
  type() {
    // current index of words
    const current = this.wordIndex % this.words.length;
    // Get Full text of current word
    const fullText = this.words[current];
    // check if is deleting
    if (this.isDeleting) {
      // remove the char
      this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
      // add the char
      this.txt = fullText.substring(0, this.txt.length + 1);
    }
    // insert txt into text element
    this.textElement.innerHTML = `<span class = "txt">${this.txt}</span>`;

    // type speed
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }
    // if word is complete
    if (!this.isDeleting && this.txt === fullText) {
      // Make Pause At End
      typeSpeed = this.wait;
      // set isDeleting true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      // set Delete False
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause Before Start Typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}
// initial in DOM Load
document.addEventListener("DOMContentLoaded", initial);
// initiol App
function initial() {
  const txtElement = document.querySelector(".txt-type");
  const wait = txtElement.getAttribute("data-wait");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  new TypeWriter(txtElement, words, wait);
}
