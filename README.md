1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll
   -----------------------------------------------------------------------------------------------------------
   
   Answer:
      getElementById() → select single element by unique id,always returns only one element
      getElementsByClassName() → select multiple elements by class,it returns an HTMLCollection. It is live, meaning if the DOM changes->it updates automatically.
      querySelector() → selects the first matching element,It can select by id, class, tag, or any CSS selector.
      querySelectorAll() → all matching elements using CSS selectors.It returns a static NodeList (not live)

 2. How do you create and insert a new element into the DOM?
    ---------------------------------------------------------
    Answer:
      To create a new element, we use document.createElement()
           
      Create the element->Add text or attributes->Insert it into the DOM using methods like append(), appendChild(), or prepend()
      Example-
      const div = document.createElement("div");
      div.innerText = "New Job Added";
      document.body.appendChild(div);

3. What is Event Bubbling? And how does it work?
   ------------------------------------------------
   Answer:
      It is a process where an event starts from the target element and then moves upward to its parent elements.
      
      Example: if a button is inside a card and we click the button-
      
      First, the button event runs,Then the event moves to the parent div.Then it goes to higher parent elements.This upward movement is called Event Bubbling.

4. What is Event Delegation in JavaScript? Why is it useful?
----------------------------------------------------------
Answer:
      Event Delegation is a technique where we attach a single event listener to a parent element instead of adding listeners to multiple child elements.It works because of event bubbling. The event bubbles up to the parent, and we can detect which child triggered the event.It is useful because,It improves performance.It works for dynamically added elements.It reduces duplicate code
            
6. What is the difference between preventDefault() and stopPropagation() methods?
-------------------------------------------------------------------------------------
Answer:
      preventDefault() stops the browser’s default behavior.
      stopPropagation() stops the event from bubbling to parent elements.







