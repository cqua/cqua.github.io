
		var n = 0;
		function findInPage(str) {
		    var txt, i, found;
		    if (str == "") {
		        return false;
		    }
		    // Find next occurance of the given string on the page, wrap around to the
		    // start of the page if necessary.
		    if (window.find) {
		        // Look for match starting at the current point. If not found, rewind
		        // back to the first match.
		        if (!window.find(str)) {
		            while (window.find(str, false, true)) {
		                n++;
		            }
		        } else {
		            n++;
		        }
		        // If not found in either direction, give message.
		        if (n == 0) {
		            alert("Not found.");
		        }
		    } else if (window.document.body.createTextRange) {
		        txt = window.document.body.createTextRange();
		        // Find the nth match from the top of the page.
		        found = true;
		        i = 0;
		        while (found === true && i <= n) {
		            found = txt.findText(str);
		            if (found) {
		                txt.moveStart("character", 1);
		                txt.moveEnd("textedit");
		            }
		            i += 1;
		        }
		        // If found, mark it and scroll it into view.
		        if (found) {
		            txt.moveStart("character", -1);
		            txt.findText(str);
		            txt.select();
		            txt.scrollIntoView();
		            n++;
		        } else {
		            // Otherwise, start over at the top of the page and find first match.
		            if (n > 0) {
		                n = 0;
		                findInPage(str);
		            }
		            // Not found anywhere, give message. else
		            alert("Not found.");
		        }
		    }
		    return false;
		}



		</script>
		<script language="javascript">
		(function(document, history, location) {
		  var HISTORY_SUPPORT = !!(history && history.pushState);

		  var anchorScrolls = {
		    ANCHOR_REGEX: /^#[^ ]+$/,
		    OFFSET_HEIGHT_PX: 50,

		    /**
		     * Establish events, and fix initial scroll position if a hash is provided.
		     */
		    init: function() {
		      this.scrollIfAnchor(location.hash);
		      document.body.addEventListener('click', this.delegateAnchors.bind(this));
		    },

		    /**
		     * Return the offset amount to deduct from the normal scroll position.
		     * Modify as appropriate to allow for dynamic calculations
		     */
		    getFixedOffset: function() {
		      return this.OFFSET_HEIGHT_PX;
		    },

		    /**
		     * If the provided href is an anchor which resolves to an element on the
		     * page, scroll to it.
		     * @param  {String} href
		     * @return {Boolean} - Was the href an anchor.
		     */
		    scrollIfAnchor: function(href, pushToHistory) {
		      var match, rect, anchorOffset;

		      if(!this.ANCHOR_REGEX.test(href)) {
		        return false;
		      }

		      match = document.getElementById(href.slice(1));

		      if(match) {
		        rect = match.getBoundingClientRect();
		        anchorOffset = window.pageYOffset + rect.top - this.getFixedOffset();
		        window.scrollTo(window.pageXOffset, anchorOffset);

		        // Add the state to history as-per normal anchor links
		        if(HISTORY_SUPPORT && pushToHistory) {
		          history.pushState({}, document.title, location.pathname + href);
		        }
		      }

		      return !!match;
		    },

		    /**
		     * If the click event's target was an anchor, fix the scroll position.
		     */
		    delegateAnchors: function(e) {
		      var elem = e.target;

		      if(
		        elem.nodeName === 'A' &&
		        this.scrollIfAnchor(elem.getAttribute('href'), true)
		      ) {
		        e.preventDefault();
		      }
		    }
		  };

		  window.addEventListener(
		    "DOMContentLoaded", anchorScrolls.init.bind(anchorScrolls)
		  );
		})(window.document, window.history, window.location);
