// ```mermaid 코드 블록을 찾아 Mermaid 다이어그램으로 렌더링한다.
(function () {
  var wrappers = document.querySelectorAll(
    "div.language-mermaid, pre > code.language-mermaid"
  );
  if (wrappers.length === 0) return;

  wrappers.forEach(function (el) {
    var target = el.tagName === "CODE" ? el.parentNode : el;
    var code = el.tagName === "CODE" ? el : el.querySelector("code");
    if (!code) return;

    var diagram = document.createElement("div");
    diagram.className = "mermaid";
    diagram.textContent = code.textContent;
    target.parentNode.replaceChild(diagram, target);
  });

  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
  script.onload = function () {
    mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
    mermaid.run({ querySelector: ".mermaid" });
  };
  document.head.appendChild(script);
})();
