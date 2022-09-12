export default function copyText(element) {
  var input = element;

  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    // handle iOS devices
    input.contenteditable = true;
    input.readonly = false;

    var range = document.createRange();
    range.selectNodeContents(input);

    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    input.setSelectionRange(0, 999999);
  } else {
    // other devices are easy
    input.select();
  }
  document.execCommand("copy");
}
