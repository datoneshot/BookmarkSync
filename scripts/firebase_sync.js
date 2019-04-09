function getBookmarkTree() {
    var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
      	syncBookmarks(bookmarkTreeNodes);
    });
}

function syncBookmarks(bookmarkNodes) {
	for(i = 0; i < bookmarkNodes.length; i++) {
		syncNode(bookmarkNodes[i]);
  	}
}

function syncNode(node) {
	if(node.title) {
		// write title and url of bookmark to firebase
		if(node.parentId) {
			var nodeRef = database.ref('bookmarks/' + node.parentId);
		} else {
			var nodeRef = database.ref('bookmarks/' + node.id);
		}

		// nodeRef.set({	"bookmark_id": node.id,
  //   					"title": node.title
  // 					});
  		
  		// database.ref().child('bookmarks').set(node.title);
	}

	// write children bookmark of current bookmark
	if (node.children && node.children.length > 0) {
    	syncBookmarks(node.children);
  	}
}

function syncOnFirebase() {
	getBookmarkTree();
}

document.addEventListener('DOMContentLoaded', function () {
	$('#sync_btn').click(function() {
  		syncOnFirebase();
  	});
});