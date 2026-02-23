1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
   Answer:
   getElementById() → select single element by unique id,always returns only one element
   getElementsByClassName() → select multiple elements by class,it returns an HTMLCollection. It is live, meaning if the DOM changes->it updates automatically.
   querySelector() → selects the first matching element,It can select by id, class, tag, or any CSS selector.
   querySelectorAll() → all matching elements using CSS selectors.It returns a static NodeList (not live)

  
