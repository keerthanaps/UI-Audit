export function runAuditInTab() {
    const issues = [];
  //Images with no alt text
    const images = document.querySelectorAll("img");
    images.forEach(img => {
      if (!img.alt || img.alt.trim() === "") {
        issues.push({
          type: "Accessibility",
          message: "Image missing alt text",
          element: img.outerHTML.slice(0, 100)
        });
      }
    });
  
    // //buttons and links
    // const buttonsAndLinks = document.querySelectorAll("button, a");
    // buttonsAndLinks.forEach(el => {
    //   const rect = el.getBoundingClientRect();
    //   if (rect.width < 40 || rect.height < 40) {
    //     issues.push({
    //       type: "UX",
    //       message: "Small clickable element (<40px)",
    //       element: el.outerHTML.slice(0, 100)
    //     });
    //   }
    // });
  
    //ColourContrast
    const elements = document.querySelectorAll("*");
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.color === "rgb(255, 255, 255)" &&
          style.backgroundColor === "rgb(255, 255, 255)") {
        issues.push({
          type: "Contrast",
          message: "White text on white background",
          element: el.outerHTML.slice(0, 100)
        });
      }
    });
  
    // Heading hierarchy
const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(el => ({
    level: parseInt(el.tagName.substring(1)),
    element: el
  }));
  
  for (let i = 1; i < headings.length; i++) {
    const prev = headings[i - 1];
    const curr = headings[i];
    if (curr.level - prev.level > 1) {
      issues.push({
        type: 'Heading Structure',
        message: `Improper heading jump from <h${prev.level}> to <h${curr.level}>.`,
        element: curr.element.outerHTML,
      });
    }
  }

  //misuse of tabindex
  document.querySelectorAll('[tabindex]').forEach((el) => {
    const tabindex = parseInt(el.getAttribute('tabindex'));
    if (tabindex > 0) {
      issues.push({
        type: 'Tabindex Misuse',
        message: `Element uses a positive tabindex (${tabindex}), which can confuse tab order.`,
        element: el.outerHTML,
      });
    }
  });

  //Non-focusable interactive elements
  document.querySelectorAll('div, span').forEach((el) => {
    const role = el.getAttribute('role');
    const onclick = el.getAttribute('onclick');
    const isInteractive = onclick || role === 'button' || role === 'link';
  
    if (isInteractive && !el.hasAttribute('tabindex')) {
      issues.push({
        type: 'Focusable Elements',
        message: 'Interactive element is not focusable with keyboard.',
        element: el.outerHTML,
      });
    }
  });
  
  //Placeholder used instead of label
  document.querySelectorAll('input, textarea').forEach((el) => {
    const hasLabel = el.id && document.querySelector(`label[for="${el.id}"]`);
    const hasPlaceholder = el.hasAttribute('placeholder');
    if (!hasLabel && hasPlaceholder) {
      issues.push({
        type: 'Form Labeling',
        message: 'Input uses placeholder but has no <label>.',
        element: el.outerHTML,
      });
    }
  });

  //Non-descriptive link text
  document.querySelectorAll('a').forEach((a) => {
    const text = a.innerText.trim().toLowerCase();
    const badText = ['click here', 'read more', 'learn more', 'link'];
    if (badText.includes(text)) {
      issues.push({
        type: 'Link Text',
        message: `Non-descriptive link text: "${text}". Use more meaningful text.`,
        element: a.outerHTML,
      });
    }
  });

  //Deprecated html tags
const deprecatedTags = ['center', 'font', 'marquee', 'bgsound'];
deprecatedTags.forEach((tag) => {
  document.querySelectorAll(tag).forEach((el) => {
    issues.push({
      type: 'Deprecated HTML',
      message: `Usage of <${tag}> is deprecated.`,
      element: el.outerHTML,
    });
  });
});

//Fixed/sticky elements overlapping content
document.querySelectorAll('*').forEach((el) => {
    const style = window.getComputedStyle(el);
    if ((style.position === 'fixed' || style.position === 'sticky') && parseInt(style.zIndex) >= 10) {
      const rect = el.getBoundingClientRect();
      if (rect.top < 100 && rect.bottom > 0) {
        issues.push({
          type: 'Sticky Element',
          message: 'Element may be covering content due to high z-index.',
          element: el.outerHTML,
        });
      }
    }
  });
  
  //Audit for inline styles
  document.querySelectorAll('*').forEach((el) => {
    if (el.hasAttribute('style')) {
      issues.push({
        type: 'Inline Styles',
        message: 'Element uses inline styles, which are discouraged.',
        element: el.outerHTML,
      });
    }
  });
  
//detect missing title or meta description
const titleTag = document.querySelector('title');
if (!titleTag || !titleTag.innerText.trim()) {
  issues.push({
    type: 'SEO',
    message: '<title> tag is missing or empty.',
    element: '<title>...</title>',
  });
}

const metaDescription = document.querySelector('meta[name="description"]');
if (!metaDescription || !metaDescription.getAttribute('content')?.trim()) {
  issues.push({
    type: 'SEO',
    message: '<meta name="description"> is missing or empty.',
    element: '<meta name="description">',
  });
}

//responsive design check
if (document.documentElement.scrollWidth > window.innerWidth + 5) {
    issues.push({
      type: 'Responsive Design',
      message: 'Page has horizontal scrolling (content wider than viewport).',
      element: '<body>',
    });
  }
  
 
    return issues;
  }
  