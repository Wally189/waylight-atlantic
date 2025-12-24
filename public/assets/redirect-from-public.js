// Redirects URLs that incorrectly include a /public prefix to the live site root
(function() {
    var locationRef = window.location;
    var path = locationRef.pathname;
    var marker = "/public";
    var markerIndex = path.indexOf(marker);

    if (markerIndex === -1) {
        return;
    }

    var nextIndex = markerIndex + marker.length;
    var nextChar = path.charAt(nextIndex);

    // Only rewrite when /public is a full path segment (end of string or followed by /)
    if (nextIndex < path.length && nextChar !== "/") {
        return;
    }

    // Rebuild the path without the /public segment
    var pathPrefix = path.slice(0, markerIndex);
    var pathSuffix = path.slice(nextIndex);
    var cleanedPath = pathPrefix + pathSuffix;

    if (cleanedPath === "") {
        cleanedPath = "/";
    }

    locationRef.replace(cleanedPath + locationRef.search + locationRef.hash);
})();
