
/// MARK: Get all folders in bookmark manager
function getBookmarkTrees() {
	chrome.bookmarks.getTree(function(treeNodes) {
		for (var i = treeNodes.length - 1; i >= 0; i--) {
			console.log('Title: ' + treeNodes[i]);
		}
	}); 
};


/// MARK: Background func
chrome.runtime.onInstalled.addListener(function() {
	getBookmarkTrees();
});

