/// MARK: Get bookmark tree
function getBookmarkTree() {
	chrome.bookmarks.getTree(
		function (bookmarkTreeNodes) {
			syncBookmarks(bookmarkTreeNodes);
		}
	);
}

/// MARK: 
function syncBookmarks(bookmarkNodes) {
	for(i = 0; i < bookmarkNodes.length; i++) {
		syncNode(bookmarkNodes[i]);
  	}
}

function pushDataOnFirebase(node) {
	var database = firebase.database();
		if(node.parentId) {
			var nodeRef = database.ref('bookmarks/' + node.parentId + "/" + node.id);
		} else {
			var nodeRef = database.ref('bookmarks/');
		}
		var nodeInfo = node.url ?  { title: node.title, url: node.url } : { title: node.title };
		nodeRef.set(nodeInfo);
}

function syncNode(node) {
	if(node.title) {
		// alert("Sync node: " + node.title);
		pushDataOnFirebase(node)
	}

	if(node.children == null || node.children.length == 0) {
		return;
	}

	var children = node.children;
	// alert("Begin sync" + children.length + "children node of node: " + node.title);
	for(i = 0; i < children.length; i++) {
		syncNode(children[i]);
	}
}

/// MARK: Sync button handler
function syncOnFirebase() {
	getBookmarkTree();
}

/// MARK: Setup button click event
document.addEventListener('DOMContentLoaded', function () {
	$('#sync_btn').click(function() {
  		syncOnFirebase();
  	});
});